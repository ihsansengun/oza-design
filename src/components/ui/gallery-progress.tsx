"use client";

import { useState, useEffect, RefObject } from "react";
import { motion } from "framer-motion";

interface GalleryProgressProps {
  containerRef: RefObject<HTMLDivElement | null>;
  dark?: boolean;
}

export function GalleryProgress({
  containerRef,
  dark = false,
}: GalleryProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;

      if (maxScroll > 0) {
        setIsScrollable(true);
        setProgress(scrollLeft / maxScroll);
      } else {
        setIsScrollable(false);
      }
    };

    updateProgress();
    container.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      container.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [containerRef]);

  if (!isScrollable) return null;

  return (
    <div className="px-6 md:px-10 mt-8">
      <div
        className={`h-px ${dark ? "bg-white/10" : "bg-stone-200"} relative overflow-hidden`}
      >
        <motion.div
          className={`absolute top-0 left-0 h-full ${dark ? "bg-white/40" : "bg-stone-400"}`}
          style={{ width: "20%" }}
          animate={{ x: `${progress * 400}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>
    </div>
  );
}
