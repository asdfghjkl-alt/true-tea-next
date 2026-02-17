import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import { User, IUser } from "@/database";
import ProfileForm from "@/components/users/ProfileForm";

export default async function EditProfilePage() {
  await connectToDatabase();
  const session = await getSession();

  if (!session || !session.userData) {
    redirect("/login");
  }

  const user = await User.findById(session.userData._id)
    .select("-password")
    .lean();

  if (!user) {
    redirect("/login");
  }

  // Convert _id and dates to string to pass to client component
  const serializedUser: IUser = JSON.parse(JSON.stringify(user));

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>
        <ProfileForm user={serializedUser} />
      </div>
    </main>
  );
}
