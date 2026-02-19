"use client";

import { useState, useEffect, ReactNode } from "react";
import { OrderContext } from "./OrderContext";
import { IOrderProductFrontend, IProduct } from "@/database";

export function OrderProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<IOrderProductFrontend[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from local storage", error);
        localStorage.removeItem("cart");
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addItem = (product: IProduct | IOrderProductFrontend) => {
    setCart((prev) => {
      // Handle ID extraction for both types
      const productId =
        "product_id" in product ? product.product_id : product._id;
      const existingItem = prev.find((item) => item.product_id === productId);

      // Checks if item is already in cart
      if (existingItem) {
        return prev.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if ("_id" in product) {
        // Product is IProduct, adds it as IOrderProductFrontend
        const p = product as IProduct;

        const newItem: IOrderProductFrontend = {
          product_id: p._id,
          name: p.name,
          imageUrl: p.images[0].url,
          nameCN: p.nameCN,
          price: p.price,
          discount: p.discount,
          includeGST: p.includeGST,
          unit: p.unit,
          quantity: 1,
        };
        return [...prev, newItem];
      }

      // Should never occur, as item was never in cart
      console.warn(
        "Attempted to add item from partial data but it was not in cart.",
      );
      return prev;
    });
  };

  const removeOneItem = (product: IProduct | IOrderProductFrontend) => {
    setCart((prev) => {
      const productId =
        "product_id" in product ? product.product_id : product._id;

      // Attempts to find item in cart
      const existingItem = prev.find((item) => item.product_id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      // Filters cart from instance of item
      return prev.filter((item) => item.product_id !== productId);
    });
  };

  const removeAllItem = (product: IProduct | IOrderProductFrontend) => {
    setCart((prev) => {
      const productId =
        "product_id" in product ? product.product_id : product._id;
      return prev.filter((item) => item.product_id !== productId);
    });
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <OrderContext.Provider
      value={{ cart, addItem, removeOneItem, removeAllItem, resetCart }}
    >
      {children}
    </OrderContext.Provider>
  );
}
