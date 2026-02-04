import LoginForm from "@/components/auth/LoginForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
