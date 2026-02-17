import Link from "next/link";
import Image from "next/image";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import DeleteCategoryButton from "@/components/categories/DeleteCategoryButton";
import { ICategory } from "@/database";

interface CategoryGridItemProps {
  category: ICategory;
}

export default function CategoryGridItem({ category }: CategoryGridItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow md:flex-row md:items-start">
      {/* Image Section */}
      <div className="shrink-0">
        {category.image ? (
          <div className="relative h-24 w-24 overflow-hidden rounded-md bg-gray-100">
            <Image
              src={category.image.url}
              alt={category.name}
              fill
              sizes="100px" // Adjusted size since it's small
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-md bg-gray-200"></div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.nameCN}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-500">
              ID: {category.catID}
            </span>

            {/* Shows active status */}
            {category.active ? (
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                <CheckCircleIcon className="h-3 w-3" /> Active
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
                <XCircleIcon className="h-3 w-3" /> Inactive
              </span>
            )}
          </div>
        </div>

        {/* URL */}
        <div className="text-sm text-gray-600">
          <span className="font-semibold">URL:</span> {category.url}
        </div>

        {/* Description */}
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Description:</span>{" "}
          {category.description
            ? category.description.length > 500
              ? `${category.description.substring(0, 500)}...`
              : category.description
            : "-"}
        </div>

        {/* Brewing Recommendations */}
        <div className="mt-2 rounded-md bg-gray-50 p-3 text-sm">
          <div className="mb-2 font-semibold text-gray-700">
            Brewing Recommendations:
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
            {/* Water */}
            <div>
              <span className="text-gray-500">Water:</span>{" "}
              {category.recWater || "-"}
            </div>

            {/* Temp */}
            <div>
              <span className="text-gray-500">Temp:</span>{" "}
              {category.recTemp || "-"}
            </div>

            {/* Time */}
            <div>
              <span className="text-gray-500">Time:</span>{" "}
              {category.recTime || "-"}
            </div>

            {/* Times */}
            <div>
              <span className="text-gray-500">Times:</span>{" "}
              {category.recTimes || "-"}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Link
            href={`/categories/edit/${category._id}`}
            className="btn btn-edit"
          >
            Edit Category
          </Link>
          <DeleteCategoryButton categoryId={category._id.toString()} />
        </div>
      </div>
    </div>
  );
}
