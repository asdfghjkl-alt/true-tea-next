"use client";

import { IOrderProductFrontend } from "@/database";
import QuantityControl from "@/components/ui/QuantityControl";
import Image from "next/image";

interface CartItemProps {
  item: IOrderProductFrontend;
}

export default function CartItem({ item }: CartItemProps) {
  const itemPrice = item.price;
  const itemDiscount = item.discount || 0;
  const discountedPrice = itemPrice * (1 - itemDiscount / 100);

  return (
    <div className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 gap-4">
      {/* Product Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 text-center w-full sm:text-left">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.nameCN}</p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          {itemDiscount > 0 ? (
            <>
              <span className="font-bold text-emerald-600">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${itemPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-700">
              ${itemPrice.toFixed(2)}
            </span>
          )}
          <span className="text-sm text-gray-500"> / {item.unit}</span>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="w-full min-w-[120px] sm:w-auto">
        <QuantityControl product={item} />
      </div>

      {/* Item Total */}
      <div className="min-w-[80px] text-right font-semibold text-gray-800">
        ${(discountedPrice * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
