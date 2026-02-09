"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { AxiosError } from "axios";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export default function DeleteCategoryButton({
  categoryId,
}: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      await api.delete(`/categories/${categoryId}`);
      toast.success("Category deleted successfully");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to delete category",
        );
      } else {
        toast.error("Failed to delete category");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn btn-delete"
      title="Delete Category"
    >
      {isDeleting && (
        <span className="inline-block h-4 w-4 mr-2 align-middle animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      Delete
    </button>
  );
}
