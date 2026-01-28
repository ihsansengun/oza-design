"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/effects";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      className="group block"
      cursorState="hover-image"
      cursorText="View"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-alt">
        <Image
          src={project.heroImage.url}
          alt={project.heroImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-heading text-lg text-text transition-colors duration-[var(--duration-normal)] group-hover:text-accent">
          {project.title}
        </h3>

        {/* Status Badge */}
        {project.status !== "completed" && (
          <p
            className={cn(
              "mt-1 text-xs uppercase tracking-wider",
              project.status === "in-progress"
                ? "text-amber-600"
                : "text-text-muted"
            )}
          >
            {project.status === "in-progress" ? "In Progress" : "Confidential"}
          </p>
        )}
      </div>
    </TransitionLink>
  );
}
