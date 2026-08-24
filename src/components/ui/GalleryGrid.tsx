"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryImage } from "@/data/content";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  const getGridClass = (i: number) => {
    // 6-item repeating pattern for a curated bento feel on desktop
    const mod = i % 6;
    if (mod === 0) return "col-span-2 row-span-2 md:col-span-2 md:row-span-2"; // Large feature
    if (mod === 1) return "col-span-1 row-span-1 md:col-span-1 md:row-span-1"; // Small square
    if (mod === 2) return "col-span-1 row-span-1 md:col-span-1 md:row-span-1"; // Small square
    if (mod === 3) return "col-span-2 row-span-1 md:col-span-2 md:row-span-1"; // Landscape wide
    if (mod === 4) return "col-span-1 row-span-2 md:col-span-1 md:row-span-2"; // Tall portrait
    if (mod === 5) return "col-span-1 row-span-1 md:col-span-1 md:row-span-1"; // Small square
    return "col-span-1 row-span-1";
  };

  return (
    <div
      role="list"
      aria-label="Gallery photographs"
      className="grid grid-cols-2 md:grid-cols-3 auto-rows-[160px] md:auto-rows-[280px] gap-2 md:gap-4 mt-10 md:mt-12 grid-flow-row-dense"
    >
      <AnimatePresence mode="popLayout">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(i * 0.04, 0.3) }}
            className={`relative overflow-hidden group ${getGridClass(i)}`}
            role="listitem"
          >
            <button
              onClick={() => onImageClick(img)}
              aria-label={`View: ${img.alt}`}
              className="absolute inset-0 w-full h-full focus-visible:outline-2 focus-visible:outline-[#B89558] focus-visible:-outline-offset-2 z-10"
            />
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              quality={85}
              loading={i < 4 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {images.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <p className="font-serif italic text-[#9A948F] text-lg">
            No photographs in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
