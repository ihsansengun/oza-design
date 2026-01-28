"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useCursor, type CursorState } from "./cursor-provider";

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number; // How much the element moves (default 0.3)
  cursorState?: CursorState; // What cursor state to show on hover
  cursorText?: string;
  as?: "div" | "span" | "button" | "a";
  disabled?: boolean;
}

export function MagneticElement({
  children,
  className = "",
  strength = 0.3,
  cursorState = "hover-link",
  cursorText,
  as = "div",
  disabled = false,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setCursorState, setCursorText, isTouch } = useCursor();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouch) return;

      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    },
    [strength, disabled, isTouch]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setCursorState(cursorState);
    if (cursorText) setCursorText(cursorText);
  }, [setCursorState, setCursorText, cursorState, cursorText, disabled]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setCursorState("default");
    setCursorText("");
  }, [setCursorState, setCursorText]);

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.5,
      }}
    >
      {children}
    </MotionComponent>
  );
}
