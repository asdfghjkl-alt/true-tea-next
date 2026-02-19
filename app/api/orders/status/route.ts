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

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );

  if (!updatedOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (status === OrderStatus.delivered) {
    updatedOrder.deliveredDate = new Date();
    await updatedOrder.save();

    await sendDeliveryEmail({
      orderId: updatedOrder._id.toString(),
      buyer: updatedOrder.buyer,
      delivery: updatedOrder.delivery,
      productList: updatedOrder.productList,
      postage: updatedOrder.postage,
      GSTTotal: updatedOrder.GSTTotal,
      orderTotal: updatedOrder.orderTotal,
      discountTotal: updatedOrder.discountTotal,
      paidDate: updatedOrder.paidDate.toISOString(),
      paymentId: updatedOrder.paymentId,
      receiptUrl: updatedOrder.receiptUrl,
      receipt: updatedOrder.receipt,
    });
  } else if (
    status === OrderStatus.cancelled &&
    updatedOrder.status !== OrderStatus.cancelled
  ) {
    // Only refund if payment id exists and is paid through stripe
    if (updatedOrder.paymentId && updatedOrder.paymentMethod === "stripe") {
      console.log(
        `Attempting to refund order ${updatedOrder._id} (PaymentIntent: ${updatedOrder.paymentId})`,
      );
      try {
        const refund = await stripe.refunds.create({
          payment_intent: updatedOrder.paymentId,
        });

        console.log(`Refund successful: ${refund.id}`);

        // Send refund success email
        await sendRefundSuccessEmail(
          updatedOrder.buyer.email,
          updatedOrder._id.toString(),
          updatedOrder.orderTotal, // Assuming full refund for cancellation
          "Order cancelled by admin",
        );
      } catch (error) {
        console.error("Refund failed:", error);
        // Send refund failed email
        await sendRefundFailedEmail(
          updatedOrder.buyer.email,
          updatedOrder._id.toString(),
          updatedOrder.orderTotal,
          error instanceof Error ? error.message : "Unknown error", // Pass the error message to the email
        );
      }
    }

    await updatedOrder.save();
    await sendOrderCancelledEmail({
      orderId: updatedOrder._id.toString(),
      buyer: updatedOrder.buyer,
      delivery: updatedOrder.delivery,
      productList: updatedOrder.productList,
      postage: updatedOrder.postage,
      GSTTotal: updatedOrder.GSTTotal,
      orderTotal: updatedOrder.orderTotal,
      discountTotal: updatedOrder.discountTotal,
      paidDate: updatedOrder.paidDate.toISOString(),
      paymentId: updatedOrder.paymentId,
      receiptUrl: updatedOrder.receiptUrl,
      receipt: updatedOrder.receipt,
    });
  }

  return NextResponse.json({ success: true, order: updatedOrder });
});
