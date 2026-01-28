"use client";

import { Container, Text } from "@/components/ui";
import { FadeUp } from "@/components/effects";
import { formatCategory } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectInfoProps {
  project: Project;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <section className="py-16 md:py-24 bg-bg">
      <Container>
        <FadeUp>
          {/* Info Bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-wider text-text-muted mb-8">
            <span>{formatCategory(project.category)}</span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>{project.location}</span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>{project.year}</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* Description */}
          <div className="max-w-3xl">
            <Text size="lg">
              {project.description ||
                "A refined space where timeless design meets sophisticated craftsmanship. Every detail has been considered to create an environment that balances elegance with functionality, using the finest natural materials and bespoke finishes."}
            </Text>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
