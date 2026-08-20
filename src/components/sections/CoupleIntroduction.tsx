"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { coupleIntroduction } from "@/data/content";

export default function CoupleIntroduction() {
  const reduce = useReducedMotion();

  const revealVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section
      id="introduction"
      aria-label="Couple Introduction"
      className="w-full bg-[#FAF8F5] section-pad overflow-hidden"
    >
      <div className="container-e">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">

          {/* Photograph — portrait aspect with scroll reveal */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="relative w-full max-w-[480px] mx-auto lg:max-w-none"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={coupleIntroduction.image}
                alt={coupleIntroduction.imageAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover object-top transition-transform duration-[1.5s] hover:scale-[1.03]"
                quality={85}
              />
            </div>
            {/* Champagne bottom accent */}
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A96E]"
              aria-hidden="true"
            />
          </motion.div>

          {/* Text block with staggered scroll reveal */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col items-start max-w-[480px] mx-auto lg:max-w-none"
          >
            {/* Eyebrow */}
            <motion.p variants={revealVariants} className="text-eyebrow text-[#C9A96E] mb-5">
              {coupleIntroduction.subheading}
            </motion.p>

            {/* Heading */}
            <motion.h2 variants={revealVariants} className="text-section-heading text-[#1E1E1E] mb-7">
              {coupleIntroduction.heading}
            </motion.h2>

            {/* Accent line */}
            <motion.span variants={revealVariants} className="accent-line mb-7" aria-hidden="true" />

            {/* Body — constrained line length */}
            <motion.p variants={revealVariants} className="text-body text-[#6B6560] max-w-[52ch]">
              {coupleIntroduction.body}
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
