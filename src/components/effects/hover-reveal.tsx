"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HoverRevealProps {
  children: ReactNode;
  revealContent: ReactNode | string; // Can be text, image URL, or custom component
  className?: string;
  revealClassName?: string;
  offset?: { x: number; y: number };
}

export function HoverReveal({
  children,
  revealContent,
  className = "",
  revealClassName = "",
  offset = { x: 20, y: 20 },
}: HoverRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left + offset.x,
      y: e.clientY - rect.top + offset.y,
    });
  };

  const isImageUrl =
    typeof revealContent === "string" &&
    (revealContent.startsWith("/") ||
      revealContent.startsWith("http") ||
      revealContent.includes("."));

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={`absolute pointer-events-none z-50 ${revealClassName}`}
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            {isImageUrl ? (
              <div className="w-48 h-32 overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={revealContent}
                  alt=""
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              revealContent
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
