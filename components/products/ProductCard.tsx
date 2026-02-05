import Image from "next/image";
import { IProductDB } from "@/database/product.model";
import Link from "next/link";

interface ProductCardProps {
  product: IProductDB;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageSrc =
    product.images && product.images.length > 0
      ? typeof product.images[0] === "string"
        ? product.images[0].startsWith("uploads")
          ? `https://true-tea.com.au/${product.images[0]}`
          : product.images[0]
        : product.images[0].url
      : "/placeholder-image.png"; // Replace with your placeholder path or logic

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <div className="flex h-full flex-col gap-2 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg font-bold text-emerald-600">
            ${product.price} / {product.unit}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.nameCN}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
