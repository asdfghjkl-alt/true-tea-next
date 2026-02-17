import { NextRequest, NextResponse } from "next/server";
import { Order, User } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";
import { getSession } from "@/lib/session";

export const GET = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();

  const session = await getSession();

  if (!session || !session.userData) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const user = await User.findById(session.userData._id);

  if (!user || user.admin !== true) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Return all orders sorted by date descending for admin
  const orders = await Order.find({}).sort({ paidDate: -1 });

  return NextResponse.json({ orders });
});
