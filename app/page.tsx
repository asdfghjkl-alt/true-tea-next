import connectToDatabase from "@/lib/mongodb";
import { Product, Category, IProduct, ICategory } from "@/database";
import CategorySection from "@/components/products/CategorySection";

export default async function Home() {
  await connectToDatabase();
  const categories = (await Category.find({ active: true }).sort({
    catID: 1,
  })) as ICategory[];
  const products = JSON.parse(
    JSON.stringify(await Product.find({ onShelf: true })),
  ) as IProduct[];

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
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
