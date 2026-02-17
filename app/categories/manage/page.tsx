import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import { Category, ICategory } from "@/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryGridItem from "@/components/categories/admin/CategoryGridItem";

export default async function ManageCategoriesPage() {
  const session = await getSession();

  if (!session || !session.userData?.admin) {
    notFound();
  }

  await connectToDatabase();
  const categories = await Category.find().sort({ catID: 1 }).lean();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
        <Link href="/categories/add" className="btn btn-submit">
          Add Category
        </Link>
      </div>

      {/* Categories Grid View (Single Column for all screens) */}
      <div className="grid grid-cols-1 gap-6">
        {categories.map((category: ICategory) => (
          <CategoryGridItem key={category._id.toString()} category={category} />
        ))}
      </div>
    </div>
  );
}
