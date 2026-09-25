"use client";

import { useState } from "react";
import { ATLAS, BMT, bandOf, turnPoint, usd, yarnFor } from "@/content/bmt";

/**
 * The System: Anna's "four nested systems, four weaving elements" diagram,
 * rebuilt as the control for the grid it describes. Each ring (or row) adds
 * its weaving element to the turned 68-column grid, reading from Brighton at
 * the top to Roxbury at the bottom. Every layer is computed from the Atlas:
 *
 *   warp        the 68 threads, strung first
 *   color       the yarn band of each cell
 *   boundaries  edges where neighboring cells jump two or more bands
 *   knots       one knot for every 200 kids in the Atlas sample, per tract
 */

const T = ATLAS.turned;
const G = T.grid;
const X0 = T.viewBox[0] + 6;
const Y0 = T.viewBox[1] + 6;
const CELL = (T.viewBox[2] - 12) / G.cols;
const GH = CELL * G.rows;
const KIDS_PER_KNOT = 200;
const VB = `${X0 - 70} ${Y0 - 6} ${G.cols * CELL + 76} ${GH + 12}`;

/** Edges between cells whose yarn bands are two or more apart. */
const EDGES = (() => {
  const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const band = G.cells.map((row) => row.map((v) => bandOf(v)));
  for (let r = 0; r < G.rows; r++) {
    for (let c = 0; c < G.cols; c++) {
      const b = band[r][c];
      if (b < 0) continue;
      const right = c + 1 < G.cols ? band[r][c + 1] : -1;
      const down = r + 1 < G.rows ? band[r + 1][c] : -1;
      const x = X0 + (c + 1) * CELL;
      const y = Y0 + (r + 1) * CELL;
      if (right >= 0 && Math.abs(right - b) >= 2) out.push({ x1: x, y1: y - CELL, x2: x, y2: y });
      if (down >= 0 && Math.abs(down - b) >= 2) out.push({ x1: x - CELL, y1: y, x2: x, y2: y });
    }
  }
  return out;
})();

/** Knots on a small spiral around each tract's center, so the layout never changes. */
const KNOTS = (() => {
  const out: { x: number; y: number }[] = [];
  for (const t of ATLAS.tracts) {
    const n = Math.round(t.kids / KIDS_PER_KNOT);
    const p = turnPoint(t.c[0], t.c[1]);
    for (let i = 0; i < n; i++) {
      const a = i * 2.39996;
      const r = 3.4 * Math.sqrt(i);
      out.push({ x: p.x + r * Math.cos(a), y: p.y + r * Math.sin(a) });
    }
  }
  return out;
})();

const KIDS = ATLAS.tracts.reduce((s, t) => s + t.kids, 0);

const medianOf = (hood: string) => {
  const v = ATLAS.tracts
    .filter((t) => t.hood === hood && t.value != null)
    .map((t) => t.value as number)
    .sort((a, b) => a - b);
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
};

/** Anna's five boundary techniques, in her words, from the tapestry's design system. */
const TECHNIQUES = [
  { name: "Hachure", where: "Roxbury → Jamaica Plain", how: "Interlocking fingers: a hard boundary made visible, drawn, not natural." },
  {
    name: "Bundled weft ratio",
    where: "JP → Mission Hill",
    how: "4:0 → 3:1 → 2:2 → 1:3 → 0:4. The gradient feels earned, not abrupt.",
  },
  {
    name: "Twisted strand",
    where: "Allston → Fenway",
    how: "Two colors twisted together, a marled blend: complex up close, unified from a distance.",
  },
  {
    name: "Soumak accent",
    where: "Longwood → Back Bay",
    how: "An over-two, back-under-one wrap raises a ridge that marks the institutional edge.",
  },
  {
    name: "Loose warp ends",
    where: "Cambridge / Brookline → edge",
    how: "Nothing woven into these warps: the structure was there; the opportunity was not.",
  },
];

/** Her diagram's four rows, outermost ring first. */
const LAYERS = [
  {
    layer: "Chronosystem",
    ring: "The history you were born into",
    element: "Warp structure",
    does: "68 threads set before weaving begins. You can't change them once it starts.",
    color: BMT.navy,
    fact: "Brighton and Roxbury hang on the same warp, because they are the same city.",
  },
  {
    layer: "Macrosystem",
    ring: "The neighborhood you grew up in",
    element: "Color fills",
    does: "Each yarn color is a neighborhood income tier. The color is the data.",
    color: "#006664",
    fact: "9 colors, 9 zones: eight income bands, and pale blue where too few kids grew up to measure.",
  },
  {
    layer: "Exo / mesosystem",
    ring: "The boundaries between communities",
    element: "Boundary techniques",
    does: "Five ways two color zones meet: hachure, bundled weft, twisted strand, soumak, loose warp.",
    color: "#E16415",
    fact: `${EDGES.length} edges where neighboring cells jump two or more bands. Each one needs a technique.`,
  },
  {
    layer: "Microsystem",
    ring: "The individual life inside the system",
    element: "Individual knots",
    does: "Rya knots, loose warp ends, tight and loose beats. The layer you only feel up close.",
    color: "#B51959",
    fact: `One knot for every ${KIDS_PER_KNOT} kids in the Atlas sample, ${KIDS.toLocaleString()} in all.`,
  },
];

/** Small drawings of each weaving element, after her diagram. */
function Glyph({ i }: { i: number }) {
  const ink = BMT.ink;
  return (
    <svg viewBox="0 0 28 20" className="h-5 w-7 shrink-0" aria-hidden>
      {i === 0 && [4, 9, 14, 19, 24].map((x) => <line key={x} x1={x} x2={x} y1="2" y2="18" stroke={ink} strokeWidth="1.4" />)}
      {i === 1 &&
        ["#1A3A8F", "#F0C800", "#C32219"].map((c, k) => <rect key={c} x="2" y={2 + k * 5.6} width="24" height="5" fill={c} />)}
      {i === 2 && (
        <>
          <rect x="2" y="3" width="24" height="14" fill="#E16415" />
          <path d="M2 10h4V6h4v4h4V6h4v4h4V6h4" fill="none" stroke="#1A3A8F" strokeWidth="2.4" />
        </>
      )}
      {i === 3 &&
        [6, 14, 22].map((x) => (
          <g key={x}>
            <line x1={x} x2={x} y1="8" y2="18" stroke="#B51959" strokeWidth="1.4" />
            <circle cx={x} cy="6" r="3" fill="none" stroke="#B51959" strokeWidth="1.4" />
          </g>
        ))}
    </svg>
  );
}

function Rings({ step, onPick }: { step: number; onPick: (i: number) => void }) {
  const radii = [104, 80, 56, 30];
  return (
    <svg viewBox="0 0 230 230" className="mx-auto h-auto w-full max-w-[240px]" role="group" aria-label="Four nested systems">
      {LAYERS.map((l, i) => (
        <g key={l.layer}>
          <circle
            cx="115"
            cy="115"
            r={radii[i]}
            fill={step >= i ? `${l.color}14` : "#fff"}
            stroke={l.color}
            strokeWidth={step === i ? 3 : 1.2}
            style={{ cursor: "pointer", transition: "all .3s" }}
            onClick={() => onPick(i)}
          />
          {i < 3 && (
            <text
              x="115"
              y={115 - radii[i] + 13}
              textAnchor="middle"
              fontSize="7.5"
              letterSpacing="1"
              fontFamily="monospace"
              fill={l.color}
              pointerEvents="none"
            >
              {l.layer.toUpperCase()}
            </text>
          )}
        </g>
      ))}
      <text x="115" y="112" textAnchor="middle" fontSize="7.5" letterSpacing="1" fontFamily="monospace" fill="#B51959" pointerEvents="none">
        MICRO
      </text>
      <text x="115" y="124" textAnchor="middle" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif" fill={BMT.ink} pointerEvents="none">
        a person
      </text>
    </svg>
  );
}

export default function BmtLayers() {
  const [step, setStep] = useState(0);
  const on = (i: number) => step >= i;
  const L = LAYERS[step];

  return (
    <figure className="m-0 my-10">
      <p className="mono text-[10.5px] tracking-widest" style={{ color: BMT.navy }}>
        FOUR NESTED SYSTEMS, FOUR WEAVING ELEMENTS
      </p>

      <div className="mt-3 grid items-center gap-6 md:grid-cols-[15rem_1fr]">
        <div>
          <Rings step={step} onPick={setStep} />
          <p className="serif mt-1 text-center text-[13px] italic opacity-70">
            The further out the layer, the harder it is to see.
          </p>
        </div>
        <ol className="flex list-none flex-col gap-2 p-0">
          {LAYERS.map((l, i) => (
            <li key={l.layer}>
              <button
                onClick={() => setStep(i)}
                aria-pressed={step === i}
                className="grid w-full grid-cols-[1.6rem_1fr] items-stretch overflow-hidden rounded-lg border bg-white text-left transition sm:grid-cols-[1.6rem_1fr_1.2fr]"
                style={{ borderColor: step === i ? l.color : BMT.line, boxShadow: step === i ? `0 0 0 1px ${l.color}` : undefined }}
              >
                <span
                  className="mono flex items-center justify-center text-[10px] text-white"
                  style={{ background: l.color, opacity: on(i) ? 1 : 0.35 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="px-3 py-2">
                  <span className="mono block text-[9.5px] tracking-widest" style={{ color: l.color }}>
                    {l.layer.toUpperCase()}
                  </span>
                  <span className="serif block text-[14px] italic leading-snug">{l.ring}</span>
                </span>
                <span
                  className="col-span-2 flex items-start gap-2 border-t px-3 py-2 sm:col-span-1 sm:border-t-0 sm:border-l"
                  style={{ borderColor: BMT.line }}
                >
                  <Glyph i={i} />
                  <span>
                    <span className="mono block text-[9.5px] font-bold tracking-widest">{l.element.toUpperCase()}</span>
                    <span className="block text-[12px] leading-snug opacity-75">{l.does}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="mt-5 grid gap-5 rounded-xl border bg-white p-4 md:grid-cols-[1fr_14rem] sm:p-6"
        style={{ borderColor: BMT.line }}
      >
        <svg viewBox={VB} className="h-auto w-full" role="img" aria-label={`The turned grid, built up to ${L.element.toLowerCase()}`}>
          {/* color */}
          <g style={{ opacity: on(1) ? 1 : 0, transition: "opacity .4s" }}>
            {G.cells.map((row, r) =>
              row.map((v, c) =>
                v < 0 ? null : (
                  <rect
                    key={`${r}-${c}`}
                    x={X0 + c * CELL}
                    y={Y0 + r * CELL}
                    width={CELL}
                    height={CELL}
                    fill={yarnFor(v)}
                    fillOpacity={on(2) ? 0.6 : 1}
                    style={{ transition: "fill-opacity .4s" }}
                  />
                ),
              ),
            )}
          </g>

          {/* warp */}
          {Array.from({ length: G.cols + 1 }, (_, c) => (
            <line
              key={c}
              x1={X0 + c * CELL}
              x2={X0 + c * CELL}
              y1={Y0 - 4}
              y2={Y0 + GH + 4}
              stroke={BMT.ink}
              strokeOpacity={on(1) ? 0.12 : 0.45}
              strokeWidth={on(1) ? 0.5 : 0.8}
            />
          ))}

          {/* boundaries */}
          <g style={{ opacity: on(2) ? 1 : 0, transition: "opacity .4s" }}>
            {EDGES.map((e, i) => (
              <line key={i} {...e} stroke={BMT.ink} strokeWidth="2" strokeLinecap="round" />
            ))}
          </g>

          {/* knots */}
          <g style={{ opacity: on(3) ? 1 : 0, transition: "opacity .4s" }}>
            {KNOTS.map((k, i) => (
              <circle key={i} cx={k.x} cy={k.y} r="1.7" fill="#fff" stroke={BMT.ink} strokeWidth="0.9" />
            ))}
          </g>

          {/* the two ends of the thesis */}
          {T.labels.map((h) => (
            <g key={h.name}>
              <circle cx={h.x} cy={h.y} r="4" fill="#fff" stroke={BMT.ink} strokeWidth="2" />
              <text x={X0 - 8} y={h.y + 4} textAnchor="end" fontSize="11" fontFamily="monospace" fontWeight="700" fill={BMT.ink}>
                {h.name.toUpperCase()}
              </text>
              <text x={X0 - 8} y={h.y + 16} textAnchor="end" fontSize="10" fontFamily="monospace" fill={BMT.gray}>
                {on(1) ? usd(medianOf(h.name)) : ""}
              </text>
              <line x1={X0 - 5} x2={h.x - 5} y1={h.y} y2={h.y} stroke={BMT.ink} strokeWidth="1" strokeDasharray="2 3" />
            </g>
          ))}
        </svg>

        <div aria-live="polite" className="self-center">
          <p className="mono text-[10.5px] tracking-widest" style={{ color: L.color }}>
            {String(step + 1).padStart(2, "0")} · {L.layer.toUpperCase()}
          </p>
          <p className="display mt-1 text-2xl">{L.element}</p>
          <p className="serif mt-2 text-[16px] leading-snug">{L.fact}</p>
          <div className="mono mt-4 flex gap-2 text-[11px] tracking-widest">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-full border px-3 py-1 disabled:opacity-30"
              style={{ borderColor: BMT.line }}
            >
              ← BACK
            </button>
            <button
              onClick={() => setStep((s) => Math.min(LAYERS.length - 1, s + 1))}
              disabled={step === LAYERS.length - 1}
              className="rounded-full border px-3 py-1 disabled:opacity-30"
              style={{ borderColor: BMT.navy, color: BMT.navy }}
            >
              ADD A LAYER →
            </button>
          </div>
        </div>
      </div>

      {step === 2 && (
        <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNIQUES.map((t) => (
            <li key={t.name} className="rounded-lg border bg-white p-3" style={{ borderColor: BMT.line }}>
              <p className="display text-lg" style={{ color: "#E16415" }}>
                {t.name}
              </p>
              <p className="mono text-[10px] tracking-widest opacity-60">{t.where.toUpperCase()}</p>
              <p className="serif mt-1 text-[14.5px] leading-snug">{t.how}</p>
            </li>
          ))}
        </ul>
      )}

      <figcaption className="serif mt-3 text-base leading-relaxed opacity-75">
        Pick a ring or a row to add its layer. The warp is fixed and the structure is given, on the city turned so
        Brighton weaves above Roxbury.
      </figcaption>
    </figure>
  );
}
