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

  // If already delivered, don't show the button
  if (currentStatus === OrderStatus.delivered) {
    return null;
  }

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
    <button
      onClick={() => handleStatusUpdate(OrderStatus.delivered)}
      disabled={isLoading}
      className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors disabled:opacity-50"
    >
      {isLoading ? "Updating..." : "Mark Delivered"}
    </button>
  );
}
