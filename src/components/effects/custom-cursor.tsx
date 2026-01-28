"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useCursor } from "./cursor-provider";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Motion values for position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // FAST spring for inner dot - almost instant
  const dotX = useSpring(mouseX, { damping: 50, stiffness: 1000, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 1000, mass: 0.1 });

  // Slightly slower spring for outer ring - subtle lag
  const ringX = useSpring(mouseX, { damping: 40, stiffness: 400, mass: 0.2 });
  const ringY = useSpring(mouseY, { damping: 40, stiffness: 400, mass: 0.2 });

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouch, mouseX, mouseY]);

  if (isTouch) return null;

  const isDrag = cursorState === "drag";
  const isDragging = cursorState === "dragging";
  const isHoverImage = cursorState === "hover-image";
  const isHoverVideo = cursorState === "hover-video";
  const isHoverLink = cursorState === "hover-link";
  const isHidden = cursorState === "hidden";
  const showLabel = isDrag || isDragging || isHoverImage || isHoverVideo;

  // Calculate ring size based on state
  const getRingSize = () => {
    if (showLabel) return 90;
    if (isHoverLink) return 50;
    return 36;
  };

  const ringSize = getRingSize();

  return (
    <>
      {/* Inner dot - follows cursor closely */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999]",
          "w-2 h-2 -ml-1 -mt-1 rounded-full bg-white mix-blend-difference",
          "transition-opacity duration-150",
          (!isVisible || isHidden || showLabel) && "opacity-0"
        )}
        style={{ x: dotX, y: dotY }}
      />

      {/* Outer ring */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9998]",
          "rounded-full border border-white/60 mix-blend-difference",
          "transition-all duration-200 ease-out",
          (!isVisible || isHidden) && "opacity-0"
        )}
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
        }}
      />

      {/* Labels */}
      <AnimatePresence>
        {isDrag && (
          <CursorLabel x={dotX} y={dotY}>
            <span className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase">
              <motion.span
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ‹
              </motion.span>
              Drag
              <motion.span
                animate={{ x: [3, 0, 3] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ›
              </motion.span>
            </span>
          </CursorLabel>
        )}
        {isDragging && (
          <CursorLabel x={dotX} y={dotY}>
            <span className="text-lg tracking-widest">···</span>
          </CursorLabel>
        )}
        {isHoverImage && (
          <CursorLabel x={dotX} y={dotY}>
            <span className="text-[10px] tracking-[0.15em] uppercase">
              View
            </span>
          </CursorLabel>
        )}
        {isHoverVideo && (
          <CursorLabel x={dotX} y={dotY}>
            <span className="text-[10px] tracking-[0.15em] uppercase">
              Play
            </span>
          </CursorLabel>
        )}
      </AnimatePresence>
    </>
  );
}

interface CursorLabelProps {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  children: React.ReactNode;
}

function CursorLabel({ x, y, children }: CursorLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 text-white mix-blend-difference"
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
