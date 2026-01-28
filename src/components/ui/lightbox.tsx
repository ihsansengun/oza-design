"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLockScroll } from "@/hooks";

interface MediaItem {
  url: string;
  alt: string;
  type?: "image" | "video";
}

interface LightboxProps {
  images: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onGoTo?: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onGoTo,
}: LightboxProps) {
  useLockScroll(isOpen);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrevious]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const currentItem = images[currentIndex];
  if (!currentItem) return null;

  const isVideo = currentItem.type === "video";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/95"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 text-xs md:text-sm text-white/60 font-light tracking-wider">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Main content */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-12 lg:p-20"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {isVideo ? (
                <video
                  src={currentItem.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain"
                  playsInline
                />
              ) : (
                <Image
                  src={currentItem.url}
                  alt={currentItem.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>
          </motion.div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              {/* Previous */}
              <button
                onClick={onPrevious}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors group"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:-translate-x-1" />
              </button>

              {/* Next */}
              <button
                onClick={onNext}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors group"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-1" />
              </button>
            </>
          )}

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={onClose} />

          {/* Progress dots */}
          {images.length > 1 && images.length <= 12 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-1.5 md:gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onGoTo?.(idx)}
                    className={`h-1.5 md:h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? "bg-white w-4 md:w-6"
                        : "bg-white/30 hover:bg-white/50 w-1.5 md:w-2"
                    }`}
                    aria-label={`Go to item ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Progress bar for many images */}
          {images.length > 12 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 w-32 md:w-48">
              <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={false}
                  animate={{
                    width: `${((currentIndex + 1) / images.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
