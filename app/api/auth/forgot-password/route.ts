import { NextResponse } from "next/server";
import { User } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";
import Joi from "joi";
import { generateVerificationToken } from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/email";

// Validates the email in the request body
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const POST = apiHandler(async (req) => {
  const body = await req.json();
  const { error, value } = forgotPasswordSchema.validate(body);

  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 },
    );
  }

  const { email } = value;

  await connectToDatabase();

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    // Return success even if user not found to prevent enumeration
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, a password reset link has been sent.",
      },
      { status: 200 },
    );
  }

  // Generate reset token (using same util as verification)
  const { token, hashedToken, expires } = generateVerificationToken();

  // Save hashed token to user
  user.resetToken = hashedToken;
  user.resetTokenExpires = expires;
  await user.save();

  // Send email with raw token
  await sendResetPasswordEmail(user.email, user.fname, token);

  return NextResponse.json(
    {
      message:
        "If an account exists with this email, a password reset link has been sent.",
    },
    { status: 200 },
  );
});
