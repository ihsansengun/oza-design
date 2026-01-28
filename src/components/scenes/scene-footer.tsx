"use client";

import { TransitionLink } from "@/components/effects/transition-link";
import { Logo } from "@/components/ui";

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

export function SceneFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-8 md:px-16 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Logo & tagline */}
        <div>
          <TransitionLink href="/" className="block">
            <Logo variant="light" size="lg" />
          </TransitionLink>
          <p className="mt-4 text-sm text-white/40 max-w-xs">
            Architecture & Interior Design
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div>
            <p className="text-xs tracking-wider text-[var(--color-accent)] mb-4">
              Navigate
            </p>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs tracking-wider text-[var(--color-accent)] mb-4">
              Connect
            </p>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:studio@ozadesign.com"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-xs text-white/20">© {currentYear} OZA Design</p>
        <p className="text-xs text-white/20">London · Istanbul</p>
      </div>
    </footer>
  );
}
