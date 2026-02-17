"use client";

import { IOrderProduct } from "@/database/order.model";
import Image from "next/image";

interface OrderItemProps {
  item: IOrderProduct;
}

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="w-12 h-12 relative grow-0 bg-gray-100 rounded overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Img
          </div>
        )}
      </div>
      <div className="grow min-w-0">
        <p className="font-medium truncate" title={item.name}>
          {item.name}
        </p>
        <div className="flex justify-between text-gray-500 text-xs mt-1">
          <span>
            Price: ${item.price.toFixed(2)} / {item.unit}
          </span>
          <span>Qty: {item.quantity}</span>
        </div>
      </div>
    </div>
  );
}
