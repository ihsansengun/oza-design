"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TransitionLink } from "@/components/effects/transition-link";
import { useCursor } from "@/components/effects/cursor-provider";
import { GalleryProgress } from "@/components/ui/gallery-progress";
import type { Project } from "@/types";

interface ProjectsGalleryProps {
  projects: Project[];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Convert vertical scroll to horizontal scroll for mouse wheel users
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept if there's vertical scroll intent
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setCursorState("dragging");
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCursorState("drag");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Gallery */}
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide select-none"
        onMouseEnter={() => setCursorState("drag")}
        onMouseLeave={() => {
          setCursorState("default");
          setIsDragging(false);
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-4 md:gap-6 px-6 md:px-10 h-full items-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="shrink-0 h-[calc(100%-6rem)] flex flex-col"
              onMouseEnter={() => !isDragging && setCursorState("hover-image")}
              onMouseLeave={() => setCursorState("drag")}
            >
              <TransitionLink
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full"
                onClick={(e) => isDragging && e.preventDefault()}
              >
                <div className="relative flex-1 w-[50vw] md:w-[35vw] lg:w-[28vw] overflow-hidden bg-stone-900">
                  <Image
                    src={project.heroImage.url}
                    alt={project.heroImage.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 35vw, 28vw"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                <div className="pt-4 shrink-0">
                  <h3 className="text-base md:text-lg font-heading text-white group-hover:text-white/70 transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/40 truncate">
                    {project.location}
                    {project.year && ` · ${project.year}`}
                  </p>
                </div>
              </TransitionLink>
            </motion.div>
          ))}
          <div className="w-10 shrink-0" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="shrink-0 pb-8">
        <GalleryProgress containerRef={containerRef} dark />
      </div>
    </div>
  );
}
