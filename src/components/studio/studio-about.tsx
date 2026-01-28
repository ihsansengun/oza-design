"use client";

import { FadeUp } from "@/components/effects";

interface StudioAboutProps {
  paragraphs?: string[];
}

const defaultParagraphs = [
  "As an award-winning studio, OZA proposes high-end bespoke designs that bring together the vernacular knowledge, quality of experience, and the delicacy of rich cultures from both the East and the West.",
  "In our London-based design studio, we provide interior and architectural design solutions that respond to exciting briefs from our clients with unique stories.",
];

export function StudioAbout({
  paragraphs = defaultParagraphs,
}: StudioAboutProps) {
  return (
    <section className="pb-24 md:pb-32 bg-bg">
      <div className="max-w-3xl mx-auto px-8">
        <div className="space-y-8">
          {paragraphs.map((paragraph, index) => (
            <FadeUp key={index} delay={index * 0.15}>
              <p className="text-lg md:text-xl leading-relaxed text-text-secondary">
                {paragraph}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
