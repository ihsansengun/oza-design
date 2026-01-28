"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ZoomDirection = "in" | "out";

interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  direction?: ZoomDirection;
  scaleFrom?: number;
  scaleTo?: number;
  opacityFrom?: number;
  opacityTo?: number;
}

export function ScrollZoom({
  children,
  className = "",
  direction = "in",
  scaleFrom,
  scaleTo,
  opacityFrom = 0.5,
  opacityTo = 1,
}: ScrollZoomProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Set default scale values based on direction
  const defaultScaleFrom = direction === "in" ? 0.85 : 1.15;
  const defaultScaleTo = 1;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [scaleFrom ?? defaultScaleFrom, scaleTo ?? defaultScaleTo]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacityFrom, (opacityFrom + opacityTo) / 2, opacityTo]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}
