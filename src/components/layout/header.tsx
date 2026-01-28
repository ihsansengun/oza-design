"use client";

import { useState, useEffect } from "react";
import { Container, Logo } from "@/components/ui";
import { NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";
import { MagneticElement, TransitionLink } from "@/components/effects";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/projects", label: "Projects" },
  { href: "/collections", label: "Collections" },
  { href: "/press", label: "Press" },
];

const secondaryNav = [
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "h-[var(--header-height)]",
        "transition-all duration-[var(--duration-normal)]",
        "[transition-timing-function:var(--ease-out)]",
        isScrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent"
      )}
    >
      <Container className="h-full">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <MagneticElement strength={0.2} cursorState="hover-link">
            <TransitionLink href="/" className="text-text">
              <Logo />
            </TransitionLink>
          </MagneticElement>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {mainNav.map((item) => (
              <MagneticElement key={item.href} strength={0.25} cursorState="hover-link">
                <NavLink href={item.href} className="cursor-magnetic">
                  {item.label}
                </NavLink>
              </MagneticElement>
            ))}
          </div>

          {/* Desktop Secondary Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {secondaryNav.map((item) => (
              <MagneticElement key={item.href} strength={0.25} cursorState="hover-link">
                <NavLink href={item.href} className="cursor-magnetic">
                  {item.label}
                </NavLink>
              </MagneticElement>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={cn(
                "w-6 h-px bg-text transition-all duration-[var(--duration-normal)]",
                isMobileMenuOpen && "rotate-45 translate-y-[7px]"
              )}
            />
            <span
              className={cn(
                "w-6 h-px bg-text transition-all duration-[var(--duration-normal)]",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-6 h-px bg-text transition-all duration-[var(--duration-normal)]",
                isMobileMenuOpen && "-rotate-45 -translate-y-[7px]"
              )}
            />
          </button>
        </nav>
      </Container>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
