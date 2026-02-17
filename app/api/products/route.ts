import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Product, User, Category } from "@/database";
import { productSchema } from "@/lib/schemas";
import { uploadImages } from "@/lib/upload";
import { getSession } from "@/lib/session";
import { apiHandler } from "@/lib/api-handler";

export const POST = apiHandler(async (req: Request) => {
  // Attempts to get the user session
  const session = await getSession();

  // Returns generic 404 error if no session is found
  if (!session || !session.userData?._id) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  await connectToDatabase();

  /*
   For extra security, the user is found on making requests,
   rather than relying on session data
  */
  const user = await User.findById(session.userData._id);

  // Returns generic 404 error if no user is found or user is not an admin
  if (!user || !user.admin) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  // Extracts fields and files from the request (multipart form data)
  const formData = await req.formData();

  // Extracts fields and files
  const body: Record<string, unknown> = {};
  const images: File[] = [];

  // Extracts JSON body and images separately from the request form data
  formData.forEach((value, key) => {
    if (key === "images") {
      if (value instanceof File) {
        images.push(value);
      }
    } else {
      body[key] = value;
    }
  });

  // Validates the request body with the schema
  const { error, value: validatedData } = productSchema.validate(body, {
    abortEarly: false,
  });

  // Returns error if validation fails
  if (error) {
    return NextResponse.json(
      { message: "Validation error", details: error.details },
      { status: 400 },
    );
  }

  // Validates that at least one valid image is provided
  const imageFiles = images.filter((file) => file.type.startsWith("image/"));
  if (imageFiles.length === 0) {
    return NextResponse.json(
      { message: "At least one valid image is required" },
      { status: 400 },
    );
  }

  // Validates that all provided files are images
  if (imageFiles.length !== images.length) {
    return NextResponse.json(
      { message: "All files must be images" },
      { status: 400 },
    );
  }

  // Validates that category is actually stored in the database
  let categoryId;
  if (validatedData.category) {
    const categoryDoc = await Category.findOne({
      name: validatedData.category,
    });
    if (!categoryDoc) {
      return NextResponse.json(
        { message: "Invalid category selected" },
        { status: 400 },
      );
    }
    categoryId = categoryDoc._id;
  }

  // Upload images
  const uploadedImages = await uploadImages(imageFiles);

  await connectToDatabase();

  // Create product
  const newProduct = await Product.create({
    ...validatedData,
    categoryId, // Add the resolved category ID
    images: uploadedImages,
  });

  return NextResponse.json(
    { message: "Product created successfully!", product: newProduct },
    { status: 201 },
  );
});
