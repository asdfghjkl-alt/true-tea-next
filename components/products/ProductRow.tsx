import { IProduct } from "@/database/product.model";
import Image from "next/image";
import Link from "next/link";

interface ProductRowProps {
  product: IProduct;
}

export default function ProductRow({ product }: ProductRowProps) {
  // Constructs image URL based on if the image is a string or an object
  const imageUrl =
    product.images && product.images.length > 0
      ? typeof product.images[0] === "string"
        ? `https://true-tea.com.au/${product.images[0]}`
        : product.images[0].url
      : null;

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">{product.seqNr}</td>
      <td className="px-4 py-3">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.name}
            width={40}
            height={40}
            className="h-10 w-10 object-cover rounded"
          />
        )}
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{product.name}</div>
        <div className="text-xs text-gray-500">{product.nameCN}</div>
      </td>
      <td className="px-4 py-3 text-gray-600">
        {product.categoryId?.name || "N/A"}
      </td>
      <td className="px-4 py-3 text-gray-700">
        ${product.price.toFixed(2)} / {product.unit}
      </td>
      <td className="px-4 py-3 text-gray-700">{product.stock}</td>
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={product.onShelf}
          disabled
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
      </td>
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={product.includeGST}
          disabled
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
      </td>
      <td className="px-4 py-3 text-center text-gray-600">
        {product.discount > 0 ? `${product.discount}%` : "-"}
      </td>
      <td className="px-4 py-3 text-center">
        <Link
          href={`/products/edit/${product._id}`}
          className="btn btn-edit inline-block"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
