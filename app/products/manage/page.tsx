import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import Link from "next/link";
import Product, { IProduct } from "@/database/product.model";
import Category from "@/database/category.model";
import connectToDatabase from "@/lib/mongodb";
import ProductRow from "@/components/products/ProductRow";
import ProductGridItem from "@/components/products/ProductGridItem";

async function getProducts() {
  await connectToDatabase();

  // Finds products and populates the name field from the categoryId
  const products = await Product.find().sort({ seqNr: 1 }).populate({
    path: "categoryId",
    select: "name",
    model: Category,
  });

  return JSON.parse(JSON.stringify(products));
}

export default async function ManageProductsPage() {
  const session = await getSession();

  // If user is not logged in or not an admin, redirect to 404
  if (!session || !session.userData?.admin) {
    notFound();
  }

  // Gets products
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>

        {/* Add Product Button */}
        <Link
          href="/products/add"
          className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
        >
          Add Product
        </Link>
      </div>

      {/* Large Screen: Table View */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Seq
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Image
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Price
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Stock
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                On Shelf
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                GST
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                Discount
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Product Rows */}
            {products.map((product: IProduct) => (
              <ProductRow key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Medium/Small Screen: Grid View */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:hidden">
        {/* Product Grid Items */}
        {products.map((product: IProduct) => (
          <ProductGridItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
