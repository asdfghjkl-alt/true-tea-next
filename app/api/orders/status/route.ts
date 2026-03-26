import { NextRequest, NextResponse } from "next/server";
import { Order, User } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";
import { getSession } from "@/lib/session";
import { OrderStatus } from "@/types/order";
import {
  sendDeliveryEmail,
  sendOrderCancelledEmail,
  sendRefundFailedEmail,
  sendRefundSuccessEmail,
} from "@/lib/email";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const PUT = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();

  const session = await getSession();

  if (!session || !session.userData) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const user = await User.findById(session.userData._id);

  if (!user || user.admin !== true) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { orderId, status } = await req.json();

  if (!orderId || !status) {
    return NextResponse.json(
      { error: "Missing orderId or status" },
      { status: 400 },
    );
  }

  // Validate status
  if (!Object.values(OrderStatus).includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Read the order FIRST to check its current status before mutating
  const order = await Order.findById(orderId);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const previousStatus = order.status;

  // Prevent no-op transitions (e.g. cancelling an already-cancelled order)
  if (previousStatus === status) {
    return NextResponse.json(
      { error: "Order already has this status" },
      { status: 400 },
    );
  }

  // Now update the status
  order.status = status;

  if (status === OrderStatus.delivered) {
    order.deliveredDate = new Date();
    await order.save();

    await sendDeliveryEmail({
      orderId: order._id.toString(),
      buyer: order.buyer,
      delivery: order.delivery,
      productList: order.productList,
      postage: order.postage,
      GSTTotal: order.GSTTotal,
      orderTotal: order.orderTotal,
      discountTotal: order.discountTotal,
      paidDate: order.paidDate.toISOString(),
      paymentId: order.paymentId,
      receiptUrl: order.receiptUrl,
      receipt: order.receipt,
    });
  } else if (
    status === OrderStatus.cancelled &&
    previousStatus !== OrderStatus.cancelled
  ) {
    // Only refund if payment id exists and is paid through stripe
    if (order.paymentId && order.paymentMethod === "stripe") {
      console.log(
        `Attempting to refund order ${order._id} (PaymentIntent: ${order.paymentId})`,
      );
      try {
        const refund = await stripe.refunds.create({
          payment_intent: order.paymentId,
        });

        console.log(`Refund successful: ${refund.id}`);

        // Send refund success email
        await sendRefundSuccessEmail(
          order.buyer.email,
          order._id.toString(),
          order.orderTotal,
          "Order cancelled by admin",
        );
      } catch (error) {
        console.error("Refund failed:", error);
        // Alert Admin that the manual cancellation refund got stuck, so they can resolve it themselves
        await sendRefundFailedEmail(
          process.env.NEXT_PUBLIC_EMAIL_TO || "admin@true-tea.com.au",
          order._id.toString(),
          order.orderTotal,
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    }

    await order.save();
    await sendOrderCancelledEmail({
      orderId: order._id.toString(),
      buyer: order.buyer,
      delivery: order.delivery,
      productList: order.productList,
      postage: order.postage,
      GSTTotal: order.GSTTotal,
      orderTotal: order.orderTotal,
      discountTotal: order.discountTotal,
      paidDate: order.paidDate.toISOString(),
      paymentId: order.paymentId,
      receiptUrl: order.receiptUrl,
      receipt: order.receipt,
    });
  }

  return NextResponse.json({ success: true, order });
});
