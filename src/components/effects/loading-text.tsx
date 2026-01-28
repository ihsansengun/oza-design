"use client";

import { motion } from "framer-motion";

interface LoadingTextProps {
  text?: string;
  className?: string;
  letterDelay?: number;
}

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const shimmerVariants = {
  initial: {
    backgroundPosition: "-200% center",
  },
  animate: {
    backgroundPosition: "200% center",
    transition: {
      duration: 2,
      ease: "linear" as const,
      repeat: Infinity,
    },
  },
};

export function LoadingText({
  text = "ŌZA",
  className = "",
}: LoadingTextProps) {
  const letters = text.split("");

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          className="font-heading text-6xl md:text-8xl tracking-[0.3em] text-bg inline-block"
          style={{
            marginRight: letter === " " ? "0.5em" : undefined,
          }}
        >
          <motion.span
            className="inline-block"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              background:
                "linear-gradient(90deg, var(--color-bg) 0%, var(--color-bg) 40%, var(--color-accent) 50%, var(--color-bg) 60%, var(--color-bg) 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {letter}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
}
