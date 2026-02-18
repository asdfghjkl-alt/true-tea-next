"use client";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useState } from "react";
import InputField from "@/components/ui/inputs/InputField";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

// Form data interface
interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

// Validation schema
const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password cannot be blank",
    "string.min": "Password must be at least 8 characters",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: joiResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center text-red-600">
        <p>Invalid or missing reset token.</p>
        <Link href="/auth/forgot-password" className="underline mt-2 block">
          Request a new link
        </Link>
      </div>
    );
  }

  async function onSubmit(data: ResetPasswordFormData) {
    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password: data.password,
      });
      setSuccess(true);
      toast.success(response.data.message);
      // Redirect after delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Reset failed.");
      } else {
        toast.error("Reset failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="rounded-md bg-green-50 p-4 mb-4">
          <p className="text-lg font-medium text-green-800">
            Password reset successfully!
          </p>
        </div>
        <p className="text-gray-600 mb-6">
          You will be redirected to the login page shortly.
        </p>
        <Link href="/auth/login" className="btn btn-submit p-4 w-full">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <Link href="/">
          <Image
            src="/logo-true-tea-origin.jpeg"
            alt="True Tea Logo"
            width={200}
            height={120}
            className="mx-auto mb-4"
          />
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <InputField
            name="password"
            label="New Password"
            placeholder="Min 8 characters"
            type="password"
            register={register}
            error={errors.password}
          />
          <InputField
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Re-enter password"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-submit w-full"
          >
            {isSubmitting ? "Resetting..." : "Set New Password"}
          </button>
        </div>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-10 shadow-lg">
        <ResetPasswordContent />
      </div>
    </div>
  );
}
