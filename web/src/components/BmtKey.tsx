"use client";

import { useState } from "react";
import { ATLAS, BMT, YARN, bandOf, binLabel } from "@/content/bmt";

/**
 * "9 colors. 9 zones. Every shade is a data point." Anna's yarn key, rebuilt on
 * the real bands. Each row counts the Boston tracts that fall in its band and
 * names the neighborhoods where it shows up most. Picking a row lights up that
 * yarn on the turned 68-column grid.
 */

const T = ATLAS.turned;
const G = T.grid;
const CELL = 4;

type Row = { key: number; name: string; hex: string; band: string; count: number; hoods: string[] };

const ROWS: Row[] = (() => {
  const rows: Row[] = [];
  const count = (b: number) => ATLAS.tracts.filter((t) => bandOf(t.value) === b);
  const top = (b: number) => {
    const m = new Map<string, number>();
    for (const t of count(b)) if (t.hood) m.set(t.hood, (m.get(t.hood) ?? 0) + 1);
    return [...m.entries()].sort((a, c) => c[1] - a[1]).slice(0, 2).map(([h]) => h);
  };
  for (let i = YARN.length - 1; i >= 0; i--) {
    rows.push({ key: i, name: YARN[i].name, hex: YARN[i].hex, band: binLabel(i), count: count(i).length, hoods: top(i) });
  }
  rows.push({ key: -1, name: "Pale blue", hex: BMT.noData, band: "No data", count: count(-1).length, hoods: [] });
  return rows;
})();

const MAX = Math.max(...ROWS.map((r) => r.count));

export default function BmtKey() {
  const [pick, setPick] = useState<number | null>(null);

  return (
    <figure className="m-0 my-10 rounded-xl border bg-white p-4 sm:p-6" style={{ borderColor: BMT.line }}>
      <p className="mono text-[10.5px] tracking-widest" style={{ color: BMT.navy }}>
        YARN COLOR PALETTE
      </p>
      <p className="display mt-1 text-2xl">9 colors. 9 zones. Every shade is a data point.</p>
      <p className="serif mt-1 text-[14px] italic opacity-70">
        Household income at about 35 for kids from low-income families, by the Boston tract they grew up in.
      </p>

      <div className="mt-5 grid gap-6 md:grid-cols-[1fr_11rem]">
        <ul className="list-none p-0">
          {ROWS.map((r) => {
            const active = pick === r.key;
            return (
              <li key={r.key}>
                <button
                  onClick={() => setPick(active ? null : r.key)}
                  aria-pressed={active}
                  className="grid w-full grid-cols-[3rem_1fr_auto] items-center gap-3 border-b py-2 text-left transition sm:grid-cols-[3.5rem_9rem_1fr_auto]"
                  style={{ borderColor: BMT.line, opacity: pick == null || active ? 1 : 0.45 }}
                >
                  <span
                    className="h-7 rounded-md"
                    style={{ background: r.hex, boxShadow: r.key < 0 ? `inset 0 0 0 1px ${BMT.line}` : undefined }}
                  />
                  <span>
                    <span className="mono block text-[11px] font-bold tracking-widest">{r.name.toUpperCase()}</span>
                    <span className="mono block text-[9.5px] opacity-50">{r.hex}</span>
                  </span>
                  <span className="hidden sm:block">
                    <span className="serif block text-[14px] leading-snug">
                      {r.hoods.length ? r.hoods.join(" / ") : "Too few kids to measure"}
                    </span>
                    <span className="mt-1 block h-1.5 rounded-full" style={{ background: BMT.tint }}>
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${(r.count / MAX) * 100}%`, background: r.key < 0 ? "#9FB7BC" : r.hex }}
                      />
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="display block text-lg" style={{ color: r.key < 0 ? BMT.gray : BMT.ink }}>
                      {r.band}
                    </span>
                    <span className="mono block text-[9.5px] opacity-55">{r.count} TRACTS</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="self-start md:sticky md:top-24">
          <svg
            viewBox={`0 0 ${G.cols * CELL} ${G.rows * CELL}`}
            className="h-auto w-full"
            role="img"
            aria-label={pick == null ? "The turned grid in all nine yarns" : "The turned grid with one yarn lit"}
          >
            {G.cells.map((row, r) =>
              row.map((v, c) => {
                if (v < 0) return null;
                const b = bandOf(v);
                const lit = pick == null || b === pick;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * CELL}
                    y={r * CELL}
                    width={CELL - 0.4}
                    height={CELL - 0.4}
                    fill={b < 0 ? BMT.noData : YARN[b].hex}
                    fillOpacity={lit ? 1 : 0.12}
                    style={{ transition: "fill-opacity .3s" }}
                  />
                );
              }),
            )}
          </svg>
          <p className="mono mt-2 text-[9.5px] leading-relaxed tracking-widest opacity-60">
            {pick == null ? "PICK A YARN TO SEE WHERE IT FALLS" : "BRIGHTON AT THE TOP, ROXBURY BELOW"}
          </p>
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap justify-between gap-2 border-t pt-3" style={{ borderColor: BMT.line }}>
        <span className="serif text-[14px] italic">Brighton and Roxbury sit inside the same city line.</span>
        <span className="mono text-[9.5px] tracking-widest opacity-60">68 WARP THREADS · EVERY CELL IS A PLACE</span>
      </figcaption>
    </figure>
  );
}
