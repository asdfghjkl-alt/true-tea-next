import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { getSession } from "@/lib/session";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongodb";

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

    // Allow updating ONLY specific fields
    const { address, membership, admin, activated } = body;

    // Correctly handle boolean values that might be missing or explicitly false
    // and complex objects like address.
    const updateData: Record<string, any> = {};

    updateData.address = address;
    updateData.membership = membership;
    updateData.admin = admin;
    updateData.activated = activated;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 },
    );
  },
);
