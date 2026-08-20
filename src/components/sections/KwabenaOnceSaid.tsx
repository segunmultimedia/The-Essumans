"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { kwabenaQuotes } from "@/data/content";
import { DecorativeLeaf } from "@/components/ui/DecorativeLeaf";

export default function KwabenaOnceSaid() {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();
  const total  = kwabenaQuotes.length;
  const quote  = kwabenaQuotes[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 7000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section
      id="kwabena-once-said"
      aria-label="Kwabena Once Said"
      className="w-full bg-[#1E1E1E] section-pad overflow-hidden"
    >
      <div className="container-e">
        {/* Constrained centered content — not the full 1280px width */}
        <div className="max-w-[760px] mx-auto text-center">

          {/* Eyebrow changed per user request */}
          <p className="text-eyebrow text-[#C9A96E] mb-14">
            Kwabena Once Said
          </p>

          {/* Quote display — live region for screen readers */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="relative min-h-[200px] flex flex-col items-center justify-center"
          >
            {/* Decorative large quote mark — positioned behind */}
            <span
              aria-hidden="true"
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-serif leading-none text-white/[0.05] pointer-events-none select-none"
              style={{ fontSize: "clamp(6rem, 15vw, 10rem)" }}
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={quote.id}
                initial={reduce ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -24 }}
                transition={{ duration: 1.5, ease: "easeInOut" as const }}
                className="flex flex-col items-center relative z-10"
              >
                {/* Quote text */}
                <blockquote
                  className="font-serif italic text-white leading-relaxed mb-8"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)" }}
                >
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>

                {/* Context */}
                {quote.context && (
                  <p className="font-sans font-300 text-xs text-[#6B6560] tracking-wide mb-5 italic">
                    {quote.context}
                  </p>
                )}

                {/* Attribution */}
                <footer className="flex items-center gap-3">
                  <div className="text-[#C9A96E] opacity-60 rotate-90" aria-hidden="true">
                    <DecorativeLeaf width={14} height={14} />
                  </div>
                  <cite className="not-italic font-sans text-[11px] tracking-[0.15em] uppercase text-[#C9A96E]">
                    As told by {quote.attributedBy}
                  </cite>
                  <div className="text-[#C9A96E] opacity-60 -rotate-90" aria-hidden="true">
                    <DecorativeLeaf width={14} height={14} />
                  </div>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
