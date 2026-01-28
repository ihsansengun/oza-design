import { ImmersiveNav, Footer } from "@/components/layout";
import { SmoothScroll, ScrollProgress } from "@/components/effects";

export default function LightLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <ScrollProgress color="var(--color-accent)" height={2} />
      <ImmersiveNav variant="light" />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
