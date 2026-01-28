"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type DividerVariant = "full" | "short" | "gradient";

interface DividerProps {
  variant?: DividerVariant;
  animated?: boolean;
  className?: string;
  color?: string;
}

export function Divider({
  variant = "full",
  animated = false,
  className,
  color,
}: DividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variantStyles: Record<DividerVariant, string> = {
    full: "w-full",
    short: "w-24 mx-auto",
    gradient:
      "w-full bg-gradient-to-r from-transparent via-border to-transparent",
  };

  const baseStyles = cn(
    "h-px",
    variant !== "gradient" && "bg-border",
    variantStyles[variant],
    className
  );

  if (animated) {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          className={baseStyles}
          style={color ? { backgroundColor: color } : undefined}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={baseStyles}
      style={color ? { backgroundColor: color } : undefined}
      role="separator"
      aria-hidden="true"
    />
  );
}
