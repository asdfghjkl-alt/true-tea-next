import { NextResponse } from "next/server";
import Joi from "joi";
import { User } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { apiHandler } from "@/lib/api-handler";

const resendSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json();
  // Validates the user's resend information with the schema
  const { error, value } = resendSchema.validate(body);

  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 },
    );
  }

  const { email } = value;

  await connectToDatabase();

  // Finds user with the corresponding email
  const user = await User.findOne({ email });

  if (!user) {
    // Returns generic success message to avoid user enumeration
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, a verification link has been sent.",
      },
      { status: 200 },
    );
  }

  if (user.activated) {
    // If already activated, returns generic success message to avoid user enumeration
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, a verification link has been sent.",
      },
      { status: 200 },
    );
  }

  // Generates a new verification token for the user
  const { token, expires } = generateVerificationToken();

  user.emailToken = token;
  user.emailTokenExpires = expires;
  await user.save();

  // Sends verification email to the user
  const emailSent = await sendVerificationEmail(email, user.fname, token);

  // Sends error response on failure to send a verification email
  if (!emailSent) {
    return NextResponse.json(
      {
        message: "Failed to send verification email. Please try again later.",
      },
      { status: 500 },
    );
  }

  // Returns on successful resend
  return NextResponse.json(
    {
      message:
        "If an account exists with this email, a verification link has been sent.",
    },
    { status: 200 },
  );
});
