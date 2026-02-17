import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import ChangePasswordForm from "@/components/users/ChangePasswordForm";

export default async function ChangePasswordPage() {
  const session = await getSession();

  if (!session || !session.userData) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Change Password
        </h1>
        <ChangePasswordForm />
      </div>
    </main>
  );
}
