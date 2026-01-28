import type { Metadata } from "next";
import { ProjectsGallery } from "@/components/sections";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore our portfolio of luxury residential projects. From London townhouses to Istanbul apartments, discover spaces designed with intention.",
  alternates: {
    canonical: "https://ozadesign.com/projects",
  },
  openGraph: {
    title: "Projects | OZA Design",
    description:
      "Explore our portfolio of luxury residential projects designed with intention.",
    url: "https://ozadesign.com/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="h-screen bg-[#111111] text-white flex flex-col overflow-hidden">
      {/* Title Section - With top padding for nav overlay */}
      <div className="px-6 md:px-10 pt-24 md:pt-28 pb-6 shrink-0">
        <h1 className="text-2xl md:text-3xl font-heading">Projects</h1>
        <p className="mt-2 text-sm text-white/50 max-w-lg">
          A curated collection of residential spaces where architecture meets
          artistry.
        </p>
      </div>

      {/* Gallery - Fills remaining space */}
      <div className="flex-1 min-h-0">
        <ProjectsGallery projects={projects} />
      </div>
    </main>
  );
}
