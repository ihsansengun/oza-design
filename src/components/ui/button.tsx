"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MagneticElement } from "@/components/effects";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean; // Enable magnetic effect
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent/90 border border-transparent",
  secondary:
    "bg-transparent text-text border border-border hover:border-text",
  ghost:
    "bg-transparent text-text hover:text-accent border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  magnetic = false,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center",
    "font-body font-medium",
    "transition-all duration-[var(--duration-normal)]",
    "[transition-timing-function:var(--ease-out)]",
    variantStyles[variant],
    sizeStyles[size],
    magnetic && "cursor-magnetic",
    className
  );

  let buttonContent: React.ReactNode;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props as ButtonAsLink;
    buttonContent = (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  } else {
    buttonContent = (
      <button className={classes} {...(props as ButtonAsButton)}>
        {children}
      </button>
    );
  }

  if (magnetic) {
    return (
      <MagneticElement strength={0.2} cursorState="hover-link" className="inline-block">
        {buttonContent}
      </MagneticElement>
    );
  }

  return buttonContent;
}
