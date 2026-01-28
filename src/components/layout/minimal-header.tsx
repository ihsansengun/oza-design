"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticElement, TransitionLink } from "@/components/effects";
import { Logo } from "@/components/ui";
import { useLockScroll, usePageTransition } from "@/hooks";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/collections", label: "Collections" },
  { href: "/press", label: "Press" },
];

const secondaryLinks = [
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

const allLinks = [...navLinks, ...secondaryLinks];

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

export function MinimalHeader() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTransitioning } = usePageTransition();

  useLockScroll(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      // After scrolling past 80% of viewport height, switch to light mode
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };

    // Only track scroll on homepage
    if (isHomepage) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Check initial state
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomepage]);

  // Close menu when transition starts
  useEffect(() => {
    if (isTransitioning && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isTransitioning, mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // On homepage: transparent over hero, white bg after scroll
  // On other pages: always use dark theme (white text)
  const showLightMode = isHomepage && pastHero && !mobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] transition-all duration-300",
          showLightMode
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : mobileMenuOpen
              ? "bg-[#111111]"
              : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-10">
          {/* Logo - visible on mobile or when past hero on homepage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: !isHomepage || pastHero || mobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="z-50"
          >
            <TransitionLink
              href="/"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Logo
                variant={showLightMode ? "dark" : "light"}
                size="md"
              />
            </TransitionLink>
          </motion.div>

          {/* Desktop Navigation - centered */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              <div key={link.href} className="flex items-center gap-8">
                <MagneticElement strength={0.25} cursorState="hover-link">
                  <TransitionLink
                    href={link.href}
                    className={cn(
                      "relative text-sm uppercase tracking-widest transition-all duration-300",
                      showLightMode
                        ? "text-stone-900"
                        : "text-[var(--color-text-dark)]",
                      pathname === link.href
                        ? "opacity-100"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    {link.label}
                    {/* Active indicator */}
                    {pathname === link.href && (
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-px",
                          showLightMode ? "bg-stone-900/50" : "bg-white/50"
                        )}
                      />
                    )}
                  </TransitionLink>
                </MagneticElement>
                {index < navLinks.length - 1 && (
                  <span
                    className={cn(
                      "transition-colors duration-300",
                      showLightMode
                        ? "text-stone-300"
                        : "text-[var(--color-text-dark-muted)]"
                    )}
                  >
                    |
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Secondary Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {secondaryLinks.map((link) => (
              <MagneticElement key={link.href} strength={0.25} cursorState="hover-link">
                <TransitionLink
                  href={link.href}
                  className={cn(
                    "relative text-sm uppercase tracking-widest transition-all duration-300",
                    showLightMode
                      ? "text-stone-900"
                      : "text-[var(--color-text-dark)]",
                    pathname === link.href
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  {link.label}
                  {/* Active indicator */}
                  {pathname === link.href && (
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 right-0 h-px",
                        showLightMode ? "bg-stone-900/50" : "bg-white/50"
                      )}
                    />
                  )}
                </TransitionLink>
              </MagneticElement>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={cn(
                "w-6 h-0.5 block transition-all duration-300 origin-center",
                showLightMode ? "bg-stone-900" : "bg-white",
                mobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 block transition-all duration-300",
                showLightMode ? "bg-stone-900" : "bg-white",
                mobileMenuOpen && "opacity-0 scale-x-0"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 block transition-all duration-300 origin-center",
                showLightMode ? "bg-stone-900" : "bg-white",
                mobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#111111] lg:hidden flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Spacer for header */}
            <div className="h-[var(--header-height)]" />

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <TransitionLink
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-heading text-4xl font-light tracking-tight transition-colors duration-300",
                      pathname === link.href
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {link.label}
                  </TransitionLink>
                </motion.div>
              ))}

              {/* Divider */}
              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="w-12 h-px bg-white/20 my-4"
              />

              {secondaryLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={navLinks.length + 1 + i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <TransitionLink
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-heading text-2xl font-light tracking-tight transition-colors duration-300",
                      pathname === link.href
                        ? "text-white"
                        : "text-white/40 hover:text-white"
                    )}
                  >
                    {link.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>

            {/* Social Links */}
            <motion.div
              custom={allLinks.length + 2}
              variants={linkVariants}
              initial="closed"
              animate="open"
              className="flex justify-center gap-8 pb-12"
            >
              <a
                href="https://www.instagram.com/ozadesign_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors uppercase tracking-wider"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/oza-studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors uppercase tracking-wider"
              >
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
