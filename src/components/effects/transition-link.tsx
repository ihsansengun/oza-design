"use client";

import { type ReactNode, useCallback, type MouseEvent } from "react";
import Link from "next/link";
import { usePageTransition, type TransitionType } from "@/hooks";
import { useCursor } from "./cursor-provider";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  transitionType?: TransitionType;
  cursorState?: "hover-link" | "hover-image";
  cursorText?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function TransitionLink({
  href,
  children,
  className = "",
  transitionType = "wipe",
  cursorState = "hover-link",
  cursorText,
  onClick,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
}: TransitionLinkProps) {
  const { transitionTo, isTransitioning } = usePageTransition();
  const { setCursorState, setCursorText } = useCursor();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Call the optional onClick handler with the event
      onClick?.(e);

      // If default was prevented by onClick, stop here
      if (e.defaultPrevented) {
        return;
      }

      // Allow normal behavior for external links or special keys
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return;
      }

      e.preventDefault();

      if (!isTransitioning) {
        transitionTo(href, transitionType);
      }
    },
    [href, transitionTo, transitionType, isTransitioning, onClick]
  );

  const handleMouseEnter = useCallback(() => {
    setCursorState(cursorState);
    if (cursorText) setCursorText(cursorText);
    onMouseEnterProp?.();
  }, [setCursorState, setCursorText, cursorState, cursorText, onMouseEnterProp]);

  const handleMouseLeave = useCallback(() => {
    setCursorState("default");
    setCursorText("");
    onMouseLeaveProp?.();
  }, [setCursorState, setCursorText, onMouseLeaveProp]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-magnetic ${className}`}
    >
      {children}
    </Link>
  );
}
