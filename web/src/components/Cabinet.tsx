"use client";

import FolderCard from "./FolderCard";
import type { Project, Category } from "@/sanity/types";

import { DISCIPLINES } from "./CabinetHome";

/**
 * Controlled by CabinetHome, because the doors on the landing page and the
 * pills in here move the same two filters.
 */
export default function Cabinet({
  projects,
  categories,
  craft,
  onCraft,
  theme: active,
  onTheme: setActive,
}: {
  projects: Project[];
  categories: Category[];
  craft: string | null;
  onCraft: (v: string | null) => void;
  theme: string | null;
  onTheme: (v: string | null) => void;
}) {
  const setCraft = onCraft;

  const filtered = projects.filter(
    (p) =>
      (active === null || p.category?.slug === active) &&
      (craft === null || (p.disciplines ?? []).includes(craft)),
  );

  // Unfiltered: lead with the flagship zone (featured), then the rest.
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const split =
    active === null && craft === null && featured.length > 0 && rest.length > 0;

  const pill = (on: boolean) =>
    `mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
      on
        ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
        : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
    }`;

  return (
    <section id="cabinet" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between border-b-2 border-[var(--charcoal)] pb-3">
        <h2 className="mono text-xs tracking-widest">03 · THE WORK — RESEARCH CABINET</h2>
      </div>

      {/* Two lenses on one cabinet: what system, and what craft. */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mono mr-1 text-[10px] tracking-widest opacity-50">
          BY SYSTEM
        </span>
        <button onClick={() => setActive(null)} className={pill(active === null)}>
          All
        </button>
        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => setActive(c.slug)}
            className={pill(active === c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-2">
        <span className="mono mr-1 text-[10px] tracking-widest opacity-50">
          BY CRAFT
        </span>
        <button onClick={() => setCraft(null)} className={pill(craft === null)}>
          All
        </button>
        {DISCIPLINES.map((d) => (
          <button
            key={d.value}
            onClick={() => setCraft(d.value)}
            className={pill(craft === d.value)}
          >
            {d.title}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="serif mb-10 text-lg italic opacity-60">
          Nothing filed under both of those yet.
        </p>
      )}

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
