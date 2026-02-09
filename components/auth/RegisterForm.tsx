"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Link from "next/link";
import { registerSchema } from "@/lib/schemas";
import { AgeRange, RegisterFormData } from "@/types/auth";
import { useState } from "react";
import InputField from "@/components/ui/inputs/InputField";
import Image from "next/image";
import EmailSentSuccess from "@/components/auth/EmailSentSuccess";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: joiResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      fname: "",
      lname: "",
      phone: "",
      age: undefined,
      postcode: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(data: RegisterFormData) {
    setIsSubmitting(true);
    setSuccessMessage(null);
    try {
      await registerUser(data);
      setSuccessMessage(
        "Registration successful! Please check your email (including spam) to verify your account.",
      );
      reset();
    } catch (error) {
      void error;
      // Error is already handled by the auth context
    } finally {
      // Stop loading
      setIsSubmitting(false);
    }
  }

  if (successMessage) {
    return <EmailSentSuccess message={successMessage} />;
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

        {/* Create an Account heading */}
        <h3 className="mb-4">Create an Account</h3>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* First Name and Last Name */}
          <div className="flex gap-2">
            <InputField
              name="fname"
              placeholder="First Name"
              label="First Name"
              register={register}
              error={errors.fname}
            />
            <InputField
              name="lname"
              placeholder="Last Name"
              label="Last Name"
              register={register}
              error={errors.lname}
            />
          </div>

          {/* Email */}
          <InputField
            name="email"
            placeholder="Email"
            label="Email"
            register={register}
            error={errors.email}
          />

          {/* Phone Number */}
          <InputField
            name="phone"
            placeholder="Mobile Number"
            label="Mobile Number"
            register={register}
            error={errors.phone}
          />

          {/* Age and Postcode side-by-side */}
          <div className="flex gap-2">
            {/* Age Range Select */}
            <div className="w-1/2 mb-4">
              <div className="text-left">
                <label className="font-medium" htmlFor="age">
                  Age Range
                </label>
                <select
                  id="age"
                  {...register("age")}
                  className="my-1 w-full rounded-xl border-2 border-solid border-gray-400 bg-white p-3 text-lg"
                >
                  <option value="">Select Age Range</option>
                  {Object.values(AgeRange).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-red-500">
                {errors.age && <span>{errors.age.message}</span>}
              </div>
            </div>

            {/* Postcode */}
            <div className="w-1/2">
              <InputField
                name="postcode"
                placeholder="Postcode"
                label="Postcode"
                register={register}
                error={errors.postcode}
              />
            </div>
          </div>

          {/* Password and confirm password fields */}
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            label="Password"
            register={register}
            error={errors.password}
          />
          <InputField
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
            register={register}
            error={errors.confirmPassword}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-submit w-full mt-4"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>

          {/* Login link */}
          <p className="mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 decoration-blue-500 decoration-solid hover:text-blue-400 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
