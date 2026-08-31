"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchData } from "@/sanity/types";

type Hit = {
  href: string;
  kind: "Work" | "Thinking";
  where: string;
  heading: string;
  text: string;
};

/** Flatten everything with words in it into one searchable list. */
function build(data: SearchData): Hit[] {
  const out: Hit[] = [];

  for (const p of data.work ?? []) {
    const meta = [
      p.invisibleSystem,
      p.madeTangible,
      p.category,
      p.notes,
      ...(p.themeTags ?? []),
      ...(p.methods ?? []),
    ]
      .filter(Boolean)
      .join(" · ");
    out.push({
      href: `/work/${p.slug}`,
      kind: "Work",
      where: p.title,
      heading: "Overview",
      text: `${p.title} · ${meta}`,
    });
    for (const s of p.sections ?? []) {
      out.push({
        href: `/work/${p.slug}${s.number ? `#s${s.number}` : ""}`,
        kind: "Work",
        where: p.title,
        heading: s.title ?? s.kicker ?? `Section ${s.number ?? ""}`,
        text: [s.kicker, s.title, s.text].filter(Boolean).join(" · "),
      });
    }
  }

  for (const e of data.thinking ?? []) {
    out.push({
      href: `/thinking/${e.slug}`,
      kind: "Thinking",
      where: e.title,
      heading: "Essay",
      text: [e.title, e.dek, e.credit, ...(e.topics ?? []), e.text]
        .filter(Boolean)
        .join(" · "),
    });
  }

  return out;
}

/** A window of text around the match, so a result shows the sentence it found. */
function snippet(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return { before: text.slice(0, 150), hit: "", after: "" };
  const from = Math.max(0, i - 60);
  return {
    before: (from > 0 ? "…" : "") + text.slice(from, i),
    hit: text.slice(i, i + q.length),
    after: text.slice(i + q.length, i + q.length + 90) + "…",
  };
}

export default function SiteSearch({ data }: { data: SearchData }) {
  const [q, setQ] = useState("");
  const index = useMemo(() => build(data), [data]);

  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return index.filter((h) => h.text.toLowerCase().includes(t)).slice(0, 8);
  }, [q, index]);

  const asked = q.trim().length >= 2;

  return (
    <div className="mt-6">
      <label htmlFor="site-search" className="sr-only">
        Search everything on this site
      </label>
      <input
        id="site-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search everything — p5.js, stigma, Echelman, 900%…"
        className="w-full rounded-lg border-2 bg-[var(--paper)] px-4 py-3 text-base outline-none transition focus:border-[var(--ink)]"
        style={{ borderColor: "var(--charcoal)" }}
      />

      {asked && (
        <p className="mono mt-2 text-[11px] tracking-widest opacity-60">
          {hits.length === 0
            ? "NOTHING WRITTEN ABOUT THAT YET"
            : `${hits.length}${hits.length === 8 ? "+" : ""} PASSAGE${
                hits.length === 1 ? "" : "S"
              }`}
        </p>
      )}

      {hits.length > 0 && (
        <ul className="mt-3 list-none space-y-0 border-t border-[var(--kraft)] p-0">
          {hits.map((h, i) => {
            const s = snippet(h.text, q.trim());
            return (
              <li key={i} className="border-b border-[var(--kraft)]">
                <Link href={h.href} className="block py-3">
                  <span className="mono block text-[10px] tracking-widest opacity-60">
                    {h.kind.toUpperCase()} · {h.where} · {h.heading}
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-snug">
                    {s.before}
                    <mark
                      className="rounded px-0.5"
                      style={{ background: "var(--pink)", color: "var(--paper)" }}
                    >
                      {s.hit}
                    </mark>
                    {s.after}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
