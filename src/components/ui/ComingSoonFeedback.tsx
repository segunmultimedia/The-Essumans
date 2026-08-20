"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface ComingSoonFeedbackProps {
  show: boolean;
  message?: string;
}

/** Inline "coming soon" feedback — elegant, not a browser alert */
export function ComingSoonFeedback({
  show,
  message = "This will open soon — we can't wait to hear from you.",
}: ComingSoonFeedbackProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="font-serif italic text-base text-[#C9A96E] mt-5 text-center"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
