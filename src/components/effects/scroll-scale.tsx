"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollScaleProps {
  children: ReactNode;
  scaleFrom?: number;
  scaleTo?: number;
  opacityFrom?: number;
  opacityTo?: number;
  className?: string;
  pinned?: boolean;
  pinnedHeight?: string;
}

export function ScrollScale({
  children,
  scaleFrom = 0.8,
  scaleTo = 1,
  opacityFrom = 0.6,
  opacityTo = 1,
  className = "",
  pinned = false,
  pinnedHeight = "150vh",
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned
      ? ["start start", "end start"]
      : ["start 0.9", "start 0.2"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacityFrom, opacityTo, opacityTo]
  );

  if (pinned) {
    return (
      <div ref={ref} className={`relative ${className}`} style={{ height: pinnedHeight }}>
        <motion.div
          className="sticky top-0 h-screen w-full flex items-center justify-center"
          style={{ scale, opacity }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

// Variant that scales down as you scroll past
interface ScrollScaleOutProps {
  children: ReactNode;
  className?: string;
}

export function ScrollScaleOut({ children, className = "" }: ScrollScaleOutProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{ scale, opacity, y }}
    >
      {children}
    </motion.div>
  );
}
