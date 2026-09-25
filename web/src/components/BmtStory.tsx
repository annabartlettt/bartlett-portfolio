import { ATLAS, BMT, usd, yarnFor } from "@/content/bmt";

/**
 * The small, static visuals for the Boston Mobility Tapestry. Each one sits
 * under the paragraph it makes visible. Every number here is either from the
 * Opportunity Atlas tract file or quoted from the Opportunity Insights Boston
 * profile; nothing is estimated off a chart.
 */

const label = "mono text-[10.5px] tracking-widest";

/** Section 01: why the map is old on purpose. */
export function BmtTimeline() {
  const steps = [
    { when: "~1980", what: "Born to parents earning about $27,000" },
    { when: "1980s–90s", what: "Grows up in one Boston tract" },
    { when: "2014–15", what: "Household income measured, at about 35" },
    { when: "2026", what: "The Boston you'd visit today", now: true },
  ];
  return (
    <figure className="m-0 my-10">
      <ol className="relative grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-4 sm:gap-3">
        <span
          aria-hidden
          className="absolute top-[7px] right-0 left-0 hidden h-px sm:block"
          style={{ background: `linear-gradient(to right, ${BMT.navy} 72%, transparent 72%, transparent 76%, ${BMT.line} 76%)` }}
        />
        {steps.map((s) => (
          <li key={s.when} className="relative flex gap-3 sm:block">
            <span
              aria-hidden
              className="relative z-10 mt-1 block h-3.5 w-3.5 shrink-0 rounded-full border-2 sm:mt-0"
              style={s.now ? { borderColor: BMT.magenta, background: "#fff" } : { borderColor: BMT.navy, background: BMT.navy }}
            />
            <span className="block sm:mt-3">
              <span className="display block text-2xl" style={{ color: s.now ? BMT.magenta : BMT.navy }}>
                {s.when}
              </span>
              <span className="serif mt-1 block text-[15px] leading-snug opacity-80">{s.what}</span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="serif mt-4 text-base leading-relaxed opacity-75">
        The map describes the first three dots. The gap before the fourth is why a wealthy neighborhood today can still be red.
      </figcaption>
    </figure>
  );
}

/** Section 01: the county-wide change, 1978 to 1992, as one thread. */
export function BmtCohorts() {
  const lo = 29000;
  const hi = 32500;
  const x = (v: number) => ((v - lo) / (hi - lo)) * 100;
  const groups = [
    { name: "Black", dir: "up" },
    { name: "Hispanic", dir: "up" },
    { name: "Asian", dir: "about level" },
    { name: "American Indian", dir: "down" },
  ];
  return (
    <figure className="m-0 my-10 rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: BMT.line }}>
      <p className={label} style={{ color: BMT.navy }}>
        LOW-INCOME KIDS FROM BOSTON, ADULT EARNINGS BY BIRTH YEAR
      </p>
      <div className="relative mt-8 h-14">
        <span className="absolute top-1/2 right-0 left-0 h-px" style={{ background: BMT.line }} />
        <span
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded"
          style={{ left: `${x(29900)}%`, width: `${x(31500) - x(29900)}%`, background: BMT.navy }}
        />
        {[
          { v: 29900, t: "Born 1978", s: "$29.9K" },
          { v: 31500, t: "Born 1992", s: "$31.5K" },
        ].map((d, i) => (
          <span
            key={d.t}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x(d.v)}%` }}
          >
            <span
              className="block h-4 w-4 rounded-full border-2"
              style={i ? { background: BMT.navy, borderColor: BMT.navy } : { background: "#fff", borderColor: BMT.navy }}
            />
            <span className={`${label} absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap`}>{d.t}</span>
            <span className="display absolute top-6 left-1/2 -translate-x-1/2 text-xl whitespace-nowrap" style={{ color: BMT.navy }}>
              {d.s}
            </span>
          </span>
        ))}
      </div>
      <p className="serif mt-10 text-[16px] leading-snug">
        <b style={{ color: BMT.navy }}>+5.2%</b> in Boston, while the national figure fell 4.2%.
      </p>
      <div className="mt-5 border-t pt-4" style={{ borderColor: BMT.line }}>
        <p className={`${label} opacity-60`}>NOT EVERY THREAD MOVED THE SAME WAY</p>
        <ul className="mt-2 flex list-none flex-wrap gap-2 p-0">
          {groups.map((g) => (
            <li
              key={g.name}
              className="mono rounded-full border px-3 py-1 text-[11px] tracking-wide"
              style={
                g.dir === "down"
                  ? { borderColor: BMT.magenta, color: BMT.magenta }
                  : { borderColor: BMT.line }
              }
            >
              {g.dir === "up" ? "↑" : g.dir === "down" ? "↓" : "→"} {g.name}, {g.dir}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mono mt-4 text-[10.5px] leading-relaxed tracking-wide opacity-60">
        Suffolk County, 2023 dollars, measured at age 27, so not the same scale as the map. Directions by group are
        read from the Opportunity Insights Boston profile.
      </figcaption>
    </figure>
  );
}

/** Pull the numbers out of an SVG path so a pair of tracts can be framed on its own. */
function bounds(ds: string[]) {
  const nums = ds.join(" ").match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}

function Pair({ a, b, place }: { a: string; b: string; place: string }) {
  const ta = ATLAS.tracts.find((t) => t.id === a)!;
  const tb = ATLAS.tracts.find((t) => t.id === b)!;
  const box = bounds([ta.d, tb.d]);
  const pad = 14;
  const vb = `${box.x0 - pad} ${box.y0 - pad} ${box.x1 - box.x0 + pad * 2} ${box.y1 - box.y0 + pad * 2}`;
  const [low, high] = (ta.value ?? 0) < (tb.value ?? 0) ? [ta, tb] : [tb, ta];
  return (
    <div className="rounded-xl border bg-white p-4" style={{ borderColor: BMT.line }}>
      <p className={label} style={{ color: BMT.navy }}>
        {place.toUpperCase()}
      </p>
      <svg viewBox={vb} className="mt-3 h-44 w-full" role="img" aria-label={`Two tracts that share a border in ${place}`}>
        {ATLAS.tracts.map((t) => (
          <path key={t.id} d={t.d} fill={BMT.noData} fillOpacity={0.35} stroke="#fff" strokeWidth={0.6} />
        ))}
        {[ta, tb].map((t) => (
          <path key={t.id} d={t.d} fill={yarnFor(t.value)} stroke="#fff" strokeWidth={1.5} />
        ))}
      </svg>
      <div className="mt-3 flex items-end justify-between gap-3">
        {[low, high].map((t) => (
          <div key={t.id}>
            <p className="display text-3xl" style={{ color: yarnFor(t.value) }}>
              {usd(t.value ?? 0)}
            </p>
            <p className="mono text-[10px] tracking-widest opacity-60">
              TRACT {t.name} · {t.kids} KIDS
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Section 03: the part that stopped her. Tracts that share a border. */
export function BmtNextDoor() {
  return (
    <figure className="m-0 my-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Pair a="090901" b="091001" place="Dorchester" />
        <Pair a="110601" b="130200" place="West Roxbury" />
      </div>
      <figcaption className="serif mt-3 text-base leading-relaxed opacity-75">
        Each pair shares a border. The West Roxbury pair is the widest gap between any two neighboring tracts in
        Boston, counting only tracts where at least 50 kids grew up.
      </figcaption>
    </figure>
  );
}

/** A tiny friendship web, drawn as a diagram, not data. */
function Web() {
  const pts = [
    [30, 30], [80, 18], [120, 45], [60, 70], [100, 90], [25, 95], [140, 100], [75, 120],
  ];
  const links = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [3, 5], [4, 6], [5, 7], [4, 7], [1, 3]];
  return (
    <svg viewBox="0 0 160 135" className="h-32 w-full" aria-hidden>
      {links.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={BMT.gray} strokeDasharray="3 3" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill={i % 3 === 0 ? BMT.magenta : "#fff"} stroke={BMT.magenta} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

/** Section 03: the two datasets she weighed. */
export function BmtTwoMeasures() {
  const strip = ATLAS.tracts.filter((t) => t.value != null).sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
  return (
    <figure className="m-0 my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border bg-white p-5" style={{ borderColor: BMT.line, borderStyle: "dashed" }}>
        <p className={label} style={{ color: BMT.magenta }}>
          ECONOMIC CONNECTEDNESS
        </p>
        <Web />
        <p className="display text-3xl" style={{ color: BMT.magenta }}>
          42%
        </p>
        <p className="serif text-[15px] leading-snug opacity-80">
          of the friends of low-income kids in Boston are high-income. The national average is 40%.
        </p>
        <p className="hand mt-3 text-xl opacity-80">A relationship. Nothing to hold.</p>
      </div>
      <div className="rounded-xl border bg-white p-5" style={{ borderColor: BMT.navy }}>
        <p className={label} style={{ color: BMT.navy }}>
          UPWARD INCOME MOBILITY
        </p>
        <div className="mt-3 flex h-32 items-stretch gap-px" aria-hidden>
          {strip.map((t) => (
            <span key={t.id} className="flex-1" style={{ background: yarnFor(t.value) }} />
          ))}
        </div>
        <p className="display text-3xl" style={{ color: BMT.navy }}>
          $18K to $66K
        </p>
        <p className="serif text-[15px] leading-snug opacity-80">
          One number per neighborhood, sorted here from lowest to highest, one thread per tract.
        </p>
        <p className="hand mt-3 text-xl opacity-80">A place. Something you can weave.</p>
      </div>
    </figure>
  );
}

/** Section 03: the irony, in the profile's own terms. */
export function BmtCampus() {
  const cards = [
    {
      name: "MIT",
      access: "Few low-income students",
      outcome: "Strong outcomes for the ones who get in",
    },
    {
      name: "Bunker Hill Community College",
      access: "Many more low-income students",
      outcome: "Weaker mobility results",
    },
  ];
  return (
    <figure className="m-0 my-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <div key={c.name} className="rounded-xl border bg-white p-5" style={{ borderColor: BMT.line }}>
            <p className="display text-2xl">{c.name}</p>
            <dl className="mt-3 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-2">
              <dt className={`${label} pt-1 opacity-60`}>ACCESS</dt>
              <dd className="serif m-0 text-[15px] leading-snug">{c.access}</dd>
              <dt className={`${label} pt-1 opacity-60`}>OUTCOMES</dt>
              <dd className="serif m-0 text-[15px] leading-snug">{c.outcome}</dd>
            </dl>
          </div>
        ))}
      </div>
      <figcaption className="serif mt-3 text-base leading-relaxed opacity-75">
        “To be an engine of upward mobility, colleges must do two things.” One without the other is not enough.
        Opportunity Insights, Boston profile.
      </figcaption>
    </figure>
  );
}

/** Section 03: the kindergarten gap. */
export function BmtSchools() {
  const rows = [
    { place: "Charlestown, Back Bay, Beacon Hill and central Boston", pct: 80, more: true },
    { place: "Mattapan", pct: 5 },
  ];
  return (
    <figure className="m-0 my-10 rounded-xl border bg-white p-5 sm:p-6" style={{ borderColor: BMT.line }}>
      <p className={label} style={{ color: BMT.navy }}>
        KINDERGARTNERS IN A HIGH-QUALITY SCHOOL, BOSTON PUBLIC SCHOOLS, 2018
      </p>
      <ul className="mt-4 flex list-none flex-col gap-4 p-0">
        {rows.map((r) => (
          <li key={r.place}>
            <p className="serif text-[15px] leading-snug">{r.place}</p>
            <div className="mt-1.5 flex items-center gap-3">
              <span className="h-4 flex-1 rounded-sm" style={{ background: BMT.tint }}>
                <span
                  className="block h-full rounded-sm"
                  style={{ width: `${r.pct}%`, background: r.pct > 50 ? BMT.navy : BMT.magenta }}
                />
              </span>
              <span className="display w-20 text-right text-2xl">
                {r.more ? "80%+" : `${r.pct}%`}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="mono mt-4 text-[10.5px] tracking-wide opacity-60">
        “High-quality” as measured by test scores. Boston Area Research Initiative, reported in the Boston Globe.
      </figcaption>
    </figure>
  );
}
