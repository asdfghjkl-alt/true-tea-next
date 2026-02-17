import { NextRequest, NextResponse } from "next/server";
import Order from "@/database/order.model";
import Product from "@/database/product.model";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";
import Stripe from "stripe";
import { OrderStatus } from "@/types/order";
import { apiHandler } from "@/lib/api-handler";
import { POSTAGE_FEE } from "@/lib/constants";
import { orderBackendSchema } from "@/lib/schemas";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();
  let { cart, buyer, delivery, paymentId, owner_id } = await req.json();

  // Validate owner_id if provided
  if (owner_id && owner_id !== "guest") {
    const userExists = await User.findById(owner_id);
    if (!userExists) {
      // Fallback to guest if user ID is invalid, to ensure order is still saved
      owner_id = "guest";
    }
  }

  if (!paymentId) {
    return NextResponse.json({ error: "Missing paymentId" }, { status: 400 });
  }

  // Verifies payment has gone through with Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentId, {
    expand: ["latest_charge"],
  });

  // Payment failed
  if (paymentIntent.status !== "succeeded") {
    return NextResponse.json(
      { error: "Payment not verified" },
      { status: 400 },
    );
  }

  // Check if order already exists with this paymentId to prevent replay attacks
  const existingOrder = await Order.findOne({ paymentId: paymentId });
  if (existingOrder) {
    return NextResponse.json(
      { error: "Order already processed", orderId: existingOrder._id },
      { status: 400 },
    );
  }

  // Payment is verified. Now proceed with order fulfillment.
  // Wrapped in try catch to provide refund if final order validation fails
  try {
    if (!cart || !buyer || !delivery) {
      throw new Error("Missing required fields");
    }

    const buyerValidation = orderBackendSchema.validate(buyer);
    if (buyerValidation.error) {
      throw new Error(
        `Buyer details invalid: ${buyerValidation.error.details[0].message}`,
      );
    }

    const deliveryValidation = orderBackendSchema.validate(delivery);
    if (deliveryValidation.error) {
      throw new Error(
        `Delivery details invalid: ${deliveryValidation.error.details[0].message}`,
      );
    }

    if (
      buyer.address.country.trim().toLowerCase() !== "australia" ||
      delivery.address.country.trim().toLowerCase() !== "australia"
    ) {
      throw new Error("We currently only deliver to Australia.");
    }

    // Calculates totals and verifies stock again (safety check)
    let orderTotal = 0;
    let gstTotal = 0;
    let discountTotal = 0;
    const orderProducts = [];

    for (const item of cart) {
      // Checks that quantity is valid
      if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
        throw new Error("Invalid quantity in order items");
      }

      // Checks that product exists
      const product = await Product.findById(item.product_id);

      if (!product) {
        throw new Error(`Product not found: ${item.name}`);
      }

      // Checks that stock is sufficient
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for: ${product.name}`);
      }

      // Decrements stock on successful validation
      product.stock -= item.quantity;
      await product.save();

      // Calculates total GST and total cost
      const price = product.price;
      const discount = product.discount || 0;
      const discountedPrice = price * (1 - discount / 100);

      const itemTotal = discountedPrice * item.quantity;
      orderTotal += itemTotal;

      if (product.includeGST) {
        gstTotal += itemTotal / 11;
      }

      // Calculates total discount
      discountTotal += price * item.quantity - itemTotal;

      // Adds product to order
      orderProducts.push({
        product_id: product._id,
        name: product.name,
        imageUrl: product.images[0]?.url || "",
        nameCN: product.nameCN,
        price: product.price,
        discount: product.discount,
        GST: product.includeGST ? discountedPrice / 11 : 0,
        unit: product.unit,
        quantity: item.quantity,
      });
    }
    const postage = POSTAGE_FEE;
    orderTotal += postage;

    // CRITICAL SECURITY CHECK: Verify that the amount paid matches the calculated order total
    const calculatedAmountInCents = Math.round(orderTotal * 100);
    if (paymentIntent.amount !== calculatedAmountInCents) {
      console.error(
        `Security Alert: Payment amount mismatch. Paid: ${paymentIntent.amount}, Calculated: ${calculatedAmountInCents}`,
      );
      throw new Error("Payment amount mismatch - Potential security issue");
    }

    // Extract receipt URL and Number from the latest charge
    let receiptUrl = "receipt_url_not_available";
    let receiptNumber = "receipt_number_not_available";

    const latestCharge = paymentIntent.latest_charge as Stripe.Charge | null;

    if (latestCharge && typeof latestCharge === "object") {
      if (latestCharge.receipt_url) receiptUrl = latestCharge.receipt_url;
      if (latestCharge.receipt_number)
        receiptNumber = latestCharge.receipt_number;
    }

    // Creates order
    const newOrder = await Order.create({
      owner_id: owner_id,
      productList: orderProducts,
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

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (fulfillmentError: any) {
    // Order fulfillment failed, refund the payment
    console.error(
      "Order Fulfillment Failed. Initiating Refund...",
      fulfillmentError,
    );
    try {
      // Refunds the payment
      await stripe.refunds.create({
        payment_intent: paymentId,
      });
      console.log(`Refund successful for PaymentIntent: ${paymentId}`);
    } catch (refundError) {
      // Logs critical error if refund fails, should notify owner of error
      console.error(
        `CRITICAL: Failed to refund PaymentIntent ${paymentId}`,
        refundError,
      );
    }
    throw fulfillmentError; // Re-throw to be handled by the outer error handler
  }
});
