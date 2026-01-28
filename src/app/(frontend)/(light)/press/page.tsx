import type { Metadata } from "next";
import { PressHero, PressGrid } from "@/components/press";
import { getPress } from "@/lib/data";

export const metadata: Metadata = {
  title: "Press",
  description:
    "OZA Design in the press. Featured in Architectural Digest, Vogue Living, Elle Decoration, and more.",
  alternates: {
    canonical: "https://ozadesign.com/press",
  },
  openGraph: {
    title: "Press | OZA Design",
    description:
      "OZA Design featured in leading architecture and design publications worldwide.",
    url: "https://ozadesign.com/press",
  },
};

export default async function PressPage() {
  const pressItems = await getPress();

  return (
    <>
      {/* Hero with animated title */}
      <PressHero />

      {/* Grid with staggered card animations */}
      <PressGrid items={pressItems} />
    </>
  );
}
