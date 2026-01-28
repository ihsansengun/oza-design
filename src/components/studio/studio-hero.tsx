"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroTextReveal } from "@/components/effects";

interface StudioHeroProps {
  image?: string;
}

export function StudioHero({
  image = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
}: StudioHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image transforms
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.5, 0.7]);

  // Text transforms
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "130vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src={image}
            alt="OZA Design Studio"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Dynamic Overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Studio Text */}
          <HeroTextReveal
            text="STUDIO"
            className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-light tracking-[0.3em]"
          />

          {/* Decorative line */}
          <motion.div
            className="w-24 h-px bg-white/40 mt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/50"
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
