import Image from "next/image";
import { ValidatedCartItem } from "@/app/checkout/page";

interface CheckoutItemProps {
  item: ValidatedCartItem;
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
  return (
    <div className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
      <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.nameCN}</p>
        <div className="text-sm mt-1">
          {item.discount > 0 ? (
            <>
              Price:{" "}
              <span className="line-through text-gray-400">
                ${item.price.toFixed(2)}
              </span>{" "}
              <span className="text-emerald-600 font-medium">
                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
              </span>{" "}
              / {item.unit}
              <span className="text-emerald-600 ml-1">
                ({item.discount}% off)
              </span>
            </>
          ) : (
            <>
              Price: ${item.price.toFixed(2)} / {item.unit}
            </>
          )}
        </div>
        <div className="text-sm mt-1 text-gray-500">Qty: {item.quantity}</div>
      </div>
      <div className="font-medium text-right">
        $
        {(
          item.price *
          (1 - (item.discount || 0) / 100) *
          item.quantity
        ).toFixed(2)}
      </div>
    </div>
  );
}
