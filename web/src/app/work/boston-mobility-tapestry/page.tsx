import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PROJECT_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import Drawer from "@/components/Drawer";
import HandDrawing from "@/components/HandDrawing";
import SectionFolio from "@/components/SectionFolio";
import BmtMap from "@/components/BmtMap";
import BmtZoom from "@/components/BmtZoom";
import BmtLayers from "@/components/BmtLayers";
import BmtKey from "@/components/BmtKey";
import {
  BmtCampus,
  BmtCohorts,
  BmtNextDoor,
  BmtSchools,
  BmtTimeline,
  BmtTwoMeasures,
} from "@/components/BmtStory";
import { DRAWINGS } from "@/content/drawings";
import { BMT, SOURCES } from "@/content/bmt";
import type { Project } from "@/sanity/types";

export const revalidate = 60;
export const metadata = {
  title: "Boston Mobility Tapestry",
  description:
    "Where kids who grow up poor in Boston end up, woven: the Opportunity Atlas translated into a 68-column tapestry.",
};

type Block = PortableTextBlock & { _key?: string };

/** The warp, strung before anything is woven. */
function HeroWarp() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMaxYMid slice"
    >
      <g stroke="#fff" strokeOpacity="0.16" strokeWidth="1.2">
        {Array.from({ length: 34 }, (_, i) => (
          <line key={i} x1={700 + i * 15} x2={700 + i * 15} y1="0" y2="520" />
        ))}
      </g>
      <line x1="700" x2="1200" y1="514" y2="514" stroke={BMT.magenta} strokeWidth="6" />
    </svg>
  );
}

function Sources({ number }: { number?: string }) {
  const list = SOURCES[number ?? ""];
  if (!list?.length) return null;
  return (
    <div className="mt-10 border-t pt-4" style={{ borderColor: BMT.line }}>
      <p className="mono text-[10px] tracking-widest opacity-60">SOURCES</p>
      <ul className="mt-2 list-none p-0">
        {list.map((s) => (
          <li key={s.label} className="mono text-[11px] leading-relaxed tracking-wide opacity-70">
            {s.href ? (
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {s.label}
              </a>
            ) : (
              s.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function TapestryPage() {
  const p = await client.fetch<Project>(PROJECT_QUERY, { slug: "boston-mobility-tapestry" });
  if (!p) notFound();

  const primary = p.brand?.primary ?? BMT.navy;

  const draw = (id: string) => {
    const slot = DRAWINGS.find((d) => d.id === id);
    return slot ? <HandDrawing slot={slot} color={primary} /> : null;
  };

  // Each visual sits directly under the paragraph it makes visible, keyed by
  // the index of that paragraph in the section's body.
  const slots: Record<string, { after: number; node: ReactNode }[]> = {
    "01": [
      {
        after: 0,
        node: (
          <BmtMap
            highlight={["110601", "020303"]}
            caption="Outlined: the highest tract, in West Roxbury, and the lowest, in the West End. Point at any tract to read it."
          />
        ),
      },
      { after: 0, node: draw("bmt-01-gap") },
      { after: 2, node: <BmtTimeline /> },
      { after: 3, node: <BmtCohorts /> },
    ],
    "02": [
      { after: 1, node: <BmtZoom /> },
      { after: 2, node: <BmtTwoMeasures /> },
      { after: 3, node: <BmtNextDoor /> },
      { after: 4, node: <BmtCampus /> },
      { after: 5, node: <BmtSchools /> },
    ],
    "03": [
      { after: 0, node: draw("bmt-03-translate") },
      {
        after: 1,
        node: (
          <BmtMap
            allowGrid
            allowTurn
            startTurned
            caption="The 62° turn is computed from the centers of Brighton and Roxbury. The 68-column view is recomputed from the Atlas, not a copy of the grid used for the weaving."
          />
        ),
      },
    ],
    "04": [
      { after: 0, node: <BmtLayers /> },
      { after: 0, node: <BmtKey /> },
    ],
    "05": [{ after: 1, node: draw("bmt-04-thread") }],
  };

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden px-6 py-16 text-white" style={{ background: primary }}>
        <HeroWarp />
        <div className="relative mx-auto max-w-5xl">
          <p className="mono text-[11px] tracking-widest opacity-80">
            <Link href="/" className="underline-offset-2 hover:underline">
              Anna Bartlett
            </Link>
            {p.category?.name && <span> ▸ {p.category.name}</span>}
            <span> ▸ {p.title}</span>
          </p>
          <h1 className="display mt-10 text-4xl md:text-5xl">{p.coverHeadline ?? p.title}</h1>
          {p.coverSub && <p className="serif mt-4 max-w-2xl text-xl italic opacity-90">{p.coverSub}</p>}
          <div className="mono mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[11px] tracking-widest opacity-90">
            {p.role && <span><b className="opacity-60">ROLE </b>{p.role}</span>}
            {p.timeline && <span><b className="opacity-60">TIMELINE </b>{p.timeline}</span>}
            {p.team && <span><b className="opacity-60">TEAM </b>{p.team}</span>}
          </div>
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
        const accent = s.accent ?? primary;
        const filled = (s.images ?? []).filter((im) => im.image?.asset);

        return (
          <section
            key={s.number}
            id={`s${s.number}`}
            className="relative mx-auto max-w-4xl scroll-mt-20 border-b px-6 py-16"
            style={{ borderColor: BMT.line }}
          >
            <p className="mono flex items-center gap-3 text-[12px] font-bold tracking-widest" style={{ color: accent }}>
              <SectionFolio number={s.number} color={accent} />
              {s.kicker}
            </p>
            <h2 className="display mt-3 text-3xl">{s.title}</h2>

            {blocks.map((b, i) => (
              <Fragment key={b._key ?? i}>
                <div
                  className="rich serif mt-4 text-lg leading-relaxed opacity-90"
                  style={{ "--rich-accent": accent } as CSSProperties}
                >
                  <PortableText value={[b]} />
                </div>
                {here
                  .filter((slot) => slot.after === i)
                  .map((slot, k) => (
                    <Fragment key={k}>{slot.node}</Fragment>
                  ))}
              </Fragment>
            ))}

            {filled.length > 0 && (
              <div className={`mt-8 grid gap-5 ${filled.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {filled.map((im, i) => (
                  <figure key={im._key ?? i} className="m-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlFor(im.image!).width(1400).auto("format").url()}
                      alt={im.alt ?? im.caption ?? s.title ?? ""}
                      className="w-full rounded-xl border"
                      style={{ borderColor: BMT.line }}
                    />
                    {im.caption && (
                      <figcaption className="mono mt-2 text-[11px] tracking-wide opacity-60">{im.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {s.drawer?.label && <Drawer label={s.drawer.label} content={s.drawer.content} accent={accent} />}

            <Sources number={s.number} />
          </section>
        );
      })}
    </main>
  );
}
