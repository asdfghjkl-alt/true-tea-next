import { NextResponse } from "next/server";
import { type NextRequest } from "next/server"; // Explicitly import NextRequest
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");

  // Returns error if no token is provided
  if (!token) {
    return NextResponse.json(
      { message: "Missing verification token" },
      { status: 400 },
    );
  }

  await connectToDatabase();

  // Finds user with the corresponding token that hasn't expired yet
  const user = await User.findOne({
    emailToken: token,
    // Uses mongo selector to find if token is greater than current date
    emailTokenExpires: { $gt: new Date() },
  });

  // Returns error if token is invalid or expired
  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 },
    );
  }

  // Activates user and clears token
  user.activated = true;
  user.emailToken = undefined;
  user.emailTokenExpires = undefined;

  await user.save();

  // Returns on successful verification
  return NextResponse.json(
    { message: "Email verified successfully" },
    { status: 200 },
  );
});
