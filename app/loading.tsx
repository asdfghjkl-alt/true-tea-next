import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600"></div>

        <p className="animate-pulse text-lg font-medium text-emerald-800">
          Loading...
        </p>
      </div>
    </div>
  );
}
