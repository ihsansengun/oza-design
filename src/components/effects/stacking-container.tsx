"use client";

import { cn } from "@/lib/utils";

interface StackingContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StackingContainer({ children, className }: StackingContainerProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
}
