import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import { Category, ICategory } from "@/database";
import { notFound, redirect } from "next/navigation";
import CategoryForm from "@/components/categories/CategoryForm";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const session = await getSession();

  if (!session || !session.userData?.admin) {
    redirect("/");
  }

  const { id } = await params;

  await connectToDatabase();
  const category = await Category.findById(id);

  if (!category) {
    notFound();
  }

  const serialisedCategory = JSON.parse(JSON.stringify(category));

  return <CategoryForm initialData={serialisedCategory} />;
}
