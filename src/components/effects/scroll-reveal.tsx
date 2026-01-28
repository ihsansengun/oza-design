"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "center";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  className?: string;
  delay?: number;
}

const getClipPathValues = (direction: RevealDirection): [string, string] => {
  switch (direction) {
    case "up":
      return ["inset(100% 0 0 0)", "inset(0% 0 0 0)"];
    case "down":
      return ["inset(0 0 100% 0)", "inset(0 0 0% 0)"];
    case "left":
      return ["inset(0 100% 0 0)", "inset(0 0% 0 0)"];
    case "right":
      return ["inset(0 0 0 100%)", "inset(0 0 0 0%)"];
    case "center":
      return ["inset(50% 0 50% 0)", "inset(0% 0 0% 0)"];
    default:
      return ["inset(100% 0 0 0)", "inset(0% 0 0 0)"];
  }
};

export function ScrollReveal({
  children,
  direction = "up",
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const [clipStart, clipEnd] = getClipPathValues(direction);

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [clipStart, clipEnd]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        clipPath,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}

// Image-specific variant with scale effect
interface ScrollRevealImageProps {
  src: string;
  alt: string;
  direction?: RevealDirection;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export function ScrollRevealImage({
  src,
  alt,
  direction = "center",
  className = "",
  aspectRatio = "16/9",
  priority = false,
}: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"],
  });

  const [clipStart, clipEnd] = getClipPathValues(direction);

  const clipPath = useTransform(scrollYProgress, [0, 1], [clipStart, clipEnd]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        clipPath,
        opacity,
        aspectRatio,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ scale }}
        loading={priority ? "eager" : "lazy"}
      />
    </motion.div>
  );
}
