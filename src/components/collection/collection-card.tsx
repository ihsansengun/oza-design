"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/effects";
import type { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
  priority?: boolean;
}

export function CollectionCard({
  collection,
  priority = false,
}: CollectionCardProps) {
  return (
    <TransitionLink
      href={`/collections/${collection.slug}`}
      className="group block"
      cursorState="hover-image"
      cursorText="View"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-bg-alt">
        <Image
          src={collection.heroImage.url}
          alt={collection.heroImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-heading text-lg text-text transition-colors duration-[var(--duration-normal)] group-hover:text-accent">
          {collection.title}
        </h3>
      </div>
    </TransitionLink>
  );
}
