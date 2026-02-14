"use client";

import { useOrder } from "@/contexts/OrderContext";
import { IOrderProductFrontend } from "@/database/order.model";
import { IProduct } from "@/database/product.model";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface QuantityControlProps {
  product: IProduct | IOrderProductFrontend;
}

export default function QuantityControl({ product }: QuantityControlProps) {
  const { cart, addItem, removeOneItem } = useOrder();

  const productId = "product_id" in product ? product.product_id : product._id;
  const cartItem = cart.find((item) => item.product_id === productId);
  const quantity = cartItem ? cartItem.quantity : 0;

  if (quantity === 0) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          // Stops the click from navigating to the link
          e.stopPropagation();
          addItem(product);
        }}
        className="btn btn-submit w-full flex items-center justify-center gap-2 py-2"
      >
        <span>Add to Cart</span>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 w-full border border-gray-400 rounded-full p-1">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeOneItem(product);
        }}
        className="btn btn-delete flex items-center justify-center rounded-full"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-5 w-5" />
      </button>

      <span className="text-xl font-bold min-w-8 text-center">{quantity}</span>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addItem(product);
        }}
        className="btn btn-submit flex items-center justify-center rounded-full"
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
