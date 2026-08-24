"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { submitWish } from "@/app/actions/wish";

interface WishFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishFormModal({ isOpen, onClose }: WishFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Focus management and body scroll lock
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => closeRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
      // Reset form state on close after animation
      setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitWish(formData);
    
    setIsPending(false);
    
    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Leave a Wish"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1E1E]/40 backdrop-blur-[2px] p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={"w-full max-w-[480px] bg-[#FBF7F1] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] relative"}
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 overflow-hidden"
                >
                  {/* Elegant Close Button */}
                  <button
                    ref={closeRef}
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-5 right-5 text-[#6B6560] hover:text-[#5C202C] transition-colors z-10 p-2"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>

                  {/* Header */}
                  <div className="px-8 pt-10 pb-4 shrink-0 text-center">
                    <p className="text-eyebrow text-[#B89558] mb-3 tracking-widest text-[10px] uppercase">The Essumans</p>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#5C202C] mb-3">
                      Leave a Wish
                    </h3>
                    <p className="text-[#6B6560] text-sm leading-relaxed max-w-[300px] mx-auto">
                      Share your blessings, advice, and warmest wishes for Kwabena and Kristine.
                    </p>
                  </div>

                  {/* Body */}
                  <div className="px-8 pb-10 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                      {error && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm border border-red-100">
                          {error}
                        </div>
                      )}
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-[13px] font-medium text-[#1E1E1E] mb-2 uppercase tracking-wide">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            maxLength={100}
                            className="w-full px-4 py-3.5 border border-[#B89558]/30 bg-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C202C] focus:border-[#5C202C] transition-all text-[#1E1E1E] placeholder:text-[#6B6560]/40"
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <label htmlFor="relationship" className="block text-[13px] font-medium text-[#1E1E1E] mb-2 uppercase tracking-wide">
                            Relationship <span className="text-[#6B6560] font-normal normal-case tracking-normal ml-1">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            id="relationship"
                            name="relationship"
                            maxLength={100}
                            className="w-full px-4 py-3.5 border border-[#B89558]/30 bg-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C202C] focus:border-[#5C202C] transition-all text-[#1E1E1E] placeholder:text-[#6B6560]/40"
                            placeholder="e.g. Friend, Cousin, Colleague"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-[13px] font-medium text-[#1E1E1E] mb-2 uppercase tracking-wide">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            maxLength={1000}
                            rows={4}
                            className="w-full px-4 py-3.5 border border-[#B89558]/30 bg-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C202C] focus:border-[#5C202C] transition-all text-[#1E1E1E] placeholder:text-[#6B6560]/40 resize-y"
                            placeholder="Write your message here..."
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isPending}
                          className="relative w-full bg-[#5C202C] text-white py-4 px-8 text-sm font-medium tracking-wide uppercase hover:bg-[#4A1923] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isPending ? (
                            <>
                              <span className="opacity-0">Submit Wish</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin" />
                              </div>
                            </>
                          ) : (
                            "Submit Wish"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-center px-8 py-16 overflow-y-auto"
                >
                  <div className="w-16 h-16 bg-[#5C202C]/10 text-[#5C202C] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-serif text-[#5C202C] mb-4">Thank you!</h4>
                  <p className="text-[#6B6560] leading-relaxed mb-10 text-sm max-w-[280px] mx-auto">
                    Your wish has been submitted successfully and is awaiting approval.
                  </p>
                  <button 
                    onClick={onClose}
                    className="w-full bg-[#1E1E1E] text-white py-4 px-8 text-sm font-medium tracking-wide uppercase hover:bg-black transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
