"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { heroContent } from "@/data/content";
import Button from "@/components/ui/Button";

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  const fade = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.85, ease: "easeOut" as const },
  });

  return (
    <section
      id="home"
      aria-label="Hero — Kwabena and Kristine"
      className="relative w-full h-svh min-h-[640px] max-h-[1080px] flex items-center justify-center overflow-hidden"
    >
      {/* Full-bleed photograph with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: reduce ? 0 : y, scale: 1.05 }} // Slight scale prevents edge gaps during parallax
      >
        <Image
          src={heroContent.heroImage}
          alt={heroContent.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[center_20%] lg:object-[center_20%]"
          quality={90}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* Content — vertically centered, not crammed */}
      <div className="relative z-10 container-e flex flex-col items-center text-center -mt-32 md:-mt-40">

        {/* Brand mark — dominant */}
        <motion.h1
          {...fade(0.25)}
          className="text-hero !text-white mb-6"
        >
          THE ESSUMANS
        </motion.h1>

        {/* Accent rule */}
        <motion.span
          {...fade(0.45)}
          className="accent-line !bg-white mx-auto mb-7"
          aria-hidden="true"
        />

        {/* Couple names */}
        <motion.p
          {...fade(0.6)}
          className="text-script text-white/95 whitespace-nowrap"
          style={{ fontSize: "clamp(2.25rem, 8.5vw, 4.5rem)" }}
        >
          {heroContent.coupleNames}
        </motion.p>

        {/* Wedding date */}
        <motion.p
          {...fade(0.72)}
          className="text-eyebrow text-white/65 mt-1"
        >
          {heroContent.date}
        </motion.p>
      </div>

      {/* CTAs - Anchored to bottom */}
      <motion.div
        {...fade(0.98)}
        className="absolute z-10 bottom-10 md:bottom-16 left-0 right-0 px-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
      >
        <a href="#wishes" className="w-full sm:w-max min-w-[200px]">
          <Button variant="primary" fullWidth>
            {heroContent.secondaryCTA}
          </Button>
        </a>
        <a href="#our-story" className="w-full sm:w-max min-w-[200px]">
          <Button variant="ghost-light" fullWidth>
            {heroContent.primaryCTA}
          </Button>
        </a>
      </motion.div>
    </section>
  );
}
