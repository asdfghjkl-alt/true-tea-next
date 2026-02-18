"use client";

import { useOrder } from "@/contexts/OrderContext";
import { IOrderProductFrontend, IProduct } from "@/database";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

interface QuantityControlProps {
  product: IProduct | IOrderProductFrontend;
  maxStock?: number;
}

export default function QuantityControl({
  product,
  maxStock,
}: QuantityControlProps) {
  const { cart, addItem, removeOneItem } = useOrder();

  const productId = "product_id" in product ? product.product_id : product._id;
  const cartItem = cart.find((item) => item.product_id === productId);
  const quantity = cartItem ? cartItem.quantity : 0;
  const atStockLimit = maxStock !== undefined && quantity >= maxStock;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (atStockLimit) {
      toast.error(`Only ${maxStock} available in stock`);
      return;
    }
    addItem(product);
  };

  if (quantity === 0) {
    return (
      <button
        onClick={handleAdd}
        className="btn btn-submit w-full flex items-center justify-center gap-2 py-2"
      >
        <span>Add to Cart</span>
      </button>
    );
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeOneItem(product);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full border border-gray-400 rounded-full p-1">
      <button
        onClick={handleRemove}
        className="btn btn-delete flex items-center justify-center rounded-full"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-5 w-5" />
      </button>

      <span className="text-xl font-bold min-w-8 text-center">{quantity}</span>

      <button
        onClick={handleAdd}
        disabled={atStockLimit}
        className={`btn btn-submit flex items-center justify-center rounded-full ${atStockLimit ? "opacity-40 cursor-not-allowed" : ""}`}
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
