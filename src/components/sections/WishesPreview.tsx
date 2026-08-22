"use client";

import { useState } from "react";
import { sampleWishes } from "@/data/content";
import WishCard from "@/components/ui/WishCard";
import Button from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import WishFormModal from "@/components/ui/WishFormModal";

export default function WishesPreview() {
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const reduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const handleWishClick = () => {
    setIsWishModalOpen(true);
  };

  return (
    <section
      id="wishes"
      aria-label="Words from the heart — guest wishes"
      className="w-full bg-[#FFFEF9] section-pad"
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

        {/* Cards — 1 col → 2 col tablet → 3 col desktop with stagger reveal */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {sampleWishes.map((wish) => (
            <motion.div key={wish.id} variants={cardVariants} className="h-full">
              <WishCard
                guestName={wish.guestName}
                message={wish.message}
                relationship={wish.relationship}
                avatar={wish.avatar}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <Button variant="secondary" onClick={handleWishClick}>
            Leave Your Wish
          </Button>
        </div>
      </div>

      <WishFormModal 
        isOpen={isWishModalOpen} 
        onClose={() => setIsWishModalOpen(false)} 
      />
    </section>
  );
}
