"use client";

import { PressCard } from "./press-card";
import type { PressItem } from "@/types";

interface PressGridProps {
  items: PressItem[];
}

export function PressGrid({ items }: PressGridProps) {
  if (items.length === 0) {
    return (
      <section className="pb-24 md:pb-32 bg-bg">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-lg text-text-secondary">
            Press coverage coming soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-24 md:pb-32 bg-bg">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {items.map((item, index) => (
            <PressCard
              key={item.id}
              item={item}
              index={index}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
