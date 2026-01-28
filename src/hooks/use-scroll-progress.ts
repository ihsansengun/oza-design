"use client";

import { useRef, RefObject } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollProgressOptions {
  offset?: [string, string];
}

interface UseScrollProgressReturn {
  scrollYProgress: MotionValue<number>;
  scrollY: MotionValue<number>;
  getElementProgress: (
    ref: RefObject<HTMLElement>,
    options?: ScrollProgressOptions
  ) => {
    progress: MotionValue<number>;
    scrollY: MotionValue<number>;
  };
}

export function useScrollProgress(): UseScrollProgressReturn {
  const { scrollYProgress, scrollY } = useScroll();

  const getElementProgress = (
    ref: RefObject<HTMLElement>,
    options: ScrollProgressOptions = {}
  ) => {
    const { offset = ["start end", "end start"] } = options;

    const { scrollYProgress: progress, scrollY: elementScrollY } = useScroll({
      target: ref,
      offset: offset as ["start end", "end start"],
    });

    return { progress, scrollY: elementScrollY };
  };

  return {
    scrollYProgress,
    scrollY,
    getElementProgress,
  };
}

// Utility hook for element-specific scroll progress
export function useElementScrollProgress(
  ref: RefObject<HTMLElement | null>,
  offset: [string, string] = ["start end", "end start"]
) {
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: offset as ["start end", "end start"],
  });

  return scrollYProgress;
}

// Utility to create range-mapped values
export function useScrollTransform<T>(
  progress: MotionValue<number>,
  inputRange: number[],
  outputRange: T[]
): MotionValue<T> {
  return useTransform(progress, inputRange, outputRange);
}
