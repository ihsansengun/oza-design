"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, TransitionLink } from "@/components/effects";
import type { Collection } from "@/types";

interface NextCollectionProps {
  collection: Collection;
}

export function NextCollection({ collection }: NextCollectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Image scale animation
  const imageScale = useTransform(scrollYProgress, [0, 0.8, 1], [0.85, 0.95, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  // Content animations
  const contentY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-[#f8f8f6] overflow-hidden"
    >
      <TransitionLink
        href={`/collections/${collection.slug}`}
        className="group block h-full"
        cursorState="hover-image"
        cursorText="Next"
      >
        {/* Product Image with scale */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-8 md:px-16"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <div className="relative w-full max-w-3xl aspect-square">
            <Image
              src={collection.heroImage.url}
              alt={collection.heroImage.alt}
              fill
              className="object-contain transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
        </motion.div>

        {/* Light overlay on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-8"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Small text */}
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-text-tertiary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Next in Collection
          </motion.p>

          {/* Large category title with reveal */}
          <TextReveal
            text={collection.title}
            by="word"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-text font-light tracking-tight max-w-3xl"
            as="h2"
            stagger={0.08}
          />

          {/* Arrow indicator */}
          <motion.div
            className="mt-8 text-text-tertiary group-hover:text-text transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              className="inline-block text-xl"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Collection badge */}
        {collection.products[0]?.collectionName && (
          <motion.div
            className="absolute bottom-8 right-8 text-right"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
              {collection.products[0].collectionName}
            </p>
          </motion.div>
        )}
      </TransitionLink>
    </section>
  );
}
