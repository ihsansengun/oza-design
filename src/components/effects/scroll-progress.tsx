"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
  showOnlyOnLongPages?: boolean;
  minPageHeight?: number; // Minimum page height to show (in vh)
}

export function ScrollProgress({
  color = "var(--color-accent)",
  height = 2,
  zIndex = 9990,
  showOnlyOnLongPages = true,
  minPageHeight = 150, // Only show if page is taller than 150vh
}: ScrollProgressProps) {
  const [shouldShow, setShouldShow] = useState(!showOnlyOnLongPages);
  const { scrollYProgress } = useScroll();

  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!showOnlyOnLongPages) return;

    const checkPageHeight = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const heightRatio = pageHeight / viewportHeight;
      setShouldShow(heightRatio > minPageHeight / 100);
    };

    checkPageHeight();
    window.addEventListener("resize", checkPageHeight);

    return () => window.removeEventListener("resize", checkPageHeight);
  }, [showOnlyOnLongPages, minPageHeight]);

  if (!shouldShow) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        height,
        backgroundColor: color,
        scaleX,
        zIndex,
      }}
    />
  );
}
