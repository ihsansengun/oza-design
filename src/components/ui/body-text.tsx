"use client";

import { cn } from "@/lib/utils";

type TextSize = "sm" | "base" | "lg";

interface BodyTextProps {
  children: React.ReactNode;
  size?: TextSize;
  muted?: boolean;
  lead?: boolean;
  className?: string;
  as?: "p" | "div" | "span";
}

const sizeStyles: Record<TextSize, string> = {
  sm: "text-[length:var(--font-size-sm)]",
  base: "text-[length:var(--font-size-base)]",
  lg: "text-[length:var(--font-size-lg)]",
};

export function BodyText({
  children,
  size = "base",
  muted = false,
  lead = false,
  className,
  as: Component = "p",
}: BodyTextProps) {
  return (
    <Component
      className={cn(
        "font-sans",
        sizeStyles[size],
        lead
          ? "leading-[var(--line-height-relaxed)]"
          : "leading-[var(--line-height-normal)]",
        "max-w-[65ch]",
        muted ? "text-text-tertiary" : "text-text-secondary",
        className
      )}
    >
      {children}
    </Component>
  );
}
