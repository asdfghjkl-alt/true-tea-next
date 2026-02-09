import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { IProduct } from "@/database/product.model";
import DeleteProductButton from "./DeleteProductButton";

interface ProductGridItemProps {
  product: IProduct;
}

export default function ProductGridItem({ product }: ProductGridItemProps) {
  // Constructs image URL based on if the image is a string or an object
  const imageUrl =
    product.images && product.images.length > 0
      ? typeof product.images[0] === "string"
        ? `https://true-tea.com.au/${product.images[0]}`
        : product.images[0].url
      : null;

  return (
    <div className="flex flex-col rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Image */}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name}
              width={48}
              height={48}
              className="h-12 w-12 object-cover rounded"
            />
          )}
          {/* Names */}
          <div>
            {/* English Name */}
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>

            {/* Chinese Name */}
            <p className="text-sm text-gray-500">{product.nameCN}</p>
          </div>
        </div>
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
          {/* Sequence Number */}#{product.seqNr}
        </span>
      </div>

      <div className="mb-4 space-y-2 text-sm text-gray-600">
        {/* Category */}
        <div className="flex justify-between">
          <span>Category:</span>
          <span className="font-medium">
            {product.categoryId?.name || "N/A"}
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-medium">
            ${product.price.toFixed(2)} / {product.unit}
          </span>
        </div>

        {/* Stock */}
        <div className="flex justify-between">
          <span>Stock:</span>
          <span className="font-medium">{product.stock}</span>
        </div>

        {/* On Shelf */}
        <div className="flex justify-between gap-2 items-center">
          <span className="whitespace-nowrap">Status:</span>
          {product.onShelf ? (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              {/* Icon to indicate active */}
              <CheckCircleIcon className="h-3 w-3" /> Active
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
              {/* Icon to indicate inactive */}
              <XCircleIcon className="h-3 w-3" /> Inactive
            </span>
          )}
        </div>

        {/* Include GST */}
        <div className="flex justify-between gap-2 items-center">
          <span className="whitespace-nowrap">Include GST:</span>
          <input
            type="checkbox"
            checked={product.includeGST}
            disabled
            className="h-4 w-4 rounded border-gray-300 text-green-600"
          />
        </div>

        {/* Discount */}
        <div className="flex justify-between">
          <span>Discount:</span>
          <span className="font-medium">
            {product.discount > 0 ? `${product.discount}%` : "-"}
          </span>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-auto flex justify-end gap-2">
        <Link
          href={`/products/edit/${product._id}`}
          className="btn btn-edit inline-block"
        >
          Edit
        </Link>
        <DeleteProductButton productId={product._id} />
      </div>
    </div>
  );
}
