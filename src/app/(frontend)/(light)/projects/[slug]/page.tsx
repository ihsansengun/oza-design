import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import {
  ProjectHeroAdvanced,
  ProjectIntro,
  ProjectGalleryAdvanced,
  ProjectQuote,
  NextProject,
} from "@/components/project";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: project.title,
    description:
      project.description ||
      `${project.title} - A ${project.category} project in ${project.location}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const allProjects = await getProjects();

  if (!project) {
    notFound();
  }

  // Find next project (loop to first if at end)
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextIndex = (currentIndex + 1) % allProjects.length;
  const nextProject = allProjects[nextIndex];

  return (
    <>
      {/* Two-column hero with contained image */}
      <ProjectHeroAdvanced project={project} />

      {/* Project description */}
      <ProjectIntro project={project} />

      {/* Gallery with contained images */}
      <ProjectGalleryAdvanced project={project} />

      {/* Optional quote section */}
      <ProjectQuote />

      {/* Next project teaser */}
      {nextProject && <NextProject project={nextProject} />}
    </>
  );
}
