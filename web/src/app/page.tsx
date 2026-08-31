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
          The subject changes.
          <br />
          The problem doesn&rsquo;t.
        </h1>
        <p className="serif mt-6 max-w-2xl text-xl italic opacity-80">
          Design school taught me a way of asking, not a set of tools: what does
          a person already know, what do they need next, what should they leave
          with. I have pointed those questions at mobility data, anxiety,
          literacy, a symphony season, and a brand new university office. They
          keep working.
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
