"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PressItem } from "@/types";

interface PressCardProps {
  item: PressItem;
  priority?: boolean;
  index?: number;
}

// Format date as "NOV.2023" (uppercase)
function formatPressDate(date: string): string {
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${month}.${year}`;
}

export function PressCard({ item, priority = false, index = 0 }: PressCardProps) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f3]">
        <Image
          src={item.coverImage.url}
          alt={item.coverImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

        {/* External Link Icon - appears on hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-heading text-base md:text-lg text-text transition-colors duration-300 group-hover:text-accent">
          {item.publication}
        </h3>
        <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mt-1">
          {formatPressDate(item.date)}
        </p>
      </div>
    </motion.a>
  );
}
