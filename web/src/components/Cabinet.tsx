"use client";

import FolderCard from "./FolderCard";
import type { Project } from "@/sanity/types";

/** The desktop: every project, filtered by whichever craft is selected above. */
export default function Cabinet({
  projects,
  craft,
}: {
  projects: Project[];
  craft: string | null;
}) {
  const filtered = projects.filter(
    (p) => craft === null || (p.disciplines ?? []).includes(craft),
  );

  // Unfiltered: lead with the flagship zone (featured), then the rest.
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const split = craft === null && featured.length > 0 && rest.length > 0;

  return (
    <section id="cabinet" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between border-b-2 border-[var(--charcoal)] pb-3">
        <h2 className="mono text-xs tracking-widest">SELECTED WORK</h2>
      </div>

      {filtered.length === 0 && (
        <p className="serif mb-10 text-lg italic opacity-60">
          Nothing filed under that yet.
        </p>
      )}

      {split ? (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <FolderCard key={p._id} p={p} />
            ))}
          </div>
          <h3 className="mono mt-14 mb-8 border-t border-[var(--kraft)] pt-6 text-[11px] tracking-widest opacity-60">
            MORE WORK
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <FolderCard key={p._id} p={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <FolderCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}
