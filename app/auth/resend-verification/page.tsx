"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import InputField from "@/components/ui/inputs/InputField";
import EmailSentSuccess from "@/components/auth/EmailSentSuccess";

// Validation schema for the resend verification form
const resendSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email cannot be blank",
      "string.email": "Please enter a valid email address",
    }),
});

// Interface for the resend verification form data
interface ResendFormData {
  email: string;
}

export default function ResendVerificationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendFormData>({
    resolver: joiResolver(resendSchema),
    mode: "onTouched",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(data: ResendFormData) {
    setIsSubmitting(true);
    setSuccessMessage(null);
    try {
      const response = await axios.post("/api/auth/resend-verification", data);
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        toast.success("Request processed successfully.");
      }
    } catch (error) {
      void error;
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Failed to send verification email.";
        toast.error(msg);
      } else {
        toast.error("Failed to send verification email.");
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
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
        {/* Logo */}
        <Image
          src="/logo-true-tea-origin.jpeg"
          alt="True Tea Logo"
          width={200}
          height={120}
          className="mb-2 mx-auto"
        />

        {/* Title */}
        <h3 className="mb-4 text-xl font-bold">Resend Verification Email</h3>

        {/* Description */}
        <p className="mb-6 text-gray-600 text-sm">
          Enter your email address and we&apos;ll send you a link to verify your
          account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email input field */}
          <InputField
            name="email"
            placeholder="Email"
            label="Email"
            register={register}
            error={errors.email}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-submit w-full mt-4"
          >
            {isSubmitting ? "Sending..." : "Send Verification Link"}
          </button>

          {/* Back to login link */}
          <p className="mt-4 text-sm">
            <Link
              href="/auth/login"
              className="text-blue-600 decoration-blue-500 decoration-solid hover:text-blue-400 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
