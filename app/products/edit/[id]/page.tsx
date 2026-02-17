import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import ProductForm from "@/components/products/admin/ProductForm";

import connectToDatabase from "@/lib/mongodb";
import { Category, Product } from "@/database";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  // Redirects user to homepage if not logged in or not admin
  if (!session || !session.userData?._id || !session.userData.admin) {
    return notFound();
  }

  await connectToDatabase();

  // Retrieves all categories and sorts them by name
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  const categoryNames = categories.map((c) => c.name);

  const product = await Product.findById(id).populate("categoryId").lean();

  if (!product) {
    return notFound();
  }

  const serialisedProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <ProductForm categories={categoryNames} product={serialisedProduct} />
      </div>
    </div>
  );
}
