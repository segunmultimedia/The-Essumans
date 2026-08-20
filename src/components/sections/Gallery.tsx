"use client";

import { useState, useMemo } from "react";
import {
  galleryImages,
  galleryCategories,
  GalleryCategory,
  GalleryImage,
} from "@/data/content";
import GalleryFilter from "@/components/ui/GalleryFilter";
import GalleryGrid   from "@/components/ui/GalleryGrid";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);

  const filtered = useMemo<GalleryImage[]>(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (image: GalleryImage) => {
    const idx = filtered.findIndex((img) => img.id === image.id);
    setLightboxIndex(idx);
  };

  return (
    <>
      <section
        id="gallery"
        aria-label="Our Moments — gallery"
        className="w-full bg-[#FAF8F5] section-pad"
      >
        <div className="container-e">
          {/* Heading */}
          <div className="text-center max-w-[560px] mx-auto mb-10 md:mb-14">
            <p className="text-eyebrow text-[#C9A96E] mb-5">Photographs</p>
            <h2 className="text-section-heading text-[#1E1E1E] mb-5">
              Our Moments
            </h2>
            <p className="text-body text-[#6B6560]">
              Photographs from a day — and a love — worth remembering.
            </p>
          </div>

          {/* Filters */}
          <GalleryFilter active={activeCategory} onChange={setActiveCategory} />

          {/* Grid */}
          <GalleryGrid images={filtered} onImageClick={openLightbox} />
        </div>
      </section>

      <ImageLightbox
        images={filtered}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex(
            lightboxIndex !== null
              ? (lightboxIndex - 1 + filtered.length) % filtered.length
              : null
          )
        }
        onNext={() =>
          setLightboxIndex(
            lightboxIndex !== null
              ? (lightboxIndex + 1) % filtered.length
              : null
          )
        }
      />
    </>
  );
}
