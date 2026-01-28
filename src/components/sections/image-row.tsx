"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ImageRowItem {
  id: string;
  slug: string;
  title: string;
  heroImage: {
    url: string;
    alt: string;
  };
}

interface ImageRowProps {
  items: ImageRowItem[];
  linkPrefix: string; // e.g., "/projects" or "/collections"
}

// Varied aspect ratios for visual interest
const aspectRatios = [
  "aspect-[3/4]", // portrait
  "aspect-square", // square
  "aspect-[4/3]", // landscape
  "aspect-[3/4]", // portrait
  "aspect-[4/5]", // tall portrait
  "aspect-[4/3]", // landscape
];

// Varied heights
const heights = [
  "h-[45vh]",
  "h-[55vh]",
  "h-[50vh]",
  "h-[60vh]",
  "h-[48vh]",
  "h-[52vh]",
];

export function ImageRow({ items, linkPrefix }: ImageRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex items-center gap-4 px-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={`${linkPrefix}/${item.slug}`}
            className="group relative flex-shrink-0"
          >
            <div
              className={cn(
                "relative overflow-hidden",
                heights[index % heights.length]
              )}
              style={{
                width: `calc(${heights[index % heights.length].replace("h-[", "").replace("]", "")} * ${
                  aspectRatios[index % aspectRatios.length] === "aspect-[3/4]"
                    ? "0.75"
                    : aspectRatios[index % aspectRatios.length] === "aspect-square"
                      ? "1"
                      : aspectRatios[index % aspectRatios.length] === "aspect-[4/5]"
                        ? "0.8"
                        : "1.33"
                })`,
              }}
            >
              <Image
                src={item.heroImage.url}
                alt={item.heroImage.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 2}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            {/* Title on hover */}
            <div className="absolute -bottom-8 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm uppercase tracking-wider text-[var(--color-text-dark-muted)] text-center">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
