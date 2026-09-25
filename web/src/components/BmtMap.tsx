"use client";

import { useMemo, useState } from "react";
import { ATLAS, BMT, YARN, binLabel, usd, yarnFor, type Tract } from "@/content/bmt";

/**
 * Boston's census tracts, colored in the tapestry's yarn by what low-income
 * kids who grew up in each one earned at about 35. The same data can be shown
 * as the 68-column weaving grid, which is the translation step of the project:
 * every cell takes the value of the tract its center falls in.
 *
 * With `allowTurn`, the map can also be shown the way Anna wove it: turned
 * 62° so Brighton sits directly above Roxbury, the contrast she chose.
 *
 * Hover or tap a tract to read it. The neighborhood menu is the keyboard route
 * to the same information.
 */

type Mode = "map" | "grid";

const T = ATLAS.turned;
const BRIGHTON = medianOf("Brighton");
const ROXBURY = medianOf("Roxbury");

const WATER = "#9DB7D5";
const TOWN = "#ECEAE4";

/** Where a north-up point lands once the city is turned. */
function turn(x: number, y: number) {
  const r = (T.angle * Math.PI) / 180;
  const dx = x - T.cx;
  const dy = y - T.cy;
  return { x: T.cx + dx * Math.cos(r) - dy * Math.sin(r), y: T.cy + dx * Math.sin(r) + dy * Math.cos(r) };
}

function medianOf(hood: string) {
  const v = ATLAS.tracts
    .filter((t) => t.hood === hood && t.value != null)
    .map((t) => t.value as number)
    .sort((a, b) => a - b);
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}

const BY_ID = new Map(ATLAS.tracts.map((t) => [t.id, t]));
const VALUES = ATLAS.tracts.filter((t) => t.value != null).map((t) => t.value as number);
const MIN = Math.min(...VALUES);
const MAX = Math.max(...VALUES);

const HOODS = (() => {
  const m = new Map<string, number[]>();
  for (const t of ATLAS.tracts) {
    if (!t.hood || t.value == null) continue;
    m.set(t.hood, [...(m.get(t.hood) ?? []), t.value]);
  }
  return [...m.entries()]
    .map(([name, v]) => {
      const s = [...v].sort((a, b) => a - b);
      return { name, n: s.length, lo: s[0], hi: s[s.length - 1], mid: s[Math.floor(s.length / 2)] };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
})();

function Readout({ tract, hood }: { tract: Tract | null; hood: (typeof HOODS)[number] | null }) {
  if (tract) {
    return (
      <p className="serif text-[16px] leading-snug">
        <span className="mono block text-[10px] tracking-widest opacity-60">
          {(tract.hood ?? "BOSTON").toUpperCase()} · TRACT {tract.name}
        </span>
        {tract.value != null ? (
          <>
            Kids who grew up poor here earned about <b>{usd(tract.value)}</b> a year at 35.
            <span className="mono ml-2 text-[10px] tracking-widest opacity-60">
              {tract.kids} KIDS
            </span>
          </>
        ) : (
          <>Too few kids grew up here to estimate ({tract.kids}).</>
        )}
      </p>
    );
  }
  if (hood) {
    return (
      <p className="serif text-[16px] leading-snug">
        <span className="mono block text-[10px] tracking-widest opacity-60">
          {hood.name.toUpperCase()} · {hood.n} TRACTS
        </span>
        {hood.n > 1 ? (
          <>
            From <b>{usd(hood.lo)}</b> to <b>{usd(hood.hi)}</b>, depending on the tract.
          </>
        ) : (
          <>
            About <b>{usd(hood.lo)}</b>.
          </>
        )}
      </p>
    );
  }
  return (
    <p className="serif text-[16px] leading-snug opacity-70">
      Point at a tract, or pick a neighborhood, to read it.
    </p>
  );
}

export default function BmtMap({
  highlight = [],
  startMode = "map",
  allowGrid = false,
  allowTurn = false,
  startTurned = false,
  caption,
}: {
  highlight?: string[];
  startMode?: Mode;
  allowGrid?: boolean;
  allowTurn?: boolean;
  startTurned?: boolean;
  caption?: string;
}) {
  const [mode, setMode] = useState<Mode>(startMode);
  const [turned, setTurned] = useState(startTurned);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoodName, setHoodName] = useState<string>("");

  const tract = activeId ? (BY_ID.get(activeId) ?? null) : null;
  const hood = HOODS.find((h) => h.name === hoodName) ?? null;
  const marked = useMemo(() => new Set(highlight), [highlight]);
  const { width: W, height: H } = ATLAS;
  const grid = turned ? T.grid : ATLAS.grid;
  const viewBox = turned ? T.viewBox.join(" ") : `0 0 ${W} ${H}`;
  // the turned grid was sampled inside the turned outline, 6 units in from the viewBox
  const gx = turned ? T.viewBox[0] + 6 : 0;
  const gy = turned ? T.viewBox[1] + 6 : 0;
  const cw = turned ? (T.viewBox[2] - 12) / grid.cols : W / grid.cols;
  const ch = turned ? cw : H / grid.rows;
  const gridH = ch * grid.rows;

  const pill = (on: boolean) =>
    on ? { background: BMT.navy, borderColor: BMT.navy, color: "#fff" } : { borderColor: BMT.line };

  return (
    <figure className="m-0 my-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {allowGrid || allowTurn ? (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
          {allowTurn && (
            <div role="tablist" aria-label="Orientation" className="flex gap-2">
              {[false, true].map((on) => (
                <button
                  key={String(on)}
                  role="tab"
                  aria-selected={turned === on}
                  onClick={() => setTurned(on)}
                  className="mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition"
                  style={pill(turned === on)}
                >
                  {on ? "As I wove it" : "North up"}
                </button>
              ))}
            </div>
          )}
          {allowGrid && (
          <div role="tablist" aria-label="Map or weaving grid" className="flex gap-2">
            {(["map", "grid"] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className="mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition"
                style={pill(mode === m)}
              >
                {m === "map" ? "The map" : "68 columns"}
              </button>
            ))}
          </div>
          )}
          </div>
        ) : (
          <span className="mono text-[11px] tracking-widest opacity-60">
            BOSTON · {ATLAS.tracts.length} CENSUS TRACTS
          </span>
        )}
        <label className="mono flex items-center gap-2 text-[11px] tracking-widest">
          <span className="opacity-60">NEIGHBORHOOD</span>
          <select
            value={hoodName}
            onChange={(e) => {
              setHoodName(e.target.value);
              setActiveId(null);
            }}
            className="rounded-md border bg-white px-2 py-1 text-[12px] tracking-normal"
            style={{ borderColor: BMT.line }}
          >
            <option value="">All of Boston</option>
            {HOODS.map((h) => (
              <option key={h.name} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="mt-4 grid gap-5 rounded-xl border bg-white p-4 md:grid-cols-[1fr_15rem] sm:p-6"
        style={{ borderColor: BMT.line }}
      >
        <svg
          viewBox={viewBox}
          className="h-auto w-full"
          role="img"
          aria-label={
            mode === "map"
              ? "Map of Boston's census tracts colored by adult income of kids from low-income families"
              : "The same map resampled into a 68-column weaving grid"
          }
          onMouseLeave={() => setActiveId(null)}
        >
          <defs>
            <pattern id="bmt-water" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#F3F7FB" />
              <line x1="0" x2="6" y1="3" y2="3" stroke={WATER} strokeWidth="0.7" />
            </pattern>
          </defs>
          {mode === "map" ? (
            <g
              transform={turned ? `rotate(${T.angle} ${T.cx} ${T.cy})` : undefined}
              style={{ transition: "transform .5s ease" }}
            >
              {/* the sea is everything the land leaves */}
              <circle
                cx={ATLAS.context.disc.cx}
                cy={ATLAS.context.disc.cy}
                r={ATLAS.context.disc.r}
                fill="url(#bmt-water)"
                pointerEvents="none"
              />
              <path d={ATLAS.context.towns} fill={TOWN} pointerEvents="none" />
              <path d={ATLAS.context.edges} fill="none" stroke="#fff" strokeWidth="1.2" pointerEvents="none" />
              <path d={ATLAS.water.d} fill="url(#bmt-water)" pointerEvents="none" />
              {ATLAS.tracts.map((t) => {
                const inHood = hood ? t.hood === hood.name : true;
                const on = t.id === activeId || marked.has(t.id);
                return (
                  <path
                    key={t.id}
                    d={t.d}
                    fill={yarnFor(t.value)}
                    fillOpacity={inHood ? 1 : 0.18}
                    stroke={on ? BMT.ink : "#fff"}
                    strokeWidth={on ? 3 : 0.6}
                    onMouseEnter={() => setActiveId(t.id)}
                    onClick={() => setActiveId(t.id)}
                    style={{ cursor: "pointer", transition: "fill-opacity .25s" }}
                  />
                );
              })}
              {/* redraw the marked tracts on top so their outlines are never hidden */}
              {ATLAS.tracts
                .filter((t) => marked.has(t.id))
                .map((t) => (
                  <path key={`m-${t.id}`} d={t.d} fill="none" stroke={BMT.ink} strokeWidth={3} pointerEvents="none" />
                ))}
              <path d={ATLAS.context.city} fill="none" stroke={BMT.ink} strokeWidth={1.6} pointerEvents="none" />
            </g>
          ) : (
            <g>
              {grid.cells.map((row, r) =>
                row.map((v, c) =>
                  v < 0 ? null : (
                    <rect
                      key={`${r}-${c}`}
                      x={gx + c * cw}
                      y={gy + r * ch}
                      width={cw - 0.8}
                      height={ch - 0.8}
                      fill={yarnFor(v)}
                    />
                  ),
                ),
              )}
              {/* the warp: one vertical thread per column */}
              {Array.from({ length: grid.cols + 1 }, (_, c) => (
                <line
                  key={c}
                  x1={gx + c * cw}
                  x2={gx + c * cw}
                  y1={gy}
                  y2={gy + gridH}
                  stroke={BMT.ink}
                  strokeOpacity={c % 10 === 0 ? 0.25 : 0.06}
                />
              ))}
            </g>
          )}
          {mode === "map" &&
            ATLAS.context.labels.map((l) => {
              const p = turned ? turn(l.x, l.y) : l;
              // a town label cut off by the frame reads as a mistake, so skip it
              const [vx, vy, vw, vh] = turned ? T.viewBox : [0, 0, W, H];
              if (p.x < vx + 40 || p.x > vx + vw - 40 || p.y < vy + 14 || p.y > vy + vh - 14) return null;
              return (
                <text
                  key={l.name}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  fontFamily="monospace"
                  fill="#8A867D"
                  stroke={TOWN}
                  strokeWidth="2.5"
                  paintOrder="stroke"
                  pointerEvents="none"
                >
                  <tspan fontSize="10" letterSpacing="1.2">
                    {l.name.toUpperCase()}
                  </tspan>
                  <tspan x={p.x} dy="10" fontSize="7.5">
                    {l.county}
                  </tspan>
                </text>
              );
            })}
          {mode === "map" &&
            ATLAS.water.labels.map((l) => {
              const p = turned ? turn(l.x, l.y) : l;
              return (
                <text
                  key={l.name}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  fontSize="12"
                  fontStyle="italic"
                  fontFamily="Georgia, serif"
                  fill="#4F6F95"
                  stroke="#F3F7FB"
                  strokeWidth="3"
                  paintOrder="stroke"
                  pointerEvents="none"
                >
                  {l.name}
                  {l.name === "Boston Harbor" && (
                    <tspan x={p.x} dy="13" fontSize="10">
                      to the Atlantic
                    </tspan>
                  )}
                </text>
              );
            })}
          {ATLAS.landmarks.map((l) => {
            const p = turned ? turn(l.x, l.y) : l;
            return (
              <g key={l.name} pointerEvents="none">
                <rect x={p.x - 3} y={p.y - 3} width="6" height="6" fill={BMT.ink} stroke="#fff" strokeWidth="1.2" transform={`rotate(45 ${p.x} ${p.y})`} />
                <text
                  x={p.x + 7}
                  y={p.y + 3.5}
                  fontSize="10"
                  fontFamily="monospace"
                  fill={BMT.ink}
                  stroke="#fff"
                  strokeWidth="2.6"
                  paintOrder="stroke"
                >
                  {l.name}
                </text>
              </g>
            );
          })}
          {turned &&
            T.labels.map((l) => (
              <g key={l.name} pointerEvents="none">
                <circle cx={l.x} cy={l.y} r="4" fill="#fff" stroke={BMT.magenta} strokeWidth="2" />
                <text
                  x={l.name === "Brighton" ? l.x + 9 : l.x - 9}
                  y={l.y + 4}
                  textAnchor={l.name === "Brighton" ? "start" : "end"}
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={BMT.ink}
                  stroke="#fff"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  {l.name.toUpperCase()} · {usd(l.name === "Brighton" ? BRIGHTON : ROXBURY)}
                </text>
              </g>
            ))}
          {turned && (
            <line
              x1={T.labels[0].x}
              y1={T.labels[0].y + 8}
              x2={T.labels[1].x}
              y2={T.labels[1].y - 8}
              stroke={BMT.magenta}
              strokeWidth="2"
              strokeDasharray="4 4"
              pointerEvents="none"
            />
          )}
        </svg>

        <div className="flex flex-col gap-5">
          <div aria-live="polite" className="min-h-[5.5rem]">
            {mode === "map" ? (
              <Readout tract={tract} hood={hood} />
            ) : (
              <p className="serif text-[16px] leading-snug">
                <span className="mono block text-[10px] tracking-widest opacity-60">
                  {grid.cols} WARP THREADS × {grid.rows} WEFT PASSES
                </span>
                Each cell takes the color of the tract under its center. Every stitch is still a place.
                {turned && " Turned, Brighton weaves directly above Roxbury."}
              </p>
            )}
          </div>

          {/* the key, plus every tract as a tick on one axis */}
          <div>
            <p className="mono text-[10px] tracking-widest opacity-60">THE YARN KEY</p>
            <ul className="mt-2 grid list-none grid-cols-2 gap-x-3 gap-y-1.5 p-0 md:grid-cols-1">
              {YARN.map((y, i) => (
                <li key={y.name} className="flex items-center gap-2 text-[12.5px]">
                  <span className="inline-block h-3 w-5 rounded-sm" style={{ background: y.hex }} />
                  <span>{binLabel(i)}</span>
                </li>
              ))}
              <li className="flex items-center gap-2 text-[12.5px]">
                <span className="inline-block h-3 w-5 rounded-sm" style={{ background: BMT.noData }} />
                <span>Too few kids</span>
              </li>
              <li className="flex items-center gap-2 text-[12.5px]">
                <span className="inline-block h-3 w-5 rounded-sm border-2" style={{ borderColor: BMT.ink }} />
                <span>City of Boston line</span>
              </li>
              <li className="flex items-center gap-2 text-[12.5px]">
                <span className="inline-block h-3 w-5 rounded-sm" style={{ background: TOWN }} />
                <span>Neighboring towns</span>
              </li>
            </ul>
            <svg viewBox="0 0 200 34" className="mt-4 h-auto w-full" aria-hidden>
              <line x1="4" x2="196" y1="12" y2="12" stroke={BMT.line} />
              {VALUES.map((v, i) => (
                <line
                  key={i}
                  x1={4 + ((v - MIN) / (MAX - MIN)) * 192}
                  x2={4 + ((v - MIN) / (MAX - MIN)) * 192}
                  y1="4"
                  y2="20"
                  stroke={yarnFor(v)}
                  strokeWidth="1.4"
                />
              ))}
              <text x="4" y="32" fontSize="9" fill={BMT.gray} fontFamily="monospace">
                {usd(MIN)}
              </text>
              <text x="196" y="32" fontSize="9" fill={BMT.gray} fontFamily="monospace" textAnchor="end">
                {usd(MAX)}
              </text>
            </svg>
          </div>
        </div>
      </div>

      <p className="mono mt-3 text-[10.5px] tracking-wide opacity-70">
        DATA:{" "}
        <a
          href="https://www.opportunityatlas.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
          style={{ color: BMT.navy }}
        >
          The Opportunity Atlas
          <span aria-hidden> ↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        , household income at 35 for kids from low-income families. Explore any Boston tract there.
      </p>

      {caption && (
        <figcaption className="serif mt-3 text-base leading-relaxed opacity-75">{caption}</figcaption>
      )}
    </figure>
  );
}
