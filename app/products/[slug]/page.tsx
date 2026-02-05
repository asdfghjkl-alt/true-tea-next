import connectToDatabase from "@/lib/mongodb";
import Product, { IImage } from "@/database/product.model";
import ImageCarousel from "@/components/products/ImageCarousel";
import { notFound } from "next/navigation";
import { IProductDB } from "@/database/product.model";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  await connectToDatabase();
  const product = (await Product.findOne({ slug: slug })) as IProductDB;

  if (!product) {
    notFound();
  }

  // Use product images if available, otherwise fallback to temp
  const rawImages =
    product.images && product.images.length > 0
      ? product.images
      : ["/temp.jpeg"];

  const productImages = rawImages.map((image) =>
    typeof image === "string" && image.startsWith("uploads")
      ? `https://true-tea.com.au/${image}`
      : (image as IImage).url,
  );

  return (
    <main className="min-h-screen bg-teal-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Product Name */}
        <h1 className="mb-8 text-center text-4xl font-bold text-emerald-800">
          {product.name} ({product.nameCN})
        </h1>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Product Images */}
          <div>
            <ImageCarousel images={productImages} />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="space-y-4">
              {/* Product Region */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-lg font-medium text-gray-500">
                  Region
                </span>
                <span className="text-xl font-semibold text-gray-800 text-right">
                  {product.region}
                </span>
              </div>

              {/* Product Year */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-lg font-medium text-gray-500">Year</span>
                <span className="text-xl font-semibold text-gray-800 text-right">
                  {product.year}
                </span>
              </div>

              {/* Product Price */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-lg font-medium text-gray-500">Price</span>
                <span className="text-2xl font-bold text-emerald-600 text-right">
                  ${product.price} / {product.unit}
                </span>
              </div>
            </div>

            {/* Product Note */}
            <div className="mt-2">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Note:
              </h3>
              <p className="leading-relaxed text-gray-600">{product.note}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
