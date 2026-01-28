"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = opposite direction
  className?: string;
  direction?: "vertical" | "horizontal";
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  direction = "vertical",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate movement based on speed
  // speed = 1 means element moves 100px in scroll direction
  // speed = -1 means element moves 100px opposite to scroll
  const movement = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -50}%`, `${speed * 50}%`]
  );

  const style =
    direction === "vertical" ? { y: movement } : { x: movement };

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}

// Multi-layer parallax container
interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxContainer({
  children,
  className = "",
}: ParallaxContainerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>{children}</div>
  );
}

// Background parallax layer (for images)
interface ParallaxBackgroundProps {
  src: string;
  alt?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function ParallaxBackground({
  src,
  alt = "",
  speed = 0.3,
  className = "",
  overlay = false,
  overlayOpacity = 0.4,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -30}%`, `${speed * 30}%`]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

// Depth layers for creating 3D-like parallax effects
interface DepthLayerProps {
  children: ReactNode;
  depth: number; // 0 = no parallax, 1 = max parallax
  className?: string;
}

export function DepthLayer({
  children,
  depth,
  className = "",
}: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${depth * -100}px`, `${depth * 100}px`]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 + depth * 0.1, 1, 1 + depth * 0.1]
  );

  return (
    <motion.div ref={ref} className={className} style={{ y, scale }}>
      {children}
    </motion.div>
  );
}
