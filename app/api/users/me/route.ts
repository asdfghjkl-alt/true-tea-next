import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { apiHandler } from "@/lib/api-handler";
import connectToDatabase from "@/lib/mongodb";
import User from "@/database/user.model";
import { profileSchema } from "@/lib/schemas";

export const GET = apiHandler(async () => {
  await connectToDatabase();
  const session = await getSession();

  if (!session || !session.userData) {
    return NextResponse.json({ user: null });
  }

  const user = await User.findById(session.userData._id).select("-password");
  return NextResponse.json({ user });
});

export const PUT = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();
  const session = await getSession();

  if (!session || !session.userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { error, value: validatedBody } = profileSchema.validate(body);

  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 },
    );
  }

  const { fname, lname, phone, age, address } = validatedBody;

  const user = await User.findByIdAndUpdate(
    session.userData._id,
    {
      $set: {
        fname,
        lname,
        phone,
        age,
        address,
      },
    },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Profile updated successfully", user });
});
