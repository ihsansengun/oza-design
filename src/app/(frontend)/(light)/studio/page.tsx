import type { Metadata } from "next";
import {
  StudioHero,
  StudioIntro,
  StudioAbout,
  StudioStory,
  StudioServices,
  StudioPhilosophy,
  StudioAwards,
} from "@/components/studio";
import { studioData } from "@/lib/studio-data";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Meet OZA Design - An award-winning architecture and interior design studio founded by Ozge Ozturk. Based in London and Istanbul.",
  alternates: {
    canonical: "https://ozadesign.com/studio",
  },
  openGraph: {
    title: "Studio | OZA Design",
    description:
      "An award-winning architecture and interior design studio based in London and Istanbul.",
    url: "https://ozadesign.com/studio",
  },
};

export default function StudioPage() {
  return (
    <main className="bg-white">
      {/* Full-screen hero with STUDIO text */}
      <StudioHero />

      {/* Large italicized tagline */}
      <StudioIntro tagline={studioData.tagline} />

      {/* About paragraphs */}
      <StudioAbout paragraphs={studioData.aboutParagraphs} />

      {/* Our Story section with founders */}
      <StudioStory />

      {/* Services grid */}
      <StudioServices services={studioData.services} />

      {/* Philosophy quote - dramatic dark section */}
      <StudioPhilosophy quote={studioData.philosophy[0]} />

      {/* Awards list */}
      <StudioAwards awards={studioData.awards} />
    </main>
  );
}
