import { client } from "@/sanity/client";
import { PROJECTS_QUERY, CATEGORIES_QUERY } from "@/sanity/queries";
import Cabinet from "@/components/Cabinet";
import type { Project, Category } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  const [projects, categories] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<Category[]>(CATEGORIES_QUERY),
  ]);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <p className="mono text-xs tracking-widest opacity-70">
          01 · INDEX · OPENING THE CABINET
        </p>
        <h1 className="display mt-4 text-5xl leading-[1.05] md:text-6xl">
          I make invisible
          <br />
          systems visible.
        </h1>
        <p className="serif mt-6 max-w-2xl text-xl italic opacity-80">
          A research cabinet of design work — each folder opens a system I found,
          mapped, and made tangible.
        </p>
        <a
          href="#cabinet"
          className="mono mt-8 inline-block rounded-lg bg-[var(--ink)] px-6 py-3 text-[13px] tracking-widest text-[var(--cream)]"
        >
          OPEN THE CABINET ↓
        </a>
      </section>

      <Cabinet projects={projects} categories={categories} />
    </main>
  );
}
