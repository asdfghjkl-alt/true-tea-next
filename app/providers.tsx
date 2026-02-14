"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { OrderProvider } from "@/contexts/OrderProvider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <OrderProvider>{children}</OrderProvider>
    </AuthProvider>
  );
}
