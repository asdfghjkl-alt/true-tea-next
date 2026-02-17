import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { IUser } from "@/database";

interface UserGridItemProps {
  user: IUser;
}

export default function UserGridItem({ user }: UserGridItemProps) {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
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
  );
}
