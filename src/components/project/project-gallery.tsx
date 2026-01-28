"use client";

import Image from "next/image";
import { Container } from "@/components/ui";
import { FadeUp, ScaleOnScroll } from "@/components/effects";
import type { Project } from "@/types";

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  // For now, we'll create a placeholder gallery layout
  // In production, this would use project.gallery images
  const heroImage = project.heroImage;

  return (
    <section className="pb-16 md:pb-24 bg-bg">
      <Container>
        {/* Full Width Image */}
        <FadeUp>
          <ScaleOnScroll className="relative aspect-[16/9] mb-8">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </ScaleOnScroll>
        </FadeUp>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
          <FadeUp delay={0.1}>
            <ScaleOnScroll className="relative aspect-[3/4]">
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </ScaleOnScroll>
          </FadeUp>
          <FadeUp delay={0.2}>
            <ScaleOnScroll className="relative aspect-[3/4]">
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </ScaleOnScroll>
          </FadeUp>
        </div>

        {/* Full Width Image */}
        <FadeUp delay={0.1}>
          <ScaleOnScroll className="relative aspect-[21/9]">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </ScaleOnScroll>
        </FadeUp>
      </Container>
    </section>
  );
}
