"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Logo } from "@/components/ui";
import { TransitionLink } from "@/components/effects";
import { useLockScroll, usePageTransition } from "@/hooks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNav = [
  { href: "/projects", label: "Projects" },
  { href: "/collections", label: "Collections" },
  { href: "/press", label: "Press" },
];

const secondaryNav = [
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

const linkVariants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.4,
      ease: easeOut,
    },
  }),
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useLockScroll(isOpen);
  const { isTransitioning } = usePageTransition();

  // Close menu when transition starts
  useEffect(() => {
    if (isTransitioning && isOpen) {
      onClose();
    }
  }, [isTransitioning, isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-bg md:hidden"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Header */}
          <Container className="h-[var(--header-height)]">
            <div className="flex items-center justify-between h-full">
              <TransitionLink href="/" className="block">
                <Logo variant="dark" size="md" />
              </TransitionLink>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8"
                aria-label="Close menu"
              >
                <span className="relative w-6 h-6">
                  <span className="absolute top-1/2 left-0 w-6 h-px bg-text rotate-45" />
                  <span className="absolute top-1/2 left-0 w-6 h-px bg-text -rotate-45" />
                </span>
              </button>
            </div>
          </Container>

          {/* Navigation */}
          <div className="flex flex-col items-center justify-center h-[calc(100vh-var(--header-height)-100px)]">
            <nav className="flex flex-col items-center gap-6">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <TransitionLink
                    href={item.href}
                    className="font-heading text-4xl font-light tracking-tight text-text hover:text-accent transition-colors duration-[var(--duration-normal)]"
                  >
                    {item.label}
                  </TransitionLink>
                </motion.div>
              ))}

              {/* Divider */}
              <motion.div
                custom={mainNav.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="w-12 h-px bg-border my-4"
              />

              {secondaryNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={mainNav.length + 1 + i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <TransitionLink
                    href={item.href}
                    className="font-heading text-2xl font-light tracking-tight text-text-secondary hover:text-accent transition-colors duration-[var(--duration-normal)]"
                  >
                    {item.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <motion.div
            custom={mainNav.length + secondaryNav.length + 2}
            variants={linkVariants}
            initial="closed"
            animate="open"
            className="absolute bottom-8 left-0 right-0"
          >
            <Container>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-wider text-text-muted hover:text-accent transition-colors duration-[var(--duration-normal)]"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-wider text-text-muted hover:text-accent transition-colors duration-[var(--duration-normal)]"
                >
                  LinkedIn
                </a>
              </div>
            </Container>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
