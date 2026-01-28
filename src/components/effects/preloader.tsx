"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloader } from "@/hooks";
import { Logo } from "@/components/ui";

// Power ease for smooth transitions
const powerEase = [0.76, 0, 0.24, 1] as const;

export function Preloader() {
  const { isLoading, progress, hasShownPreloader } = usePreloader();

  useEffect(() => {
    if (isLoading) {
      // Prevent scrolling during preloader
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Don't render if already shown this session
  if (hasShownPreloader && !isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#111111] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: powerEase,
            },
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: powerEase }}
          >
            <Logo variant="light" size="hero" />
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Progress bar */}
            <div className="w-32 h-px bg-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress text */}
            <motion.span
              className="text-white/60 text-xs font-body tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
