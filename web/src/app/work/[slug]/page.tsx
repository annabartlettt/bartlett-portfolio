import { client } from "@/sanity/client";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Drawer from "@/components/Drawer";
import EarlyLofis from "@/components/EarlyLofis";
import BsoSketch from "@/components/BsoSketch";
import LoomEmbed from "@/components/LoomEmbed";
import SlideDeck from "@/components/SlideDeck";
import { urlFor } from "@/sanity/image";
import { Fragment, type CSSProperties } from "react";
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
          <p className="mono text-[11px] tracking-widest opacity-80">
            <Link href="/" className="underline-offset-2 hover:underline">
              Anna Bartlett
            </Link>
            {p.category?.name && <span> ▸ {p.category.name}</span>}
            <span> ▸ {p.title}</span>
          </p>
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
          id={`s${s.number}`}
          className="mx-auto max-w-4xl scroll-mt-20 border-b border-[var(--kraft)] px-6 py-16"
        >
          <p
            className="mono text-[12px] font-bold tracking-widest"
            style={{ color: s.accent ?? primary }}
          >
            {s.number} · {s.kicker}
          </p>
          <h2 className="display mt-3 text-3xl">{s.title}</h2>
          <div
            className="rich serif mt-4 text-lg leading-relaxed opacity-90"
            style={
              { "--rich-accent": s.accent ?? primary } as CSSProperties
            }
          >
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
                      alt={im.alt ?? im.caption ?? s.title ?? ""}
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
        {slug === "anosity" && s.number === "02" && (
          <SlideDeck
            kicker="THE RESEARCH · WHAT THE READING TURNED UP"
            title="Five ways of looking at it."
            blurb="Anxiety gets described as feeling too much. The research kept pointing somewhere else: not an excess of feeling but a shortage of information about your own state. These are the visuals that argument was built on, in the order it arrived."
            decks={[
              {
                name: "Research visuals",
                href: "https://bartlettanna.com/work/anosity",
                slides: [
                  { src: "/images/anosity/research/r1.jpg", alt: "Research visual: anxiety as more than worry", label: "More than worry" },
                  { src: "/images/anosity/research/r2.jpg", alt: "Research visual: the hidden pattern beneath anxious episodes", label: "The hidden pattern" },
                  { src: "/images/anosity/research/r3.jpg", alt: "Research visual: curious awareness as the alternative to judgement", label: "Curious awareness" },
                  { src: "/images/anosity/research/r4.jpg", alt: "Research visual: moving from research findings into design decisions", label: "Research to design" },
                  { src: "/images/anosity/research/r5.jpg", alt: "Research visual: voices from the research", label: "Research voices" },
                ],
              },
            ]}
            numbered
            aspect="16 / 9"
            width={760}
            accent={brand.primary ?? primary}
          />
        )}
        {slug === "anosity" && s.number === "03" && <EarlyLofis />}
        {slug === "boston-symphony-orchestra" && s.number === "04" && (
          <BsoSketch accent={brand.secondary ?? primary} />
        )}
        {slug === "storybridge" && s.number === "04" && (
          <SlideDeck
            kicker="THE ROLES · EARLY TO BUILT"
            title="Two directions, one system."
            blurb="An author writes outward and a reader browses inward, so the two sides of the platform could not share a layout. These are the mid-fidelity passes for each role, then the reader library as it ended up: search, genre, and the reading level that decides which version of a story you get."
            decks={[
              {
                name: "Author to reader",
                href: "https://bartlettanna.com/work/storybridge",
                slides: [
                  { src: "/images/storybridge/wire-author.jpg", alt: "Mid-fidelity wireframe of the StoryBridge author page", label: "Author, mid-fi" },
                  { src: "/images/storybridge/wire-reader.jpg", alt: "Mid-fidelity wireframe of the StoryBridge reader page", label: "Reader, mid-fi" },
                  { src: "/images/storybridge/library.jpg", alt: "The built StoryBridge Story Library with search, genre filters and reading level filters", label: "Story Library, built" },
                ],
              },
            ]}
            numbered
            aspect="4 / 3"
            fit="contain"
            width={720}
            accent={brand.primary ?? primary}
          />
        )}
        {slug === "storybridge" && s.number === "04" && (
          <LoomEmbed
            id="f90ed4bac3354529a95fb042162b1a76"
            kicker="WALKTHROUGH · THE WORKING PROTOTYPE"
            title="Five minutes inside StoryBridge."
            blurb="The roles above, in motion — an author drafting a story, a reader browsing the cards, and the adapted copy sitting beside the original rather than replacing it."
            caption="StoryBridge: AI Matched Stories for Students · 4:58"
            accent={brand.primary ?? primary}
          />
        )}
        </Fragment>
      ))}

      {/* Notes */}
      {p.notes && p.notes.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="mono text-[11px] tracking-widest opacity-70">
            CASE STUDY NOTES
          </p>
          <div className="rich serif mt-3 text-lg italic opacity-80">
            <PortableText value={p.notes as PortableTextBlock[]} />
          </div>
        </section>
      )}
    </main>
  );
}
