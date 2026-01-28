"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "subtle";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  withDot?: boolean;
  dotColor?: string;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-text text-bg",
  outline: "border border-border bg-transparent text-text-secondary",
  subtle: "bg-bg-alt text-text-secondary",
};

export function Badge({
  children,
  variant = "outline",
  withDot = false,
  dotColor = "var(--color-accent)",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        "px-3 py-1",
        "text-[length:var(--font-size-xs)]",
        "uppercase",
        "tracking-[var(--letter-spacing-wider)]",
        "rounded-full",
        "font-normal",
        variantStyles[variant],
        className
      )}
    >
      {withDot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
