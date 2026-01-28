"use client";

import { type ReactNode } from "react";
import { CursorProvider } from "./cursor-provider";
import { CustomCursor } from "./custom-cursor";

interface CursorWrapperProps {
  children: ReactNode;
}

export function CursorWrapper({ children }: CursorWrapperProps) {
  return (
    <CursorProvider>
      <CustomCursor />
      {children}
    </CursorProvider>
  );
}
