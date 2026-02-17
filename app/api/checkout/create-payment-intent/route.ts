import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Product from "@/database/product.model";
import connectToDatabase from "@/lib/mongodb";
import { apiHandler } from "@/lib/api-handler";
import { POSTAGE_FEE } from "@/lib/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();
  const { cart, buyer, delivery, owner_id } = await req.json();

  // Checks that cart field exists and is array and is has at least 1 item
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: "Invalid cart" }, { status: 400 });
  }

  // Validate country to be strictly Australia
  if (
    !buyer ||
    !delivery ||
    !buyer.address ||
    !delivery.address ||
    buyer.address.country.trim().toLowerCase() !== "australia" ||
    delivery.address.country.trim().toLowerCase() !== "australia"
  ) {
    return NextResponse.json(
      { error: "We currently only deliver to Australia." },
      { status: 400 },
    );
  }

  let totalAmount = POSTAGE_FEE;

  // Calculate total amount on server side
  for (const item of cart) {
    if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
      return NextResponse.json(
        { error: "Invalid quantity in cart" },
        { status: 400 },
      );
    }

    const product = await Product.findById(item.product_id);

    // Product not available in store
    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${item.name}` },
        { status: 404 },
      );
    }

    // Product has been taken off the shelf
    if (!product.onShelf) {
      return NextResponse.json(
        { error: `Product unavailable: ${product.name}` },
        { status: 400 },
      );
    }

    // Product stock is insufficient for user's purchase
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Insufficient stock for: ${product.name}` },
        { status: 400 },
      );
    }

    // Calculating price with discount
    const discountedPrice = product.price * (1 - (product.discount || 0) / 100);
    totalAmount += discountedPrice * item.quantity;
  }

  // Stripe expects amount in cents
  const amountInCents = Math.round(totalAmount * 100);

  // Creates Stripe Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "aud", // Adjust currency as needed
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      cart: JSON.stringify(cart),
      buyer: JSON.stringify(buyer),
      delivery: JSON.stringify(delivery), // Added delivery for completeness
      ownerId: owner_id || "guest",
    },
  });

  // Returns clientSecret for user to complete the transaction
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
});
