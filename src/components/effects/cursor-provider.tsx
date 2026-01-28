"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

export type CursorState =
  | "default"
  | "hover-link"
  | "hover-image"
  | "hover-video"
  | "dragging"
  | "drag"
  | "hidden";

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  mousePosition: { x: number; y: number };
  isTouch: boolean;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}

// Helper hook for components to easily set cursor state on hover
export function useCursorHover(
  state: CursorState,
  text?: string
): {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
} {
  const { setCursorState, setCursorText } = useCursor();

  return {
    onMouseEnter: useCallback(() => {
      setCursorState(state);
      if (text) setCursorText(text);
    }, [setCursorState, setCursorText, state, text]),
    onMouseLeave: useCallback(() => {
      setCursorState("default");
      setCursorText("");
    }, [setCursorState, setCursorText]),
  };
}

interface CursorProviderProps {
  children: ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorText, setCursorText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };

    checkTouch();

    // Handle mouse movement with RAF for performance
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePosition(mouseRef.current);
          rafRef.current = null;
        });
      }
    };

    // Handle mouse leave (cursor exits viewport)
    const handleMouseLeave = () => {
      setCursorState("hidden");
    };

    // Handle mouse enter (cursor enters viewport)
    const handleMouseEnter = () => {
      if (cursorState === "hidden") {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [cursorState]);

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        setCursorState,
        cursorText,
        setCursorText,
        mousePosition,
        isTouch,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}
