"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Link from "next/link";
import Joi from "joi";
import type { LoginFormData } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import InputField from "@/components/ui/inputs/InputField";
import Image from "next/image";

// Login form schema
const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Email cannot be blank",
    "string.email": "Please enter in a valid email address",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password cannot be blank",
  }),
});

export default function Login() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: joiResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function onSubmit(data: LoginFormData) {
    setIsLoggingIn(true);
    try {
      await login(data);
    } catch (error) {
      console.error(error);
      setIsLoggingIn(false);
      reset();
    }
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
        {/* Heading */}
        <h3>Login to True Tea</h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email field */}
          <InputField
            name="email"
            placeholder="Email"
            label="Email"
            register={register}
            error={errors.email}
          />

          {/* Password field */}
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            label="Password"
            register={register}
            error={errors.password}
          />

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="btn btn-submit w-full"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>

          {/* Link to register page */}
          <p className="mt-2">
            Do not have an True Tea Account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 decoration-blue-500 decoration-solid hover:text-blue-400 hover:underline"
            >
              Create an True Tea Account
            </Link>
          </p>

          {/* Link to resend verification email page */}
          <p className="mt-1">
            <Link
              href="/auth/resend-verification"
              className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
            >
              Resend Verification Email
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
