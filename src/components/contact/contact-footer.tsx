"use client";

import Link from "next/link";
import { FadeUp } from "@/components/effects";

export function ContactFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-16 md:py-24 bg-bg">
      <div className="max-w-4xl mx-auto px-8">
        <FadeUp>
          <div className="text-center space-y-8">
            {/* Certifications */}
            <div className="flex items-center justify-center gap-6">
              <span className="text-xs uppercase tracking-[0.15em] text-text-tertiary border border-border px-3 py-1.5">
                RIBA
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-text-tertiary border border-border px-3 py-1.5">
                ARB
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-6 text-xs text-text-tertiary">
              <Link
                href="/privacy"
                className="hover:text-text transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-border">|</span>
              <Link
                href="/terms"
                className="hover:text-text transition-colors duration-300"
              >
                Terms of Use
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-xs text-text-tertiary">
              © {currentYear} OZA Design Limited. All rights reserved.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
