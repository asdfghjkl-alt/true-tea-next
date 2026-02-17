import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { apiHandler } from "@/lib/api-handler";
import connectToDatabase from "@/lib/mongodb";
import User from "@/database/user.model";
import { changePasswordSchema } from "@/lib/schemas";

export const PUT = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();
  const session = await getSession();

  if (!session || !session.userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validation = changePasswordSchema.validate(body);

  if (validation.error) {
    return NextResponse.json(
      { message: validation.error.details[0].message },
      { status: 400 },
    );
  }

  const { currentPassword, newPassword } = body;

  // Fetch user with password field included
  const user = await User.findById(session.userData._id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Current password is incorrect" },
      { status: 400 },
    );
  }

  // Hash new password with same salt rounds as registration
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update user password
  user.password = hashedPassword;
  await user.save();

  return NextResponse.json({ message: "Password changed successfully" });
});
