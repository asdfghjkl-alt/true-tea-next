"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

export default function ZoomableImage({ className, ...props }: ImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close with Esc key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail / Trigger */}
      <div
        className="cursor-zoom-in w-full h-full absolute inset-0 group"
        onClick={() => setIsOpen(true)}
      >
        <Image {...props} className={className} />
        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="bg-white/90 rounded-full p-3 shadow-md text-emerald-700 backdrop-blur-sm transform scale-95 group-hover:scale-100 transition-transform">
            <svg
              className="w-8 h-8 drop-shadow-sm"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Full Size Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] pointer-events-none flex flex-col items-center justify-center">
            {/* The Image */}
            <div className="relative w-full h-full">
              <Image
                src={props.src}
                alt={props.alt}
                fill
                className="object-contain pointer-events-auto shadow-2xl"
                sizes="100vw"
                priority
              />
            </div>
            {/* Close button instruction */}
            <div
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white bg-black/60 rounded-full p-2 hover:bg-black/90 transition-colors pointer-events-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <p className="fixed bottom-6 text-white/70 text-sm font-medium tracking-wide">
              Click anywhere or press Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
