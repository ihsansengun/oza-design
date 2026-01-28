"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePageTransition, TRANSITION_ENTER_DELAY } from "@/hooks";

interface PageTransitionProps {
  children: ReactNode;
}

// Power ease for smooth transitions
const powerEase = [0.76, 0, 0.24, 1] as const;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: powerEase,
      delay: TRANSITION_ENTER_DELAY / 1000,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: powerEase,
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const { isTransitioning } = usePageTransition();

  return (
    <motion.div
      initial="initial"
      animate={isTransitioning ? "exit" : "enter"}
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}
