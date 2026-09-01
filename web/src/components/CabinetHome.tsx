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
import SiteSearch from "./SiteSearch";
import { urlFor } from "@/sanity/image";
import type { Essay, Project, SearchData } from "@/sanity/types";

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
  { value: "ux", title: "User Experience", accent: "#2F6D74" },
  { value: "computational", title: "Computational Design", accent: "#363f9e" },
  { value: "marcomm", title: "Marketing & Comms", accent: "#B5502F" },
  { value: "motion", title: "Motion & Video", accent: "#6B4E8E" },
];

const DRAWERS = [
  { id: "work", label: "Work" },
  { id: "thinking", label: "Thinking" },
  { id: "about", label: "About" },
];

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
        t.classList.remove("rc-in");
        t.style.transitionDelay = "";
      });
      return;
    }

    el.classList.add("rc-anim");
    targets.forEach((t) => t.classList.remove("rc-in"));

    const io = new IntersectionObserver(
      (rows) => {
        rows.forEach((r, i) => {
          if (!r.isIntersecting) return;
          (r.target as HTMLElement).style.transitionDelay =
            `${Math.min(i, 5) * 70}ms`;
          r.target.classList.add("rc-in");
          io.unobserve(r.target);
        });
      },
      { rootMargin: "0px 0px -11% 0px", threshold: 0.08 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
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

/**
 * The open folder, as a stack of prints rather than a list of titles.
 *
 * A hiring manager gives the top of a portfolio a couple of seconds, and a
 * column of project names spends those seconds asking them to read. The
 * folder leads with the work instead: covers cross-fade, the caption tells
 * you what you're looking at, and the whole frame is a link into it.
 *
 * Only projects that actually have an image are in the deck — a slideshow of
 * grey placeholders would be worse than the list it replaced. The rest are
 * still in the drawer below.
 */
function FolderSlideshow({
  projects,
  label,
  accent,
  motion,
}: {
  projects: Project[];
  label: string;
  accent: string;
  motion: MotionLevel;
}) {
  const deck = useMemo(
    () => projects.filter((p) => p.slideImage?.asset),
    [projects],
  );
  const [rawI, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // Filtering can shrink the deck out from under the index, so clamp on read
  // rather than correcting it afterwards. Switching tabs remounts this whole
  // component (see the key on it), which is what puts you back at the first.
  const i = deck.length > 0 ? rawI % deck.length : 0;

  const go = useCallback(
    (d: number) =>
      setI((n) => (deck.length ? (n + d + deck.length) % deck.length : 0)),
    [deck.length],
  );

  useEffect(() => {
    if (motion === "off" || paused || deck.length < 2) return;
    const t = setInterval(() => go(1), 5200);
    return () => clearInterval(t);
  }, [motion, paused, deck.length, go]);

  const currentProject = deck[i];

  return (
    <div
      className="rc-folder"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="rc-fhead">
        <div className="open">
          <span className="rc-dot" style={{ background: accent }} />
          Open folder · {label}
        </div>
        <div className="rc-fig">
          {deck.length > 0
            ? `${i + 1} / ${deck.length}`
            : `${projects.length} ${projects.length === 1 ? "folder" : "folders"}`}
        </div>
      </div>
      <div className="rc-dash" />

      {deck.length === 0 ? (
        <div className="rc-stage rc-stage-empty">
          <span className="lab">
            No cover filed under {label} yet
            <br />
            the folders are still in the drawer below
          </span>
        </div>
      ) : (
        <>
          <div className="rc-stage">
            {deck.map((p, n) => (
              <Link
                key={p._id}
                href={`/work/${p.slug}`}
                className="rc-slide"
                style={{ opacity: n === i ? 1 : 0 }}
                aria-hidden={n === i ? undefined : true}
                tabIndex={n === i ? undefined : -1}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(p.slideImage!).width(1100).auto("format").url()}
                  alt={`${p.title} — open the folder`}
                  loading={n === 0 ? "eager" : "lazy"}
                />
              </Link>
            ))}

            {deck.length > 1 && (
              <>
                <button
                  type="button"
                  className="rc-navbtn prev"
                  aria-label="Previous folder"
                  onClick={() => go(-1)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="rc-navbtn next"
                  aria-label="Next folder"
                  onClick={() => go(1)}
                >
                  →
                </button>
              </>
            )}
          </div>

          <div className="rc-slidemeta" aria-live="polite">
            <Link href={`/work/${currentProject.slug}`}>
              <span
                className="mono"
                style={{ color: accentFor(currentProject) }}
              >
                {currentProject.folderNumber ?? "··"}
              </span>
              <strong>{currentProject.title}</strong>
            </Link>
            <span className="cat">{currentProject.category?.name ?? ""}</span>
          </div>

          {deck.length > 1 && (
            <div className="rc-dots" role="tablist" aria-label="Folders">
              {deck.map((p, n) => (
                <button
                  key={p._id}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-label={p.title}
                  onClick={() => setI(n)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <p className="rc-fcap">Picking a tab files the drawer below to match.</p>
    </div>
  );
}

export default function CabinetHome({
  projects,
  search,
  essays = [],
}: {
  projects: Project[];
  search: SearchData;
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

  const selected = DISCIPLINES.find((d) => d.value === craft) ?? null;
  const folderAccent = selected?.accent ?? "var(--ink)";

  return (
    <div ref={rootRef}>
      {/* ══ rim — the drawer tabs ══════════════════════════ */}
      <div className="rc-rim">
        <div className="rc-wrap">
          {/* The site header already carries the name; this strip is only the
              drawer tabs, so it doesn't say it twice. */}
          <nav className="rc-rimtabs" aria-label="Drawers">
            {DRAWERS.map((d) => (
              <a
                key={d.id}
                className="rc-rimtab"
                href={`#${d.id}`}
                aria-current={current === d.id ? "page" : undefined}
              >
                {d.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ══ 01 · index ═════════════════════════════════════ */}
      <section className="rc-hero">
        <div className="rc-wrap">
          <div>
            <p className="rc-eyebrow" data-rc-reveal>
              <b>01</b> — Index
            </p>

            <h1 data-rc-reveal>
              Anna Bartlett is a designer in Washington DC working across{" "}
              <span>brand and communications, product, and motion.</span>
            </h1>

            <div data-rc-reveal>
              <p className="serif rc-lede italic opacity-70">
                What do you already know? What do you need next?
              </p>
              <div className="mt-3 max-w-xl">
                <SiteSearch data={search} />
              </div>
              <p className="mono mt-2 text-[10px] tracking-widest opacity-45">
                SEARCH EVERYTHING ON THIS SITE
              </p>
            </div>

            <div className="rc-acts mt-8" data-rc-reveal>
              <a className="rc-btn primary" href="#work">
                Open the cabinet ↓
              </a>
              <a className="rc-btn plain" href="#thinking">
                Read the thinking
              </a>
            </div>
          </div>

          {/* the folder: discipline tabs that also file the drawer below */}
          <div data-rc-reveal>
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
                  style={{
                    ["--tabc" as string]: `color-mix(in srgb, ${d.accent} 26%, var(--card))`,
                  }}
                >
                  {d.title}
                </button>
              ))}
            </div>

            <FolderSlideshow
              key={craft ?? "everything"}
              projects={filtered}
              label={selected ? selected.title : "Everything"}
              accent={folderAccent}
              motion={motion}
            />
          </div>
        </div>
      </section>

      {/* ══ 02 · the work ══════════════════════════════════ */}
      <section className="rc-drawer" id="work">
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
              Each folder names the system underneath first, and what got built
              second. Hover to open one.
            </p>
          </div>

          <div className="rc-workgrid">
            <aside className="rc-plate">
              <div className="rc-key" data-rc-reveal>
                {DISCIPLINES.map((d) => {
                  const n = projects.filter((p) =>
                    (p.disciplines ?? []).includes(d.value),
                  ).length;
                  return (
                    <div key={d.value} className="rc-keyrow">
                      <span className="sw" style={{ background: d.accent }} />
                      {d.title} · {n}
                    </div>
                  );
                })}
              </div>

              <div className="rc-callout" data-rc-reveal>
                <div className="rc-meta">
                  <span className="g">◆</span>{" "}
                  {selected
                    ? `Filed under ${selected.title}`
                    : "The whole drawer"}
                </div>
                <p>
                  Showing {filtered.length} of {projects.length} folders.
                  {selected && " Pick Everything above to see the rest."}
                </p>
              </div>
            </aside>

            <div className="rc-folders">
              {filtered.map((p) => {
                const accent = accentFor(p);
                return (
                  <Link
                    key={p._id}
                    href={`/work/${p.slug}`}
                    className="rc-pf"
                    data-rc-reveal
                  >
                    <span
                      className="ptab"
                      style={{
                        ["--pfc" as string]: `color-mix(in srgb, ${accent} 26%, var(--card))`,
                      }}
                    >
                      Folder {p.folderNumber ?? "··"}
                      {p.category?.name ? ` · ${p.category.name}` : ""}
                    </span>
                    <div className="pbody">
                      <div className="rc-pfmeta">
                        <span className="lhs">
                          P{p.folderNumber ?? "··"}
                          {p.priority && (
                            <>
                              <span className="sep">·</span>
                              {p.priority}
                            </>
                          )}
                        </span>
                        <span className="rhs">↳ Hover to reveal</span>
                      </div>

                      <h3>{p.title}</h3>
                      {p.coverSub && <p className="poetic">{p.coverSub}</p>}

                      <div className="rc-slot">
                        <div className="rc-par">
                          {p.coverImage?.asset ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={urlFor(p.coverImage)
                                .width(1200)
                                .auto("format")
                                .url()}
                              alt=""
                            />
                          ) : (
                            <span className="lab">
                              {p.title} → Hero
                              <br />
                              1600 × 700
                            </span>
                          )}
                        </div>
                      </div>

                      {(p.invisibleSystem || p.madeTangible) && (
                        <div className="rc-reveal">
                          <div>
                            <div className="rc-revbox">
                              {p.invisibleSystem && (
                                <div className="cell">
                                  <div className="rc-meta">
                                    <span className="g">◆</span> The system
                                    underneath
                                  </div>
                                  <p>{p.invisibleSystem}</p>
                                </div>
                              )}
                              {p.madeTangible && (
                                <div className="cell">
                                  <div className="rc-meta tangible">
                                    <span className="g">◇</span> What got built
                                  </div>
                                  <p>{p.madeTangible}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {(p.themeTags ?? []).length > 0 && (
                        <div className="rc-tags">
                          {(p.themeTags ?? []).map((t) => (
                            <span key={t} className="rc-chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}

              {filtered.length === 0 && (
                <p className="serif text-lg italic opacity-60">
                  Nothing filed under that yet.
                </p>
              )}
            </div>
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
            style={{ ["--ctc" as string]: "var(--pink-soft)" }}
          >
            Say hello
          </a>
          <Link
            className="rc-closetab"
            href="/contact"
            style={{ ["--ctc" as string]: "var(--lav)" }}
          >
            Contact
          </Link>
          <Link
            className="rc-closetab"
            href="/about"
            style={{ ["--ctc" as string]: "var(--sage)" }}
          >
            About
          </Link>
        </div>

        <div className="rc-closepanel rc-invert">
          <div className="rc-wrap">
            <div className="inner" data-rc-reveal>
              <div>
                <p className="rc-eyebrow">
                  <b>04</b> — Closing the cabinet
                </p>
                <h2>
                  What do you already know? <span>What do you need next?</span>
                </h2>
                <p className="rc-lede m-0">
                  Currently in Washington DC, working across brand and
                  communications, product, and motion. If you are hiring for any
                  of the three, the folders above are the whole argument.
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
                    "Interaction design · Research synthesis · Brand and communications · Motion",
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
