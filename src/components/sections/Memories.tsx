"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import MemoryItem from "@/components/ui/MemoryItem";

interface DbMemory {
  id: string;
  name: string;
  memory: string;
  relationship: string | null;
  photoUrl: string | null;
}

interface MemoriesProps {
  memories: DbMemory[];
}

export default function Memories({ memories }: MemoriesProps) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const total = memories.length;

  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 8000);
    return () => clearInterval(timer);
  }, [total]);

  const memory = total > 0 ? memories[current] : null;

  return (
    <section
      id="memories"
      aria-label="Memories with Kwabena"
      className="w-full bg-[#FAF8F5] section-pad overflow-hidden"
    >
      <div className="container-e">
        {/* Two-column editorial layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Left — heading block, sticky on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-eyebrow text-[#C9A96E] mb-5">People & Stories</p>
            <h2 className="text-section-heading text-[#1E1E1E] mb-5">
              Memories With Kwabena
            </h2>
            <span className="accent-line mb-6" aria-hidden="true" />
            <p className="text-body text-[#6B6560] max-w-[36ch] mb-8">
              Stories from the people who have shared the journey with him.
            </p>
            
            {/* Carousel indicators */}
            {total > 0 && (
              <div className="flex gap-2.5" aria-hidden="true">
                {memories.map((_, i) => (
                  <span
                    key={i}
                    className={`transition-all duration-500 rounded-full ${
                      i === current
                        ? "w-8 h-1.5 bg-[#C9A96E]"
                        : "w-2 h-2 bg-[#DDD8D0]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right — memory carousel (slides right to left) */}
          <div className="relative min-h-[300px]">
            {total > 0 && memory ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={memory.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full"
                >
                  <MemoryItem
                    contributorName={memory.name}
                    relationship={memory.relationship}
                    memory={memory.memory}
                    photo={memory.photoUrl}
                    isLast={true} /* Removes the bottom border since it's a carousel */
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-full flex items-center justify-center min-h-[300px] border border-dashed border-[#DDD8D0] rounded-xl p-8">
                <p className="text-body text-[#6B6560] italic opacity-80 text-center">
                  Beautiful memories are being collected. They will appear here soon.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
