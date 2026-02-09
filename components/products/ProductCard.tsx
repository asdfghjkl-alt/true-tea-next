import Image from "next/image";
import { IProductDB } from "@/database/product.model";
import Link from "next/link";

interface ProductCardProps {
  product: IProductDB;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageSrc = product.images[0].url;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <div className="flex h-full flex-col gap-2 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
          {/* Display image */}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
          {/* Badge for Discount */}
          {product.discount > 0 && (
            <>
              {/* Shows badge on top left of the screen */}
              <div className="absolute left-2 top-2 z-10 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                {product.discount}% OFF
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-1">
          {/* Display price and unit */}
          <div className="flex items-baseline gap-2">
            {product.discount > 0 ? (
              <>
                {/* Shows price after discount (estimated) */}
                <span className="text-lg font-bold text-emerald-600">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>

                {/* Shows original price (strikethrough) */}
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-emerald-600">
                ${product.price.toFixed(2)}
              </span>
            )}
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>

          {/* Display product name */}
          <div>
            {/* Product name in English */}
            <h3 className="text-base font-semibold text-gray-800">
              {product.name}
            </h3>

            {/* Product name in Chinese */}
            <p className="text-sm text-gray-500">{product.nameCN}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
