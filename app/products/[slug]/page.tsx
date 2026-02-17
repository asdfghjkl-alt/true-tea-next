import connectToDatabase from "@/lib/mongodb";
import Product from "@/database/product.model";
import ImageCarousel from "@/components/products/ImageCarousel";
import { IImage } from "@/database/image.model";
import { notFound } from "next/navigation";
import { IProduct } from "@/database/product.model";
import QuantityControl from "@/components/ui/QuantityControl";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  await connectToDatabase();
  const product = JSON.parse(
    JSON.stringify(
      await Product.findOne({
        slug: slug,
        onShelf: true,
      }),
    ),
  ) as IProduct;

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

  const isOutOfStock = product.stock <= 0;

  return (
    <main className="min-h-screen bg-teal-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Product Name */}
        <h1 className="mb-8 text-center text-4xl font-bold text-emerald-800">
          {product.name} ({product.nameCN})
        </h1>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Product Images */}
          {/* Left Column: Product Images */}
          <div className="relative rounded-xl overflow-hidden">
            {/* Badge for Discount */}
            {!isOutOfStock && product.discount > 0 && (
              <>
                {/* Shows badge on top left of the screen */}
                <div className="absolute left-2 top-2 z-10 rounded-full bg-rose-500 px-3 py-1 text-md font-bold text-white shadow-sm">
                  {product.discount}% OFF
                </div>
              </>
            )}

            <div>
              <ImageCarousel
                images={productImages}
                isOutOfStock={isOutOfStock}
              />
            </div>
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
                <span
                  className={`text-lg font-medium text-gray-500 ${isOutOfStock ? "opacity-50" : ""}`}
                >
                  Price
                </span>
                <span
                  className={`text-black text-right ${isOutOfStock ? "opacity-50" : ""}`}
                >
                  {product.discount > 0 ? (
                    <>
                      {/* Shows price after discount (estimated) */}
                      <span className="text-lg font-bold text-emerald-600">
                        $
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2,
                        )}
                      </span>{" "}
                      {/* Shows original price (strikethrough) */}
                      <span className="text-sm text-gray-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-emerald-600">
                      ${product.price.toFixed(2)}
                    </span>
                  )}{" "}
                  / {product.unit}
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

            <div className="mt-auto">
              {isOutOfStock ? (
                <button
                  disabled
                  className="w-full py-3 bg-gray-100 text-gray-400 rounded-lg text-lg font-bold border-2 border-gray-200 cursor-not-allowed"
                >
                  Out of Stock
                </button>
              ) : (
                <QuantityControl product={product} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
