import { MetadataRoute } from "next";
import { getProjects, getCollections } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ozadesign.com";

  // Static pages
  const staticPages = [
    "",
    "/projects",
    "/collections",
    "/press",
    "/studio",
    "/contact",
    "/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic project pages
  const projects = await getProjects();
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic collection pages
  const collections = await getCollections();
  const collectionPages = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...collectionPages];
}
