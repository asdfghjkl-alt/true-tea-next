import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { IUser } from "@/database/user.model";

interface UserRowProps {
  user: IUser;
}

export default function UserRow({ user }: UserRowProps) {
  return (
    <tr className="hover:bg-gray-50">
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
  );
}
