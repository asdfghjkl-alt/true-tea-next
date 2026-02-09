import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import CategoryForm from "@/components/categories/CategoryForm";
import connectToDatabase from "@/lib/mongodb";

export default async function AddCategoryPage() {
  const session = await getSession();

  // Redirects user to homepage if not logged in or not admin
  if (!session || !session.userData?._id || !session.userData.admin) {
    return notFound();
  }

  await connectToDatabase();

  return <CategoryForm />;
}
