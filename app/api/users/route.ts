import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import User from "@/database/user.model";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async (req: NextRequest) => {
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

  // Fetch all users with specific fields
  const users = await User.find(
    {},
    "admin activated fname lname age email phone address membership",
  );

  return NextResponse.json(
    { message: "Successfully retrieved all user information", users },
    { status: 200 },
  );
});
