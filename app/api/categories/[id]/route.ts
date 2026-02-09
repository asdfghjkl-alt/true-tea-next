import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { getSession } from "@/lib/session";
import { categorySchema } from "@/lib/schemas";
import { uploadImages, deleteImages } from "@/lib/upload";
import User from "@/database/user.model";
import Category from "@/database/category.model";
import connectToDatabase from "@/lib/mongodb";

export const PUT = apiHandler(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    await connectToDatabase();
    const session = await getSession();

    // Check Auth & Admin Status
    if (!session) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const user = await User.findById(session.userData._id);

    if (!user || !user.admin) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const { id } = await params;
    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    const formData = await req.formData();

    // Extract fields
    const imageFile = formData.get("image");
    const body: Record<string, unknown> = {};

    formData.forEach((value, key) => {
      if (key !== "image") {
        body[key] = value;
      }
    });

    // Validate body with Joi schema
    const { error, value: validatedBody } = categorySchema.validate(body);
    if (error) {
      throw { name: "ValidationError", errors: error.details };
    }

    let uploadedImage = existingCategory.image;

    // Handle Image Upload if provided
    if (imageFile && imageFile instanceof File) {
      // Validates that file uploaded is an image
      if (!imageFile.type.startsWith("image/")) {
        throw { statusCode: 400, message: "File must be an image" };
      }

      // Upload new image
      const uploadedImages = await uploadImages(
        [imageFile],
        "True Tea/Categories",
      );
      if (!uploadedImages || uploadedImages.length === 0) {
        throw { statusCode: 500, message: "Image upload failed" };
      }
      uploadedImage = uploadedImages[0];

      // Delete old image if it exists and has a filename (public_id)
      if (existingCategory.image && existingCategory.image.filename) {
        await deleteImages([existingCategory.image.filename]);
      }
    }

    // Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        ...validatedBody,
        image: uploadedImage,
      },
      { new: true, runValidators: true },
    );

    return NextResponse.json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  },
);

export const DELETE = apiHandler(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    await connectToDatabase();
    const session = await getSession();

    // Check Auth & Admin Status
    if (!session) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const user = await User.findById(session.userData._id);

    if (!user || !user.admin) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const { id } = await params;
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    // Delete image from Cloudinary if exists
    if (category.image && category.image.filename) {
      await deleteImages([category.image.filename]);
    }

    // Delete category from DB
    await Category.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 },
    );
  },
);
