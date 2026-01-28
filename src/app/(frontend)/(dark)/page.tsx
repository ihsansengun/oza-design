import {
  SceneHero,
  SceneProjects,
  SceneAbout,
  SceneFooter,
} from "@/components/scenes";
import { getProjects } from "@/lib/data";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="bg-[#111111] text-white">
      <SceneHero />
      <SceneProjects projects={projects} />
      <SceneAbout />
      <SceneFooter />
    </main>
  );
}
