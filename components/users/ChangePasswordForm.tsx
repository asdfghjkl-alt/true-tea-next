"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import InputField from "@/components/ui/inputs/InputField";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { changePasswordSchema } from "@/lib/schemas";
import { isAxiosError } from "axios";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: joiResolver(changePasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setLoading(true);
    try {
      await api.put("/users/password/change", data);
      toast.success("Password changed successfully");
      router.push("/users/profile");
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to change password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Current Password */}
      <InputField
        label="Current Password"
        name="currentPassword"
        type="password"
        placeholder="Enter your current password"
        register={register}
        error={errors.currentPassword}
      />

      {/* New Password */}
      <InputField
        label="New Password"
        name="newPassword"
        type="password"
        placeholder="Enter your new password"
        register={register}
        error={errors.newPassword}
      />

      {/* Confirm New Password */}
      <InputField
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        placeholder="Re-enter your new password"
        register={register}
        error={errors.confirmPassword}
      />

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
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}
