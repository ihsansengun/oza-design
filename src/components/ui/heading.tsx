import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  className?: string;
  children: React.ReactNode;
}

const levelStyles: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-5xl lg:text-6xl",
  2: "text-3xl md:text-4xl",
  3: "text-2xl md:text-3xl",
  4: "text-xl md:text-2xl",
  5: "text-lg md:text-xl",
  6: "text-base md:text-lg",
};

export function Heading({ level = 1, className, children }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={cn(
        "font-heading font-light tracking-tight text-text",
        levelStyles[level],
        className
      )}
    >
      {children}
    </Tag>
  );
}
