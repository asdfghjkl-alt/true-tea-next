import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Order, Product, CheckoutSession } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import Stripe from "stripe";
import { OrderStatus } from "@/types/order";
import { POSTAGE_FEE } from "@/lib/constants";
import {
  sendOrderConfirmationEmail,
  sendRefundFailedEmail,
  sendRefundSuccessEmail,
} from "@/lib/email";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * Validates the Webhook payload and returns the Stripe Event
 */
function verifyWebhookSignature(
  body: string,
  signature: string | null,
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET");
  }

  if (!signature) {
    throw new Error("Missing stripe-signature header");
  }

  return stripe.webhooks.constructEvent(body, signature, webhookSecret);
}

/**
 * Executes an auto-refund when the corresponding CheckoutSession has expired
 */
async function handleMissingSession(paymentIntent: Stripe.PaymentIntent) {
  const paymentId = paymentIntent.id;

  console.error(
    `CheckoutSession not found for paymentIntent: ${paymentId}. Attempting auto-refund...`,
  );

  try {
    await stripe.refunds.create({ payment_intent: paymentId });
    console.log(
      `Successfully auto-refunded expired payment intent ${paymentId}`,
    );
    return new NextResponse("CheckoutSession not found, refunded", {
      status: 200,
    });
  } catch (err: any) {
    console.error(
      `Failed to auto-refund expired payment intent ${paymentId}`,
      err,
    );

    // Alert Admin about the failed refund for the missing session
    await sendRefundFailedEmail(
      process.env.NEXT_PUBLIC_EMAIL_TO || "admin@true-tea.com.au",
      paymentId,
      paymentIntent.amount / 100,
      err.message,
    );

    return new NextResponse(
      "CheckoutSession not found, but automatic refund failed",
      { status: 500 },
    );
  }
}

/**
 * Triggers Stripe refunds when fulfillment throws an error from out-of-stock items or price mismatches
 */
async function handleFulfillmentFailure(
  paymentId: string,
  paymentIntent: Stripe.PaymentIntent,
  buyer: any,
  error: any,
) {
  console.error(
    "Order Fulfillment Failed via Webhook. Initiating Refund...",
    error,
  );
  const errorMessage = error.message || "Unknown error";

  try {
    await stripe.refunds.create({ payment_intent: paymentId });
    console.log(`Refund successful for PaymentIntent: ${paymentId}`);

    await sendRefundSuccessEmail(
      buyer.email,
      paymentId,
      paymentIntent.amount / 100,
      `Order fulfillment failed: ${errorMessage}`,
    );

    // Tell Stripe to not retry, we've handled the full refund gracefully
    return new NextResponse(
      "Fulfillment failed but refund successfully triggered",
      { status: 200 },
    );
  } catch (refundError: any) {
    console.error(
      `CRITICAL: Failed to refund PaymentIntent ${paymentId}`,
      refundError,
    );

    // Alert Admin so they don't panic while Stripe handles the automatic retry
    await sendRefundFailedEmail(
      process.env.NEXT_PUBLIC_EMAIL_TO || "admin@true-tea.com.au",
      paymentId,
      paymentIntent.amount / 100,
      refundError.message,
    );

    // Returning 500 tells Stripe to retry the entire webhook event from scratch
    return new NextResponse("Fulfillment failed and refund crashed", {
      status: 500,
    });
  }
}

/**
 * Locks stock, calculates prices, and writes the Order to MongoDB
 */
async function processOrderFulfillment(
  sessionDoc: any,
  paymentIntent: Stripe.PaymentIntent,
) {
  const { cart, buyer, delivery, owner_id } = sessionDoc;
  const paymentId = paymentIntent.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let orderTotal = 0;
    let gstTotal = 0;
    let discountTotal = 0;

    for (const item of cart) {
      const product = await Product.findById(item.product_id).session(session);

      if (!product) throw new Error(`Product not found: ${item.name}`);
      if (product.stock < item.quantity)
        throw new Error(`Insufficient stock for: ${product.name}`);

      product.stock -= item.quantity;
      await product.save({ session });

      const price = item.price;
      const discount = item.discount || 0;
      const discountedPrice = price * (1 - discount / 100);

      const itemTotal = discountedPrice * item.quantity;
      orderTotal += itemTotal;
      if (product.includeGST) gstTotal += itemTotal / 11;
      discountTotal += price * item.quantity - itemTotal;
    }

    const postage = POSTAGE_FEE;
    orderTotal += postage;

    // CRITICAL SECURITY CHECK
    const calculatedAmountInCents = Math.round(orderTotal * 100);
    if (paymentIntent.amount !== calculatedAmountInCents) {
      console.error(
        `Security Alert: Payment amount mismatch. Paid: ${paymentIntent.amount}, Calculated: ${calculatedAmountInCents}`,
      );
      throw new Error(
        "Payment amount mismatch - Potential security issue or price change mid-checkout",
      );
    }

    let receiptUrl = "receipt_url_not_available";
    let receiptNumber = "receipt_number_not_available";
    const latestCharge = paymentIntent.latest_charge as Stripe.Charge | null;

    if (latestCharge && typeof latestCharge === "object") {
      if (latestCharge.receipt_url) receiptUrl = latestCharge.receipt_url;
      if (latestCharge.receipt_number)
        receiptNumber = latestCharge.receipt_number;
    }

    const newOrder = new Order({
      owner_id: owner_id,
      productList: cart,
      buyer,
      delivery,
      postage,
      discountTotal,
      orderTotal,
      GSTTotal: gstTotal,
      paymentId: paymentId,
      paymentMethod: "stripe",
      receipt: receiptNumber,
      receiptUrl: receiptUrl,
      status: OrderStatus.paid,
      paidDate: new Date(),
      note: "",
    });

    await newOrder.save({ session });
    await CheckoutSession.deleteOne({ paymentIntentId: paymentId }).session(
      session,
    );

    await session.commitTransaction();
    session.endSession();

    // Fire and forget email
    sendOrderConfirmationEmail({
      orderId: newOrder._id.toString(),
      buyer,
      delivery,
      productList: cart,
      postage,
      GSTTotal: gstTotal,
      orderTotal,
      discountTotal,
      paidDate: new Date().toISOString(),
      paymentId,
      receiptUrl,
      receipt: receiptNumber,
    });

    return new NextResponse("Order successfully created", { status: 200 });
  } catch (fulfillmentError: any) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    return await handleFulfillmentFailure(
      paymentId,
      paymentIntent,
      buyer,
      fulfillmentError,
    );
  }
}

/**
 * Handles the payment_intent.succeeded webhook payload
 */
async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntentBase = event.data.object as Stripe.PaymentIntent;
  const paymentId = paymentIntentBase.id;

  await connectToDatabase();

  const existingOrder = await Order.findOne({ paymentId });
  if (existingOrder) {
    console.log(
      `Order ${existingOrder._id} already exists for payment ${paymentId}`,
    );
    return new NextResponse("Order already processed", { status: 200 });
  }

  const sessionDoc = await CheckoutSession.findOne({
    paymentIntentId: paymentId,
  });
  if (!sessionDoc) {
    return await handleMissingSession(paymentIntentBase);
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentId, {
    expand: ["latest_charge"],
  });

  return await processOrderFulfillment(sessionDoc, paymentIntent);
}

/**
 * Primary Webhook Entry Point
 */
export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = verifyWebhookSignature(body, signature);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    return await handlePaymentIntentSucceeded(event);
  }

  return new NextResponse("Received", { status: 200 });
};
