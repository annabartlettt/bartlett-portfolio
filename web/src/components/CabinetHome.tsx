"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import OverprintMark from "./OverprintMark";
import { urlFor } from "@/sanity/image";
import type { Essay, Project } from "@/sanity/types";

/**
 * The cabinet, laid out as a cabinet.
 *
 * Same thesis and the same two questions as before — the change is the flow.
 * A visitor now moves through drawers: the index states who she is and hands
 * them the search, the work drawer opens folders one at a time, the thinking
 * drawer is the shorter index behind them, and the closing drawer is the ask.
 *
 * The discipline tabs used to be a chip row floating above a grid. They are
 * the hero's folder tabs now, so choosing one both answers "what do you need
 * next?" and files the drawer below to match.
 *
 * Layout and feel follow the V2 Research Cabinet design study; the words are
 * the site's own.
 */

export const DISCIPLINES = [
  // Research leads the row because it is the largest craft here (7 of 9) and
  // the through-line the rest hang off. Moss, so it does not collide with the
  // UX teal or the computational indigo.
  { value: "research", title: "Research", short: "Research", accent: "#5B7553" },
  { value: "ux", title: "User Experience", short: "UX", accent: "#2F6D74" },
  { value: "computational", title: "Computational Design", short: "Computational", accent: "#363f9e" },
  { value: "marcomm", title: "Marketing & Comms", short: "Marketing", accent: "#B5502F" },
  { value: "motion", title: "Motion & Video", short: "Motion", accent: "#6B4E8E" },
];

/* The other half of the overprint. Disciplines say how a project was made;
   domains say what it was made about. Deliberately NOT a filter — a hiring
   manager arrives looking for a craft, not a worldview — so these ride along
   as a chip on the card instead. Inks are Risograph, per brand book 33. */
export const DOMAINS = [
  // `ink` is the true Riso value and is what marks and fills use. `text` is the
  // same hue walked down until 9.5px of it clears AA on paper — Riso yellow and
  // fluorescent green are far too light to set type in.
  { value: "health", title: "Health", ink: "#3D8E84", text: "#2A6259" },
  { value: "learning", title: "Learning", ink: "#FFB511", text: "#8A5E00" },
  { value: "civic", title: "Civic", ink: "#FF6E40", text: "#B03A12" },
  { value: "culture", title: "Culture", ink: "#A4DC30", text: "#4F6B12" },
];

export function domainOf(p: Project) {
  const first = (p.domains ?? [])[0];
  return DOMAINS.find((d) => d.value === first) ?? null;
}

/* The strip along the top of the cabinet. These are anchors into this page,
   not routes — the dock along the bottom does routes. They used to carry the
   same three words as the dock, so "Thinking" meant two different destinations
   depending on which one you clicked. Numbering them ties each to the drawer
   eyebrow it scrolls to and stops them reading as site navigation. */
const DRAWERS = [
  { id: "top", n: "01", label: "Index" },
  { id: "work", n: "02", label: "The work" },
  { id: "thinking", n: "03", label: "The thinking" },
  { id: "about", n: "04", label: "Close" },
];

function countBy(projects: Project[], discipline: string) {
  return projects.filter((p) => (p.disciplines ?? []).includes(discipline))
    .length;
}

function accentFor(p: Project) {
  const first = (p.disciplines ?? [])[0];
  return (
    DISCIPLINES.find((d) => d.value === first)?.accent ?? "var(--kraft-dk)"
  );
}

export type MotionLevel = "full" | "gentle" | "off";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Reads the OS motion preference without a render-then-correct flash. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

/**
 * Drawers opening on scroll. Off entirely at `off`, so the whole page is just
 * there — which is also what a visitor gets if this never runs.
 */
function useDrawersOpening(
  root: React.RefObject<HTMLDivElement | null>,
  level: MotionLevel,
) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>("[data-rc-reveal]"),
    );
    if (targets.length === 0) return;

    if (level === "off") {
      el.classList.remove("rc-anim");
      targets.forEach((t) => {
        delete (t as HTMLElement).dataset.rcIn;
        t.style.transitionDelay = "";
      });
      return;
    }

    el.classList.add("rc-anim");
    targets.forEach((t) => delete (t as HTMLElement).dataset.rcIn);

    const io = new IntersectionObserver(
      (rows) => {
        rows.forEach((r, i) => {
          if (!r.isIntersecting) return;
          (r.target as HTMLElement).style.transitionDelay =
            `${Math.min(i, 5) * 70}ms`;
          (r.target as HTMLElement).dataset.rcIn = "";
          io.unobserve(r.target);
        });
      },
      { rootMargin: "0px 0px -11% 0px", threshold: 0.08 },
    );

    // Reveal state is a data attribute, not a class, and that is the whole
    // fix. These cards are React-rendered with className="rc-gcard", so every
    // re-render rewrote className and wiped a class added out here — meaning
    // one click on a sort button blanked all nine folders permanently. React
    // never sets data-rc-in, so it leaves it alone.
    //
    // The MutationObserver below covers the other half: genuinely new nodes
    // (a filter widening the deck) that the initial pass never saw.
    const seen = new WeakSet<Element>();
    const watch = (node: Element) => {
      if (seen.has(node)) return;
      seen.add(node);
      io.observe(node);
    };
    targets.forEach(watch);

    // Anything replaced while the drawer is already on screen is revealed on
    // the spot rather than handed to the observer. The observer is the right
    // tool for a first scroll down the page and the wrong one here: it is
    // asynchronous, and browsers stop servicing it in a background tab, so a
    // re-sort could leave the gallery blank until something else woke it.
    const reveal = (node: Element) => {
      const r = node.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        (node as HTMLElement).dataset.rcIn = "";
        return true;
      }
      return false;
    };
    const take = (node: Element) => {
      if (seen.has(node)) return;
      if (reveal(node)) {
        seen.add(node);
        return;
      }
      watch(node);
    };

    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches("[data-rc-reveal]")) take(n);
          n.querySelectorAll?.("[data-rc-reveal]").forEach(take);
        });
      }
    });
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [root, level]);
}

/**
 * Faint parallax: depth into the cabinet. Only at `full`.
 *
 * Each element reports its distance from the centre of the viewport as -1..1
 * and gets that fraction of its own amplitude, written to --rc-drift so the
 * hover transforms keep working on top of it.
 */
const DRIFT: { sel: string; amp: number; box: "self" | "parent" }[] = [
  { sel: ".rc-par", amp: -30, box: "parent" },
  { sel: ".rc-edge", amp: -9, box: "self" },
  { sel: ".rc-pf .ptab", amp: -7, box: "parent" },
];

function useDrift(
  root: React.RefObject<HTMLDivElement | null>,
  level: MotionLevel,
) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const nodes = DRIFT.flatMap(({ sel, amp, box }) =>
      Array.from(el.querySelectorAll<HTMLElement>(sel)).map((node) => ({
        node,
        amp,
        box: box === "self" ? node : (node.parentElement ?? node),
      })),
    );
    if (nodes.length === 0) return;

    if (level !== "full") {
      nodes.forEach(({ node }) => node.style.removeProperty("--rc-drift"));
      return;
    }

    let raf = 0;
    const loop = () => {
      const vh = window.innerHeight;
      for (const { node, amp, box } of nodes) {
        const r = box.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const t = (r.top + r.height / 2 - vh / 2) / (vh / 2);
        node.style.setProperty("--rc-drift", `${(t * amp).toFixed(2)}px`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      nodes.forEach(({ node }) => node.style.removeProperty("--rc-drift"));
    };
  }, [root, level]);
}

/** Which drawer the rim tabs should mark as current. */
function useCurrentDrawer() {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const sections = DRAWERS.map((d) => document.getElementById(d.id)).filter(
      (s): s is HTMLElement => s !== null,
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (rows) => {
        rows.forEach((r) => {
          if (r.isIntersecting) setCurrent(r.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return current;
}


export default function CabinetHome({
  projects,
  essays = [],
}: {
  projects: Project[];
  essays?: Essay[];
}) {
  const [craft, setCraft] = useState<string | null>(null);
  // Someone who asked their OS for less motion starts with none and can still
  // turn it up; everyone else starts at full. The override wins once set.
  const prefersReduced = usePrefersReducedMotion();
  const [override, setOverride] = useState<MotionLevel | null>(null);
  const motion: MotionLevel = override ?? (prefersReduced ? "off" : "full");
  const setMotion = setOverride;
  const rootRef = useRef<HTMLDivElement>(null);

  useDrawersOpening(rootRef, motion);
  useDrift(rootRef, motion);
  const current = useCurrentDrawer();

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => craft === null || (p.disciplines ?? []).includes(craft),
      ),
    [projects, craft],
  );

  // One list, in folder order. Sorting nine things is a control looking for a
  // problem, and grouping by section produced nine headings with one card
  // under each.
  const ordered = useMemo(
    () =>
      [...filtered].sort((a, b) =>
        (a.folderNumber ?? "").localeCompare(b.folderNumber ?? ""),
      ),
    [filtered],
  );

  const selected = DISCIPLINES.find((d) => d.value === craft) ?? null;

  return (
    <div ref={rootRef}>
      {/* ══ rim — the drawer tabs ══════════════════════════ */}
      <div className="rc-rim">
        <div className="rc-wrap">
          {/* The site header already carries the name; this strip is only the
              drawer tabs, so it doesn't say it twice. */}
          <p className="rc-id">
            <b>On this page</b>
          </p>
          <nav className="rc-rimtabs" aria-label="Sections of this page">
            {DRAWERS.map((d) => (
              <a
                key={d.id}
                className="rc-rimtab"
                href={`#${d.id}`}
                aria-current={current === d.id ? "page" : undefined}
              >
                <b>{d.n}</b> {d.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ══ 01 · index ═════════════════════════════════════ */}
      <OverprintMark motion={motion} />

      <section className="rc-hero" id="top">
        <div className="rc-wrap">
          <p className="rc-eyebrow" data-rc-reveal>
            <b>01</b> — Index
          </p>

          {/* Split across the full width rather than squeezed into one column
              beside the mark: the plain half states the fact, the indigo half
              carries the list. The mark drops below so the type gets the whole
              measure and the page reads on a diagonal. */}
          <h1 className="rc-heroline" data-rc-reveal>
            <span>
              Anna Bartlett is a creative technologist in Washington DC working
              across
            </span>
            <span className="hl">
              research, brand, product, and generative systems.
            </span>
          </h1>

          <div className="rc-herofoot">
            <div data-rc-reveal>
              <div className="rc-acts">
                <a className="rc-btn primary" href="#work">
                  Open the cabinet ↓
                </a>
                <a className="rc-btn plain" href="#thinking">
                  Read the thinking
                </a>
              </div>

              <Link className="rc-markline" href="/about">
                I work in the overprint
                <b>Where two disciplines cross ↗</b>
              </Link>
            </div>

            {/* Reserves where the mark rests. OverprintMark measures this
                rather than guessing coordinates, so layout stays the source
                of truth — and it bleeds past the frame on both edges so the
                mark reads as cropped rather than parked. */}
            <div className="rc-heromark" aria-hidden />
          </div>
        </div>
      </section>

      {/* ══ 02 · the work ══════════════════════════════════ */}
      <section className="rc-drawer rc-paper" id="work">
        <div className="rc-wrap">
          <div className="rc-edge" data-rc-reveal>
            <i />
            <i />
            <i />
          </div>

          <div className="rc-dhead">
            <div data-rc-reveal>
              <p className="rc-eyebrow">
                <b>02</b> — Drawer · The work
              </p>
              <h2>Selected folders</h2>
            </div>
            <p className="sub" data-rc-reveal>
              Nine of them. Each one names the system underneath first, and
              what got built second.
            </p>
          </div>

          <div className="rc-filterrow" data-rc-reveal>
            <div className="rc-tabrow" role="tablist" aria-label="Disciplines">
              <button
                className="rc-ftab"
                role="tab"
                type="button"
                aria-selected={craft === null}
                onClick={() => setCraft(null)}
                style={{ ["--tabc" as string]: "var(--kraft)" }}
              >
                Everything
              </button>
              {DISCIPLINES.map((d) => (
                <button
                  key={d.value}
                  className="rc-ftab"
                  role="tab"
                  type="button"
                  aria-selected={craft === d.value}
                  onClick={() => setCraft(d.value)}
                  style={{ ["--tabc" as string]: d.accent }}
                >
                  {d.short} · {countBy(projects, d.value)}
                </button>
              ))}
            </div>
          </div>

          <div className="rc-countbar" data-rc-reveal>
            <span className="count">
              {filtered.length} of {projects.length} folders
              {craft !== null && (
                <button
                  type="button"
                  className="clear"
                  onClick={() => setCraft(null)}
                >
                  Clear
                </button>
              )}
            </span>
          </div>

          <div className="rc-gallery" data-rc-reveal>
            {ordered.map((p) => (
                <Link
                  key={p._id}
                  href={`/work/${p.slug}`}
                  className="rc-gcard"
                  data-rc-reveal
                >
                  <div className="rc-gshot">
                    {p.slideImage?.asset ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={urlFor(p.slideImage).width(760).auto("format").url()}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <span className="lab">No cover yet</span>
                    )}
                    <span
                      className="rc-gnum"
                      style={{ background: accentFor(p) }}
                    >
                      {p.folderNumber ?? "··"}
                    </span>
                    {domainOf(p) && (
                      <span
                        className="rc-gdom"
                        style={{ color: domainOf(p)!.text }}
                      >
                        <i style={{ background: domainOf(p)!.ink }} />
                        {domainOf(p)!.title}
                      </span>
                    )}
                  </div>
                  <h4>{p.title}</h4>
                  <p className="cat">{p.category?.name}</p>
                  {p.invisibleSystem && <p className="sys">{p.invisibleSystem}</p>}
                </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ══ 03 · the thinking ══════════════════════════════ */}
      <section className="rc-drawer rc-invert" id="thinking">
        <div className="rc-wrap">
          <div className="rc-edge" data-rc-reveal>
            <i />
            <i />
            <i />
          </div>

          <div className="rc-dhead">
            <div data-rc-reveal>
              <p className="rc-eyebrow">
                <b>03</b> — Drawer · The thinking
              </p>
              <h2>Back of the cabinet</h2>
            </div>
            <p className="sub" data-rc-reveal>
              Writing about the work of other people, and the reading that feeds
              the folders in front.
            </p>
          </div>

          <div className="rc-workgrid">
            <aside className="rc-plate">
              <div className="rc-callout" data-rc-reveal>
                <div className="rc-meta">
                  <span className="g">◇</span> Why this is here
                </div>
                <p>
                  A finished folder shows what got decided. This drawer shows
                  how the deciding happens.
                </p>
              </div>
            </aside>

            <div data-rc-reveal>
              <nav className="rc-idx">
                {essays.map((e, i) => (
                  <Link key={e._id} href={`/thinking/${e.slug}`}>
                    <span className="num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ttl">
                      {e.title}
                      {e.dek && <span className="opacity-55"> — {e.dek}</span>}
                    </span>
                    <span className="kind">Essay</span>
                  </Link>
                ))}
                <Link href="/thinking">
                  <span className="num">→</span>
                  <span className="ttl">All writing</span>
                  <span className="kind wip">Index</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 · closing / contact ════════════════════════ */}
      <section className="rc-closefoot" id="about">
        <div className="rc-closetabs">
          <a
            className="rc-closetab"
            href="mailto:anna.bartlettt@gmail.com"
            data-primary
          >
            Say hello
          </a>
          <Link
            className="rc-closetab"
            href="/about"
          >
            About
          </Link>
        </div>

        <div className="rc-closepanel rc-invert pink">
          <div className="rc-wrap">
            <div className="inner" data-rc-reveal>
              <div>
                <p className="rc-eyebrow">
                  <b>04</b> — Closing the cabinet
                </p>
                <h2>
                  Open to work as a creative technologist across{" "}
                  <span>research, brand, product, and generative systems.</span>
                </h2>
                <p className="rc-lede m-0">
                  Washington DC. If you are hiring for any of them, the folders
                  above are the whole argument.
                </p>

                <div className="say">
                  <a
                    className="rc-btn pink"
                    href="mailto:anna.bartlettt@gmail.com"
                  >
                    Say hello →
                  </a>
                  <span className="mail">anna.bartlettt@gmail.com</span>
                </div>
              </div>

              <dl className="rc-creds m-0">
                {[
                  [
                    "Education",
                    "BFA Design, Marketing minor · Northeastern University · magna cum laude",
                  ],
                  [
                    "Practice",
                    "Research · User experience · Computational design · Brand and communications · Motion",
                  ],
                  [
                    "Available for",
                    "Marketing and communications, design systems, civic and learning design · Washington DC",
                  ],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ══ motion ═════════════════════════════════════════ */}
      <div className="rc-motionbar">
        <div className="rc-wrap">
          <span>Motion</span>
          <div className="rc-seg" role="group" aria-label="Motion level">
            {(
              [
                ["full", "Full"],
                ["gentle", "Gentle"],
                ["off", "Off"],
              ] as [MotionLevel, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={motion === value}
                onClick={() => setMotion(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
