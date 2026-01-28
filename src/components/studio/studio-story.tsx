"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, TextReveal, ScrollReveal, Counter, StaggerReveal } from "@/components/effects";

interface StudioStoryProps {
  image?: string;
  heading?: string;
  paragraphs?: string[];
}

const defaultParagraphs = [
  "OZA was founded in 2011 with Özge Öztürk and Alexandre Simeray's desire to share their vision and design aspirations on creating luxurious but sincere lifestyles.",
  "Together they put forward a new and fresh language in design: unforgettable spaces with narratives, and heirlooms for the future.",
];

const stats = [
  { value: 13, suffix: "+", label: "Years" },
  { value: 85, suffix: "+", label: "Projects" },
  { value: 12, suffix: "", label: "Awards" },
];

export function StudioStory({
  image = "/images/studio/alex-ozge.jpg",
  heading = "Our Story",
  paragraphs = defaultParagraphs,
}: StudioStoryProps) {
  return (
    <section className="py-24 md:py-32 bg-[#f8f8f6]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image}
                alt="OZA Design founders"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <FadeUp>
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Since 2011
              </motion.p>
            </FadeUp>

            <div className="mb-8">
              <TextReveal
                text={heading}
                by="word"
                className="font-heading text-3xl md:text-4xl font-light tracking-tight text-text"
                as="h2"
                stagger={0.08}
              />
            </div>

            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <FadeUp key={index} delay={0.2 + index * 0.15}>
                  <p className="text-text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                </FadeUp>
              ))}
            </div>

            {/* Stats with animated counters */}
            <StaggerReveal
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border"
              stagger={0.15}
              direction="up"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                    className="font-heading text-3xl md:text-4xl text-text"
                  />
                  <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </StaggerReveal>

            {/* Founders */}
            <FadeUp delay={0.5}>
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-text-tertiary">
                  <span className="font-medium text-text">Özge Öztürk</span>
                  <span className="mx-2">&</span>
                  <span className="font-medium text-text">Alexandre Simeray</span>
                </p>
                <p className="text-xs uppercase tracking-widest text-text-tertiary mt-1">
                  Founders
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
