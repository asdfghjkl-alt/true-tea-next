import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import User, { IUser } from "@/database/user.model";
import { notFound } from "next/navigation";
import UserForm from "@/components/users/UserForm";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: PageProps) {
  const session = await getSession();

  if (!session || !session.userData?.admin) {
    notFound();
  }

  const { id } = await params;

  await connectToDatabase();
  const user = (await User.findById(id).lean()) as IUser | null;

  if (!user) {
    notFound();
  }

  // Serialize user object if needed
  const serializedUser = {
    ...user,
    _id: user._id.toString(),
  } as unknown as IUser;

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 w-full max-w-2xl">
        Edit User
      </h1>
      <UserForm initialData={serializedUser} />
    </div>
  );
}
