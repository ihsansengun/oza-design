"use client";

import { motion } from "framer-motion";

interface ProjectQuoteProps {
  quote?: string;
  author?: string;
  className?: string;
}

const defaultQuote =
  "Architecture should speak of its time and place, but yearn for timelessness.";
const defaultAuthor = "Frank Gehry";

export function ProjectQuote({
  quote = defaultQuote,
  author = defaultAuthor,
  className = "",
}: ProjectQuoteProps) {
  return (
    <section className={`py-24 md:py-32 bg-bg-secondary ${className}`}>
      <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
        {/* Quote text */}
        <motion.p
          className="font-heading text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed text-text mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          "{quote}"
        </motion.p>

        {/* Author */}
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-text-tertiary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          — {author}
        </motion.p>
      </div>
    </section>
  );
}
