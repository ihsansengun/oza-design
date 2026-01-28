"use client";

import React, { useMemo, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

type SplitBy = "chars" | "words" | "lines";
type AnimationType = "fade-up" | "blur-in" | "slide-up" | "scale";

interface SplitTextProps {
  children: string;
  splitBy?: SplitBy;
  animation?: AnimationType;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  as?: React.ElementType;
}

const powerEase = [0.25, 0.1, 0.25, 1] as const;

const getVariants = (animation: AnimationType): Variants => {
  switch (animation) {
    case "blur-in":
      return {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          transition: { ease: powerEase },
        },
      };
    case "slide-up":
      return {
        hidden: { opacity: 0, y: "100%" },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ease: powerEase },
        },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { ease: powerEase },
        },
      };
    case "fade-up":
    default:
      return {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ease: powerEase },
        },
      };
  }
};

export function SplitText({
  children,
  splitBy = "words",
  animation = "fade-up",
  className = "",
  stagger = 0.05,
  duration = 0.5,
  delay = 0,
  once = true,
  as: Component = "div",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const pieces = useMemo(() => {
    switch (splitBy) {
      case "chars":
        return children.split("").map((char) => (char === " " ? "\u00A0" : char));
      case "lines":
        return children.split("\n");
      case "words":
      default:
        return children.split(" ");
    }
  }, [children, splitBy]);

  const variants = getVariants(animation);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as { transition?: object }).transition,
        duration,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Component className="inline">
        {pieces.map((piece, index) => (
          <span
            key={index}
            className={splitBy === "lines" ? "block" : "inline-block"}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {piece}
            </motion.span>
            {splitBy === "words" && index < pieces.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </Component>
    </motion.div>
  );
}
