"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/effects";

interface StudioPhilosophyProps {
  quote?: string;
}

const defaultQuote =
  "OZA can't be framed. It exists in every detail of its projects, from the wood grain of its furniture to the glow of its lights.";

export function StudioPhilosophy({ quote = defaultQuote }: StudioPhilosophyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background color transition
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [
      "rgb(255, 255, 255)",
      "rgb(20, 20, 20)",
      "rgb(20, 20, 20)",
      "rgb(255, 255, 255)",
    ]
  );

  // Text color transition
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [
      "rgb(60, 60, 60)",
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(60, 60, 60)",
    ]
  );

  // Decorative line
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.4], ["0%", "100%"]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 md:py-48 lg:py-64"
      style={{ backgroundColor }}
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Label */}
        <motion.p
          className="text-xs uppercase tracking-[0.2em] mb-12 opacity-50"
          style={{ color: textColor }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Philosophy
        </motion.p>

        {/* Quote */}
        <motion.div style={{ color: textColor }}>
          <TextReveal
            text={quote}
            by="word"
            className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light italic leading-relaxed"
            as="p"
            stagger={0.04}
            scrollBased
          />
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-full max-w-xs mx-auto h-px mt-16"
          style={{
            backgroundColor: textColor,
            scaleX: lineWidth,
            transformOrigin: "center",
            opacity: 0.3,
          }}
        />
      </div>
    </motion.section>
  );
}
