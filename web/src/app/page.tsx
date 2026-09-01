import { client } from "@/sanity/client";
import { ESSAYS_QUERY, PROJECTS_QUERY } from "@/sanity/queries";
import CabinetHome from "@/components/CabinetHome";
import type { Essay, Project } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  const [projects, essays] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<Essay[]>(ESSAYS_QUERY),
  ]);

  return (
    <main>
      <CabinetHome projects={projects} essays={essays} />
    </main>
  );
}
