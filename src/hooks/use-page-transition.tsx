"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type TransitionType = "wipe" | "fade" | "slide";

interface PageTransitionContextType {
  isTransitioning: boolean;
  transitionType: TransitionType;
  transitionTo: (href: string, type?: TransitionType) => void;
  completeTransition: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(
  null
);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return context;
}

interface PageTransitionProviderProps {
  children: ReactNode;
}

// Transition timing constants
export const TRANSITION_DURATION = 600; // ms
export const TRANSITION_ENTER_DELAY = 300; // ms - delay before new page fades in

export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<TransitionType>("wipe");
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const transitionTo = useCallback(
    (href: string, type: TransitionType = "wipe") => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setTransitionType(type);
      setPendingHref(href);

      // Navigate after overlay covers the screen
      setTimeout(() => {
        router.push(href);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, router]
  );

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
    setPendingHref(null);
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        transitionType,
        transitionTo,
        completeTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}
