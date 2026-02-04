import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import connectToDatabase from "@/lib/mongodb";
import User from "@/database/user.model";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

export const POST = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();
  const { email, password } = await req.json();

  const foundUser = await User.findOne({ email });

  if (!foundUser || !foundUser.activated) {
    return NextResponse.json(
      { message: "Either email or password is incorrect" },
      { status: 404 },
    );
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Either email or password is incorrect" },
      { status: 404 },
    );
  }

  const returnedData = {
    _id: foundUser._id.toString(),
    email: foundUser.email,
    fname: foundUser.fname,
    admin: foundUser.admin,
    membership: foundUser.membership,
  };

  await createSession({
    userData: returnedData,
  });

  return NextResponse.json(
    { message: "Login successful", user: returnedData },
    { status: 200 },
  );
});
