"use client";

import { useState, useEffect, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollArrowsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  dark?: boolean;
}

export function ScrollArrows({ containerRef, dark = false }: ScrollArrowsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [containerRef]);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.6;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const baseClasses = dark
    ? "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40"
    : "bg-black/5 hover:bg-black/10 text-stone-700 border-stone-200 hover:border-stone-400";

  return (
    <>
      {/* Left Arrow */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-20",
              "w-12 h-12 rounded-full border",
              "flex items-center justify-center",
              "transition-colors duration-200",
              "hidden md:flex",
              baseClasses
            )}
            aria-label="Scroll left"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right Arrow */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-20",
              "w-12 h-12 rounded-full border",
              "flex items-center justify-center",
              "transition-colors duration-200",
              "hidden md:flex",
              baseClasses
            )}
            aria-label="Scroll right"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
