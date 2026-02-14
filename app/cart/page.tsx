"use client";

import { useOrder } from "@/contexts/OrderContext";
import CartItem from "@/components/orders/CartItem";
import OrderSummary from "@/components/orders/OrderSummary";
import CartEmpty from "@/components/orders/CartEmpty";
import { useMemo } from "react";

export default function CartPage() {
  const { cart } = useOrder();

  const totals = useMemo(() => {
    let subtotal = 0;
    let gstTotal = 0;
    let savings = 0;

    cart.forEach((item) => {
      const itemPrice = item.price;
      const itemQuantity = item.quantity;
      const itemDiscount = item.discount || 0;

      // Price after discount, per item
      const discountedPrice = itemPrice * (1 - itemDiscount / 100);

      subtotal += discountedPrice * itemQuantity;

      // GST Calculation
      if (item.includeGST) {
        // If GST is included, it's 1/11th of the price
        gstTotal += (discountedPrice / 11) * itemQuantity;
      }

      savings += (itemPrice - discountedPrice) * itemQuantity;
    });

    return { subtotal, gstTotal, savings };
  }, [cart]);

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-8 text-primary">My Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="grow space-y-4">
          {cart.map((item) => (
            <CartItem key={item.product_id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <OrderSummary totals={totals} />
      </div>
    </main>
  );
}
