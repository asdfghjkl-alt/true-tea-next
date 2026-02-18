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
import EmailSentSuccess from "@/components/auth/EmailSentSuccess";

// Form data interface
interface ForgotPasswordFormData {
  email: string;
}

// Validation schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string().required().email({ tlds: false }).messages({
    "string.empty": "Email cannot be blank",
    "string.email": "Please enter a valid email address",
  }),
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: joiResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsSubmitting(true);
    setSuccessMessage(null);
    try {
      const response = await api.post("/auth/forgot-password", data);
      setSuccessMessage(response.data.message);
      toast.success("Request processed.");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <EmailSentSuccess message={successMessage} buttonText="Back to Login" />
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-10 shadow-lg">
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
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form className="mt-8 space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email Address"
            placeholder="email@example.com"
            type="email"
            register={register}
            error={errors.email}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-submit w-full"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center ">
            <Link
              href="/auth/login"
              className="font-medium text-emerald-600 hover:text-emerald-500 text-sm"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
