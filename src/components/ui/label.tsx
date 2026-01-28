"use client";

import { cn } from "@/lib/utils";

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  withLine?: "before" | "after" | "both" | "none";
  as?: "span" | "p" | "div";
}

export function Label({
  children,
  className,
  withLine = "none",
  as: Component = "span",
}: LabelProps) {
  const lineClass = "h-px w-8 bg-current opacity-30";

  return (
    <Component
      className={cn(
        "inline-flex items-center gap-4",
        "text-[length:var(--font-size-xs)]",
        "uppercase",
        "tracking-[var(--letter-spacing-widest)]",
        "text-text-tertiary",
        "font-normal",
        className
      )}
    >
      {(withLine === "before" || withLine === "both") && (
        <span className={lineClass} aria-hidden="true" />
      )}
      {children}
      {(withLine === "after" || withLine === "both") && (
        <span className={lineClass} aria-hidden="true" />
      )}
    </Component>
  );
}
