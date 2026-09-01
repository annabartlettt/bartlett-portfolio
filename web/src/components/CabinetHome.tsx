"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  return DISCIPLINES.find((d) => d.value === first)?.accent ?? "var(--kraft-dk)";
}

/** Reveal-on-scroll, opt-out under prefers-reduced-motion. */
function useDrawersOpening(root: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(el.querySelectorAll("[data-rc-reveal]"));
    if (targets.length === 0) return;
    el.classList.add("rc-anim");

    const io = new IntersectionObserver(
      (rows) => {
        rows.forEach((r, i) => {
          if (!r.isIntersecting) return;
          (r.target as HTMLElement).style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
          r.target.classList.add("rc-in");
          io.unobserve(r.target);
        });
      },
      { rootMargin: "0px 0px -11% 0px", threshold: 0.08 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [root]);
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
  search,
  essays = [],
}: {
  projects: Project[];
  search: SearchData;
  essays?: Essay[];
}) {
  const [craft, setCraft] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useDrawersOpening(rootRef);
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

            <div className="rc-folder">
              <div className="rc-fhead">
                <div className="open">
                  <span
                    className="rc-dot"
                    style={{ background: folderAccent }}
                  />
                  Open folder · {selected ? selected.title : "Everything"}
                </div>
                <div className="rc-fig">
                  {filtered.length} {filtered.length === 1 ? "folder" : "folders"}
                </div>
              </div>
              <div className="rc-dash" />

              <ul className="m-0 flex flex-1 list-none flex-col p-0">
                {filtered.map((p) => (
                  <li key={p._id} className="m-0">
                    <Link
                      href={`/work/${p.slug}`}
                      className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-dashed border-[var(--kraft)] py-3 transition-[padding,background] hover:bg-[rgba(54,63,158,.045)] hover:pl-2"
                    >
                      <span
                        className="mono text-[10px] tracking-widest"
                        style={{ color: accentFor(p) }}
                      >
                        {p.folderNumber ?? "··"}
                      </span>
                      <span className="text-[15px]">{p.title}</span>
                      <span className="mono text-[9.5px] tracking-widest uppercase opacity-55">
                        {p.category?.name ?? ""}
                      </span>
                    </Link>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="serif m-0 py-6 text-[15px] italic opacity-60">
                    Nothing filed under that yet.
                  </li>
                )}
              </ul>

              <p className="rc-fcap">
                Picking a tab files the drawer below to match.
              </p>
            </div>
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
                      <span
                        className="sw"
                        style={{ background: d.accent }}
                      />
                      {d.title} · {n}
                    </div>
                  );
                })}
              </div>

              <div className="rc-callout" data-rc-reveal>
                <div className="rc-meta">
                  <span className="g">◆</span>{" "}
                  {selected ? `Filed under ${selected.title}` : "The whole drawer"}
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
                      style={{ ["--pfc" as string]: `color-mix(in srgb, ${accent} 26%, var(--card))` }}
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
                        {p.coverImage?.asset ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={urlFor(p.coverImage).width(1200).auto("format").url()}
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

                      {(p.invisibleSystem || p.madeTangible) && (
                        <div className="rc-reveal">
                          <div>
                            <div className="rc-revbox">
                              {p.invisibleSystem && (
                                <div className="cell">
                                  <div className="rc-meta">
                                    <span className="g">◆</span> The system underneath
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
      <section className="rc-drawer" id="thinking">
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
                  A finished folder shows what got decided. This drawer shows how
                  the deciding happens.
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
                      {e.dek && (
                        <span className="opacity-55"> — {e.dek}</span>
                      )}
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

      {/* ══ 04 · closing ═══════════════════════════════════ */}
      <section className="rc-closing" id="about">
        <div className="rc-wrap">
          <div className="rc-edge" data-rc-reveal>
            <i />
            <i />
            <i />
          </div>
          <div className="rc-inner" data-rc-reveal>
            <div>
              <p className="rc-eyebrow">
                <b>04</b> — Closing the drawer
              </p>
              <h2>
                What do you already know?{" "}
                <span>What do you need next?</span>
              </h2>
              <p className="m-0 max-w-[44ch] font-light text-[var(--muted)]">
                Currently in Washington DC, working across brand and
                communications, product, and motion.
              </p>
              <div className="rc-acts mt-6">
                <a className="rc-btn pink" href="mailto:anna.bartlettt@gmail.com">
                  Say hello →
                </a>
                <a className="rc-btn ghost" href="#work">
                  Back to the work
                </a>
              </div>
            </div>

            <dl className="m-0">
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
                <div
                  key={k}
                  className="flex flex-col gap-1 border-b border-dashed border-[var(--kraft)] py-3 last:border-b-0"
                >
                  <dt className="mono text-[10px] tracking-widest uppercase text-[var(--ink)]">
                    {k}
                  </dt>
                  <dd className="m-0 text-[13.5px] leading-snug opacity-80">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
