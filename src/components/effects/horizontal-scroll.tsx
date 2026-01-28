"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  speed?: number;
}

export function HorizontalScroll({
  children,
  className = "",
  speed = 1,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move from 0 to -100% (full width minus viewport)
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${50 * speed}%`]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex gap-4 md:gap-8 pl-8 md:pl-16"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// Individual item for horizontal scroll
interface HorizontalScrollItemProps {
  children: ReactNode;
  className?: string;
  width?: string;
}

export function HorizontalScrollItem({
  children,
  className = "",
  width = "80vw",
}: HorizontalScrollItemProps) {
  return (
    <div
      className={`flex-shrink-0 ${className}`}
      style={{ width }}
    >
      {children}
    </div>
  );
}

// Alternative: Horizontal scroll gallery for images
interface HorizontalGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    aspectRatio?: string;
  }>;
  className?: string;
}

export function HorizontalGallery({ images, className = "" }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(images.length - 1) * 25}%`]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${100 + images.length * 50}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div className="flex gap-6 md:gap-10 px-8 md:px-16" style={{ x }}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 h-[60vh] md:h-[70vh]"
              style={{
                aspectRatio: image.aspectRatio || "3/4",
              }}
              initial={{ opacity: 0.5, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
