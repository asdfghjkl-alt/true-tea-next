import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/database/product.model";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
