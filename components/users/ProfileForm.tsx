"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { AgeRange } from "@/types/auth";
import Joi from "joi";
import InputField from "@/components/ui/inputs/InputField";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { IUser } from "@/database";
import { profileSchema } from "@/lib/schemas";

interface ProfileFormData {
  fname: string;
  lname: string;
  phone: string;
  age: string;
  address: {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
}

export default function ProfileForm({ user }: { user: IUser }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: joiResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      fname: user.fname || "",
      lname: user.lname || "",
      phone: user.phone || "",
      age: user.age || "",
      address: {
        line1: user.address?.line1 || "",
        line2: user.address?.line2 || "",
        suburb: user.address?.suburb || "",
        state: user.address?.state || "",
        postcode: user.address?.postcode || "",
        country: "Australia",
      },
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      await api.put("/users/me", data);
      toast.success("Profile updated successfully");
      router.push("/users/profile");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Info */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <InputField
            label="First Name"
            name="fname"
            placeholder="First Name"
            register={register}
            error={errors.fname}
          />
          {/* Last Name */}
          <InputField
            label="Last Name"
            name="lname"
            placeholder="Last Name"
            register={register}
            error={errors.lname}
          />
          {/* Phone */}
          <InputField
            label="Phone"
            name="phone"
            placeholder="Phone Number"
            register={register}
            error={errors.phone}
          />

          {/* Age Range Select */}
          <div>
            <label className="font-medium block mb-1">Age Range</label>
            <select
              {...register("age")}
              className="w-full p-3 rounded-xl border-2 border-gray-400 bg-white"
            >
              <option value="">Select Age Range</option>
              {Object.values(AgeRange).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Address */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
          Address
        </h2>
        <div className="space-y-4">
          {/* Address Line 1 */}
          <InputField
            label="Address Line 1"
            name="address.line1"
            placeholder="Unit, Street Number, Street Name"
            register={register}
            error={errors.address?.line1}
          />
          {/* Address Line 2 */}
          <InputField
            label="Address Line 2 (Optional)"
            name="address.line2"
            placeholder="Apartment, Studio, or Floor"
            register={register}
            error={errors.address?.line2}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Suburb */}
            <InputField
              label="Suburb"
              name="address.suburb"
              placeholder="Suburb"
              register={register}
              error={errors.address?.suburb}
            />

            {/* State */}
            <InputField
              label="State"
              name="address.state"
              placeholder="State"
              register={register}
              error={errors.address?.state}
            />

            {/* Postcode */}
            <InputField
              label="Postcode"
              name="address.postcode"
              placeholder="Postcode"
              register={register}
              error={errors.address?.postcode}
            />
          </div>

          {/* Country (Unable to be changed) */}
          <div>
            <label className="font-medium block text-left mb-1">Country</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-500">
              Australia
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
