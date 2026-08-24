"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-full ${success ? "max-w-sm" : "max-w-md"} mx-auto bg-[#FBF7F1] rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#FBF7F1] flex flex-col my-auto`}
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
                  className="flex flex-col"
                >
                  {/* Header */}
                  <div className="relative px-6 pt-8 pb-5 border-b border-[#FBF7F1] text-center shrink-0">
                    <button
                      ref={closeRef}
                      onClick={onClose}
                      aria-label="Close modal"
                      className="absolute top-4 right-4 text-[#6B6560] hover:text-[#5C202C] hover:scale-110 hover:-rotate-90 transition-all duration-300 p-1"
                    >
                      <X size={24} strokeWidth={1} />
                    </button>
                    <h2 className="text-3xl font-serif text-[#1E1E1E] mb-2">
                      Share a Memory
                    </h2>
                    <p className="text-sm text-[#6B6560] max-w-[32ch] mx-auto leading-relaxed">
                      Share a short, unforgettable memory you had with Kristine or Kwabena.
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {error && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-sm border border-red-100">
                          {error}
                        </div>
                      )}

                      <div>
                        <label htmlFor="name" className="block text-sm text-[#1E1E1E] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          maxLength={100}
                          className="w-full px-3 py-2.5 rounded-sm border border-[#FBF7F1] bg-[#FBF7F1] focus:outline-none focus:ring-1 focus:ring-[#B89558] focus:border-[#B89558] transition-colors text-[#1E1E1E]"
                        />
                      </div>

                      <div>
                        <label htmlFor="relationship" className="block text-sm text-[#1E1E1E] mb-1.5">
                          Relationship to the Couple <span className="text-[#6B6560]">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="relationship"
                          name="relationship"
                          maxLength={100}
                          className="w-full px-3 py-2.5 rounded-sm border border-[#FBF7F1] bg-[#FBF7F1] focus:outline-none focus:ring-1 focus:ring-[#B89558] focus:border-[#B89558] transition-colors text-[#1E1E1E]"
                        />
                      </div>

                      <div>
                        <label htmlFor="memory" className="block text-sm text-[#1E1E1E] mb-1.5">
                          Your Memory *
                        </label>
                        <textarea
                          id="memory"
                          name="memory"
                          required
                          maxLength={2000}
                          rows={4}
                          value={memoryText}
                          onChange={handleMemoryChange}
                          className="w-full px-3 py-2.5 rounded-sm border border-[#FBF7F1] bg-[#FBF7F1] focus:outline-none focus:ring-1 focus:ring-[#B89558] focus:border-[#B89558] transition-colors text-[#1E1E1E] resize-y placeholder:text-[#6B6560]/50 placeholder:font-serif placeholder:italic"
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
                            className="flex items-center gap-3 text-left group cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#B89558] rounded-sm p-1 -ml-1 hover:-translate-y-1 transition-transform duration-200"
                          >
                            <div className="w-9 h-9 rounded-full border border-[#FBF7F1] flex items-center justify-center text-[#5C202C] group-hover:bg-[#FBF7F1] transition-colors shrink-0">
                              <ImageIcon size={16} strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-[#1E1E1E] group-hover:text-[#5C202C] transition-colors">
                                Add a photo
                              </span>
                              <span className="text-[11px] text-[#6B6560]">
                                Optional · JPG, PNG or WEBP
                              </span>
                            </div>
                          </button>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-sm border border-[#FBF7F1] overflow-hidden shrink-0 bg-[#FBF7F1]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src={photoPreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm text-[#1E1E1E] truncate max-w-[200px]">
                                {photoFile?.name}
                              </span>
                              <div className="flex gap-2 text-xs mt-0.5">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="text-[#5C202C] hover:text-[#5C202C] hover:scale-105 transition-all duration-200"
                                >
                                  Change
                                </button>
                                <span className="text-[#FBF7F1]">|</span>
                                <button
                                  type="button"
                                  onClick={handleRemovePhoto}
                                  className="text-[#6B6560] hover:text-red-500 hover:scale-105 transition-all duration-200"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-6">
                        <Button
                          variant="primary"
                          fullWidth
                          disabled={isPending}
                          className="rounded-sm"
                        >
                          {isPending ? "SUBMITTING..." : "SHARE MEMORY"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-center px-8 py-12"
                >
                  <div className="w-12 h-12 border border-[#FBF7F1] text-[#5C202C] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-serif text-[#1E1E1E] mb-3">Memory received.</h4>
                  <p className="text-[#6B6560] leading-relaxed mb-8 text-sm max-w-[32ch] mx-auto">
                    Thank you for sharing this special moment. 
                    <br className="hidden sm:block" />
                    Your memory will appear after it has been reviewed.
                  </p>
                  <Button variant="secondary" onClick={onClose} className="rounded-sm w-[140px] mx-auto">
                    CLOSE
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
