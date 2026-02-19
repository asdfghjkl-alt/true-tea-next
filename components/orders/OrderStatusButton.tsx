"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { OrderStatus } from "@/types/order";

interface OrderStatusButtonProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export default function OrderStatusButton({
  orderId,
  currentStatus,
}: OrderStatusButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    setIsLoading(true);
    try {
      await axios.put("/api/orders/status", {
        orderId: orderId,
        status: newStatus,
      });
      toast.success(`Order marked as ${newStatus}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {currentStatus !== OrderStatus.delivered && (
        <button
          onClick={() => handleStatusUpdate(OrderStatus.delivered)}
          disabled={isLoading}
          className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Mark Delivered"}
        </button>
      )}

      {currentStatus !== OrderStatus.cancelled &&
        currentStatus !== OrderStatus.delivered && (
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to cancel this order? This action cannot be undone. \n\nIt will send a cancellation email to the customer AND attempt to automatically refund the full order amount via Stripe.",
                )
              ) {
                handleStatusUpdate(OrderStatus.cancelled);
              }
            }}
            disabled={isLoading}
            className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Cancel Order"}
          </button>
        )}
    </div>
  );
}
