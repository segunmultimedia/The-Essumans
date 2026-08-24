"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt to autoplay, but handle browser blocking gracefully
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Keep it soft and romantic
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Browser blocked autoplay (standard behavior).
            // It will remain paused until the user clicks the play button.
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setHasInteracted(true);
      }
    }
  };

  return (
    <>
      {/* 
        The audio source expects a file at public/audio/song.mp4
      */}
      <audio ref={audioRef} src="/audio/song.mp4" loop preload="auto" />
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#FBF7F1] text-[#1E1E1E] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#B89558] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#B89558] focus-visible:outline-offset-2"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 size={18} strokeWidth={1.5} className="text-[#5C202C]" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={18} strokeWidth={1.5} className="text-[#9A948F]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when not playing to encourage click if autoplay was blocked */}
        {!isPlaying && !hasInteracted && (
          <span className="absolute inset-0 rounded-full border border-[#B89558] animate-ping opacity-20 pointer-events-none" />
        )}
      </motion.button>
    </>
  );
}
