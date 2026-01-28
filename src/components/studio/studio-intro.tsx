"use client";

import { TextReveal, FadeUp } from "@/components/effects";

interface StudioIntroProps {
  tagline?: string;
}

const defaultTagline =
  "We are an architecture and interior design studio offering new language achieved by timeless design, sophisticated craftsmanship, refined details, and the imperfect beauty of natural materials…";

export function StudioIntro({ tagline = defaultTagline }: StudioIntroProps) {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-bg">
      <div className="max-w-5xl mx-auto px-8">
        <TextReveal
          text={tagline}
          by="word"
          className="font-heading text-2xl md:text-3xl lg:text-4xl italic text-text-secondary leading-relaxed"
          as="p"
          stagger={0.03}
          scrollBased
        />
      </div>
    </section>
  );
}
