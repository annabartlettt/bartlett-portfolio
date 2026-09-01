import Link from "next/link";
import FolderIcon from "./FolderIcon";
import { urlFor } from "@/sanity/image";
import { DISCIPLINES } from "./CabinetHome";
import type { Project } from "@/sanity/types";

/** Slugs with a cover sitting in /public/images/covers/. */
const LOCAL_COVERS = new Set(["anosity", "storybridge"]);

/**
 * One project on the desktop.
 *
 * The cover carries it where there is one; where there is not, the folder icon
 * stands in so the grid stays even and gets better as covers arrive. The
 * discipline tags do the work that four separate sections used to: range shown
 * per project rather than by splitting the site.
 */
export default function FolderCard({ p }: { p: Project }) {
  const primary = p.brand?.primary ?? "#363f9e";
  // Sanity cover if there is one, otherwise a file dropped in
  // /public/images/covers/<slug>.jpg, otherwise the folder icon.
  const cover = p.coverImage?.asset
    ? urlFor(p.coverImage).width(900).height(640).fit("crop").auto("format").url()
    : LOCAL_COVERS.has(p.slug)
      ? `/images/covers/${p.slug}.jpg`
      : null;

  const tags = (p.disciplines ?? [])
    .map((v) => DISCIPLINES.find((d) => d.value === v))
    .filter(Boolean);

  return (
    <Link
      href={`/work/${p.slug}`}
      className="group block"
      aria-label={`Open ${p.title}`}
    >
      <div
        className="flex aspect-[7/5] items-center justify-center overflow-hidden rounded-xl border transition-all duration-200 group-hover:-translate-y-1"
        style={{
          borderColor: "var(--kraft)",
          background: cover ? "var(--cream2)" : "var(--paper)",
        }}
      >
        {cover ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cover}
            alt={p.coverImage?.alt ?? p.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <FolderIcon color={primary} className="w-24 opacity-90" />
        )}
      </div>

      <h3 className="display mt-3 text-lg leading-tight">{p.title}</h3>

      {p.invisibleSystem && (
        <p className="mt-1 text-[13px] leading-snug opacity-70">
          {p.invisibleSystem}
        </p>
      )}

      {tags.length > 0 && (
        <p className="mono mt-2 text-[10px] tracking-widest">
          {tags.map((t, i) => (
            <span key={t!.value} style={{ color: t!.accent }}>
              {i > 0 && <span className="opacity-40"> · </span>}
              {t!.title.toUpperCase()}
            </span>
          ))}
        </p>
      )}
    </Link>
  );
}
