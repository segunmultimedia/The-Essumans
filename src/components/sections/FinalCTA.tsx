"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { ComingSoonFeedback } from "@/components/ui/ComingSoonFeedback";

export default function FinalCTA() {
  const [wishFeedback,   setWishFeedback]   = useState(false);
  const [memoryFeedback, setMemoryFeedback] = useState(false);

  const handleWish = () => {
    setWishFeedback(true);
    setTimeout(() => setWishFeedback(false), 4000);
  };

  const handleMemory = () => {
    setMemoryFeedback(true);
    setTimeout(() => setMemoryFeedback(false), 4000);
  };

  return (
    <section
      aria-label="Be Part of Their Story"
      className="w-full bg-[#EDE7DC] section-pad"
    >
      <div className="container-e">
        <div className="max-w-[600px] mx-auto text-center">
          <span className="accent-line mx-auto mb-8" aria-hidden="true" />

          <h2 className="text-section-heading text-[#1E1E1E] mb-6">
            Be Part of Their Story
          </h2>

          <p
            className="text-body text-[#6B6560] mb-12 max-w-[52ch] mx-auto"
          >
            Leave a message, share a memory, and celebrate the beginning of
            forever with The Essumans.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button variant="primary" onClick={handleWish}>
              Leave a Wish
            </Button>
            <Button variant="secondary" onClick={handleMemory}>
              Share a Memory
            </Button>
          </div>

          {/* Feedback messages */}
          <ComingSoonFeedback
            show={wishFeedback}
            message="Wish submissions will open soon — we look forward to reading yours."
          />
          <ComingSoonFeedback
            show={memoryFeedback}
            message="Memory sharing will open soon — your story matters to them."
          />
        </div>
      </div>
    </section>
  );
}
