"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, DisplayText } from "@/components/ui";
import { FadeUp, SplitText } from "@/components/effects";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <Container className="text-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <DisplayText
            size="hero"
            className="text-text-muted/20 mb-8"
            as="p"
          >
            404
          </DisplayText>
        </motion.div>

        <SplitText
          splitBy="words"
          animation="fade-up"
          stagger={0.05}
          delay={0.2}
          className="font-heading text-3xl md:text-4xl lg:text-5xl text-text mb-6"
        >
          Page not found
        </SplitText>

        <FadeUp delay={0.4}>
          <p className="text-text-secondary text-lg max-w-md mx-auto mb-12">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </FadeUp>

        <FadeUp delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-text text-bg text-sm uppercase tracking-[var(--letter-spacing-wider)] hover:bg-accent transition-colors duration-[var(--duration-normal)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text text-sm uppercase tracking-[var(--letter-spacing-wider)] hover:border-accent hover:text-accent transition-colors duration-[var(--duration-normal)]"
            >
              View Projects
            </Link>
          </div>
        </FadeUp>

        {/* Decorative element */}
        <FadeUp delay={0.7}>
          <div className="mt-24 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-border" />
            <span className="text-[length:var(--font-size-xs)] uppercase tracking-[var(--letter-spacing-widest)] text-text-muted">
              ŌZA Design
            </span>
            <span className="w-12 h-px bg-border" />
          </div>
        </FadeUp>
      </Container>
    </div>
  );
}
