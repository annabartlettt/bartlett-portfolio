import Link from "next/link";
import type { Project } from "@/sanity/types";
import { urlFor } from "@/sanity/image";

const TIER_LABEL: Record<string, string> = {
  flagship: "FLAGSHIP",
  support: "CASE STUDY",
  archive: "ARCHIVE",
};

export default function FolderCard({ p }: { p: Project }) {
  const brand = p.brand ?? {};
  const primary = brand.primary ?? "#363f9e";
  const tint = brand.tint ?? "#efe8d8";
  const tierLabel = TIER_LABEL[p.priority ?? "support"] ?? "CASE STUDY";

  return (
    <Link
      href={`/work/${p.slug}`}
      className="group block"
      aria-label={`Open case study: ${p.title}`}
    >
      {/* Folder tab */}
      <div
        className="mono inline-flex items-center gap-2 rounded-t-lg px-4 py-2 text-[10px] font-bold tracking-widest text-[var(--cream)]"
        style={{ background: primary }}
      >
        FOLDER {p.folderNumber} · {p.category?.name?.toUpperCase()}
        <span className="rounded bg-[var(--cream)] px-1.5 py-0.5 text-[9px] text-[var(--charcoal)]">
          {tierLabel}
        </span>
      </div>

      {/* Body */}
      <div className="rounded-b-xl rounded-tr-xl border border-[var(--kraft)] bg-[var(--paper)] p-6 transition group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-2xl leading-tight">{p.title}</h3>
          <span
            className="mono whitespace-nowrap text-[11px] tracking-widest"
            style={{ color: primary }}
          >
            ↳ OPEN CASE STUDY
          </span>
        </div>

        {p.coverImage?.asset ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(p.coverImage).width(880).height(400).fit("crop").auto("format").url()}
            alt=""
            className="my-5 h-44 w-full rounded-lg object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="my-5 h-24 rounded-lg"
            style={{ background: tint }}
            aria-hidden
          />
        )}

        <p className="mono text-[10px] font-bold tracking-widest" style={{ color: primary }}>
          ◆ INVISIBLE SYSTEM
        </p>
        <p className="mt-1 text-sm leading-relaxed opacity-90">{p.invisibleSystem}</p>

        <p className="mono mt-4 text-[10px] font-bold tracking-widest" style={{ color: primary }}>
          ◇ MADE TANGIBLE
        </p>
        <p className="mt-1 text-sm leading-relaxed opacity-90">{p.madeTangible}</p>

        {p.methods && p.methods.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {p.methods.map((m) => (
              <span
                key={m}
                className="rounded-md bg-[var(--cream2)] px-2.5 py-1 text-[11px]"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {p.themeTags && p.themeTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.themeTags.map((t) => (
              <span
                key={t}
                className="rounded-md border px-2.5 py-1 text-[11px]"
                style={{ borderColor: primary, color: primary }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
