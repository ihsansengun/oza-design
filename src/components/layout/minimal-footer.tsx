"use client";

import { usePathname } from "next/navigation";

export function MinimalFooter() {
  const pathname = usePathname();

  // Hide on homepage - HomeCTA handles footer there
  if (pathname === "/") {
    return null;
  }

  // Hide footer on listing pages - header already has all navigation
  if (pathname === "/projects" || pathname === "/collections") {
    return null;
  }

  // For other dark pages, show minimal footer with social links only
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40">
      <div className="flex items-center justify-center h-16 px-6">
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/ozadesign_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wider uppercase text-white/40 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <span className="text-white/20">·</span>
          <a
            href="https://www.linkedin.com/company/oza-studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wider uppercase text-white/40 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
