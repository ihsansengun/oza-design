"use client";

import { motion } from "framer-motion";
import { TextReveal, FadeUp } from "@/components/effects";

interface Service {
  title: string;
  description: string;
}

interface StudioServicesProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "Interior Design",
    description:
      "Comprehensive interior design services from concept to completion, creating spaces that reflect our clients' unique stories and aspirations.",
  },
  {
    title: "Architecture",
    description:
      "Architectural design that seamlessly integrates form and function, respecting context while pushing creative boundaries.",
  },
  {
    title: "Technical Design",
    description:
      "Detailed technical documentation and coordination ensuring flawless execution of every design element.",
  },
  {
    title: "Branding & Identity",
    description:
      "Creating cohesive brand identities for hospitality and commercial projects that extend the design narrative.",
  },
  {
    title: "FF&E Design & Styling",
    description:
      "Curating furniture, fixtures, and equipment alongside bespoke pieces that complete and elevate each space.",
  },
];

export function StudioServices({
  services = defaultServices,
}: StudioServicesProps) {
  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="mb-16">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
              What We Do
            </p>
          </FadeUp>
          <TextReveal
            text="Our Services"
            by="word"
            className="font-heading text-3xl md:text-4xl font-light tracking-tight text-text"
            as="h2"
            stagger={0.08}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative pb-6 border-b border-border group-hover:border-text transition-colors duration-500">
                {/* Number */}
                <span className="absolute -left-0 top-0 text-xs text-text-tertiary">
                  0{index + 1}
                </span>

                {/* Title */}
                <h3 className="font-heading text-xl md:text-2xl font-light mb-4 pl-8 group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed pl-8">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
