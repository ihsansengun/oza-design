"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/effects/transition-link";
import { Logo } from "@/components/ui";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { cn } from "@/lib/utils";

interface ImmersiveNavProps {
  variant?: "dark" | "light";
}

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/collections", label: "Collections" },
  { href: "/press", label: "Press" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/ozadesign_official/",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/oza-studio/",
    label: "LinkedIn",
  },
];

export function ImmersiveNav({ variant = "dark" }: ImmersiveNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  // Lock scroll when menu is open
  useLockScroll(isMenuOpen);

  // Show nav when scrolling up or at top
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // At top of page
          if (currentScrollY < 100) {
            setHasScrolled(false);
            setIsVisible(true);
          } else {
            setHasScrolled(true);
            // Scrolling up = show, scrolling down = hide
            if (currentScrollY < lastScrollY) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
              setIsMenuOpen(false);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial state
    setIsVisible(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isDark = variant === "dark";

  return (
    <>
      {/* Fixed Header - Minimal */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6",
          "transition-colors duration-500",
          hasScrolled
            ? isDark
              ? "bg-[#111111]/90 backdrop-blur-md"
              : "bg-white/90 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <TransitionLink href="/" className="block">
            <Logo variant={isDark ? "light" : "dark"} size="md" />
          </TransitionLink>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 group"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "text-[11px] tracking-[0.2em] uppercase transition-colors hidden md:block",
                isDark
                  ? "text-white/50 group-hover:text-white"
                  : "text-stone-500 group-hover:text-stone-900"
              )}
            >
              {isMenuOpen ? "Close" : "Menu"}
            </span>
            <div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 4 : 0,
                }}
                className={cn(
                  "w-6 h-px origin-center",
                  isDark ? "bg-white" : "bg-stone-900"
                )}
              />
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  scaleX: isMenuOpen ? 0 : 1,
                }}
                className={cn(
                  "w-6 h-px",
                  isDark ? "bg-white" : "bg-stone-900"
                )}
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -4 : 0,
                }}
                className={cn(
                  "w-6 h-px origin-center",
                  isDark ? "bg-white" : "bg-stone-900"
                )}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#111111]"
          >
            <div className="h-full flex flex-col justify-center px-6 md:px-10 lg:px-16">
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <TransitionLink
                      href={link.href}
                      className={cn(
                        "block py-3 text-5xl md:text-7xl lg:text-8xl font-heading transition-colors duration-300",
                        pathname === link.href
                          ? "text-[var(--color-accent)]"
                          : "text-white/20 hover:text-white"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </TransitionLink>
                  </motion.div>
                ))}
              </nav>

              {/* Footer in menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-white/30"
              >
                <div className="flex gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <a
                  href="mailto:studio@ozadesign.com"
                  className="hover:text-white transition-colors"
                >
                  studio@ozadesign.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
