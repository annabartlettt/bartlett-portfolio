import { client } from "@/sanity/client";
import { PROJECTS_QUERY, CATEGORIES_QUERY } from "@/sanity/queries";
import CabinetHome from "@/components/CabinetHome";
import type { Project, Category } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  const [projects, categories] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<Category[]>(CATEGORIES_QUERY),
  ]);

  return (
    <main>
      <CabinetHome projects={projects} categories={categories} />
    </main>
  );
}
