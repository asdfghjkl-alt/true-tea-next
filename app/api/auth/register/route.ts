import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/schemas";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
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
    return NextResponse.json(
      { message: "User with this email already exists" },
      { status: 409 },
    );
  }

  // Hashes passwords with 12 levels of salting
  const hashedPassword = await bcrypt.hash(password, 12);

  // Generates a verification token for the user
  const { token, expires } = generateVerificationToken();

  // Create user with new fields
  const newUser = await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
    phone,
    age,
    address: {
      postcode,
    },
    activated: false,
    emailToken: token,
    emailTokenExpires: expires,
  });

  // Sends verification email to the user
  const emailSent = await sendVerificationEmail(email, fname, token);

  // Sends 201 on successful user creation but alerts user that email failed to be sent
  if (!emailSent) {
    return NextResponse.json(
      {
        message: "User created but failed to send verification email.",
        userId: newUser._id,
      },
      { status: 201 },
    );
  }

  // Returns on successful registration
  return NextResponse.json(
    {
      message:
        "User registered successfully. Please check your email to verify.",
    },
    { status: 201 },
  );
});
