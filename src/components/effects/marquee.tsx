"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = false,
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.firstElementChild as HTMLElement;
      if (firstChild) {
        setContentWidth(firstChild.offsetWidth);
      }
    }
  }, [children]);

  const duration = contentWidth / speed;

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex w-fit"
        animate={{
          x: direction === "left" ? [-contentWidth, 0] : [0, -contentWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration || 20,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
