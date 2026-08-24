"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import { submitMemory } from "@/app/actions/memory";

interface MemoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoryFormModal({ isOpen, onClose }: MemoryFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [memoryText, setMemoryText] = useState("");
  const wordCount = memoryText.trim() === "" ? 0 : memoryText.trim().split(/\s+/).filter(Boolean).length;

  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleMemoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    let count = 0;
    let cutoffIndex = text.length;
    let inWord = false;
    
    for (let i = 0; i < text.length; i++) {
       if (/\s/.test(text[i])) {
           inWord = false;
       } else {
           if (!inWord) {
               count++;
               if (count > 80) {
                   cutoffIndex = i;
                   break;
               }
               inWord = true;
           }
       }
    }
    
    setMemoryText(text.substring(0, cutoffIndex));
  };

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
        setPhotoFile(null);
        setPhotoPreview(null);
        setMemoryText("");
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type on client
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    // Validate size on client (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5 MB.");
      return;
    }

    setError(null);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    if (photoFile) {
      formData.set("photo", photoFile);
    } else {
      formData.delete("photo");
    }

    const result = await submitMemory(formData);
    
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
          aria-label="Share a Memory"
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
                      Share a Memory
                    </h3>
                    <p className="text-[#6B6560] text-sm leading-relaxed max-w-[300px] mx-auto">
                      Share a short, unforgettable memory you had with Kristine or Kwabena.
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
                            Your Name
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
                          <label htmlFor="memory" className="block text-[13px] font-medium text-[#1E1E1E] mb-2 uppercase tracking-wide">
                            Your Memory
                          </label>
                          <textarea
                            id="memory"
                            name="memory"
                            required
                            maxLength={2000}
                            rows={4}
                            value={memoryText}
                            onChange={handleMemoryChange}
                            className="w-full px-4 py-3.5 border border-[#B89558]/30 bg-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C202C] focus:border-[#5C202C] transition-all text-[#1E1E1E] placeholder:text-[#6B6560]/40 resize-y"
                            placeholder="Share your memory..."
                          />
                          <div className="flex justify-end mt-1.5">
                            <span className={`text-[11px] ${wordCount >= 80 ? 'text-[#5C202C]' : 'text-[#6B6560]'}`}>
                              {wordCount} / 80 words
                            </span>
                          </div>
                        </div>

                        {/* Photo Upload Area */}
                        <div className="pt-2">
                          <input 
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                          />

                          {!photoPreview ? (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="flex items-center gap-4 text-left group cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#5C202C] w-full p-3 border border-[#B89558]/30 bg-white/60 hover:bg-white transition-all"
                            >
                              <div className="w-10 h-10 rounded-full border border-[#B89558]/20 flex items-center justify-center text-[#5C202C] group-hover:bg-[#FBF7F1] transition-colors shrink-0">
                                <ImageIcon size={18} strokeWidth={1.5} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-[#1E1E1E] group-hover:text-[#5C202C] transition-colors uppercase tracking-wide">
                                  Add a photo
                                </span>
                                <span className="text-[12px] text-[#6B6560]">
                                  Optional · JPG, PNG or WEBP
                                </span>
                              </div>
                            </button>
                          ) : (
                            <div className="flex items-center gap-4 p-3 border border-[#B89558]/30 bg-white/60">
                              <div className="w-14 h-14 border border-[#B89558]/20 overflow-hidden shrink-0 bg-[#FBF7F1]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={photoPreview} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-[#1E1E1E] truncate max-w-[200px]">
                                  {photoFile?.name}
                                </span>
                                <div className="flex gap-3 text-xs mt-1 font-medium tracking-wide uppercase">
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-[#5C202C] hover:text-[#4A1923] transition-colors"
                                  >
                                    Change
                                  </button>
                                  <span className="text-[#B89558]/30">|</span>
                                  <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    className="text-[#6B6560] hover:text-[#5C202C] transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
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
                              <span className="opacity-0">Share Memory</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin" />
                              </div>
                            </>
                          ) : (
                            "Share Memory"
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
                  <h4 className="text-3xl font-serif text-[#5C202C] mb-4">Memory received.</h4>
                  <p className="text-[#6B6560] leading-relaxed mb-10 text-sm max-w-[280px] mx-auto">
                    Thank you for sharing this special moment.
                    <br className="hidden sm:block" />
                    It will appear after review.
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
