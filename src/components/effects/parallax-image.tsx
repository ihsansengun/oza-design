"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 30}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}
