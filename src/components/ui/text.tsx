import { cn } from "@/lib/utils";

type TextSize = "sm" | "base" | "lg";

interface TextProps {
  size?: TextSize;
  muted?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<TextSize, string> = {
  sm: "text-sm leading-relaxed",
  base: "text-base leading-relaxed",
  lg: "text-lg leading-relaxed",
};

export function Text({
  size = "base",
  muted = false,
  className,
  children,
}: TextProps) {
  return (
    <p
      className={cn(
        "font-body",
        sizeStyles[size],
        muted ? "text-text-secondary" : "text-text",
        className
      )}
    >
      {children}
    </p>
  );
}
