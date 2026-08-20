"use client";

import { galleryCategories, GalleryCategory } from "@/data/content";

interface GalleryFilterProps {
  active: GalleryCategory;
  onChange: (cat: GalleryCategory) => void;
}

export default function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter gallery photographs by category"
      className="flex flex-wrap justify-center gap-2"
    >
      {galleryCategories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={[
              // Base
              "inline-flex items-center min-h-[40px] px-5",
              "font-sans font-400 text-[11px] tracking-[0.12em] uppercase",
              "border transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-[#C9A96E] focus-visible:outline-offset-2",
              // States
              isActive
                ? "bg-[#1E1E1E] text-[#FAF8F5] border-[#1E1E1E]"
                : "bg-transparent text-[#6B6560] border-[#DDD8D0] hover:border-[#C9A96E] hover:text-[#1E1E1E]",
            ].join(" ")}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
