"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/effects";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const InstagramIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const defaultSocialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/ozadesign",
    icon: <InstagramIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/ozadesign",
    icon: <LinkedInIcon />,
  },
];

interface ContactSocialProps {
  links?: SocialLink[];
}

export function ContactSocial({ links = defaultSocialLinks }: ContactSocialProps) {
  return (
    <section className="py-16 md:py-24 bg-bg">
      <div className="max-w-4xl mx-auto px-8">
        <FadeUp>
          <div className="flex items-center justify-center gap-8">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </FadeUp>

        {/* Decorative line */}
        <FadeUp delay={0.2}>
          <div className="w-12 h-px bg-border mx-auto mt-16" />
        </FadeUp>
      </div>
    </section>
  );
}
