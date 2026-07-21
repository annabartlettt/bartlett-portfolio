"use client";

import { useState } from "react";
import FolderCard from "./FolderCard";
import type { Project, Category } from "@/sanity/types";

export default function Cabinet({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active
    ? projects.filter((p) => p.category?.slug === active)
    : projects;

  // Unfiltered: lead with the flagship zone (featured), then the rest.
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const split = active === null && featured.length > 0 && rest.length > 0;

  return (
    <section id="cabinet" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between border-b-2 border-[var(--charcoal)] pb-3">
        <h2 className="mono text-xs tracking-widest">03 · THE WORK — RESEARCH CABINET</h2>
      </div>

      {/* Category filter (invisible systems) */}
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest transition ${
            active === null
              ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
              : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
          }`}
        >
          ALL
        </button>
        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => setActive(c.slug)}
            className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
              active === c.slug
                ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
                : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {split ? (
        <>
          <div className="grid gap-8 md:grid-cols-2">
            {featured.map((p) => (
              <FolderCard key={p._id} p={p} />
            ))}
          </div>
          <h3 className="mono mt-14 mb-8 border-t border-[var(--kraft)] pt-6 text-[11px] tracking-widest opacity-60">
            MORE WORK
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            {rest.map((p) => (
              <FolderCard key={p._id} p={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((p) => (
            <FolderCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}
