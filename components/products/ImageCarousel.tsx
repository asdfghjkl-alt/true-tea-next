"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  isOutOfStock?: boolean;
}

const ImageCarousel = ({ images, isOutOfStock }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

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
          {/* Image display - Render all images stacked for cross-fade */}
          {images.map((img, index) => (
            <Image
              key={img}
              src={img}
              alt={`Product Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 ease-in-out ${
                index === currentIndex
                  ? `z-10 ${isOutOfStock ? "opacity-60 grayscale" : "opacity-100"}`
                  : "z-0 opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
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
