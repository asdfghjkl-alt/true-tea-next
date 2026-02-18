"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { ValidatedCartItem } from "@/app/checkout/page";
import CheckoutItem from "./CheckoutItem";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { POSTAGE_FEE } from "@/lib/constants";

interface CheckoutReviewProps {
  onProceed: (items: ValidatedCartItem[]) => void;
}

export default function CheckoutReview({ onProceed }: CheckoutReviewProps) {
  const { cart } = useOrder();
  const [loading, setLoading] = useState(true);
  const [validatedItems, setValidatedItems] = useState<ValidatedCartItem[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const validateCart = async () => {
      try {
        const { data } = await api.post("/orders/validate", {
          cart,
        });

        const { validatedCart, removedItems, changedItems } = data;

        setValidatedItems(validatedCart);

        const newWarnings: string[] = [];

        // Adds warnings into the updates for removed items
        if (removedItems && removedItems.length > 0) {
          removedItems.forEach((item: any) => {
            newWarnings.push(`Removed "${item.name}": ${item.reason}`);
          });
        }

        // Adds warnings for items that changed quantities
        if (changedItems && changedItems.length > 0) {
          changedItems.forEach((item: any) => {
            newWarnings.push(
              `Adjusted "${item.name}": ${item.reason} (Qty: ${item.oldQuantity} -> ${item.newQuantity})`,
            );
          });
        }

        setWarnings(newWarnings);
      } catch (error) {
        toast.error("Failed to validate cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      validateCart();
    } else {
      setLoading(false);
    }
  }, [cart]);

  // Calculates the subtotal of the items in the cart
  const subtotal = validatedItems.reduce((acc, item) => {
    const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
    return acc + discountedPrice * item.quantity;
  }, 0);

  const total = subtotal + POSTAGE_FEE;

  // Loading screen while validating cart
  if (loading) {
    return <div className="text-center py-10">Validating your cart...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

      {/* Warnings for removed/changed items */}
      {warnings.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
          <h3 className="font-bold mb-2">Important Updates</h3>
          <ul className="list-disc pl-5 space-y-1">
            {warnings.map((warning: string, index: number) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Cart items */}
      <div className="space-y-4 mb-6">
        {validatedItems.map((item) => (
          <CheckoutItem key={item.product_id} item={item} />
        ))}
      </div>

      {/* Subtotal */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2 text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-gray-600">
          <span>Postage</span>
          <span>
            {POSTAGE_FEE === 0 ? "Free" : `$${POSTAGE_FEE.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Proceed button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onProceed(validatedItems)}
          className="px-6 py-3 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors"
          disabled={validatedItems.length === 0}
        >
          Proceed to Details
        </button>
      </div>
    </div>
  );
}
