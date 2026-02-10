import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import User, { IUser } from "@/database/user.model";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

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
              <tr key={user._id.toString()} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {user.fname} {user.lname}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-gray-600">{user.phone || "-"}</td>
                <td className="px-4 py-3 text-gray-600">{user.age || "-"}</td>
                <td className="px-4 py-3 text-gray-600">
                  {user.address
                    ? `${user.address.line1 || ""} ${user.address.line2 || ""} ${user.address.suburb || ""} ${user.address.state || ""} ${user.address.postcode || ""}`
                    : "-"}
                </td>
                <td className="px-4 py-3 text-center text-gray-600 capitalize">
                  {user.membership || "None"}
                </td>
                <td className="px-4 py-3 text-center">
                  {user.admin ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                      Admin
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {user.activated ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                      <CheckCircleIcon className="h-3 w-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
                      <XCircleIcon className="h-3 w-3" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/users/edit/${user._id.toString()}`}
                    className="btn btn-edit inline-block"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medium/Small Screen: Grid View */}
      {/* Grid: 1 col on small, 3 cols on medium+ */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
        {users.map((user) => (
          <div
            key={user._id.toString()}
            className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {user.fname} {user.lname}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {user.admin && (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                    Admin
                  </span>
                )}
                {user.activated ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                    <CheckCircleIcon className="h-3 w-3" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
                    <XCircleIcon className="h-3 w-3" /> Inactive
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span>{user.phone || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Age:</span>
                <span>{user.age || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Membership:</span>
                <span className="capitalize">{user.membership || "None"}</span>
              </div>
              <div>
                <span className="block font-semibold mb-1">Address:</span>
                <span className="block text-gray-500">
                  {user.address
                    ? `${user.address.line1 || ""} ${user.address.line2 || ""} ${user.address.suburb || ""} ${user.address.state || ""} ${user.address.postcode || ""}`
                    : "No address provided"}
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  href={`/users/edit/${user._id.toString()}`}
                  className="btn btn-edit inline-block"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
