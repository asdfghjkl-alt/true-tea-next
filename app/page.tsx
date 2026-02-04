import connectToDatabase from "@/lib/mongodb";
import Product from "@/database/product.model";
import Category from "@/database/category.model";
import CategorySection from "@/components/products/CategorySection";
import { IProductDB } from "@/database/product.model";
import { ICategory } from "@/database/category.model";

export default async function Home() {
  await connectToDatabase();
  const categories = (await Category.find({ active: true }).sort({
    catID: 1,
  })) as ICategory[];
  const products = (await Product.find({ onShelf: true })) as IProductDB[];

  return (
    <main className="min-h-screen bg-teal-50 p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-emerald-800">Our Teas</h1>
        <div className="flex flex-col gap-4">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (p) => p.categoryId?.toString() === category._id.toString(),
            );
            return (
              <CategorySection
                key={category._id}
                category={category}
                products={categoryProducts}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
