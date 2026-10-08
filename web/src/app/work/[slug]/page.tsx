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
import TwoSides from "@/components/TwoSides";
import SbScreens from "@/components/SbScreens";
import SbRuleScreens from "@/components/SbRuleScreens";
import SbReadings from "@/components/SbReadings";
import SbLoop from "@/components/SbLoop";
import SbVoices from "@/components/SbVoices";
import SbCover from "@/components/SbCover";
import SbStoryView from "@/components/SbStoryView";
import SbExplorer from "@/components/SbExplorer";
import EspBlueprint from "@/components/EspBlueprint";
import FbVoices from "@/components/FbVoices";
import FbRetireMap from "@/components/FbRetireMap";
import FbPivot from "@/components/FbPivot";
import FbW4Flow from "@/components/FbW4Flow";
import FbSearchChat from "@/components/FbSearchChat";
import BsoEvolution from "@/components/BsoEvolution";
import BsoParameters from "@/components/BsoParameters";
import BsoApplications from "@/components/BsoApplications";
import BsoScrollFx from "@/components/BsoScrollFx";
import BsoSeason from "@/components/BsoSeason";

// Each BSO section drifts the page toward a soft tint of one night's poster:
// sage for the listening loop, dusk for what failed, plum for the output.
const BSO_SCENES: Record<string, string> = {
  "v2-01": "#F6EEDA",
  "v2-02": "#DFDECC",
  "v2-03": "#DBD6CA",
  "v2-04": "#DECDC2",
  "v2-05": "#F3E4BE",
};
import SpotifyBarriers from "@/components/SpotifyBarriers";
import SpotifyResearch from "@/components/SpotifyResearch";
import SpotifyFeatures from "@/components/SpotifyFeatures";
import SpotifyLearned from "@/components/SpotifyLearned";
import HandDrawing from "@/components/HandDrawing";
import SectionFolio from "@/components/SectionFolio";
import { drawingsFor } from "@/content/drawings";
import SideNote from "@/components/SideNote";
import { sidenotesFor, withSidenotes } from "@/content/sidenotes";
import PaperCard from "@/components/PaperCard";
import { paperFor } from "@/content/papers";
import type { PortableTextComponents } from "next-sanity";
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

/** Render `sidenote` annotations as margin notes in the section's color. */
function noteMarks(color: string): PortableTextComponents {
  return {
    marks: {
      sidenote: ({ children, value }) => (
        <SideNote n={value?.n} note={value?.note} source={value?.source} href={value?.href} color={color}>
          {children}
        </SideNote>
      ),
    },
  };
}

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
  // The drawings take the project's color, the way her booklet let one green do
  // everything. A near-black brand (Spotify) draws in its secondary instead.
  const drawInk = luminance(primary) < 0.03 && brand.secondary ? brand.secondary : primary;

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

  const isBso = slug === "boston-symphony-orchestra";
  const sceneFor = (key?: string) => (isBso && key ? BSO_SCENES[key] : undefined);

  return (
    <main
      className={isBso ? "bso-scene" : undefined}
    >
      {isBso && <BsoScrollFx />}
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

          {isBso ? (
            // The cover is the sketch itself, running: the Wine Weave field
            // re-composing under the title. The finished posters follow right
            // after the brief, so the page opens on the system, not a repeat.
            <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <iframe
                src="/bso/field.html"
                title="The Boston Symphony sketch running live: a field of open nested squares moved by Perlin noise"
                className="pointer-events-none absolute inset-0 h-full w-full border-0"
                tabIndex={-1}
              />
            </div>
          ) : slug === "storybridge" ? (
            <SbCover />
          ) : p.coverImage?.asset && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(p.coverImage).width(1800).auto("format").url()}
              alt={p.coverImage.alt ?? `${p.title} cover`}
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
            data-scene={sceneFor(s._key)}
            className="relative mx-auto max-w-4xl scroll-mt-20 border-b border-[var(--kraft)] px-6 py-16"
          >
            <p
              className="mono flex items-center gap-3 text-[12px] font-bold tracking-widest"
              style={{ color: s.accent ?? primary }}
            >
              <SectionFolio number={s.number} color={s.accent ?? primary} />
              {s.kicker}
            </p>
            <h2 className="display mt-3 text-3xl" data-reveal={isBso ? "" : undefined}>{s.title}</h2>
            <div
              data-reveal={isBso ? "" : undefined}
              className={`rich serif mt-4 text-lg leading-relaxed opacity-90 ${
                sidenotesFor(slug, s.number).length ? "sn-body" : ""
              }`}
              style={{ "--rich-accent": s.accent ?? primary } as CSSProperties}
            >
              <PortableText
                value={withSidenotes(s.body ?? [], sidenotesFor(slug, s.number)) as PortableTextBlock[]}
                components={noteMarks(s.accent ?? primary)}
              />
            </div>

            {(() => {
              const paper = paperFor(slug, s.number);
              return paper ? <PaperCard paper={paper} color={s.accent ?? primary} /> : null;
            })()}

            {drawingsFor(slug, s.number).map((d) => (
              <HandDrawing key={d.id} slot={d} color={drawInk} />
            ))}

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

            {slug === "storybridge" && (
              <StoryBridgeInside n={s.number} accent={brand.primary ?? primary} />
            )}

            {slug === "esplanade-interactive-park-map" && s.number === "03" && <EspBlueprint />}

            {s.drawer?.label && sidenotesFor(slug, s.number).length === 0 && (
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
              blurb="I shoot and edit video as well as design it: Premiere Pro, and my own soundtracks when a piece needs one. Stop motion is the most patient version of the work: you assemble the whole thing frame by frame before anyone sees a second of it."
              caption="Stop Motion · more at youtube.com/@annabartlettt"
            />
          )}
          {slug === "spotify-global-mode" && s.number === "01" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <SpotifyBarriers />
            </section>
          )}
          {slug === "spotify-global-mode" && s.number === "02" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <SpotifyResearch />
            </section>
          )}
          {slug === "spotify-global-mode" && s.number === "03" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <SpotifyFeatures />
            </section>
          )}
          {slug === "spotify-global-mode" && s.number === "04" && (
            <section className="mx-auto max-w-5xl border-b border-[var(--kraft)] px-6 py-14">
              <SpotifyLearned />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && s._key === "v2-01" && (
            <section
              data-scene={sceneFor(s._key)}
              data-reveal=""
              className="mx-auto max-w-[1360px] border-b border-[var(--kraft)] px-4 py-14 sm:px-8"
            >
              <BsoSeason />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && ["sec3", "v2-03"].includes(s._key ?? "") && (
            <section
              data-scene={sceneFor(s._key)}
              data-reveal=""
              className="mx-auto max-w-[1360px] border-b border-[var(--kraft)] px-4 py-14 sm:px-8"
            >
              <BsoEvolution />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && ["sec4", "v2-02"].includes(s._key ?? "") && (
            <section
              data-scene={sceneFor(s._key)}
              data-reveal=""
              className="mx-auto max-w-[1360px] border-b border-[var(--kraft)] px-4 py-14 sm:px-8"
            >
              <BsoParameters />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && ["sec7", "v2-04"].includes(s._key ?? "") && (
            <section
              data-scene={sceneFor(s._key)}
              data-reveal=""
              className="mx-auto max-w-[1360px] border-b border-[var(--kraft)] px-4 py-14 sm:px-8"
            >
              <BsoApplications />
            </section>
          )}
          {slug === "boston-symphony-orchestra" && ["sec4", "v2-02"].includes(s._key ?? "") && (
            <div data-scene={sceneFor(s._key)} data-reveal="">
              <BsoSketch accent={brand.secondary ?? primary} />
            </div>
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

/**
 * StoryBridge, told once per section. Each numbered section from Sanity owns
 * its heading; the built pieces sit inside it as evidence rather than as
 * their own headed sections, so the page reads as six steps, not twenty.
 */
function StoryBridgeInside({ n, accent }: { n?: string; accent: string }) {
  if (n === "01") return <TwoSides accent={accent} />;
  if (n === "02")
    return (
      <div className="mt-8">
        <SbReadings bare />
      </div>
    );
  if (n === "03")
    return (
      <>
        <div className="mt-8">
          <SbLoop />
        </div>
        <div className="mt-10">
          <SbRuleScreens />
        </div>
        <div className="mt-10">
          <SbStoryView />
        </div>
        <p className="mono mt-3 text-[11px] tracking-wide opacity-60">
          The reader&rsquo;s side of the same rule: Original is the default. Pick a level to see the one word that changes.
        </p>
      </>
    );
  if (n === "04") return <SbVoices />;
  if (n === "05")
    return (
      <>
        <LoomEmbed
          bare
          id="f90ed4bac3354529a95fb042162b1a76"
          kicker=""
          title="StoryBridge walkthrough"
          blurb=""
          caption="Five-minute walkthrough of the working prototype · 4:58"
          accent={accent}
        />
        <div className="mt-10">
          <SbScreens start="admin" />
        </div>
        <div className="mt-12">
          <p className="mono text-[12px] font-bold tracking-widest" style={{ color: accent }}>
            THE DESIGN SYSTEM, RUNNING
          </p>
          <p className="serif mt-2 max-w-2xl text-lg leading-relaxed opacity-90">
            Every screen above is built from eight components. Pick one to see it
            large, step through its states, and find where it lives.
          </p>
          <div className="mt-6">
            <SbExplorer />
          </div>
        </div>
      </>
    );
  return null;
}

