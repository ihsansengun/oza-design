"use client";

import { type ReactNode } from "react";
import { useCursorHover, type CursorState } from "./cursor-provider";

interface CursorHoverZoneProps {
  children: ReactNode;
  cursorState: CursorState;
  cursorText?: string;
  className?: string;
  as?: React.ElementType;
}

export function CursorHoverZone({
  children,
  cursorState,
  cursorText,
  className,
  as: Component = "div",
}: CursorHoverZoneProps) {
  const hoverProps = useCursorHover(cursorState, cursorText);

  return (
    <Component className={className} {...hoverProps}>
      {children}
    </Component>
  );
}
