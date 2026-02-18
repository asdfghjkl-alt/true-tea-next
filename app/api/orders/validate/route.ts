import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";

export const POST = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();
  const { cart } = await req.json();

  // Checks that cart field exists and is an array
  if (!cart || !Array.isArray(cart)) {
    return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
  }

  const validatedCart = [];
  const removedItems = [];
  const changedItems = [];

  for (const item of cart) {
    // Removes items if the quantity is negative or not an integer
    if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
      removedItems.push({ ...item, reason: "Invalid quantity" });
      continue;
    }

    // Checks that product exists and is on shelf
    const product = await Product.findById(item.product_id);

    if (!product || !product.onShelf) {
      // Product no longer exists or is not on shelf
      removedItems.push({ ...item, reason: "Product unavailable" });
      continue;
    }

    // Check stock
    if (product.stock < item.quantity) {
      // Adjust quantity to available stock
      if (product.stock > 0) {
        changedItems.push({
          ...item,
          oldQuantity: item.quantity,
          newQuantity: product.stock,
          reason: "Insufficient stock",
        });

        // Adds the item to the validated cart with the new quantity
        validatedCart.push({
          ...item,
          quantity: product.stock,
          price: product.price,
          discount: product.discount,
          stock: product.stock,
        });
      } else {
        removedItems.push({ ...item, reason: "Out of stock" });
      }
    } else {
      // Item is valid
      validatedCart.push({
        ...item,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
      });

      // Check if price changed
      if (item.price !== product.price) {
        changedItems.push({
          ...item,
          oldPrice: item.price,
          newPrice: product.price,
          reason: "Price changed",
        });
      }
    }
  }
  // Returns the validated cart and information about removed/changed items
  return NextResponse.json({ validatedCart, removedItems, changedItems });
});
