"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import WishFormModal from "@/components/ui/WishFormModal";
import MemoryFormModal from "@/components/ui/MemoryFormModal";

export default function FinalCTA() {
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);

  const handleWish = () => {
    setIsWishModalOpen(true);
  };

  const handleMemory = () => {
    setIsMemoryModalOpen(true);
  };

  return (
    <section
      aria-label="Be Part of Their Story"
      className="w-full bg-[#EDE7DC] section-pad"
    >
      <div className="container-e">
        <div className="max-w-[600px] mx-auto text-center">
          <span className="accent-line mx-auto mb-8" aria-hidden="true" />

          <h2 className="text-section-heading text-[#1E1E1E] mb-6">
            Be Part of Their Story
          </h2>

          <p
            className="text-body text-[#6B6560] mb-12 max-w-[52ch] mx-auto"
          >
            Leave a message, share a memory, and celebrate the beginning of
            forever with The Essumans.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button variant="primary" onClick={handleWish}>
              Leave a Wish
            </Button>
            <Button variant="secondary" onClick={handleMemory}>
              Share a Memory
            </Button>
          </div>
        </div>
      </div>
      
      <WishFormModal 
        isOpen={isWishModalOpen} 
        onClose={() => setIsWishModalOpen(false)} 
      />

      <MemoryFormModal 
        isOpen={isMemoryModalOpen} 
        onClose={() => setIsMemoryModalOpen(false)} 
      />
    </section>
  );
}
