"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TransitionLink } from "@/components/effects";
import type { Project } from "@/types";

interface NextProjectProps {
  project: Project;
}

export function NextProject({ project }: NextProjectProps) {
  return (
    <section className="py-24 md:py-32 bg-bg border-t border-border">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <TransitionLink
          href={`/projects/${project.slug}`}
          className="group block"
          cursorState="hover-image"
          cursorText="Next"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Image */}
            <motion.div
              className="w-full lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.heroImage.url}
                  alt={project.heroImage.alt}
                  width={600}
                  height={800}
                  className="w-full max-w-md h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
                Next Project
              </p>

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text font-light tracking-tight leading-tight uppercase mb-4 group-hover:text-text-secondary transition-colors">
                {project.title.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h2>

              <p className="text-sm text-text-secondary">
                {project.location} {project.year}
              </p>

              {/* Arrow */}
              <motion.div
                className="mt-8 text-text-tertiary group-hover:text-text transition-colors"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xl">&rarr;</span>
              </motion.div>
            </motion.div>
          </div>
        </TransitionLink>
      </div>
    </section>
  );
}
