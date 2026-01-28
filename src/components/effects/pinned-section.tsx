"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface PinnedSectionProps {
  children: ReactNode;
  height?: string;
  className?: string;
  fadeOut?: boolean;
  scaleDown?: boolean;
  blur?: boolean;
}

export function PinnedSection({
  children,
  height = "200vh",
  className = "",
  fadeOut = false,
  scaleDown = false,
  blur = false,
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    fadeOut ? [1, 1, 0] : [1, 1, 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleDown ? [1, 0.85] : [1, 1]
  );

  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    blur ? [0, 0, 10] : [0, 0, 0]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height }}
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          opacity,
          scale,
          filter: useTransform(blurValue, (v) => `blur(${v}px)`),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Variant with progress passed to children
interface PinnedSectionWithProgressProps {
  children: (progress: MotionValue<number>) => ReactNode;
  height?: string;
  className?: string;
}

export function PinnedSectionWithProgress({
  children,
  height = "200vh",
  className = "",
}: PinnedSectionWithProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
