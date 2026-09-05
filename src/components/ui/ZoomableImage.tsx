"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  wrapperClassName?: string;
  imageClassName?: string;
  priority?: boolean;
}

export default function ZoomableImage({
  src,
  alt,
  wrapperClassName = "",
  imageClassName = "",
  priority = false,
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const layoutId = `zoom-${src}`; // Unique layoutId based on src

  return (
    <>
      <div className={`relative ${wrapperClassName}`}>
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
            className={imageClassName}
            priority={priority}
            quality={85}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/94 cursor-zoom-out"
              onClick={() => setIsZoomed(false)}
            />

            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex items-center justify-center w-12 h-12 text-white/60 hover:text-white hover:scale-110 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#B89558] focus-visible:outline-offset-2"
              aria-label="Close full screen image"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-5xl h-[85vh] cursor-zoom-out z-10"
              onClick={() => setIsZoomed(false)}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                quality={90}
                priority
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
