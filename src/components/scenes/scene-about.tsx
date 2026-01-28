"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TransitionLink } from "@/components/effects/transition-link";
import { Counter } from "@/components/effects";

export function SceneAbout() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col md:flex-row">
      {/* Image side */}
      <div className="h-[50vh] md:h-screen md:w-1/2 relative overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src="/images/projects/doro-apartment-hero.jpg"
            alt="OZA Design Studio"
            fill
            className="object-cover scale-110"
            sizes="50vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content side */}
      <div className="flex-1 flex items-center px-8 md:px-16 py-16 md:py-0 bg-[#111111]">
        <div className="max-w-lg">
          <span className="text-label text-[var(--color-accent)] block mb-6">
            THE STUDIO
          </span>

          <h2 className="text-3xl md:text-4xl font-heading leading-tight mb-8">
            We design spaces that{" "}
            <span className="text-[var(--color-accent)]">transcend</span> the ordinary.
          </h2>

          <p className="text-white/50 leading-relaxed mb-8">
            Founded in London with roots in Istanbul, OZA creates residential
            interiors where craftsmanship meets contemporary vision. Each
            project is a dialogue between heritage and innovation.
          </p>

          <div className="flex flex-wrap gap-8 mb-12">
            <div className="text-center">
              <span className="text-3xl font-heading text-[var(--color-accent)]">
                <Counter value={15} suffix="+" />
              </span>
              <p className="text-xs text-white/40 mt-1">Years</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-heading text-[var(--color-accent)]">
                <Counter value={50} suffix="+" />
              </span>
              <p className="text-xs text-white/40 mt-1">Projects</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-heading text-[var(--color-accent)]">
                <Counter value={12} />
              </span>
              <p className="text-xs text-white/40 mt-1">Awards</p>
            </div>
          </div>

          <TransitionLink
            href="/studio"
            className="inline-flex items-center gap-3 text-sm text-white/60 hover:text-[var(--color-accent)] transition-colors"
          >
            <span>About Us</span>
            <span>→</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
