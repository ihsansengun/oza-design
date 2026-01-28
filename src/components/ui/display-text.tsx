"use client";

import { cn } from "@/lib/utils";

type DisplaySize = "lg" | "xl" | "2xl" | "hero";

interface DisplayTextProps {
  children: React.ReactNode;
  size?: DisplaySize;
  italic?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

const sizeStyles: Record<DisplaySize, string> = {
  lg: "text-[length:var(--font-size-3xl)]",
  xl: "text-[length:var(--font-size-4xl)]",
  "2xl": "text-[length:var(--font-size-4xl)] md:text-[length:var(--font-size-hero)]",
  hero: "text-[length:var(--font-size-hero)]",
};

export function DisplayText({
  children,
  size = "xl",
  italic = false,
  as: Component = "h1",
  className,
}: DisplayTextProps) {
  return (
    <Component
      className={cn(
        "font-heading font-light",
        "leading-[var(--line-height-tight)]",
        "tracking-[var(--letter-spacing-tight)]",
        "text-text",
        sizeStyles[size],
        italic && "italic",
        className
      )}
    >
      {children}
    </Component>
  );
}
