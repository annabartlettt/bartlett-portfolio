import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PROJECT_QUERY } from "@/sanity/queries";
import FolderIcon from "@/components/FolderIcon";
import CcSilos from "@/components/CcSilos";
import CcProfiles from "@/components/CcProfiles";
import CcMethod from "@/components/CcMethod";
import { PollWords, PollRanking, PollResources } from "@/components/CcPolls";
import CcParadox from "@/components/CcParadox";
import CcAnswers from "@/components/CcAnswers";
import CcCapSignal from "@/components/CcCapSignal";
import CcRedo from "@/components/CcRedo";
import CcSuggestions from "@/components/CcSuggestions";
import { PARTS } from "@/content/central-coop";
import { CC } from "@/content/central-coop-tokens";
import HandDrawing from "@/components/HandDrawing";
import SectionFolio from "@/components/SectionFolio";
import { DRAWINGS } from "@/content/drawings";
import type { Project, Stat } from "@/sanity/types";

export const revalidate = 60;
export const metadata = {
  title: "Central Co-op",
  description:
    "Six months inside a new university office: student profiles for every major, focus groups built from scratch, and the Northeastern Paradox.",
};

type Block = PortableTextBlock & { _key?: string };

/** Day one, the last week, and the growth between them. 100 to 1,000 is the 900%. */
function StartingPoint({ growth, accent }: { growth?: Stat; accent: string }) {
  return (
    <div className="my-8 grid grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-3">
      <div className="rounded-xl border border-[#D9D9D9] bg-white p-4">
        <p className="display text-4xl" style={{ color: accent }}>
          ~100
        </p>
        <p className="mono mt-1 text-[10.5px] tracking-widest opacity-65">FOLLOWERS ON DAY ONE</p>
      </div>
      <div className="rounded-xl border-2 bg-white p-4" style={{ borderColor: accent }}>
        <p className="display text-4xl" style={{ color: accent }}>
          1,000
        </p>
        <p className="mono mt-1 text-[10.5px] tracking-widest opacity-65">
          REACHED RIGHT BEFORE THE CO-OP ENDED
        </p>
      </div>
      {growth?.value && (
        <div className="rounded-xl p-4" style={{ background: CC.red, color: "#fff" }}>
          <p className="display text-4xl">{growth.value}</p>
          <p className="mono mt-1 text-[10.5px] tracking-widest opacity-80">
            {(growth.label ?? "").toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}

type Part = (typeof PARTS)[number];

/** One folder, as a card a reader can branch off to mid-story. */
function FolderCard({ part }: { part: Part }) {
  return (
    <Link
      href={`/work/central-co-op/${part.slug}`}
      className="group flex h-full items-start gap-3 rounded-xl border border-[#D9D9D9] bg-white p-4 transition hover:border-[#111111]"
    >
      <FolderIcon
        color={CC.black}
        className="mt-0.5 w-9 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-medium leading-snug">{part.title}</span>
        <span className="mt-0.5 block text-[12.5px] leading-snug" style={{ color: CC.gray }}>
          {part.blurb}
        </span>
      </span>
      <span aria-hidden className="mono text-[12px]" style={{ color: CC.red }}>
        ▸
      </span>
    </Link>
  );
}

function FolderLinks({ slugs, label = "OPEN THE FOLDER" }: { slugs: string[]; label?: string }) {
  const parts = slugs
    .map((slug) => PARTS.find((p) => p.slug === slug))
    .filter((p): p is Part => Boolean(p));
  const cols =
    parts.length > 2 ? "sm:grid-cols-2 lg:grid-cols-3" : parts.length > 1 ? "sm:grid-cols-2" : "sm:max-w-md";
  return (
    <div className="my-8">
      <p className="mono text-[10.5px] tracking-widest" style={{ color: CC.red }}>
        {label}
      </p>
      <ul className={`mt-3 grid list-none grid-cols-1 gap-3 p-0 ${cols}`}>
        {parts.map((part) => (
          <li key={part.slug}>
            <FolderCard part={part} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Section 09's own sentence, used to file the five folders. */
const JOBS = [
  { job: "Build the identity", slugs: ["brand"] },
  { job: "Earn the audience", slugs: ["social", "graphic-design", "editorial"] },
  { job: "Bring the evidence", slugs: ["research"] },
];

function ThreeJobs() {
  return (
    <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
      {JOBS.map((j, n) => (
        <div key={j.job}>
          <p className="mono text-[10.5px] tracking-widest" style={{ color: CC.red }}>
            JOB {String(n + 1).padStart(2, "0")}
          </p>
          <h3 className="display mt-1 text-xl">{j.job}</h3>
          <ul className="mt-3 flex list-none flex-col gap-2 p-0">
            {j.slugs.map((slug) => {
              const part = PARTS.find((p) => p.slug === slug);
              return part ? (
                <li key={slug}>
                  <FolderCard part={part} />
                </li>
              ) : null;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The banners' own move: two-word lines with one half in red. */
function TwoTone({ text }: { text?: string }) {
  if (!text) return null;
  const cut = text.trimEnd().lastIndexOf(" ");
  if (cut < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, cut + 1)}
      <span style={{ color: CC.red }}>{text.slice(cut + 1)}</span>
    </>
  );
}

/** The network motif from the roll-up banners: hairline arcs, red nodes on the lines. */
function HeroArcs() {
  const nodes = [
    [952, 174],
    [1050, 306],
  ];
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMaxYMid slice"
    >
      <g fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.2">
        <circle cx="1250" cy="600" r="520" />
        <circle cx="700" cy="-300" r="700" />
        <circle cx="1400" cy="-100" r="620" />
      </g>
      <g fill={CC.red}>
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
        ))}
      </g>
    </svg>
  );
}

function blockText(b: Block): string {
  const children = (b as { children?: { text?: string }[] }).children ?? [];
  return children.map((c) => c.text ?? "").join("");
}

export default async function CentralCoopIndex() {
  const p = await client.fetch<Project>(PROJECT_QUERY, { slug: "central-co-op" });
  if (!p) notFound();

  const primary = p.brand?.primary ?? CC.black;
  const growth = p.sections
    ?.find((s) => s.number === "02")
    ?.stats?.find((st) => st.label === "Follower growth");

  const draw = (id: string) => {
    const slot = DRAWINGS.find((d) => d.id === id);
    return slot ? <HandDrawing slot={slot} color={CC.red} /> : null;
  };

  // Each visual sits directly under the paragraph it makes visible, keyed by
  // the index of that paragraph in the section's body. The words live in
  // Sanity; the pictures of them live here.
  const slots: Record<string, { after: number; node: ReactNode }[]> = {
    "01": [{ after: 0, node: <FolderLinks slugs={["brand"]} /> }],
    "02": [
      { after: 0, node: <StartingPoint growth={growth} accent={primary} /> },
      { after: 0, node: draw("cc-02-growth") },
      { after: 0, node: <FolderLinks slugs={["social", "graphic-design", "editorial"]} /> },
      { after: 2, node: draw("cc-02-gap") },
      { after: 2, node: <CcSilos accent={primary} /> },
    ],
    "03": [
      { after: 2, node: <CcProfiles accent={primary} /> },
      { after: 2, node: draw("cc-03-shift") },
      { after: 2, node: <FolderLinks slugs={["research"]} label="ALL THIRTEEN PROFILES" /> },
    ],
    "04": [{ after: 1, node: <CcMethod accent={primary} /> }],
    "05": [
      { after: 1, node: <PollWords accent={primary} /> },
      { after: 2, node: <PollRanking accent={primary} /> },
      { after: 3, node: <PollResources accent={primary} /> },
    ],
    "06": [
      { after: 0, node: draw("cc-06-loop") },
      { after: 0, node: <CcParadox accent={primary} /> },
      { after: 2, node: <CcAnswers accent={primary} /> },
      { after: 4, node: <CcCapSignal accent={primary} /> },
    ],
    "07": [{ after: 1, node: <CcRedo accent={primary} /> }],
    "08": [
      { after: 2, node: <CcSuggestions accent={primary} /> },
      { after: 2, node: draw("cc-08-trail") },
    ],
    "09": [{ after: 0, node: <ThreeJobs /> }],
  };

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden px-6 py-16 text-white" style={{ background: primary }}>
        <HeroArcs />
        <div className="relative mx-auto max-w-5xl">
          <p className="mono text-[11px] tracking-widest opacity-80">
            <Link href="/" className="underline-offset-2 hover:underline">
              Anna Bartlett
            </Link>
            {p.category?.name && <span> ▸ {p.category.name}</span>}
            <span> ▸ {p.title}</span>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/central-coop/coop-n-motto-ko.png"
            alt="Northeastern University Cooperative Education"
            className="mt-8 h-9 w-auto sm:h-11"
          />
          <h1 className="display mt-6 text-4xl md:text-5xl">{p.title}</h1>
          {p.coverSub && (
            <p className="serif mt-4 max-w-2xl text-xl italic opacity-90">{p.coverSub}</p>
          )}
          <div className="mono mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[11px] tracking-widest opacity-90">
            {p.role && <span><b className="opacity-60">ROLE </b>{p.role}</span>}
            {p.timeline && <span><b className="opacity-60">TIMELINE </b>{p.timeline}</span>}
            {p.team && <span><b className="opacity-60">TEAM </b>{p.team}</span>}
          </div>

          {/* jump links, so a reader can go straight to the part they came for */}
          <nav aria-label="Sections" className="mono mt-8 flex flex-wrap gap-2 text-[10.5px] tracking-widest">
            {p.sections?.map((s) => (
              <a
                key={s.number}
                href={`#s${s.number}`}
                className="rounded-full border border-current px-3 py-1 opacity-75 transition hover:opacity-100"
              >
                {s.number} · {s.kicker}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {p.sections?.map((s) => {
        const blocks = (s.body ?? []) as Block[];
        const here = slots[s.number ?? ""] ?? [];
        const closing = s.number === "09";

        return (
          <section
            key={s.number}
            id={`s${s.number}`}
            className="relative mx-auto max-w-4xl scroll-mt-20 border-b border-[#D9D9D9] px-6 py-16"
          >
            <span
              aria-hidden
              className="absolute -top-[6px] left-6 h-3 w-3 rounded-full"
              style={{ background: CC.red }}
            />
            <p
              className="mono flex items-center gap-3 text-[12px] font-bold tracking-widest"
              style={{ color: primary }}
            >
              <SectionFolio number={s.number} color={CC.red} />
              {s.kicker}
            </p>
            <h2 className="display mt-3 text-3xl">
              <TwoTone text={s.title} />
            </h2>

            {blocks.map((b, i) => (
              <Fragment key={b._key ?? i}>
                {closing && i === blocks.length - 1 ? (
                  <blockquote
                    className="display mt-10 border-l-4 pl-6 text-2xl leading-snug md:text-3xl"
                    style={{ borderColor: CC.red, color: primary }}
                  >
                    {blockText(b)}
                  </blockquote>
                ) : (
                  <div className="rich serif mt-4 text-lg leading-relaxed opacity-90">
                    <PortableText value={[b]} />
                  </div>
                )}
                {here
                  .filter((slot) => slot.after === i)
                  .map((slot, k) => (
                    <Fragment key={k}>{slot.node}</Fragment>
                  ))}
              </Fragment>
            ))}

            {s.number === "01" && s.stats && s.stats.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {s.stats.map((st, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#D9D9D9] bg-white p-4"
                    style={{ borderTop: `3px solid ${CC.red}` }}
                  >
                    <div className="display text-3xl" style={{ color: primary }}>
                      {st.value}
                    </div>
                    <div className="mono mt-1 text-[10.5px] tracking-widest opacity-65">
                      {(st.label ?? "").toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}

    </main>
  );
}
