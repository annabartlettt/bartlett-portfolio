import { client } from "@/sanity/client";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Drawer from "@/components/Drawer";
import EarlyLofis from "@/components/EarlyLofis";
import { urlFor } from "@/sanity/image";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/sanity/types";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await client.fetch<Project | null>(PROJECT_QUERY, { slug });
  if (!p) return {};
  const desc = p.invisibleSystem ?? p.coverSub ?? undefined;
  const ogImage = p.coverImage?.asset
    ? urlFor(p.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;
  return {
    title: p.title,
    description: desc,
    openGraph: {
      title: `${p.title} · Anna Bartlett`,
      description: desc,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await client.fetch<Project | null>(PROJECT_QUERY, { slug });
  if (!p) notFound();

  const brand = p.brand ?? {};
  const primary = brand.primary ?? "#363f9e";
  const onDark = brand.onDark ?? "#ffffff";

  return (
    <main>
      {/* Cover */}
      <section className="px-6 py-20 text-[var(--cream)]" style={{ background: primary }}>
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="mono text-[11px] tracking-widest opacity-80">
            ← BACK TO CABINET
          </Link>
          <p className="mono mt-8 text-[12px] tracking-widest" style={{ color: onDark }}>
            FOLDER {p.folderNumber} · OPENED
          </p>
          <h1 className="display mt-3 text-5xl md:text-6xl">
            {p.coverHeadline ?? p.title}
          </h1>
          {p.coverSub && (
            <p className="serif mt-5 max-w-2xl text-2xl italic opacity-90">
              {p.coverSub}
            </p>
          )}
          <div className="mono mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[13px]">
            {p.role && (
              <span>
                <b className="opacity-60">ROLE </b>
                {p.role}
              </span>
            )}
            {p.timeline && (
              <span>
                <b className="opacity-60">TIMELINE </b>
                {p.timeline}
              </span>
            )}
            {p.team && (
              <span>
                <b className="opacity-60">TEAM </b>
                {p.team}
              </span>
            )}
          </div>

          {p.coverImage?.asset && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(p.coverImage).width(1800).auto("format").url()}
              alt={p.coverImage.alt ?? `${p.title} — cover`}
              className="mt-12 w-full rounded-2xl"
            />
          )}
        </div>
      </section>

      {/* Sections */}
      {p.sections?.map((s) => (
        <Fragment key={s._key}>
        <section
          className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-16"
        >
          <p
            className="mono text-[12px] font-bold tracking-widest"
            style={{ color: s.accent ?? primary }}
          >
            {s.number} · {s.kicker}
          </p>
          <h2 className="display mt-3 text-3xl">{s.title}</h2>
          <div className="serif mt-4 text-lg leading-relaxed opacity-90">
            <PortableText value={(s.body ?? []) as PortableTextBlock[]} />
          </div>

          {s.image?.asset && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(s.image).width(1500).auto("format").url()}
              alt={s.image.alt ?? s.title ?? ""}
              className="mt-8 w-full rounded-xl border border-[var(--kraft)]"
            />
          )}

          {(() => {
            const filled = (s.images ?? []).filter((im) => im.image?.asset);
            if (filled.length === 0) return null;
            return (
              <div
                className={`mt-8 grid gap-5 ${filled.length > 1 ? "sm:grid-cols-2" : ""}`}
              >
                {filled.map((im, i) => (
                  <figure key={im._key ?? i} className="m-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlFor(im.image!).width(1400).auto("format").url()}
                      alt={im.caption ?? s.title ?? ""}
                      className="w-full rounded-xl border border-[var(--kraft)]"
                    />
                    {im.caption && (
                      <figcaption className="mono mt-2 text-[11px] tracking-wide opacity-60">
                        {im.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );
          })()}

          {s.stats && s.stats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-10">
              {s.stats.map((st, i) => (
                <div key={i}>
                  <div
                    className="display text-4xl"
                    style={{ color: s.accent ?? primary }}
                  >
                    {st.value}
                  </div>
                  <div className="mono text-[11px] tracking-widest opacity-70">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {s.drawer?.label && (
            <Drawer
              label={s.drawer.label}
              content={s.drawer.content}
              accent={s.accent ?? primary}
            />
          )}
        </section>
        {slug === "anosity" && s.number === "02" && <EarlyLofis />}
        </Fragment>
      ))}

      {/* Notes */}
      {p.notes && p.notes.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="mono text-[11px] tracking-widest opacity-70">
            CASE STUDY NOTES
          </p>
          <div className="serif mt-3 text-lg italic opacity-80">
            <PortableText value={p.notes as PortableTextBlock[]} />
          </div>
        </section>
      )}
    </main>
  );
}
