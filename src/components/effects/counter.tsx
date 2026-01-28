"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  once?: boolean;
}

export function Counter({
  value,
  duration = 2,
  delay = 0,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  once = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    // Delay before starting animation
    const delayTimer = setTimeout(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Ease out cubic for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = easeOut * value;

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(value);
          setHasAnimated(true);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, delay * 1000);

    return () => clearTimeout(delayTimer);
  }, [isInView, hasAnimated, value, duration, delay]);

  // Format the number with separators and decimals
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const [integer, decimal] = fixed.split(".");
    const withSeparator = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decimal ? `${withSeparator}.${decimal}` : withSeparator;
  };

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
