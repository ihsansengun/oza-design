"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/effects";

export function ContactHero() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-bg">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <FadeUp>
          <motion.div
            className="w-12 h-px bg-border mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">
            Get in Touch
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
