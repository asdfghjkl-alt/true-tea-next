"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Image from "next/image";

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [message, setMessage] = useState(
    token ? "" : "Invalid verification link.",
  );

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        // Verifies the token by calling API to find the user with the token
        await axios.get(`/api/auth/verify?token=${token}`);
        setStatus("success");
      } catch (error) {
        // If verification fails, set error status and message
        setStatus("error");
        if (error instanceof AxiosError) {
          setMessage(error.response?.data?.message || "Verification failed.");
        } else {
          setMessage("Verification failed.");
        }
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      {/* Verification Card */}
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-lg">
        {/* Logo */}
        <Image
          src="/logo-true-tea-origin.jpeg"
          alt="True Tea Logo"
          width={120}
          height={72}
          className="mb-4 mx-auto"
        />

        {/* Loading Status */}
        {status === "loading" && (
          <p className="text-gray-600">Verifying your email...</p>
        )}

        {/* Success Status */}
        {status === "success" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              Verified!
            </h3>
            <p className="mb-6">Your email has been verified successfully.</p>
            <Link href="/auth/login" className="btn btn-submit w-full p-4">
              Proceed to Login
            </Link>
          </div>
        )}

        {/* Error Status */}
        {status === "error" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-red-600">
              Verification Failed
            </h3>
            <p className="mb-6">{message}</p>
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Back to Registration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
