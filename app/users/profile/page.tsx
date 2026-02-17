import { getSession } from "@/lib/session";
import User from "@/database/user.model";
import { redirect } from "next/navigation";
import Link from "next/link";
import connectToDatabase from "@/lib/mongodb";

export default async function UserProfilePage() {
  await connectToDatabase();
  const session = await getSession();

  if (!session || !session.userData) {
    redirect("/login");
  }

  const user = await User.findById(session.userData._id).select("-password");

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">My Profile</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header / Basic Info */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.fname} {user.lname}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <Link
              href="/users/profile/edit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Personal Details
            </h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm text-gray-500">Phone</span>
                <p className="font-medium text-gray-800">
                  {user.phone || "Not provided"}
                </p>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Age Range</span>
                <p className="font-medium text-gray-800">
                  {user.age || "Not provided"}
                </p>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Membership</span>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mt-1">
                  {user.membership}
                </span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Address
            </h3>
            {user.address && (user.address.line1 || user.address.suburb) ? (
              <div className="space-y-1 text-gray-800">
                <p>{user.address.line1}</p>
                {user.address.line2 && <p>{user.address.line2}</p>}
                <p>
                  {user.address.suburb}, {user.address.state}{" "}
                  {user.address.postcode}
                </p>
                <p>{user.address.country}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No address saved.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
