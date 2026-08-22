"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={onClose}
        >
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`w-full ${success ? "max-w-sm" : "max-w-lg"} bg-[#FFFEF9] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
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
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDE7DC] shrink-0">
                    <h3 className="text-section-heading text-[#1E1E1E] text-2xl !mb-0">
                      Leave a Wish
                    </h3>
                    <button
                      ref={closeRef}
                      onClick={onClose}
                      aria-label="Close modal"
                      className="text-[#6B6560] hover:text-[#1E1E1E] transition-colors"
                    >
                      <X size={24} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {error && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                          {error}
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#1E1E1E] mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          maxLength={100}
                          className="w-full px-4 py-3 rounded-lg border border-[#EDE7DC] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-colors text-[#1E1E1E] placeholder:text-[#6B6560]/50"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="relationship" className="block text-sm font-medium text-[#1E1E1E] mb-1">
                          Relationship <span className="text-[#6B6560] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="relationship"
                          name="relationship"
                          maxLength={100}
                          className="w-full px-4 py-3 rounded-lg border border-[#EDE7DC] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-colors text-[#1E1E1E] placeholder:text-[#6B6560]/50"
                          placeholder="e.g. Friend, Cousin, Colleague"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[#1E1E1E] mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          maxLength={1000}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-[#EDE7DC] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E] transition-colors text-[#1E1E1E] placeholder:text-[#6B6560]/50 resize-y"
                          placeholder="Write your wish for Kwabena & Kristine..."
                        />
                      </div>
                      
                      <div className="pt-2">
                        <Button
                          variant="primary"
                          fullWidth
                          disabled={isPending}
                          className="relative"
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
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-center p-8 md:p-10 overflow-y-auto"
                >
                  <div className="w-16 h-16 bg-[#EDE7DC] text-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-serif text-[#1E1E1E] mb-4">Thank you!</h4>
                  <p className="text-[#6B6560] leading-relaxed mb-8">
                    Your wish has been submitted successfully and is awaiting approval. 
                    <br className="hidden sm:block" />
                    Once approved, it will appear on the website.
                  </p>
                  <Button variant="primary" fullWidth onClick={onClose}>
                    Close
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
