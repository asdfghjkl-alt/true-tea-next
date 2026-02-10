"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { IUser } from "@/database/user.model";
import { Membership } from "@/types/auth";
import { AxiosError } from "axios";
import InputField from "@/components/ui/inputs/InputField";

interface UserFormProps {
  initialData: IUser;
}

interface UserFormData {
  address: {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  membership: string;
  admin: boolean;
  activated: boolean;
}

export default function UserForm({ initialData }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      address: {
        line1: initialData.address?.line1 || "",
        line2: initialData.address?.line2 || "",
        suburb: initialData.address?.suburb || "",
        state: initialData.address?.state || "",
        postcode: initialData.address?.postcode || "",
      },
      membership: initialData.membership || "none",
      admin: initialData.admin || false,
      activated: initialData.activated || false,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      await api.put(`/users/${initialData._id}`, data);
      toast.success("User updated successfully");

      router.push("/users/manage");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to update user");
      } else {
        toast.error("Failed to update user");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow"
    >
      {/* Read-Only Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            First Name
          </label>
          <div className="mt-1 text-gray-900 font-medium">
            {initialData.fname}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Last Name
          </label>
          <div className="mt-1 text-gray-900 font-medium">
            {initialData.lname}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Email
          </label>
          <div className="mt-1 text-gray-900 font-medium">
            {initialData.email}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Phone
          </label>
          <div className="mt-1 text-gray-900 font-medium">
            {initialData.phone || "-"}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Age</label>
          <div className="mt-1 text-gray-900 font-medium">
            {initialData.age || "-"}
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>

        {/* Membership */}
        <div>
          <label
            htmlFor="membership"
            className="block text-sm font-medium text-gray-700"
          >
            Membership
          </label>
          <select
            id="membership"
            {...register("membership")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
          >
            <option value="">None</option>
            {Object.values(Membership).map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Status & Admin */}
        <div className="flex gap-8">
          <div className="flex items-center">
            <input
              id="activated"
              type="checkbox"
              {...register("activated")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="activated"
              className="ml-2 block text-sm text-gray-900"
            >
              Active Account
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="admin"
              type="checkbox"
              {...register("admin")}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="admin" className="ml-2 block text-sm text-gray-900">
              Admin User
            </label>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 pt-4">
          Address Details
        </h3>

        {/* Address Fields */}
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Line 1"
            name="address.line1"
            placeholder="Street address, P.O. box, etc."
            register={register}
            error={errors.address?.line1}
          />
          <InputField
            label="Line 2"
            name="address.line2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            register={register}
            error={errors.address?.line2}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Suburb"
              name="address.suburb"
              placeholder="Suburb"
              register={register}
              error={errors.address?.suburb}
            />
            <InputField
              label="State"
              name="address.state"
              placeholder="State"
              register={register}
              error={errors.address?.state}
            />
          </div>
          <InputField
            label="Postcode"
            name="address.postcode"
            placeholder="Postcode"
            register={register}
            error={errors.address?.postcode}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-submit min-w-[100px]"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
