"use client";

import { useRef, type ReactNode, Children } from "react";
import { motion, useInView, type Variants } from "framer-motion";

type AnimationDirection = "up" | "down" | "left" | "right" | "fade";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  direction?: AnimationDirection;
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const powerEase = [0.25, 0.1, 0.25, 1] as const;

const getItemVariants = (
  direction: AnimationDirection,
  distance: number
): Variants => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  switch (direction) {
    case "up":
      return {
        hidden: { ...initial, y: distance },
        visible: { ...animate, y: 0 },
      };
    case "down":
      return {
        hidden: { ...initial, y: -distance },
        visible: { ...animate, y: 0 },
      };
    case "left":
      return {
        hidden: { ...initial, x: distance },
        visible: { ...animate, x: 0 },
      };
    case "right":
      return {
        hidden: { ...initial, x: -distance },
        visible: { ...animate, x: 0 },
      };
    case "fade":
    default:
      return {
        hidden: initial,
        visible: animate,
      };
  }
};

export function StaggerReveal({
  children,
  className = "",
  stagger = 0.1,
  duration = 0.6,
  delay = 0,
  direction = "up",
  distance = 30,
  once = true,
  threshold = 0.1,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "-50px",
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = getItemVariants(direction, distance);
  const itemWithTransition: Variants = {
    hidden: itemVariants.hidden,
    visible: {
      ...itemVariants.visible,
      transition: {
        duration,
        ease: powerEase,
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
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemWithTransition}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
