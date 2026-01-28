import { ImmersiveNav } from "@/components/layout";
import { ScrollProgress } from "@/components/effects";

export default function DarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <ScrollProgress color="rgba(201, 168, 124, 0.6)" height={2} />
      <ImmersiveNav variant="dark" />
      {children}
    </div>
  );
}
