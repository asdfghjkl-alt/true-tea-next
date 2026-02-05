import { NextResponse } from "next/server";
import { type NextRequest } from "next/server"; // Explicitly import NextRequest
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Missing verification token" },
      { status: 400 },
    );
  }

  await connectToDatabase();

  const user = await User.findOne({
    emailToken: token,
    emailTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 },
    );
  }

  // Activate user and clear token
  user.activated = true;
  user.emailToken = undefined;
  user.emailTokenExpires = undefined;
  await user.save();

  return NextResponse.json(
    { message: "Email verified successfully" },
    { status: 200 },
  );
});
