import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import ProductForm from "@/components/products/ProductForm";

export default async function AddProductPage() {
  const session = await getSession();

  if (!session || !session.userData?._id || !session.userData.admin) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <ProductForm />
      </div>
    </div>
  );
}
