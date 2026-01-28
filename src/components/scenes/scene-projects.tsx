"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { TransitionLink } from "@/components/effects/transition-link";
import { useCursor } from "@/components/effects";
import type { Project } from "@/types";

interface SceneProjectsProps {
  projects: Project[];
}

export function SceneProjects({ projects }: SceneProjectsProps) {
  const displayProjects = projects.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setCursorState } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = displayProjects[activeIndex];

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % displayProjects.length);
  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + displayProjects.length) % displayProjects.length
    );

  // Handle swipe gestures
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prev();
    } else if (info.offset.x < -threshold) {
      next();
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row">
      {/* Mobile: Image first, then content */}
      {/* Desktop: Content left, image right */}

      {/* Image - Shows on both mobile and desktop */}
      <motion.div
        ref={containerRef}
        className="h-[50vh] md:h-screen md:w-3/5 relative overflow-hidden order-1 md:order-2 touch-pan-y"
        onMouseEnter={() => setCursorState("hover-image")}
        onMouseLeave={() => setCursorState("default")}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 pointer-events-none"
          >
            <Image
              src={activeProject.heroImage.url}
              alt={activeProject.heroImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Tap to navigate link - desktop only (mobile uses swipe) */}
        <TransitionLink
          href={`/projects/${activeProject.slug}`}
          className="absolute inset-0 z-10 pointer-events-none md:pointer-events-auto"
          aria-label={`View ${activeProject.title}`}
        >
          <span className="sr-only">View {activeProject.title}</span>
        </TransitionLink>

        {/* Swipe hint - mobile only */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 md:hidden z-20">
          <motion.div
            className="flex items-center gap-2 text-white/40 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.span
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            <span>Swipe</span>
            <motion.span
              animate={{ x: [2, -2, 2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Project progress dots - Bottom of image */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex gap-1 md:gap-2 z-20">
          {displayProjects.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-0.5 md:h-1 flex-1 transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-white"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`View ${project.title}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Content side */}
      <div className="flex-1 md:w-2/5 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 md:py-0 bg-[#111111] order-2 md:order-1">
        <div className="mb-6 md:mb-8">
          <span className="text-xs tracking-[0.3em] text-[var(--color-accent)]">
            SELECTED WORK
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs tracking-wider text-white/40 mb-2">
              {activeProject.category}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-3 md:mb-4">
              {activeProject.title}
            </h2>
            <p className="text-sm text-white/50">{activeProject.location}</p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 md:mt-12 flex items-center gap-4 md:gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Next project"
          >
            →
          </button>
          <span className="ml-2 md:ml-4 text-sm text-white/30">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(displayProjects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Links */}
        <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
          <TransitionLink
            href={`/projects/${activeProject.slug}`}
            className="inline-flex items-center gap-3 text-sm text-white/60 hover:text-[var(--color-accent)] transition-colors group"
          >
            <span>View Project</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </TransitionLink>

          <div>
            <TransitionLink
              href="/projects"
              className="text-xs tracking-wider text-white/30 hover:text-white/60 transition-colors"
            >
              All Projects →
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
