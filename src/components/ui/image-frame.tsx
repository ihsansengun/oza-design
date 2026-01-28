"use client";

import { cn } from "@/lib/utils";

interface ImageFrameProps {
  children: React.ReactNode;
  shadow?: boolean;
  border?: boolean;
  hover?: boolean;
  grain?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
  className?: string;
}

const aspectRatioStyles: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  auto: "",
};

export function ImageFrame({
  children,
  shadow = false,
  border = false,
  hover = false,
  grain = false,
  aspectRatio = "auto",
  className,
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatioStyles[aspectRatio],
        shadow && "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]",
        border && "ring-1 ring-border",
        hover && [
          "transition-all duration-[var(--duration-slow)]",
          "hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]",
          "hover:-translate-y-1",
        ],
        className
      )}
    >
      {children}

      {/* Film grain overlay */}
      {grain && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
