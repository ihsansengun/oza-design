"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/types";

interface ProjectHeroAdvancedProps {
  project: Project;
}

export function ProjectHeroAdvanced({ project }: ProjectHeroAdvancedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Prefer first gallery image (typically landscape) over heroImage
  const galleryImages =
    project.gallery?.filter((item) => item.type === "image") || [];
  const heroImage =
    galleryImages.length > 0
      ? { url: galleryImages[0].url, alt: galleryImages[0].alt || project.title }
      : project.heroImage;

  return (
    <section
      ref={containerRef}
      className="relative h-[70vh] md:h-screen bg-white overflow-hidden"
    >
      {/* Full-width hero image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </motion.div>

      {/* Content - Bottom aligned */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ opacity: contentOpacity }}
      >
        <div className="px-4 md:px-8 lg:px-16 pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Category & Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4"
            >
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/60">
                {project.category}
              </span>
              <span className="w-4 md:w-8 h-px bg-white/30" />
              <span className="text-[10px] md:text-xs tracking-wider text-white/60">
                {project.location}
                {project.year && `, ${project.year}`}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-heading text-white leading-[0.95] tracking-tight"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 md:h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
