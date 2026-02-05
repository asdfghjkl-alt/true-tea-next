import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Joi from "joi";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { AgeRange } from "@/types/auth"; // Import the enum

// Update schema to include new fields
const registerSchema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^04\d{8}$/)
    .required(),
  // Validate age against the specific enum values for consistency
  age: Joi.string()
    .valid(...Object.values(AgeRange))
    .required(),
  postcode: Joi.string().required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error, value } = registerSchema.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 },
      );
    }

    const { fname, lname, email, password, phone, age, postcode } = value;

    await connectToDatabase();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate token
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
      regDate: new Date(),
    });

    // Send email
    const emailSent = await sendVerificationEmail(email, fname, token);

    if (!emailSent) {
      return NextResponse.json(
        {
          message: "User created but failed to send verification email.",
          userId: newUser._id,
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      {
        message:
          "User registered successfully. Please check your email to verify.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
