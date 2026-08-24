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
              "focus-visible:outline-2 focus-visible:outline-[#B89558] focus-visible:outline-offset-2",
              // States
              isActive
                ? "bg-[#5C202C] text-[#FBF7F1] border-[#5C202C] shadow-sm"
                : "bg-transparent text-[#6B6560] border-[#B89558] hover:bg-[#5C202C] hover:border-[#5C202C] hover:text-[#FBF7F1] hover:-translate-y-[2px] hover:shadow-md active:translate-y-0",
            ].join(" ")}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
