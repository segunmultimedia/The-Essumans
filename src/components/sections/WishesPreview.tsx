"use client";

import { useState, useEffect } from "react";
import WishCard from "@/components/ui/WishCard";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import WishFormModal from "@/components/ui/WishFormModal";

interface DbWish {
  id: string;
  name: string;
  message: string;
  relationship: string | null;
}

interface WishesPreviewProps {
  wishes: DbWish[];
}

export default function WishesPreview({ wishes }: WishesPreviewProps) {
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isClient, setIsClient] = useState(false);
  
  const reduce = useReducedMotion();

  // Handle responsive count and client hydration
  useEffect(() => {
    setIsClient(true);
    const updateCount = () => {
      if (window.innerWidth >= 1280) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Auto-play logic with dynamic timing based on message length
  useEffect(() => {
    if (isHovered || wishes.length === 0) return;

    // Use the primary visible card to determine reading time
    const primaryWish = wishes[page % wishes.length];
    const charLength = primaryWish?.message?.length || 0;
    
    // ~20 chars per second reading speed. Minimum 9 seconds, Maximum 15 seconds.
    let durationMs = Math.max(9000, (charLength / 20) * 1000);
    durationMs = Math.min(durationMs, 15000);

    const timer = setTimeout(() => {
      setPage((p) => p + 1);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [page, isHovered, wishes]);

  const handleWishClick = () => {
    setIsWishModalOpen(true);
  };

  // Safe subset for rendering (avoid hydration mismatch by defaulting to 1 on server)
  const renderCount = isClient ? visibleCount : 1;
  const wishesToRender = wishes.length > 0 ? Array.from({ length: renderCount }).map((_, i) => {
    const renderIndex = page + i;
    return {
      wish: wishes[renderIndex % wishes.length],
      renderIndex,
    };
  }) : [];

  return (
    <section
      id="wishes"
      aria-label="Words from the heart — guest wishes"
      className="w-full bg-[#FFFEF9] section-pad overflow-hidden"
    >
      <div className="container-e">
        {/* Heading */}
        <div className="text-center max-w-[520px] mx-auto mb-12 md:mb-16">
          <p className="text-eyebrow text-[#C9A96E] mb-5">Guest Wishes</p>
          <h2 className="text-section-heading text-[#1E1E1E] mb-5">
            Words From The Heart
          </h2>
          <p className="text-body text-[#6B6560]">
            Messages of love, from the people who matter most.
          </p>
        </div>

        {/* Infinite Carousel or Empty State */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onTouchCancel={() => setIsHovered(false)}
        >
          {wishes.length > 0 ? (
            <motion.div layout className="flex gap-6 md:gap-8 items-stretch relative min-h-[300px] pb-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {wishesToRender.map(({ wish, renderIndex }) => (
                  <motion.div
                    key={renderIndex}
                    layout
                    initial={{ opacity: 0, x: reduce ? 0 : 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduce ? 0 : -60 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="w-full md:w-[calc(50%-16px)] xl:w-[calc(33.333%-21.33px)] shrink-0 flex flex-col"
                  >
                    <WishCard
                      guestName={wish.name}
                      message={wish.message}
                      relationship={wish.relationship}
                      avatar={null} // Real data doesn't have avatars, fallback to default initials
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="min-h-[150px] flex items-center justify-center">
              <p className="text-body text-[#6B6560] italic opacity-80 text-center">
                The well wishes are rolling in. Be the first to leave one publicly!
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-12 flex flex-col items-center gap-6 relative z-10">
          <Button variant="secondary" onClick={handleWishClick}>
            Leave Your Wish
          </Button>
          {wishes.length > 0 && (
            <a 
              href="/wishes" 
              className="text-sm font-sans font-medium text-[#C9A96E] hover:text-[#B6965B] uppercase tracking-widest transition-colors underline-offset-4 hover:underline"
            >
              View All Wishes
            </a>
          )}
        </div>
      </div>

      <WishFormModal 
        isOpen={isWishModalOpen} 
        onClose={() => setIsWishModalOpen(false)} 
      />
    </section>
  );
}
