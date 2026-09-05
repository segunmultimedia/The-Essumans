"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavLink { label: string; href: string; }

interface MobileNavigationProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileNavigation({
  id,
  isOpen,
  onClose,
  links,
}: MobileNavigationProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock body scroll + focus management
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overlay-open");
      setTimeout(() => closeRef.current?.focus(), 60);
    } else {
      document.body.classList.remove("overlay-open");
    }
    return () => document.body.classList.remove("overlay-open");
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-[#FBF7F1] flex flex-col shadow-2xl"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-[#B89558]/20">
              <span className="font-serif tracking-[0.2em] text-sm text-[#1E1E1E]">
                THE ESSUMAN&apos;S
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close navigation"
                className="flex items-center justify-center w-11 h-11 -mr-2 text-[#1E1E1E] hover:text-[#5C202C] hover:scale-110 hover:-rotate-90 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#B89558] focus-visible:outline-offset-2"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation" className="flex-1 px-7 py-6">
              <ul className="flex flex-col">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.28, ease: "easeOut" }}
                  >
                    <Link
                      ref={i === 0 ? (firstLinkRef as any) : undefined}
                      href={link.href}
                      onClick={onClose}
                      className="block py-4 border-b border-[#B89558]/20 text-nav text-[#1E1E1E] hover:text-[#5C202C] hover:pl-2 transition-all duration-300 focus-visible:outline-none focus-visible:text-[#5C202C]"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer of drawer */}
            <div className="px-7 pb-10 pt-2">
              <p className="font-serif italic text-sm text-[#9A948F]">
                Our Story. Our Memories. Our Forever.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
