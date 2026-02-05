import RegisterForm from "@/components/auth/RegisterForm";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register - True Tea",
  description: "Create a new account at True Tea",
};

export default async function RegisterPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <RegisterForm />;
}
