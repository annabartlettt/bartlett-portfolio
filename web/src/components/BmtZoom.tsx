"use client";

import { useState } from "react";
import { ATLAS, BMT, yarnFor } from "@/content/bmt";

/**
 * Section 03: the narrowing, shown as a count. Every square is a real place
 * from the Opportunity Atlas, sorted from lowest to highest adult income for
 * kids from low-income families. The country is one square per county; Boston
 * is one square per tract. The point is the number of squares.
 */

const COUNTIES = ATLAS.counties;
const TRACTS = ATLAS.tracts
  .filter((t) => t.value != null)
  .map((t) => t.value as number)
  .sort((a, b) => a - b);

const VIEWS = [
  {
    key: "country",
    label: "The whole country",
    values: COUNTIES,
    cols: 80,
    unit: "counties",
    note: "Right, and impossible to feel.",
  },
  {
    key: "boston",
    label: "Boston",
    values: TRACTS,
    cols: 16,
    unit: "neighborhood tracts",
    note: "Small enough to hold in your hands.",
  },
] as const;

export default function BmtZoom() {
  const [key, setKey] = useState<(typeof VIEWS)[number]["key"]>("country");
  const view = VIEWS.find((v) => v.key === key)!;
  const rows = Math.ceil(view.values.length / view.cols);
  const size = 10;

  return (
    <figure className="m-0 my-10">
      <div role="tablist" aria-label="Scale of the data" className="flex flex-wrap gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            role="tab"
            aria-selected={key === v.key}
            onClick={() => setKey(v.key)}
            className="mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition"
            style={
              key === v.key
                ? { background: BMT.navy, borderColor: BMT.navy, color: "#fff" }
                : { borderColor: BMT.line }
            }
          >
            {v.label}
          </button>
        ))}
      </div>

      <div
        className="mt-4 grid gap-5 rounded-xl border bg-white p-4 sm:grid-cols-[1fr_13rem] sm:p-6"
        style={{ borderColor: BMT.line }}
      >
        <svg
          viewBox={`0 0 ${view.cols * size} ${rows * size}`}
          className="mx-auto h-auto w-full"
          style={{ maxWidth: key === "boston" ? 260 : undefined }}
          role="img"
          aria-label={`${view.values.length.toLocaleString()} ${view.unit}, one square each, sorted by adult income`}
        >
          {view.values.map((v, i) => (
            <rect
              key={i}
              x={(i % view.cols) * size}
              y={Math.floor(i / view.cols) * size}
              width={size - (key === "boston" ? 1.5 : 0.6)}
              height={size - (key === "boston" ? 1.5 : 0.6)}
              fill={yarnFor(v)}
            />
          ))}
        </svg>
        <div aria-live="polite" className="self-center">
          <p className="display text-5xl" style={{ color: BMT.navy }}>
            {view.values.length.toLocaleString()}
          </p>
          <p className="mono mt-1 text-[10.5px] tracking-widest opacity-65">{view.unit.toUpperCase()}</p>
          <p className="hand mt-4 text-2xl leading-tight">{view.note}</p>
        </div>
      </div>
      <figcaption className="serif mt-3 text-base leading-relaxed opacity-75">
        Every square is a real place in the Opportunity Atlas, sorted from lowest to highest adult income for kids
        from low-income families.
      </figcaption>
    </figure>
  );
}
