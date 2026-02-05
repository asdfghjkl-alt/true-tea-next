import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/database/product.model";
import { productSchema } from "@/lib/schemas";
import { uploadImages } from "@/lib/upload";
import { getSession } from "@/lib/session";
import User from "@/database/user.model";
import { apiHandler } from "@/lib/api-handler";

export const POST = apiHandler(async (req: Request) => {
  const session = await getSession();

  if (!session || !session.userData?._id) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  await connectToDatabase();
  const user = await User.findById(session.userData._id);

  if (!user || !user.admin) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const formData = await req.formData();

  // Extract fields and files
  const body: Record<string, any> = {};
  const images: File[] = [];

  formData.forEach((value, key) => {
    if (key === "images") {
      if (value instanceof File) {
        images.push(value);
      }
    } else {
      body[key] = value;
    }
  });

  // Validate request body
  const { error, value } = productSchema.validate(body, {
    abortEarly: false,
  });
  if (error) {
    return NextResponse.json(
      { message: "Validation error", details: error.details },
      { status: 400 },
    );
  }

  // Validate images
  const imageFiles = images.filter((file) => file.type.startsWith("image/"));
  if (imageFiles.length === 0) {
    return NextResponse.json(
      { message: "At least one valid image is required" },
      { status: 400 },
    );
  }

  if (imageFiles.length !== images.length) {
    return NextResponse.json(
      { message: "All files must be images" },
      { status: 400 },
    );
  }

  // Upload images
  const uploadedImages = await uploadImages(imageFiles);

  await connectToDatabase();

  // Create product
  const newProduct = await Product.create({
    ...value,
    images: uploadedImages,
  });

  return NextResponse.json(
    { message: "Product created successfully", product: newProduct },
    { status: 201 },
  );
});
