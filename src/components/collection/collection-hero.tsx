"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroTextReveal } from "@/components/effects";
import type { Collection } from "@/types";

interface CollectionHeroProps {
  collection: Collection;
}

export function CollectionHero({ collection }: CollectionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image transforms - subtle scale for products
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Content transforms
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#f8f8f6]"
      style={{ height: "150vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Light background for products */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f6] to-[#f0f0ec]" />

        {/* Product Image - Centered */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-8 md:px-16"
          style={{ scale: imageScale, y: imageY }}
        >
          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={collection.heroImage.url}
              alt={collection.heroImage.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </motion.div>

        {/* Collection Name Badge - positioned below nav */}
        {collection.products[0]?.collectionName && (
          <motion.div
            className="absolute top-24 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
              {collection.products[0].collectionName}
            </span>
          </motion.div>
        )}

        {/* Category Title - Bottom */}
        <motion.div
          className="absolute bottom-32 left-0 right-0 text-center px-8"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <HeroTextReveal
            text={collection.title}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-text font-light tracking-tight"
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-text-tertiary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <span className="text-lg">↓</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
