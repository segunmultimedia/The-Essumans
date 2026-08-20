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
          className="object-cover object-center"
          quality={90}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* Content — vertically centered, not crammed */}
      <div className="relative z-10 container-e flex flex-col items-center text-center">

        {/* Brand mark — dominant */}
        <motion.h1
          {...fade(0.25)}
          className="text-hero !text-white mb-6"
        >
          THE ESSUMAN&apos;S
        </motion.h1>

        {/* Champagne rule */}
        <motion.span
          {...fade(0.45)}
          className="accent-line mx-auto mb-7"
          aria-hidden="true"
        />

        {/* Couple names */}
        <motion.p
          {...fade(0.6)}
          className="text-script text-white/95"
          style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
        >
          {heroContent.coupleNames}
        </motion.p>

        {/* Wedding date */}
        <motion.p
          {...fade(0.72)}
          className="text-eyebrow text-white/65 mt-3 mb-8"
        >
          {heroContent.date}
        </motion.p>

        {/* Tagline */}
        <motion.p
          {...fade(0.84)}
          className="font-serif italic text-white/75 mb-12 max-w-md"
          style={{ fontSize: "clamp(1.0625rem, 1.8vw, 1.25rem)" }}
        >
          &ldquo;{heroContent.tagline}&rdquo;
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.98)}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <a href="#our-story" className="w-full sm:w-auto">
            <Button variant="primary" fullWidth>
              {heroContent.primaryCTA}
            </Button>
          </a>
          <a href="#wishes" className="w-full sm:w-auto">
            <Button variant="ghost-light" fullWidth>
              {heroContent.secondaryCTA}
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
