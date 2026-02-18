import { NextResponse } from "next/server";
import { User } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";
import Joi from "joi";
import bcrypt from "bcrypt";
import { hashToken } from "@/lib/tokens";

// Validates the request body
const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const POST = apiHandler(async (req) => {
  const body = await req.json();
  const { error, value } = resetPasswordSchema.validate(body);

  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 },
    );
  }

  const { token, password } = value;

  await connectToDatabase();

  // Hash the incoming token to look it up
  const hashedToken = hashToken(token);

  // Find user with this reset token and check expiry
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired reset token" },
      { status: 400 },
    );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Update user password and clear reset tokens
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  await user.save();

  return NextResponse.json(
    { message: "Password reset successfully" },
    { status: 200 },
  );
});
