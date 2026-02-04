"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LoginFormData } from "@/types/auth";
import api from "@/lib/axios";
import { SessionPayload } from "@/lib/session";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: SessionPayload["userData"] | null;
  login: (data: LoginFormData) => Promise<void>;
  setUser: (user: SessionPayload["userData"] | null) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionPayload["userData"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on mount
    const fetchSession = async () => {
      try {
        const res = await api.get("/users/me");
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (error) {
        // Silently fail if no session exists or error occurs
        console.error("Failed to fetch session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = async (data: LoginFormData) => {
    try {
      const res = await api.post("/auth/login", data);
      toast.success(res.data.message);
      // Assuming the login response might return user data, or we fetch it after
      if (res.data.user) {
        setUser(res.data.user);
      } else {
        // Optionally fetch user data if not returned in login
        const meRes = await api.get("/users/me");
        setUser(meRes.data.user);
      }
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      setUser(null);
      toast.success(res.data.message);
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
