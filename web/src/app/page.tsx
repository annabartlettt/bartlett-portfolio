import { client } from "@/sanity/client";
import { PROJECTS_QUERY, SEARCH_QUERY } from "@/sanity/queries";
import CabinetHome from "@/components/CabinetHome";
import type { Project, SearchData } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  const [projects, search] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<SearchData>(SEARCH_QUERY),
  ]);

  return (
    <main>
      <CabinetHome projects={projects} search={search} />
    </main>
  );
}
