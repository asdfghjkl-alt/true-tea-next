import { NextResponse } from "next/server";
import Joi from "joi";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { apiHandler } from "@/lib/api-handler";

const resendSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json();
  const { error, value } = resendSchema.validate(body);

  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 },
    );
  }

  const { email } = value;

  await connectToDatabase();

  const user = await User.findOne({ email });

  // Security: Do not reveal if user exists or not, but handle "already activated" gracefully if possible,
  // or just return success to avoid enumeration.
  // However, to be helpful to the user, we will return a generic success message.
  // If the user is already activated, we won't send an email (or could send a "you are already verified" email).
  // For simplicity here, if user exists and is NOT activated, we resend.

  if (!user) {
    // Return success to avoid user enumeration
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, a verification link has been sent.",
      },
      { status: 200 },
    );
  }

  if (user.activated) {
    // If already activated, we might want to inform them or just say sent.
    // Let's stick to the generic message for security, OR slightly helpful if acceptable.
    // Given the context of a small app, let's return the same generic message but do nothing.
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, a verification link has been sent.",
      },
      { status: 200 },
    );
  }

  // Generate new token
  const { token, expires } = generateVerificationToken();

  user.emailToken = token;
  user.emailTokenExpires = expires;
  await user.save();

  const emailSent = await sendVerificationEmail(email, user.fname, token);

  if (!emailSent) {
    return NextResponse.json(
      {
        message: "Failed to send verification email. Please try again later.",
      },
      { status: 500 }, // Internal error if email service fails
    );
  }

  return NextResponse.json(
    {
      message:
        "If an account exists with this email, a verification link has been sent.",
    },
    { status: 200 },
  );
});
