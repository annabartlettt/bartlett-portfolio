import { client } from "@/sanity/client";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Drawer from "@/components/Drawer";
import EarlyLofis from "@/components/EarlyLofis";
import AnosityRings from "@/components/AnosityRings";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import BsoSketch from "@/components/BsoSketch";
import LoomEmbed from "@/components/LoomEmbed";
import SlideDeck from "@/components/SlideDeck";
import TwoSides from "@/components/TwoSides";
import SbScreens from "@/components/SbScreens";
import SbRuleScreens from "@/components/SbRuleScreens";
import SbSystem from "@/components/SbSystem";
import SbReadings from "@/components/SbReadings";
import SbLoop from "@/components/SbLoop";
import FbVoices from "@/components/FbVoices";
import FbRetireMap from "@/components/FbRetireMap";
import FbPivot from "@/components/FbPivot";
import FbW4Flow from "@/components/FbW4Flow";
import FbSearchChat from "@/components/FbSearchChat";
import BsoEvolution from "@/components/BsoEvolution";
import BsoParameters from "@/components/BsoParameters";
import BsoApplications from "@/components/BsoApplications";
import { urlFor } from "@/sanity/image";
import { Fragment, type CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/sanity/types";
import type { Metadata } from "next";

/** WCAG contrast between two hex colours, so the cover band can pick a
 *  readable text colour instead of assuming its brand colour is dark. */
function luminance(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return 0;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const HERO_CREAM = "#F6EEDA";
const HERO_INK = "#2A2A2A";

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
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
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

  // The cover band takes each project's own brand colour, and most of those are
  // dark enough to carry cream type. Some are not — BSO's is the Mahler
  // poster's teal, which leaves cream at 2.6:1 while ink clears 4.6:1. Compare
  // the two properly rather than guessing from luminance: a mid-tone teal is
  // not "light", but it still cannot hold cream.
  const heroIsLight =
    contrast(primary, HERO_INK) > contrast(primary, HERO_CREAM);
  const heroText = heroIsLight ? HERO_INK : "var(--cream)";
  const heroKicker = heroIsLight ? HERO_INK : onDark;

  // Her Spotify folder cover sets the platform name in Spotify green and the
  // feature name in white. Carrying that across says at a glance which word is
  // the brand's and which is hers.
  const heading = p.coverHeadline ?? p.title;
  const headWords = heading.split(" ");
  const splitHeading = slug === "spotify-global-mode" && headWords.length > 1;

  return (
    <main>
      {/* Cover */}
      <section
        className="px-6 py-20"
        style={{ background: primary, color: heroText }}
      >
        <div className="mx-auto max-w-5xl">
          <p className="mono text-[11px] tracking-widest opacity-80">
            <Link href="/" className="underline-offset-2 hover:underline">
              Anna Bartlett
            </Link>
            {p.category?.name && <span> ▸ {p.category.name}</span>}
            <span> ▸ {p.title}</span>
          </p>
          <p
            className="mono mt-8 text-[12px] tracking-widest"
            style={{ color: heroKicker }}
          >
            FOLDER {p.folderNumber} · OPENED
          </p>
          <h1 className="display mt-3 text-5xl md:text-6xl">
            {splitHeading ? (
              <>
                <span style={{ color: onDark }}>{headWords[0]}</span>{" "}
                {headWords.slice(1).join(" ")}
              </>
            ) : (
              heading
            )}
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

          {slug === "spotify-global-mode" && (
            // A "not affiliated" notice only does its job where someone forms
            // the impression. It was sitting in the closing notes; her Figma
            // cover puts it directly under the meta line, so it goes here.
            <p
              className="mono mt-9 text-[10.5px] tracking-[0.14em] opacity-55"
              style={{ color: heroText }}
            >
              SPECULATIVE FEATURE CONCEPT · NORTHEASTERN CLASS PROJECT · NOT
              AFFILIATED WITH SPOTIFY
            </p>
          )}

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
              style={{ "--rich-accent": s.accent ?? primary } as CSSProperties}
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
          {slug === "anosity" && s.number === "03" && <EarlyLofis />}
          {slug === "financial-blueprint" && s.number === "02" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <FbVoices />
            </section>
          )}
          {slug === "financial-blueprint" && s.number === "02" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <FbRetireMap />
            </section>
          )}
          {slug === "financial-blueprint" && s.number === "02" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <FbPivot />
            </section>
          )}
          {slug === "financial-blueprint" && s.number === "03" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <FbW4Flow />
            </section>
          )}
          {slug === "financial-blueprint" && s.number === "03" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <FbSearchChat />
            </section>
          )}
          {slug === "anosity" && s.number === "04" && <AnosityRings />}
          {slug === "stop-motion" && s.number === "01" && (
            <YouTubeEmbed
              id="0iZFxVu8KNg"
              kicker="MOTION · STOP MOTION"
              title="Built frame by frame."
              blurb="I shoot and edit video as well as design it — Premiere Pro, and my own soundtracks when a piece needs one. Stop motion is the most patient version of the work: you assemble the whole thing frame by frame before anyone sees a second of it."
              caption="Stop Motion · more at youtube.com/@annabartlettt"
            />
          )}
          {slug === "boston-symphony-orchestra" && s.number === "03" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <BsoEvolution />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && s.number === "04" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <BsoParameters />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && s.number === "07" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <BsoApplications />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && s.number === "04" && (
            <BsoSketch accent={brand.secondary ?? primary} />
          )}
          {slug === "storybridge" && s.number === "01" && (
            <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
              <p
                className="mono text-[12px] font-bold tracking-widest"
                style={{ color: brand.primary ?? primary }}
              >
                THE DISCONNECT · TWO PROBLEMS
              </p>
              <h2 className="display mt-3 text-3xl">
                Two problems that solve each other.
              </h2>
              <p className="serif mt-4 max-w-2xl text-lg leading-relaxed opacity-90">
                Younger students read more when a story feels personal. Older
                students write better when somebody is actually going to read
                it. Each shortage is the other one&rsquo;s supply.
              </p>
              <TwoSides accent={brand.primary ?? primary} />
            </section>
          )}
          {slug === "storybridge" && s.number === "01" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <SbReadings />
            </section>
          )}
          {slug === "storybridge" && s.number === "02" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <SbLoop />
            </section>
          )}
          {slug === "storybridge" && s.number === "03" && (
            <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
              <p
                className="mono text-[12px] font-bold tracking-widest"
                style={{ color: brand.primary ?? primary }}
              >
                THE RULE · IN THE INTERFACE
              </p>
              <h2 className="display mt-3 text-3xl">
                Where the promise is actually kept.
              </h2>
              <p className="serif mt-4 max-w-2xl text-lg leading-relaxed opacity-90">
                A rule only counts if the product enforces it. The author keeps
                the original and previews what each band reads. The queue marks
                the machine&rsquo;s judgement as a label and leaves the decision
                to a person. Both screens say so on the screen, to the person it
                affects.
              </p>
              <div className="mt-8">
                <SbRuleScreens />
              </div>
            </section>
          )}
          {slug === "storybridge" && s.number === "03" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <p
                className="mono text-[12px] font-bold tracking-widest"
                style={{ color: brand.primary ?? primary }}
              >
                THE RULE · AND WHAT THE READER GETS
              </p>
              <h2 className="display mt-3 text-3xl">
                The same control, from the other end.
              </h2>
              <p className="serif mt-4 max-w-2xl text-lg leading-relaxed opacity-90">
                The author previews the levels. The reader chooses one, on the
                story itself, next to read-aloud and a K&ndash;2 mode. The
                dropdown says Original, because that is the default and the
                adaptation is the thing you opt into.
              </p>
              <figure className="mt-8 m-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/storybridge/reader-story-toggle.svg"
                  alt="The StoryBridge reader view of a story called The Rematch, with a reading tools bar carrying read aloud, K to 2 mode, reading support and a reading level dropdown set to Original, above the story's title, byline, tags and opening paragraphs"
                  loading="lazy"
                  className="w-full rounded-xl border border-[var(--kraft)]"
                />
                <figcaption className="mono mt-3 text-[11px] tracking-wide opacity-60">
                  Reader · story view with the level selector and reading tools
                </figcaption>
              </figure>
            </section>
          )}
          {slug === "storybridge" && s.number === "04" && (
            <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
              <p
                className="mono text-[12px] font-bold tracking-widest"
                style={{ color: brand.primary ?? primary }}
              >
                THE ROLES · BUILT, NOT PICTURED
              </p>
              <h2 className="display mt-3 text-3xl">
                Three roles. Switch between them.
              </h2>
              <p className="serif mt-4 max-w-2xl text-lg leading-relaxed opacity-90">
                An author writes outward, a reader browses inward, and an
                administrator needs neither shape but a queue. Use the nav to
                move between them. This is markup rather than a screenshot, so
                it stays sharp at any width, reflows on a phone, and can be read
                aloud.
              </p>
              <div className="mt-8">
                <SbScreens />
              </div>
            </section>
          )}
          {slug === "storybridge" && s.number === "05" && (
            <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
              <p
                className="mono text-[12px] font-bold tracking-widest"
                style={{ color: brand.primary ?? primary }}
              >
                THE SYSTEM · WHAT GOT HANDED OVER
              </p>
              <h2 className="display mt-3 text-3xl">
                Eight components, three roles.
              </h2>
              <p className="serif mt-4 max-w-2xl text-lg leading-relaxed opacity-90">
                A handoff is only trustworthy if the pieces are small enough to
                be re-used and named clearly enough to be asked for. Every
                screen in this project is built from the set below. It is
                running here, in its own palette, rather than pictured.
              </p>
              <div className="mt-8">
                <SbSystem />
              </div>
            </section>
          )}
          {slug === "storybridge" && s.number === "04" && (
            <SlideDeck
              kicker="THE ROLES · MID-FIDELITY TO BUILT"
              title="Two directions, three doors."
              blurb="An author writes outward and a reader browses inward, so the two sides could not share a layout. An administrator needed a third thing again: a queue, not a feed. Each role runs from its mid-fidelity pass to the screens as they ended up, and the reader has the furthest to travel: a feed, a library, and a search that filters by reading level as readily as by theme."
              decks={[
                {
                  name: "Author",
                  href: "https://bartlettanna.com/work/storybridge",
                  slides: [
                    {
                      src: "/images/storybridge/wire-author.jpg",
                      alt: "Mid-fidelity wireframe of the StoryBridge author page",
                      label: "Mid-fidelity",
                    },
                    {
                      src: "/images/storybridge/hifi-author.png",
                      alt: "The built StoryBridge author dashboard showing published stories, reads and drafts",
                      label: "Built",
                    },
                  ],
                },
                {
                  name: "Reader",
                  href: "https://bartlettanna.com/work/storybridge",
                  slides: [
                    {
                      src: "/images/storybridge/wire-reader.jpg",
                      alt: "Mid-fidelity wireframe of the StoryBridge reader page",
                      label: "Mid-fidelity",
                    },
                    {
                      src: "/images/storybridge/reader-browse.jpg",
                      alt: "Stories for You: a featured story card for Lola's Secret Garden by a seventeen year old author, above a row of story cards tagged by theme and country",
                      label: "Stories for you",
                    },
                    {
                      src: "/images/storybridge/reader-discover.jpg",
                      alt: "Discover Stories: twenty-four stories in a grid, each carrying a grade band, an author, themes and a reader count, filterable by topic and reading level",
                      label: "Discover",
                    },
                    {
                      src: "/images/storybridge/reader-search.jpg",
                      alt: "Search results for family stories, filtered to Family, Memory and Grade 5 to 6, showing seven results with opening lines",
                      label: "Search and filter",
                    },
                    {
                      src: "/images/storybridge/library.jpg",
                      alt: "The full StoryBridge Story Library with search, genre filters and reading level filters",
                      label: "Full library",
                    },
                  ],
                },
                {
                  name: "Admin",
                  href: "https://bartlettanna.com/work/storybridge",
                  slides: [
                    {
                      src: "/images/storybridge/hifi-admin.png",
                      alt: "The built StoryBridge admin moderation overview with submission and screening counts",
                      label: "Moderation overview",
                    },
                  ],
                },
              ]}
              numbered
              aspect="4 / 3"
              fit="contain"
              width={760}
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
