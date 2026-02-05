"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // Added Suspense
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        await axios.get(`/api/auth/verify?token=${token}`);
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-lg">
        <Image
          src="/logo-true-tea-origin.jpeg"
          alt="True Tea Logo"
          width={120}
          height={72}
          className="mb-4 mx-auto"
        />
        {status === "loading" && (
          <p className="text-gray-600">Verifying your email...</p>
        )}
        {status === "success" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              Verified!
            </h3>
            <p className="mb-6">Your email has been verified successfully.</p>
            <Link href="/auth/login" className="btn btn-primary w-full">
              Proceed to Login
            </Link>
          </div>
        )}
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

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
