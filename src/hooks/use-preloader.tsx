"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface PreloaderContextType {
  isLoading: boolean;
  hasShownPreloader: boolean;
  completePreloader: () => void;
  progress: number;
}

const PreloaderContext = createContext<PreloaderContextType | null>(null);

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
}

interface PreloaderProviderProps {
  children: ReactNode;
}

const SESSION_KEY = "oza-preloader-shown";
export const PRELOADER_DURATION = 2200; // ms - total preloader animation time

export function PreloaderProvider({ children }: PreloaderProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownPreloader, setHasShownPreloader] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader has already shown this session
    const hasShown = sessionStorage.getItem(SESSION_KEY) === "true";

    if (hasShown) {
      setIsLoading(false);
      setHasShownPreloader(true);
      setProgress(100);
      return;
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Ease out progress - faster at start, slower at end
        const increment = Math.max(1, (100 - prev) * 0.1);
        return Math.min(100, prev + increment);
      });
    }, 50);

    // Complete after duration
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      sessionStorage.setItem(SESSION_KEY, "true");
      setHasShownPreloader(true);

      // Small delay before hiding to show 100%
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }, PRELOADER_DURATION);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const completePreloader = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setHasShownPreloader(true);
    setIsLoading(false);
    setProgress(100);
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        isLoading,
        hasShownPreloader,
        completePreloader,
        progress,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}
