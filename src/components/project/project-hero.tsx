"use client";

import Link from "next/link";
import { ParallaxImage, ScrollIndicator } from "@/components/effects";
import type { Project } from "@/types";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative h-screen">
      {/* Parallax Background Image */}
      <ParallaxImage
        src={project.heroImage.url}
        alt={project.heroImage.alt}
        speed={0.5}
        priority
        className="absolute inset-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Back Button */}
      <div className="absolute top-24 left-[var(--container-padding)] z-10">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-[var(--duration-normal)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Project Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-[var(--container-padding)] pb-16">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight">
          {project.title}
        </h1>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator
        text="Explore"
        showUntilScroll={150}
        className="text-white/80"
      />
    </section>
  );
}
