"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/effects";

interface CollectionQuoteProps {
  quote?: string;
  collectionName?: string;
}

const defaultQuote =
  "Each piece in the collection tells a story of craftsmanship, where traditional techniques meet contemporary design sensibilities.";

export function CollectionQuote({
  quote = defaultQuote,
  collectionName,
}: CollectionQuoteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background transition from light to warm
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "rgb(248, 248, 246)",
      "rgb(245, 243, 238)",
      "rgb(245, 243, 238)",
      "rgb(248, 248, 246)",
    ]
  );

  // Line reveal
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 md:py-48"
      style={{ backgroundColor }}
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Decorative element */}
        <motion.div
          className="w-px h-16 bg-text-tertiary/30 mx-auto mb-12"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Quote text */}
        <TextReveal
          text={quote}
          by="word"
          className="font-heading text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed text-text"
          as="p"
          stagger={0.04}
          scrollBased
        />

        {/* Decorative line */}
        <motion.div
          className="w-full max-w-xs mx-auto h-px bg-text-tertiary/30 my-12"
          style={{ scaleX: lineWidth, transformOrigin: "center" }}
        />

        {/* Collection attribution */}
        {collectionName && (
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-text-tertiary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            — {collectionName}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}
