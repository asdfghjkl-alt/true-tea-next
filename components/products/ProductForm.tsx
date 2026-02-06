"use client";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { productSchema } from "@/lib/schemas";
import { useState, useEffect, memo, forwardRef } from "react";
import InputField from "@/components/ui/inputs/InputField";
import TextArea from "@/components/ui/inputs/TextArea";
import api from "@/lib/axios";
import { toast } from "react-hot-toast";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { IProduct, ProductFormData } from "@/database/product.model";
import { redirect, useRouter } from "next/navigation";

/* 
  Pure presentation component for the image card
  Uses memo to prevent constant image refreshes
*/
const ImageCard = memo(
  forwardRef<
    HTMLDivElement,
    {
      image: { url?: string; file?: File }; // Accept generic image object
      onRemove?: (id: string) => void;
      id: string;
      isOverlay?: boolean;
      style?: React.CSSProperties;
      [key: string]: any;
    }
  >(({ image, onRemove, id, isOverlay, style, ...props }, ref) => {
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
      // Use URL if available
      if (image.url) {
        setPreview(image.url);
      } else if (image.file) {
        // Fallback to creating object URL if only file is present (legacy/safety)
        const objectUrl = URL.createObjectURL(image.file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }, [image]);

    return (
      <div
        ref={ref}
        style={{
          ...style,
          touchAction: "none", // Prevent native scrolling while dragging
        }}
        {...props}
        className={`relative aspect-square w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50 hover:shadow-md cursor-grab active:cursor-grabbing ${
          isOverlay ? "shadow-xl ring-2 ring-emerald-500 scale-105 z-50" : ""
        }`}
      >
        {/* Image preview */}
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            draggable={false}
          />
        )}

        {/* Remove button */}
        {!isOverlay && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove(id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute right-1 top-1 rounded-full bg-white/80 p-1 text-gray-600 hover:bg-red-100 hover:text-red-500 shadow-sm transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }),
);
ImageCard.displayName = "ImageCard";

// Wrapper for individual sortable image item
const SortableImage = memo(function SortableImage({
  id,
  image,
  onRemove,
}: {
  id: string;
  image: { url?: string; file?: File };
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1, // Dim the original item while dragging
  };

  return (
    <ImageCard
      ref={setNodeRef}
      id={id}
      image={image}
      onRemove={onRemove}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
});

export default function ProductForm({
  categories = [],
  product,
}: {
  categories?: string[];
  product?: IProduct;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: joiResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      nameCN: product?.nameCN || "",
      category: product?.categoryId.name || "",
      seqNr: product?.seqNr || 0,
      price: product?.price || 0,
      discount: product?.discount || 0,
      includeGST: product?.includeGST ?? true,
      unit: product?.unit || "",
      stock: product?.stock || 0,
      onShelf: product?.onShelf ?? true,
      region: product?.region || "",
      year: product?.year || "",
      note: product?.note || "",
    },
    mode: "onTouched",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Store files with unique IDs for dnd-kit
  // Unified image state for both existing and new images
  const [images, setImages] = useState<
    { id: string; file?: File; url?: string; isExisting: boolean }[]
  >([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter();

  // Initialize images from product prop
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const initialImages = product.images.map((img) => {
        return {
          id: uuidv4(), // Generate a unique ID for dnd-kit
          url: img.url,
          originalUrl: img.url, // Keep original relative path for backend
          isExisting: true,
        };
      });
      setImages(initialImages);
    }
  }, [product]);

  // Setup sensors for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handles file selection
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: uuidv4(),
        file,
        url: URL.createObjectURL(file), // Create preview URL
        isExisting: false,
      }));
      // Adds new files to the images state
      setImages((prev) => [...prev, ...newFiles]);
      // Resets input value to allow selecting same files again if needed
      e.target.value = "";
    }
  };

  // Handles drag end event on image
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handles remove image event
  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  // Handles form submission
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      // Appends data from form to new FormData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Handle Image Logic based on mode
      if (product) {
        // EDIT MODE: Send new files + order instructions
        const newFiles: File[] = [];
        const order: string[] = [];

        images.forEach((img) => {
          if (img.file) {
            // It's a new file
            newFiles.push(img.file);
            // Marker for backend to grab the file at specific index
            order.push(`new:${newFiles.length - 1}`);
          } else {
            // It's an existing image, send the ORIGINAL relative URL (or full URL if stored that way)
            // We stored 'originalUrl' in state for this exact purpose
            // @ts-ignore
            order.push(img.originalUrl || img.url);
          }
        });

        // Append new files
        newFiles.forEach((file) => {
          formData.append("images", file);
        });
        // Append order
        formData.append("imageOrder", JSON.stringify(order));

        // PUT request
        const res = await api.put(`/products/${product._id}`, formData);
        toast.success(res.data.message || "Product updated successfully!");
      } else {
        // CREATE MODE: Just append all files
        images.forEach((item) => {
          if (item.file) {
            formData.append("images", item.file);
          }
        });

        // POST request
        const res = await api.post("/products", formData);
        toast.success(res.data.message || "Product created successfully!");
        reset();
        setImages([]);
      }
      router.push("/products/manage");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to save product";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <h3 className="mb-6 text-center text-2xl font-semibold">
        {product ? "Edit Product" : "Add New Product"}
      </h3>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit, (e) => console.log("Form Errors:", e))}
        className="space-y-4"
        noValidate
      >
        {/* Name and Chinese Name */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            name="name"
            label="Name"
            placeholder="Product Name"
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Category Select */}
          <div className="text-left">
            <label className="font-medium mb-1 block">Category</label>
            <select
              {...register("category")}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="text-red-500 h-5 text-sm mt-1">
              {errors.category && <span>{errors.category.message}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Price */}
          <InputField
            name="price"
            label="Price"
            type="number"
            placeholder="0.00"
            register={register}
            error={errors.price}
            min={0}
          />

          {/* Stock */}
          <InputField
            name="stock"
            label="Stock"
            type="number"
            placeholder="0"
            register={register}
            error={errors.stock}
            min={0}
          />

          {/* Unit quantity of product sold */}
          <InputField
            name="unit"
            label="Unit"
            placeholder="e.g. 1 cake, 50g"
            register={register}
            error={errors.unit}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Discount applied */}
          <InputField
            name="discount"
            label="Discount (%)"
            type="number"
            placeholder="0"
            register={register}
            error={errors.discount}
            min={0}
            max={100}
          />

          {/* Sequence number for product display */}
          <InputField
            name="seqNr"
            label="Sequence Number"
            type="number"
            placeholder="Order priority"
            register={register}
            error={errors.seqNr}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Product includes GST */}
          <div className="flex items-center gap-2 mt-8">
            <input
              type="checkbox"
              id="includeGST"
              {...register("includeGST")}
              className="w-4 h-4"
            />
            <label htmlFor="includeGST">Include GST</label>
          </div>

          {/* Product is on shelf */}
          <div className="flex items-center gap-2 mt-8">
            <input
              type="checkbox"
              id="onShelf"
              {...register("onShelf")}
              className="w-4 h-4"
            />
            <label htmlFor="onShelf">On Shelf</label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Origin Region */}
          <InputField
            name="region"
            label="Region"
            placeholder="Origin Region"
            register={register}
            error={errors.region}
          />

          {/* Harvest Year */}
          <InputField
            name="year"
            label="Year"
            placeholder="Harvest Year"
            register={register}
            error={errors.year}
          />
        </div>

        {/* Additional notes */}
        <TextArea
          name="note"
          label="Note"
          placeholder="Additional notes..."
          register={register}
          error={errors.note}
          rows={4}
        />

        {/* Images */}
        <div>
          <label className="block font-medium mb-2">Images</label>

          {/* Image upload */}
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Select Images
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
            {images.length === 0 && (
              <span className="ml-3 text-sm text-gray-500">
                No images selected
              </span>
            )}
          </div>

          {/* Display images that are added (draggable to reorder) */}
          {images.length > 0 && (
            <div className="rounded-lg border border-gray-200 p-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={(event) => setActiveId(event.active.id as string)}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={images.map((img) => img.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((img) => (
                      <SortableImage
                        key={img.id}
                        id={img.id}
                        image={img}
                        onRemove={handleRemoveImage}
                      />
                    ))}
                  </div>
                </SortableContext>
                <DragOverlay>
                  {activeId ? (
                    <ImageCard
                      id={activeId}
                      image={images.find((img) => img.id === activeId)!}
                      isOverlay
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-submit w-full mt-6"
        >
          {isSubmitting
            ? product
              ? "Updating..."
              : "Creating..."
            : product
              ? "Update Product"
              : "Create Product"}
        </button>
      </form>
    </div>
  );
}
