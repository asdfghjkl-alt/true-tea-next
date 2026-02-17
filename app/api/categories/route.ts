import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { getSession } from "@/lib/session";
import { categorySchema } from "@/lib/schemas";
import { uploadImages } from "@/lib/upload";
import { User, Category } from "@/database";
import connectToDatabase from "@/lib/mongodb";

export const POST = apiHandler(async (req: NextRequest) => {
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
  const validation = categorySchema.validate(body);
  if (validation.error) {
    throw { name: "ValidationError", errors: validation.error.details };
  }

  // Validate that image file exists and is a file
  if (!imageFile || !(imageFile instanceof File)) {
    throw { statusCode: 400, message: "Image file is required" };
  }

  // Validates that file uploaded is an image
  if (!imageFile.type.startsWith("image/")) {
    throw { statusCode: 400, message: "File must be an image" };
  }

  // Reuse uploadImages function using constructed array
  const uploadedImages = await uploadImages([imageFile], "True Tea/Categories");
  if (!uploadedImages || uploadedImages.length === 0) {
    throw { statusCode: 500, message: "Image upload failed" };
  }
  const uploadedImage = uploadedImages[0];

  // Creates a new category
  const newCategory = await Category.create({
    ...validation.value,
    image: uploadedImage,
  });

  return NextResponse.json(
    { message: "Category created successfully", category: newCategory },
    { status: 201 },
  );
});
