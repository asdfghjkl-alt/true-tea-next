import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/schemas";
import { User } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail, sendAlreadyRegisteredEmail } from "@/lib/email";
import { apiHandler } from "@/lib/api-handler";

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json();
  // Validates the user's registration information with the schema
  const { error, value } = registerSchema.validate(body);

  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 },
    );
  }

  const { fname, lname, email, password, phone, age, postcode } = value;

  await connectToDatabase();

  // Check if user already exists with the corresponding email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Send email to existing user
    await sendAlreadyRegisteredEmail(email, existingUser.fname);

    return NextResponse.json(
      {
        message:
          "If this email is not already registered, you will receive a verification link.",
      },
      { status: 201 },
    );
  }

  // Hashes passwords with 12 levels of salting
  const hashedPassword = await bcrypt.hash(password, 12);

  // Generates a new verification token for the user
  const { token, hashedToken, expires } = generateVerificationToken();

  // Creates the new user in the database
  const newUser = await User.create({
    email,
    fname,
    lname,
    phone,
    age,
    address: {
      postcode,
    },
    password: hashedPassword,
    emailToken: hashedToken,
    emailTokenExpires: expires,
  });

  // Sends verification email to the user
  const emailSent = await sendVerificationEmail(email, fname, token);

  // Sends 201 on successful user creation but alerts user that email failed to be sent
  if (!emailSent) {
    return NextResponse.json(
      {
        message:
          "If this email is not already registered, you will receive a verification link.",
        userId: newUser._id,
      },
      { status: 201 },
    );
  }

  // Returns on successful registration
  return NextResponse.json(
    {
      message:
        "If this email is not already registered, you will receive a verification link.",
    },
    { status: 201 },
  );
});
