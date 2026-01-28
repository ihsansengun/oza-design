"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type RevealType = "wipe-up" | "wipe-down" | "wipe-center" | "curtain" | "diagonal";

interface ImageRevealMaskProps {
  children: ReactNode;
  type?: RevealType;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

// Power ease for smooth reveals
const powerEase = [0.76, 0, 0.24, 1] as const;

const getClipPath = (type: RevealType, progress: number) => {
  switch (type) {
    case "wipe-up":
      return `inset(${100 - progress * 100}% 0 0 0)`;
    case "wipe-down":
      return `inset(0 0 ${100 - progress * 100}% 0)`;
    case "wipe-center":
      const halfProgress = (1 - progress) * 50;
      return `inset(${halfProgress}% 0 ${halfProgress}% 0)`;
    case "curtain":
      const curtainProgress = (1 - progress) * 50;
      return `inset(0 ${curtainProgress}% 0 ${curtainProgress}%)`;
    case "diagonal":
      return `polygon(0 ${100 - progress * 100}%, ${progress * 100}% 0, 100% ${progress * 100}%, ${100 - progress * 100}% 100%)`;
    default:
      return `inset(${100 - progress * 100}% 0 0 0)`;
  }
};

export function ImageRevealMask({
  children,
  type = "wipe-up",
  duration = 1.2,
  delay = 0,
  className = "",
  once = true,
}: ImageRevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: getClipPath(type, 0) }}
        animate={{
          clipPath: isInView ? getClipPath(type, 1) : getClipPath(type, 0)
        }}
        transition={{
          duration,
          delay,
          ease: powerEase,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
