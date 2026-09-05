"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { storyMilestones } from "@/data/content";
import ZoomableImage from "./ZoomableImage";

export default function StoryTimeline() {
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
    <div className="mt-16 md:mt-20 lg:mt-24">
      {storyMilestones.map((milestone, i) => {
        const isLast = i === storyMilestones.length - 1;
        const imageRight = i % 2 === 0; // Flip the pattern so first item has text left, image right

        if (isLast) {
          return (
            <motion.div 
              key={milestone.id} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={revealVariants}
              className="pt-12 md:pt-16 mt-12 md:mt-16 border-t border-[#B89558]"
            >
              <div className="max-w-[560px] mx-auto text-center">
                {milestone.year && (
                  <p className="text-eyebrow text-[#5C202C] mb-4">
                    {milestone.year}
                  </p>
                )}
                <h3 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] text-[#1E1E1E] mb-6">
                  {milestone.heading}
                </h3>
                <span className="accent-line mx-auto mb-6" aria-hidden="true" />
                <p className="text-body text-[#6B6560]">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          );
        }

        return (
          <motion.article
            key={milestone.id}
            aria-label={milestone.heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className={[
              "grid grid-cols-1 md:grid-cols-2 items-center",
              "gap-8 md:gap-14 lg:gap-20",
              "pb-14 md:pb-20 lg:pb-24",
              i > 0 ? "mt-14 md:mt-20 lg:mt-24 border-t border-[#B89558] pt-14 md:pt-20 lg:pt-24" : "",
            ].filter(Boolean).join(" ")}
          >
            <div
              className={[
                "w-full order-2",
                imageRight ? "md:order-2" : "md:order-1",
              ].join(" ")}
            >
              {milestone.image ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ZoomableImage
                    src={milestone.image}
                    alt={milestone.imageAlt}
                    wrapperClassName="absolute inset-0 w-full h-full"
                    imageClassName={`object-cover ${milestone.id === 'the-journey' ? 'object-[center_20%]' : milestone.id === 'the-wedding' ? 'object-[center_15%]' : 'object-center'} animate-slow-zoom`}
                    priority={i < 2}
                  />
                </div>
              ) : null}
            </div>

            <div
              className={[
                "flex flex-col order-1",
                imageRight ? "md:order-1" : "md:order-2",
              ].join(" ")}
            >
              {milestone.year && (
                <p className="text-eyebrow text-[#5C202C] mb-4">
                  {milestone.year}
                </p>
              )}
              <h3 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] text-[#1E1E1E] mb-5">
                {milestone.heading}
              </h3>
              <span className="accent-line mb-5" aria-hidden="true" />
              <p className="text-body text-[#6B6560] max-w-[52ch]">
                {milestone.description}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
