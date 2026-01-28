"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScaleOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function ScaleOnScroll({ children, className }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ scale }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
