import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/queries";
import CabinetHome from "@/components/CabinetHome";
import type { Project } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);
  return (
    <main>
      <CabinetHome projects={projects} />
    </main>
  );
}
