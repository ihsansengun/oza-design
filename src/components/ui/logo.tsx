import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark"; // light = white logo, dark = dark logo
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
}

export function Logo({ variant = "dark", size = "md", className }: LogoProps) {
  const sizes = {
    sm: "h-5 w-auto",
    md: "h-7 w-auto",
    lg: "h-10 w-auto",
    xl: "h-14 w-auto",
    hero: "h-[15vw] md:h-[12vw] lg:h-[10vw] w-auto",
  };

  return (
    <svg
      viewBox="0 0 63 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        sizes[size],
        variant === "light" ? "text-white/85" : "text-stone-900",
        className
      )}
      aria-label="OZA Design"
    >
      <path
        d="M9.3518 21.3005C4.7945 21.3005 1.09958 17.2968 1.09958 12.739C1.09958 8.18171 4.7945 4.17806 9.3518 4.17806C13.9096 4.17806 17.6045 8.18171 17.6045 12.739C17.6045 17.2968 13.9096 21.3005 9.3518 21.3005ZM9.3518 3.38721C4.18683 3.38721 0 7.57404 0 12.739C0 17.904 4.18683 22.0913 9.3518 22.0913C14.5168 22.0913 18.7041 17.904 18.7041 12.739C18.7041 7.57404 14.5168 3.38721 9.3518 3.38721Z"
        fill="currentColor"
      />
      <path
        d="M25.1384 4.77563C25.1384 4.77563 25.2952 4.4526 30.5316 4.4526H38.3697L25.1384 22.0696H40.4445V20.7154C40.4445 20.7154 40.314 21.0384 34.6799 21.0384H27.2256L40.4445 3.40901H25.1384V4.77563Z"
        fill="currentColor"
      />
      <path
        d="M54.7631 3.40903H55.4588C55.4588 3.40903 58.8323 12.1591 60.6271 16.8143C62.4219 21.4695 63 22.0696 63 22.0696H61.5464L55.1109 5.39681L48.6505 22.0696H47.2093C47.2093 22.0696 47.5361 22.1115 49.5823 16.8143L54.7631 3.40903Z"
        fill="currentColor"
      />
      <path
        d="M12.9178 0.687942H5.78627V0H12.9178V0.687942Z"
        fill="currentColor"
      />
    </svg>
  );
}
