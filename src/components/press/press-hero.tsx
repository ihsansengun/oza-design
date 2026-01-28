"use client";

import { TextReveal, FadeUp } from "@/components/effects";

interface PressHeroProps {
  title?: string;
  subtitle?: string;
}

export function PressHero({
  title = "PRESS",
  subtitle = "Selected features and publications",
}: PressHeroProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-bg">
      <div className="max-w-7xl mx-auto px-8 text-center">
        {/* Decorative line */}
        <FadeUp>
          <div className="w-12 h-px bg-border mx-auto mb-12" />
        </FadeUp>

        {/* Title */}
        <TextReveal
          text={title}
          by="character"
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] text-text"
          as="h1"
          stagger={0.05}
        />

        {/* Subtitle */}
        <FadeUp delay={0.4}>
          <p className="text-sm md:text-base text-text-secondary mt-8 max-w-md mx-auto">
            {subtitle}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
