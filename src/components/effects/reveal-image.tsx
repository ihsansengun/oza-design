"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealImageProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function RevealImage({
  children,
  delay = 0,
  className,
}: RevealImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
