import type { Metadata } from "next";
import { CollectionsGallery } from "@/components/sections";
import { getCollections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "The OZA Collection - Curated furniture and objects for refined living. Timeless pieces designed for luxury interiors.",
  alternates: {
    canonical: "https://ozadesign.com/collections",
  },
  openGraph: {
    title: "Collections | OZA Design",
    description:
      "Curated furniture and objects for refined living. Timeless pieces designed for luxury interiors.",
    url: "https://ozadesign.com/collections",
  },
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <main className="h-screen bg-[#111111] text-white flex flex-col overflow-hidden">
      {/* Title Section - With top padding for nav overlay */}
      <div className="px-6 md:px-10 pt-24 md:pt-28 pb-6 shrink-0">
        <h1 className="text-2xl md:text-3xl font-heading">Collections</h1>
        <p className="mt-2 text-sm text-white/50 max-w-lg">
          Furniture and accessories crafted with the same attention to detail.
        </p>
      </div>

      {/* Gallery - Fills remaining space */}
      <div className="flex-1 min-h-0">
        <CollectionsGallery collections={collections} />
      </div>
    </main>
  );
}
