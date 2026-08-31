import Link from "next/link";
import FolderIcon from "./FolderIcon";
import type { Project } from "@/sanity/types";

const TIER_LABEL: Record<string, string> = {
  flagship: "FLAGSHIP",
  support: "CASE STUDY",
  archive: "ARCHIVE",
};

/**
 * A folder on the desktop: the same icon the landing page uses, in the
 * project's own colour, with the name under it and enough of the contents to
 * decide whether to open it.
 */
export default function FolderCard({ p }: { p: Project }) {
  const primary = p.brand?.primary ?? "#363f9e";
  const tier = TIER_LABEL[p.priority ?? "support"] ?? "CASE STUDY";

  return (
    <Link
      href={`/work/${p.slug}`}
      className="group flex gap-5 rounded-xl border border-transparent p-4 transition hover:border-[var(--kraft)] hover:bg-[var(--paper)]"
      aria-label={`Open ${p.title}`}
    >
      <FolderIcon
        color={primary}
        className="w-16 shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 sm:w-20"
      />

      <div className="min-w-0">
        <p
          className="mono text-[10px] font-bold tracking-widest"
          style={{ color: primary }}
        >
          {p.folderNumber} · {p.category?.name?.toUpperCase()} · {tier}
        </p>

        <h3 className="display mt-1 text-xl leading-tight">{p.title}</h3>

        {p.invisibleSystem && (
          <p className="mt-1.5 text-[13.5px] leading-snug opacity-75">
            {p.invisibleSystem}
          </p>
        )}

        {p.methods && p.methods.length > 0 && (
          <p className="mono mt-2.5 text-[10px] tracking-widest opacity-55">
            {p.methods.join(" · ").toUpperCase()}
          </p>
        )}
      </div>
    </Link>
  );
}
