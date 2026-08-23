"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PreviewableImageProps {
  src: string;
}

export function PreviewableImage({ src }: PreviewableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal open
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="block w-full h-full relative group"
        title="Click to view full image"
      >
        <Image
          src={src}
          alt="Memory Thumbnail"
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          sizes="128px"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Close preview"
          >
            &#x2715;
          </button>
          
          <div 
            className="relative w-full max-w-4xl max-h-[85vh] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt="Memory Full Size"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
