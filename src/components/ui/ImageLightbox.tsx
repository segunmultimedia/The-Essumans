"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/data/content";

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const isOpen       = currentIndex !== null;
  const currentImage = currentIndex !== null ? images[currentIndex] : null;
  const closeRef     = useRef<HTMLButtonElement>(null);
  const triggerRef   = useRef<HTMLElement | null>(null);

  // Capture trigger element & manage body scroll + focus
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.classList.add("overlay-open");
      setTimeout(() => closeRef.current?.focus(), 60);
    } else {
      document.body.classList.remove("overlay-open");
      // Restore focus to the image that opened the lightbox
      triggerRef.current?.focus();
    }
    return () => document.body.classList.remove("overlay-open");
  }, [isOpen]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  const iconBtn = [
    "flex items-center justify-center w-11 h-11",
    "text-white/60 hover:text-white hover:scale-110 transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-[#B89558] focus-visible:outline-offset-2",
  ].join(" ");

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Photograph: ${currentImage.alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/94 px-4 py-6"
          onClick={onClose}
        >
          {/* Top bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans text-xs text-white/40 tracking-widest">
              {currentIndex! + 1} &nbsp;/&nbsp; {images.length}
            </p>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close photograph"
              className={iconBtn}
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Image + nav row */}
          <div
            className="flex items-center gap-2 md:gap-4 w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onPrev} aria-label="Previous photograph" className={iconBtn}>
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={currentImage.width}
                    height={currentImage.height}
                    sizes="(max-width: 768px) 95vw, 80vw"
                    className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                    quality={88}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button onClick={onNext} aria-label="Next photograph" className={iconBtn}>
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Caption */}
          <p
            className="mt-4 font-sans text-xs text-white/35 text-center max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {currentImage.alt}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
