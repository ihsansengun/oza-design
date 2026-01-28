"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "@/components/effects";

interface Award {
  organization: string;
  title: string;
  year: string;
}

interface StudioAwardsProps {
  awards?: Award[];
}

const defaultAwards: Award[] = [
  {
    organization: "Maison Française",
    title: "Best Global Project of the Year",
    year: "2023",
  },
  {
    organization: "FRAME Awards",
    title: "Residential Interior of the Year",
    year: "2022",
  },
  {
    organization: "Dezeen Awards",
    title: "House Interior Longlist",
    year: "2022",
  },
  {
    organization: "SBID International Design Awards",
    title: "Residential Design Finalist",
    year: "2021",
  },
];

export function StudioAwards({ awards = defaultAwards }: StudioAwardsProps) {
  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-4xl mx-auto px-8">
        {/* Heading */}
        <div className="mb-16">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
              Recognition
            </p>
          </FadeUp>
          <TextReveal
            text="Awards"
            by="word"
            className="font-heading text-3xl md:text-4xl font-light tracking-tight text-text"
            as="h2"
            stagger={0.08}
          />
        </div>

        {/* Awards List */}
        <div className="space-y-0">
          {awards.map((award, index) => (
            <motion.div
              key={`${award.organization}-${award.year}`}
              className="group border-t border-border py-6 first:border-t-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-text font-medium">
                    {award.organization}
                  </span>
                  <span className="text-text-tertiary">/</span>
                  <span className="text-text-secondary">{award.title}</span>
                </div>
                <span className="text-sm text-text-tertiary tracking-wider">
                  {award.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <FadeUp delay={0.5}>
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-text-tertiary text-center">
              Selected awards and recognitions
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
