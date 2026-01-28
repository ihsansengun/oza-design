"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

type RevealBy = "word" | "character" | "line";

interface TextRevealProps {
  text: string;
  by?: RevealBy;
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  scrollBased?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TextReveal({
  text,
  by = "word",
  className = "",
  stagger = 0.03,
  as: Component = "p",
  scrollBased = false,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getItems = () => {
    switch (by) {
      case "character":
        return text.split("");
      case "line":
        return text.split("\n");
      case "word":
      default:
        return text.split(" ");
    }
  };

  const items = getItems();

  const customContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  if (scrollBased) {
    return (
      <ScrollBasedTextReveal
        text={text}
        by={by}
        className={className}
        as={Component}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={customContainerVariants}
    >
      <Component className="leading-tight">
        {items.map((item, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={itemVariants}
          >
            {item}
            {by === "word" && index < items.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </Component>
    </motion.div>
  );
}

// Scroll-based variant for more control
interface ScrollBasedTextRevealProps {
  text: string;
  by?: RevealBy;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

function ScrollBasedTextReveal({
  text,
  by = "word",
  className = "",
  as: Component = "p",
}: ScrollBasedTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const getItems = () => {
    switch (by) {
      case "character":
        return text.split("");
      case "line":
        return text.split("\n");
      case "word":
      default:
        return text.split(" ");
    }
  };

  const items = getItems();

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Component className="leading-tight">
        {items.map((item, index) => (
          <ScrollWord
            key={index}
            progress={scrollYProgress}
            index={index}
            total={items.length}
          >
            {item}
            {by === "word" && index < items.length - 1 && "\u00A0"}
          </ScrollWord>
        ))}
      </Component>
    </div>
  );
}

interface ScrollWordProps {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}

function ScrollWord({ children, progress, index, total }: ScrollWordProps) {
  const start = index / total;
  const end = start + 1 / total;

  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

// Large hero text reveal
interface HeroTextRevealProps {
  text: string;
  className?: string;
}

export function HeroTextReveal({ text, className = "" }: HeroTextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.h1
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
