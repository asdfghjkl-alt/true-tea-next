"use client";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { categorySchema } from "@/lib/schemas";
import { useState, ChangeEvent } from "react";
import InputField from "@/components/ui/inputs/InputField";
import TextArea from "@/components/ui/inputs/TextArea";
import api from "@/lib/axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { ICategory } from "@/database/category.model";

interface CategoryFormData {
  name: string;
  nameCN: string;
  url: string;
  catID: number;
  active: boolean;
  description: string;
  recWater: string;
  recTemp: string;
  recTime: string;
  recTimes: string;
}

interface CategoryFormProps {
  initialData?: ICategory;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: joiResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      nameCN: initialData?.nameCN || "",
      url: initialData?.url || "",
      catID: initialData?.catID || 0,
      active: initialData?.active ?? true,
      description: initialData?.description || "",
      recWater: initialData?.recWater || "",
      recTemp: initialData?.recTemp || "",
      recTime: initialData?.recTime || "",
      recTimes: initialData?.recTimes || "",
    },
    mode: "onTouched",
  });

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const onSubmit = async (data: CategoryFormData) => {
    if (!imageFile) {
      toast.error("Please upload an image for the category.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        // @ts-expect-error form data expects string key
        formData.append(key, data[key]);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let res;
      if (initialData) {
        res = await api.put(`/categories/${initialData._id}`, formData);
      } else {
        res = await api.post(`/categories`, formData);
      }

      toast.success(
        res.data.message ||
          `Category ${initialData ? "updated" : "created"} successfully!`,
      );
      router.push("/categories/manage");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            `Failed to ${initialData ? "update" : "create"} category`,
        );
      } else {
        toast.error(`Failed to ${initialData ? "update" : "create"} category`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-center text-2xl font-semibold">
            {initialData ? "Edit Category" : "Add New Category"}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Name Pair */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                name="name"
                label="Name"
                placeholder="Category Name"
                register={register}
                error={errors.name}
              />
              <InputField
                name="nameCN"
                label="Chinese Name"
                placeholder="Chinese Name"
                register={register}
                error={errors.nameCN}
              />
            </div>

            {/* ID & URL */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                name="catID"
                label="Category ID"
                type="number"
                placeholder="Unique ID"
                register={register}
                error={errors.catID}
              />
              <InputField
                name="url"
                label="URL"
                placeholder="/learn/..."
                register={register}
                error={errors.url}
              />
            </div>

            {/* Brewing Specs 1 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                name="recWater"
                label="Rec. Water"
                placeholder="e.g. 100°C"
                register={register}
                error={errors.recWater}
              />
              <InputField
                name="recTemp"
                label="Rec. Temp"
                placeholder="e.g. Boiling"
                register={register}
                error={errors.recTemp}
              />
            </div>

            {/* Brewing Specs 2 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                name="recTime"
                label="Rec. Time"
                placeholder="e.g. 10s"
                register={register}
                error={errors.recTime}
              />
              <InputField
                name="recTimes"
                label="Rec. Times"
                placeholder="e.g. 5-10 steeps"
                register={register}
                error={errors.recTimes}
              />
            </div>

            {/* Description */}
            <TextArea
              name="description"
              label="Description"
              placeholder="Category description..."
              register={register}
              error={errors.description}
              rows={3}
            />

            {/* Active Checkbox */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="active"
                {...register("active")}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="active"
                className="text-sm font-medium text-gray-700"
              >
                Active
              </label>
            </div>

            {/* Previous Image Display */}
            {initialData?.image?.url && (
              <div className="mb-4">
                <label className="block font-medium mb-2 text-sm text-gray-700">
                  Previous Image
                </label>
                <div className="relative h-64 w-full overflow-hidden rounded-xl border border-gray-100 shadow-lg bg-gray-50">
                  <Image
                    src={initialData.image.url}
                    alt="Current Category Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="block font-medium mb-2 text-sm text-gray-700">
                {initialData ? "New Category Image" : "Category Image"}
              </label>

              {!previewUrl ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={onFileChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Any type of image file accepted
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative h-64 w-full overflow-hidden rounded-xl border border-gray-100 shadow-lg">
                  <Image
                    src={previewUrl}
                    alt="Category Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 shadow-md hover:bg-white transiton-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-submit w-full"
            >
              {isSubmitting
                ? initialData
                  ? "Updating..."
                  : "Creating..."
                : initialData
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
