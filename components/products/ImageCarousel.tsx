"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  isOutOfStock?: boolean;
}

const ImageCarousel = ({ images, isOutOfStock }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleImageChange = useCallback((newIndex: number) => {
    setCurrentIndex((prevIndex) => {
      if (newIndex === prevIndex) return prevIndex;
      // Constructs fade out and fade in effect
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setIsFading(false);
      }, 300);
      return prevIndex;
    });
  }, []);

  const prevImage = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    handleImageChange(newIndex);
  }, [handleImageChange, currentIndex, images.length]);

  const nextImage = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    handleImageChange(newIndex);
  }, [handleImageChange, currentIndex, images.length]);

  // Auto-scroll effect
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, nextImage]);

  return (
    <div
      className="flex flex-col gap-4"
      role="region"
      aria-label="Product images"
      aria-roledescription="carousel"
    >
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 shadow-md"
        aria-live="polite"
      >
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <span className="bg-black/70 text-white px-6 py-3 rounded-lg font-bold text-xl shadow-lg backdrop-blur-sm">
              Out of Stock
            </span>
          </div>
        )}
        <div className="relative h-full w-full">
          {/* Image display */}
          <Image
            src={images[currentIndex]}
            alt={`Product Image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-300 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            } ${isOutOfStock ? "grayscale opacity-60" : ""}`}
            loading="eager"
          />
        </div>

        {images.length > 1 && (
          <>
            {/* Previous image button */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-emerald-800 shadow-lg transition-transform hover:scale-110 hover:bg-white active:scale-95"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Next image button */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-emerald-800 shadow-lg transition-transform hover:scale-110 hover:bg-white active:scale-95"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          role="group"
          aria-label="Image thumbnails"
        >
          {/* Image thumbnails */}
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={index === currentIndex ? "true" : undefined}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                index === currentIndex
                  ? "border-emerald-600 opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
