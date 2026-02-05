"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Link from "next/link";
import Joi from "joi";
import { type RegisterFormData, AgeRange } from "@/types/auth";
import { useState } from "react";
import InputField from "@/components/ui/inputs/InputField";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import EmailSentSuccess from "@/components/auth/EmailSentSuccess";

const registerSchema = Joi.object({
  fname: Joi.string().required().messages({
    "string.empty": "First name cannot be blank",
  }),
  lname: Joi.string().required().messages({
    "string.empty": "Last name cannot be blank",
  }),
  phone: Joi.string()
    .pattern(/^04\d{8}$/)
    .required()
    .messages({
      "string.empty": "Mobile number cannot be blank",
      "string.pattern.base":
        "Please enter a valid Australian mobile number starting with 04 (10 digits)",
    }),
  age: Joi.string()
    .valid(...Object.values(AgeRange))
    .required()
    .messages({
      "any.only": "Please select a valid age range",
      "string.empty": "Age range is required",
    }),
  postcode: Joi.string().required().messages({
    "string.empty": "Postcode cannot be blank",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email cannot be blank",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be blank",
    "string.min": "Password must be at least 6 characters",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
  }),
});

export default function RegisterForm() {
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
      const { confirmPassword, ...registerData } = data;
      const response = await axios.post("/api/auth/register", registerData);
      if (response.status === 201) {
        setSuccessMessage(
          "Registration successful! Please check your email (including spam) to verify your account.",
        );
        toast.success("Registration successful!");
        reset();
      }
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successMessage) {
    return <EmailSentSuccess message={successMessage} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
        <Image
          src="/logo-true-tea-origin.jpeg"
          alt="True Tea Logo"
          width={200}
          height={120}
          className="mb-2 mx-auto"
        />
        <h3>Create an Account</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <InputField
            name="email"
            placeholder="Email"
            label="Email"
            register={register}
            error={errors.email}
          />
          <div className="flex gap-2">
            <InputField
              name="phone"
              placeholder="Mobile Number"
              label="Mobile Number"
              register={register}
              error={errors.phone}
            />
          </div>
          {/* Age Range Select */}
          <div className="mb-4">
            <div className="text-left">
              <label className="font-medium" htmlFor="age">
                Age Range
              </label>
              <select
                id="age"
                {...register("age")}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

          <InputField
            name="postcode"
            placeholder="Postcode"
            label="Postcode"
            register={register}
            error={errors.postcode}
          />
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-submit w-full mt-4"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
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
