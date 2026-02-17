import { NextRequest, NextResponse } from "next/server";
import Order from "@/database/order.model";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";
import { getSession } from "@/lib/session";
import { OrderStatus } from "@/types/order";

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
  }

  return NextResponse.json({ success: true, order: updatedOrder });
});
