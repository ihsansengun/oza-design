"use client";

import { Container, Divider } from "@/components/ui";
import { MagneticElement, TransitionLink } from "@/components/effects";

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
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
}

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
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
}

function PinterestIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6c-2.5 0-5 2-5 5.5 0 2 1 3.5 2.5 4-0.1-0.5-0.1-1 0-1.5l0.5-2s-0.1-0.5-0.1-1c0-1 0.5-1.5 1.5-1.5 0.5 0 1 0.5 1 1 0 0.5-0.5 1.5-0.5 2.5 0 0.5 0.5 1 1 1 1.5 0 2.5-1.5 2.5-4 0-2-1.5-3.5-4-3.5" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://www.instagram.com/ozadesign_official/",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.linkedin.com/company/oza-studio/",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: "https://www.pinterest.com/ozadesign/",
    label: "Pinterest",
    icon: PinterestIcon,
  },
];

const footerLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg">
      {/* Divider */}
      <Divider animated className="mx-[var(--container-padding)]" />

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <p className="font-heading text-xl tracking-tight text-text">
              ŌZA Design
            </p>
            <p className="text-[length:var(--font-size-sm)] text-text-tertiary max-w-xs leading-relaxed">
              Award-winning architecture and interior design studio creating timeless spaces.
            </p>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <p className="text-[length:var(--font-size-xs)] uppercase tracking-[var(--letter-spacing-widest)] text-text-tertiary">
              Links
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="text-[length:var(--font-size-sm)] text-text-secondary hover:text-accent transition-colors duration-[var(--duration-normal)]"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div className="space-y-4">
            <p className="text-[length:var(--font-size-xs)] uppercase tracking-[var(--letter-spacing-widest)] text-text-tertiary">
              Connect
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <MagneticElement key={social.label} strength={0.4} cursorState="hover-link">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-text-tertiary hover:text-accent hover:border-accent transition-colors duration-[var(--duration-normal)]"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                </MagneticElement>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-3 pt-4">
              <span className="text-[length:var(--font-size-xs)] uppercase tracking-[var(--letter-spacing-wider)] text-text-muted">
                RIBA
              </span>
              <span className="w-px h-3 bg-border" />
              <span className="text-[length:var(--font-size-xs)] uppercase tracking-[var(--letter-spacing-wider)] text-text-muted">
                ARB
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-subtle">
          <p className="text-[length:var(--font-size-xs)] text-text-muted text-center">
            © {currentYear} OZA Design Limited. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
