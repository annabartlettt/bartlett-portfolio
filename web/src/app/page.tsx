import { client } from "@/sanity/client";
import { ESSAYS_QUERY, PROJECTS_QUERY, SEARCH_QUERY } from "@/sanity/queries";
import CabinetHome from "@/components/CabinetHome";
import type { Essay, Project, SearchData } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  const [projects, search, essays] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<SearchData>(SEARCH_QUERY),
    client.fetch<Essay[]>(ESSAYS_QUERY),
  ]);

  return (
    <main>
      <CabinetHome projects={projects} search={search} essays={essays} />
    </main>
  );
}
