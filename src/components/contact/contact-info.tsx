"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/effects";

interface ContactEmail {
  label: string;
  email: string;
}

interface ContactInfoProps {
  emails?: ContactEmail[];
}

const defaultEmails: ContactEmail[] = [
  {
    label: "Press and general enquiries",
    email: "info@ozadesign.com",
  },
  {
    label: "OZA Collection enquiries",
    email: "collection@ozadesign.com",
  },
];

export function ContactInfo({ emails = defaultEmails }: ContactInfoProps) {
  return (
    <section className="py-16 md:py-24 bg-bg">
      <div className="max-w-4xl mx-auto px-8">
        <div className="space-y-16 md:space-y-24">
          {emails.map((item, index) => (
            <FadeUp key={item.email} delay={index * 0.15}>
              <div className="text-center">
                {/* Label */}
                <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
                  {item.label}
                </p>

                {/* Email */}
                <motion.a
                  href={`mailto:${item.email}`}
                  className="inline-block font-heading text-2xl md:text-3xl lg:text-4xl text-text hover:text-accent transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.email}
                </motion.a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
