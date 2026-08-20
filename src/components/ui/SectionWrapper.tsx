"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Extra-tight padding variant for sections that manage their own spacing */
  tight?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  tight = false,
}: SectionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`w-full ${tight ? "py-16 md:py-20" : "py-20 md:py-28 lg:py-36"} ${className}`}
    >
      {children}
    </motion.section>
  );
}
