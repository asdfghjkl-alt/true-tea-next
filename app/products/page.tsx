import connectToDatabase from "@/lib/mongodb";
import Product, { IProductDB } from "@/database/product.model";
import Category, { ICategory } from "@/database/category.model";
import CategorySection from "@/components/products/CategorySection";
import ProductCard from "@/components/products/ProductCard";

import Image from "next/image";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  await connectToDatabase();
  const params = await searchParams;
  const categoryName = params.category;

  // Case 1: Filter by Category
  if (categoryName && typeof categoryName === "string") {
    // Case-insensitive search for category
    const category = (await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, "i") },
      active: true,
    })) as ICategory;

    // If category is not found, return customised not found page
    if (!category) {
      return (
        <main className="min-h-screen bg-teal-50 p-4 md:p-8 lg:p-12">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-emerald-800">
              Category Not Found
            </h1>
            <p className="text-gray-600">
              We couldn't find a category named "{categoryName}".
            </p>
          </div>
        </main>
      );
    }

    // Retrieves all products in the category
    const products = (await Product.find({
      categoryId: category._id,
      onShelf: true,
    }).sort({ seqNr: 1 })) as IProductDB[];

    // Returns the category page
    return (
      <main className="min-h-screen bg-teal-50 p-4 md:p-8 lg:p-12">
        <div className="mx-auto max-w-7xl">
          {/* Category Header */}
          <div className="mb-8 border-b border-emerald-100 pb-8">
            <div className="flex items-baseline gap-3">
              {/* Category Name */}
              <h1 className="text-3xl font-bold text-emerald-800">
                {category.name}
              </h1>

              {/* Category Name in Chinese */}
              <span className="text-2xl font-medium text-emerald-600">
                {category.nameCN}
              </span>
            </div>

            {/* Category Banner Image and Steeping Recommendation */}
            <div className="mt-6 flex flex-col gap-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Category Banner Image */}
                <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={
                      category.image.startsWith("/")
                        ? category.image
                        : `https://true-tea.com.au/${category.image}`
                    }
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Steeping Recommendation */}
                <div className="max-h-64 overflow-y-auto rounded-xl bg-white p-6 shadow-sm">
                  {/* Steeping Recommendation Heading */}
                  <h3 className="mb-4 text-lg font-bold text-emerald-800">
                    {category.name} Steeping (Brewing) Recommendation
                  </h3>

                  {/* Steeping Recommendation Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {/* Water Recommendation */}
                    <div>
                      <span className="block font-semibold text-gray-600">
                        Water
                      </span>
                      <span className="text-gray-800">
                        {category.recWater || "No indication given"}
                      </span>
                    </div>

                    {/* Temperature Recommendation */}
                    <div>
                      <span className="block font-semibold text-gray-600">
                        Temperature
                      </span>
                      <span className="text-gray-800">
                        {category.recTemp || "No indication given"}
                      </span>
                    </div>

                    {/* Time Recommendation */}
                    <div>
                      <span className="block font-semibold text-gray-600">
                        Time
                      </span>
                      <span className="text-gray-800">
                        {category.recTime || "No indication given"}
                      </span>
                    </div>

                    {/* Number of Times to Brew Recommendation */}
                    <div>
                      <span className="block font-semibold text-gray-600">
                        Number of Times to Brew
                      </span>
                      <span className="text-gray-800">
                        {category.recTimes || "No indication given"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Category Description */}
              <div className="max-h-64 overflow-y-auto rounded-xl bg-white p-6 shadow-sm">
                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                  {category.description}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <>
              {/* No Products Found Message */}
              <p className="text-gray-500">
                No products found in this category.
              </p>
            </>
          )}
        </div>
      </main>
    );
  }

  // Case 2: Show All Categories (Default)
  const categories = (await Category.find({ active: true }).sort({
    catID: 1,
  })) as ICategory[];
  const allProducts = (await Product.find({ onShelf: true }).sort({
    seqNr: 1,
  })) as IProductDB[];

  return (
    <main className="min-h-screen bg-teal-50 p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <h1 className="mb-8 text-3xl font-bold text-emerald-800">Our Teas</h1>
        <div className="flex flex-col gap-4">
          {/* Category Sections */}
          {categories.map((category) => {
            const categoryProducts = allProducts.filter(
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
