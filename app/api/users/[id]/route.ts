import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { getSession } from "@/lib/session";
import { User } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { adminUserUpdateSchema } from "@/lib/schemas";

export const PUT = apiHandler(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    await connectToDatabase();
    const session = await getSession();

    // Check Auth & Admin Status
    if (!session) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const currentUser = await User.findById(session.userData._id);

    if (!currentUser || !currentUser.admin) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const { id } = await params;
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await req.json();

    // Validate request body
    const validation = adminUserUpdateSchema.validate(body);
    if (validation.error) {
      return NextResponse.json(
        { message: validation.error.details[0].message },
        { status: 400 },
      );
    }

    // Allow updating ONLY specific fields
    const { address, membership, admin, activated } = validation.value;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { address, membership, admin, activated } },
      { new: true, runValidators: true },
    );

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 },
    );
  },
);
