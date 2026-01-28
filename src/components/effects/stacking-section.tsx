"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StackingSectionProps {
  children: React.ReactNode;
  className?: string;
  index: number; // Section order (0, 1, 2, etc.)
  bgColor?: string; // Background color for this section
  dark?: boolean; // Dark or light section
  noScale?: boolean; // Disable scale effect on this section
  isLast?: boolean; // Last section doesn't need min-h-screen
}

export function StackingSection({
  children,
  className,
  index,
  bgColor = "#FFFFFF",
  dark = false,
  noScale = false,
  isLast = false,
}: StackingSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle scale effect
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    noScale ? [1, 1] : [1, 0.96]
  );

  // Fade out as it's covered
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.5]);

  return (
    <motion.section
      ref={ref}
      style={{
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        zIndex: index + 1,
        backgroundColor: bgColor,
      }}
      className={cn(
        "sticky top-0 w-full overflow-hidden",
        !isLast && "min-h-screen",
        "will-change-transform origin-top",
        // Softer rounded corners
        index > 0 && "rounded-t-[20px] md:rounded-t-[32px]",
        dark ? "text-white" : "text-stone-900",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
