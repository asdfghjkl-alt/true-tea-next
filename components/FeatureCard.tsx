"use client";

import { useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group p-4 transition-transform duration-300 hover:-translate-y-2 cursor-pointer md:cursor-default"
      onClick={() => setIsOpen((prev) => !prev)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-emerald-50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {/* Chevron Down Indicator */}
      <div
        className={`flex justify-center mt-1 transition-transform duration-300 group-hover:hidden ${isOpen ? "hidden" : ""}`}
      >
        <svg
          className="w-4 h-4 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {/* Chevron Up Indicator (visible when open on mobile) */}
      <div
        className={`flex justify-center mt-1 transition-transform duration-300 md:hidden ${isOpen ? "" : "hidden"}`}
      >
        <svg
          className="w-4 h-4 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <p
          className={`mt-0 overflow-hidden text-sm text-gray-500 transition-opacity duration-300 group-hover:mt-2 group-hover:opacity-100 ${isOpen ? "mt-2 opacity-100" : "opacity-0"}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
