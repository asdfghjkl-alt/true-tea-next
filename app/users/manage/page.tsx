import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/database";
import { notFound } from "next/navigation";
import UserRow from "@/components/users/admin/UserRow";
import UserGridItem from "@/components/users/admin/UserGridItem";

export default async function ManageUsersPage() {
  const session = await getSession();

  if (!session || !session.userData?.admin) {
    notFound();
  }

  await connectToDatabase();
  // Fetch users with specific fields
  const users = await User.find(
    {},
    "admin activated fname lname age email phone address membership",
  ).lean();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
      </div>

      {/* Large Screen: Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Age
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Address
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                Membership
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                Admin
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <UserRow key={user._id.toString()} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Medium/Small Screen: Grid View */}
      {/* Grid: 1 col on small, 3 cols on medium+ */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
        {users.map((user) => (
          <UserGridItem key={user._id.toString()} user={user} />
        ))}
      </div>
    </div>
  );
}
