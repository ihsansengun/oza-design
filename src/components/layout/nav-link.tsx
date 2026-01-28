"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/effects";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavLink({ href, children, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TransitionLink
      href={href}
      className={cn(
        "text-sm uppercase tracking-wider",
        "transition-colors duration-[var(--duration-normal)]",
        "[transition-timing-function:var(--ease-out)]",
        isActive ? "text-accent" : "text-text hover:text-accent",
        className
      )}
    >
      {children}
    </TransitionLink>
  );
}
