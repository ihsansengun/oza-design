"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface ImageTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt in degrees
  perspective?: number;
  scale?: number; // Scale on hover
  glare?: boolean; // Show glare effect
}

export function ImageTilt({
  children,
  className = "",
  maxTilt = 6,
  perspective = 1000,
  scale = 1.02,
  glare = false,
}: ImageTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring animations for smooth motion
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scaleValue = useSpring(1, { stiffness: 300, damping: 30 });
  const glareX = useSpring(50, { stiffness: 300, damping: 30 });
  const glareY = useSpring(50, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (normalized -1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    // Apply tilt (invert Y for natural feel)
    rotateX.set(-y * maxTilt);
    rotateY.set(x * maxTilt);

    // Update glare position
    if (glare) {
      glareX.set(((e.clientX - rect.left) / rect.width) * 100);
      glareY.set(((e.clientY - rect.top) / rect.height) * 100);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scaleValue.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scaleValue.set(1);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleValue,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}

        {/* Glare overlay */}
        {glare && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
