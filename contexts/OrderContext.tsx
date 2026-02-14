"use client";

import { createContext, useContext } from "react";
import { IOrderProductFrontend } from "@/database/order.model";
import { IProduct } from "@/database/product.model";

export interface OrderContextType {
  cart: IOrderProductFrontend[];
  addItem: (product: IProduct | IOrderProductFrontend) => void;
  removeOneItem: (product: IProduct | IOrderProductFrontend) => void;
  removeAllItem: (product: IProduct | IOrderProductFrontend) => void;
  resetCart: () => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined,
);

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
