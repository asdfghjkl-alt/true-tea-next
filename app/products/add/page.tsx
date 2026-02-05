import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import ProductForm from "@/components/products/ProductForm";

import connectToDatabase from "@/lib/mongodb";
import Category from "@/database/category.model";

export default async function AddProductPage() {
  const session = await getSession();

  // Redirects user to homepage if not logged in or not admin
  if (!session || !session.userData?._id || !session.userData.admin) {
    return notFound();
  }

  await connectToDatabase();

  // Retrieves all categories and sorts them by name
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  const categoryNames = categories.map((c) => c.name);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <ProductForm categories={categoryNames} />
      </div>
    </div>
  );
}
