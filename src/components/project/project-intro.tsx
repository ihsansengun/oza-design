"use client";

import { SplitText } from "@/components/effects";
import type { Project } from "@/types";

interface ProjectIntroProps {
  project: Project;
}

export function ProjectIntro({ project }: ProjectIntroProps) {
  if (!project.description) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-4xl mx-auto px-8 md:px-16">
        <div className="text-center">
          <SplitText
            splitBy="words"
            animation="blur-in"
            stagger={0.03}
            duration={0.6}
            className="text-lg md:text-xl lg:text-2xl leading-relaxed text-text-secondary font-light"
          >
            {project.description}
          </SplitText>
        </div>
      </div>
    </section>
  );
}
