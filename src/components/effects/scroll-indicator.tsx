"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollIndicatorProps {
  text?: string;
  className?: string;
  targetId?: string; // ID of element to scroll to
  showUntilScroll?: number; // Hide after scrolling this many pixels
}

export function ScrollIndicator({
  text = "Scroll",
  className = "",
  targetId,
  showUntilScroll = 100,
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < showUntilScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showUntilScroll]);

  const handleClick = useCallback(() => {
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll down one viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [targetId]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={handleClick}
          className={`flex flex-col items-center gap-3 cursor-pointer ${className}`}
          aria-label="Scroll to content"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-current opacity-60">
            {text}
          </span>

          {/* Animated line */}
          <motion.div
            className="w-px h-8 bg-current opacity-40"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top" }}
          />

          {/* Animated arrow */}
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="opacity-60"
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M6 1L6 11M6 11L1 6M6 11L11 6"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
