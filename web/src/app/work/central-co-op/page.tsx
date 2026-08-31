import Link from "next/link";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PROJECT_QUERY } from "@/sanity/queries";
import FolderIcon from "@/components/FolderIcon";
import { PARTS } from "@/content/central-coop";
import type { Project } from "@/sanity/types";

export const revalidate = 60;
export const metadata = {
  title: "Central Co-op",
  description:
    "Six months building a new university office: brand, social, graphic design, editorial and research.",
};

export default async function CentralCoopIndex() {
  const p = await client.fetch<Project>(PROJECT_QUERY, { slug: "central-co-op" });
  if (!p) notFound();

  const primary = p.brand?.primary ?? "#363f9e";
  const opening = p.sections?.find((s) => s.number === "01");
  const closing = p.sections?.find((s) => s.number === "04");

  return (
    <main>
      <section className="px-6 py-16 text-[var(--cream)]" style={{ background: primary }}>
        <div className="mx-auto max-w-5xl">
          <p className="mono text-[11px] tracking-widest opacity-80">
            <Link href="/" className="underline-offset-2 hover:underline">
              Anna Bartlett
            </Link>
            {p.category?.name && <span> ▸ {p.category.name}</span>}
            <span> ▸ {p.title}</span>
          </p>
          <h1 className="display mt-4 text-4xl md:text-5xl">{p.title}</h1>
          {p.coverSub && (
            <p className="serif mt-4 max-w-2xl text-xl italic opacity-90">
              {p.coverSub}
            </p>
          )}
          <div className="mono mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[11px] tracking-widest opacity-90">
            {p.role && <span><b className="opacity-60">ROLE </b>{p.role}</span>}
            {p.timeline && <span><b className="opacity-60">TIMELINE </b>{p.timeline}</span>}
            {p.team && <span><b className="opacity-60">TEAM </b>{p.team}</span>}
          </div>
        </div>
      </section>

      {opening && (
        <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
          <p className="mono text-[12px] font-bold tracking-widest" style={{ color: primary }}>
            {opening.number} · {opening.kicker}
          </p>
          <h2 className="display mt-3 text-3xl">{opening.title}</h2>
          {opening.body && (
            <div className="rich serif mt-4 text-lg leading-relaxed">
              <PortableText value={opening.body as PortableTextBlock[]} />
            </div>
          )}
        </section>
      )}

      <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
        <p className="mono text-[12px] font-bold tracking-widest" style={{ color: primary }}>
          INSIDE THIS FOLDER
        </p>
        <h2 className="display mt-3 text-3xl">Five kinds of work in six months.</h2>
        <p className="serif mt-4 text-lg leading-relaxed opacity-90">
          One office needed a brand, an audience, a great deal of graphic design,
          somebody to go out and report, and the research to know whether any of
          it was landing. Open whichever you came for.
        </p>

        <ul className="mt-9 grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 sm:grid-cols-3 lg:grid-cols-5 sm:gap-x-4">
          {PARTS.map((part) => (
            <li key={part.slug}>
              <Link
                href={`/work/central-co-op/${part.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <FolderIcon
                  color={primary}
                  className="w-20 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105"
                />
                <span className="mt-2 text-[13.5px] leading-snug font-medium" style={{ color: primary }}>
                  {part.title}
                </span>
                <span className="mt-1 text-[12px] leading-snug opacity-65">
                  {part.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {closing && (
        <section className="mx-auto max-w-4xl px-6 py-14">
          <p className="mono text-[12px] font-bold tracking-widest" style={{ color: primary }}>
            {closing.number} · {closing.kicker}
          </p>
          <h2 className="display mt-3 text-3xl">{closing.title}</h2>
          {closing.body && (
            <div className="rich serif mt-4 text-lg leading-relaxed">
              <PortableText value={closing.body as PortableTextBlock[]} />
            </div>
          )}
        </section>
      )}
    </main>
  );
}
