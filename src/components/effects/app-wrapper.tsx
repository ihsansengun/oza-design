"use client";

import { type ReactNode } from "react";
import { CursorProvider } from "./cursor-provider";
import { CustomCursor } from "./custom-cursor";
import { PageTransitionProvider } from "@/hooks";
import { PreloaderProvider } from "@/hooks";
import { TransitionOverlay } from "./transition-overlay";
import { Preloader } from "./preloader";

interface AppWrapperProps {
  children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  return (
    <PreloaderProvider>
      <PageTransitionProvider>
        <CursorProvider>
          <Preloader />
          <CustomCursor />
          <TransitionOverlay />
          {children}
        </CursorProvider>
      </PageTransitionProvider>
    </PreloaderProvider>
  );
}
