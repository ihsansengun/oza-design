import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        "max-w-[var(--container-max)]",
        "px-[var(--container-padding)]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
