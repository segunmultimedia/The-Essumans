"use client";

import { useState, useMemo } from "react";
import {
  galleryImages,
  GalleryCategory,
  GalleryImage,
} from "@/data/content";
import GalleryFilter from "@/components/ui/GalleryFilter";
import GalleryGrid   from "@/components/ui/GalleryGrid";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function FullGalleryClient() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);
  const [visibleCount, setVisibleCount]     = useState<number>(12);

  const filtered = useMemo<GalleryImage[]>(() => {
    let imgs = galleryImages;
    if (activeCategory !== "All") {
      imgs = galleryImages.filter((img) => img.category === activeCategory);
    }
    return imgs;
  }, [activeCategory]);

  const displayedImages = filtered.slice(0, visibleCount);

  const openLightbox = (image: GalleryImage) => {
    const idx = filtered.findIndex((img) => img.id === image.id);
    setLightboxIndex(idx);
  };

  const handleCategoryChange = (cat: GalleryCategory) => {
    setActiveCategory(cat);
    setVisibleCount(12); // Reset load more on filter change
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      <section className="w-full bg-[#FBF7F1] pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-e">
          {/* Heading */}
          <div className="text-center max-w-[560px] mx-auto mb-10 md:mb-14">
            <p className="text-eyebrow text-[#6F2735] mb-5">THE ESSUMANS</p>
            <h1 className="text-section-heading text-[#1E1E1E] mb-5">
              Our Moments
            </h1>
            <p className="text-body text-[#6B6560]">
              A collection of moments from a day worth remembering.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-10">
            <GalleryFilter active={activeCategory} onChange={handleCategoryChange} />
          </div>

          {/* Grid */}
          <GalleryGrid images={displayedImages} onImageClick={openLightbox} />

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className="mt-12 md:mt-16 flex justify-center">
              <button
                onClick={loadMore}
                className="inline-block px-8 py-3 text-sm font-medium tracking-widest uppercase text-[#6F2735] border border-[#6F2735] rounded hover:bg-[#6F2735] hover:text-white transition-colors duration-300"
              >
                Load More
              </button>
            </div>
          )}
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
