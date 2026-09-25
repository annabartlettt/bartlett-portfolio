import atlas from "./bmt-atlas.json";

/**
 * Boston Mobility Tapestry: palette, data and sources.
 *
 * The data colors are Anna's nine yarn colors, hex for hex from her palette
 * (deep red through deep blue, pale blue for "no data").
 *
 * The bands are drawn on the real range, $18K to $66K, not the $12K to $400K
 * her first key used.
 */
export const BMT = {
  navy: "#1E3FA0",
  magenta: "#B4165A",
  tint: "#E3E8F5",
  onDark: "#B7C6EE",
  ink: "#141A2E",
  gray: "#5E6475",
  line: "#D5DAE6",
  paper: "#FAFAF7",
  noData: "#CBE1E5",
} as const;

export const YARN = [
  { name: "Deep red", hex: "#B51959", upTo: 24000 },
  { name: "Red-orange", hex: "#C32219", upTo: 27000 },
  { name: "Orange", hex: "#E16415", upTo: 30000 },
  { name: "Yellow", hex: "#F0C800", upTo: 33000 },
  { name: "Lime green", hex: "#57CB32", upTo: 36000 },
  { name: "Bright green", hex: "#0B9632", upTo: 40000 },
  { name: "Dark teal", hex: "#006664", upTo: 46000 },
  { name: "Deep blue", hex: "#1A3A8F", upTo: Infinity },
] as const;

export function yarnFor(value: number | null | undefined) {
  if (value == null || value <= 0) return BMT.noData;
  return (YARN.find((y) => value < y.upTo) ?? YARN[YARN.length - 1]).hex;
}

export function binLabel(i: number) {
  const lo = i === 0 ? null : YARN[i - 1].upTo;
  const hi = YARN[i].upTo;
  const k = (n: number) => `$${Math.round(n / 1000)}K`;
  if (lo == null) return `under ${k(hi)}`;
  if (hi === Infinity) return `${k(lo)}+`;
  return `${k(lo)} to ${k(hi)}`;
}

/** Index of the yarn band a value falls in, or -1 for no data. */
export function bandOf(value: number | null | undefined) {
  if (value == null || value <= 0) return -1;
  return YARN.findIndex((y) => value < y.upTo);
}

/** Where a north-up map point lands once the city is turned to Anna's orientation. */
export function turnPoint(x: number, y: number) {
  const { angle, cx, cy } = ATLAS.turned;
  const r = (angle * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return { x: cx + dx * Math.cos(r) - dy * Math.sin(r), y: cy + dx * Math.sin(r) + dy * Math.cos(r) };
}

export const usd = (n: number) => `$${Math.round(n / 1000)}K`;

export type Tract = {
  id: string;
  name: string;
  hood: string | null;
  value: number | null;
  kids: number;
  d: string;
  /** A point inside the tract, north-up. */
  c: [number, number];
};

/**
 * Built from the Census Bureau's Opportunity Atlas tract file
 * (kfr_pooled_pooled_p25, converted with its own percentile-to-dollar table),
 * 2010 tract shapes, and the City of Boston's neighborhood boundaries.
 * Tracts with fewer than 20 children are left gray, as too few to trust.
 */
export const ATLAS = atlas as {
  width: number;
  height: number;
  counties: number[];
  tracts: Tract[];
  pairs: { gap: number; a: string; b: string }[];
  grid: { cols: number; rows: number; cells: number[][] };
  /** Census inland water (the Charles, ponds). Open sea is whatever the land leaves. */
  water: { d: string; labels: { name: string; x: number; y: number }[] };
  /** Full neighboring town shapes, their shared edges, and Boston's city line. */
  context: {
    towns: string;
    edges: string;
    city: string;
    labels: { name: string; county: string; x: number; y: number }[];
    /** The circle the context was cut to, large enough that only the frame ever crops it. */
    disc: { cx: number; cy: number; r: number };
  };
  /** Points of reference, projected from their coordinates onto the north-up map. */
  landmarks: { name: string; x: number; y: number }[];
  /**
   * Anna's orientation: the city turned (62° clockwise) so Brighton sits
   * directly above Roxbury, the contrast she chose to stitch. The angle is
   * computed from the two neighborhoods' centers, not eyeballed.
   */
  turned: {
    angle: number;
    cx: number;
    cy: number;
    viewBox: [number, number, number, number];
    grid: { cols: number; rows: number; cells: number[][] };
    labels: { name: string; x: number; y: number }[];
  };
};

export type Source = { label: string; href?: string };

export const SOURCES: Record<string, Source[]> = {
  "01": [
    {
      label: "Opportunity Insights, Community Profile: Boston, MA (Suffolk County)",
    },
    {
      label: "Chetty, Friedman, Hendren, Jones & Porter, “The Opportunity Atlas,” NBER Working Paper 25147 (2018)",
      href: "https://www.nber.org/papers/w25147",
    },
    {
      label: "U.S. Census Bureau, “The Opportunity Atlas,” Research Matters (Sept 2018)",
      href: "https://www.census.gov/newsroom/blogs/research-matters/2018/09/the_opportunity_atla.html",
    },
    {
      label: "U.S. Census Bureau, Opportunity Atlas data tables (tract outcomes)",
      href: "https://census.gov/programs-surveys/ces/data/public-use-data/opportunity-atlas-data-tables.html",
    },
    {
      label: "City of Boston, BPDA Neighborhood Boundaries",
      href: "https://data.boston.gov/dataset/bpda-neighborhood-boundaries",
    },
  ],
  "04": [
    { label: "Urie Bronfenbrenner, The Ecology of Human Development (1979)" },
    {
      label: "Jansen et al., “Opportunities and challenges for data physicalization,” CHI (2015)",
    },
  ],
  "02": [
    {
      label: "Chetty et al., “Social capital I: measurement and associations with economic mobility,” Nature (2022)",
      href: "https://socialcapital.org/",
    },
    {
      label: "Opportunity Insights, Community Profile: Boston, MA (economic connectedness, colleges, moving earlier in childhood)",
    },
    {
      label: "NBC Boston, “Priced Out: How Boston's college housing crunch displaces longtime residents” (May 2, 2025)",
    },
    {
      label: "Boston Area Research Initiative, report for BPS, via James Vaznis, Boston Globe (July 16, 2018)",
    },
    {
      label: "DAAD, “Costs of education and living”",
    },
    {
      label: "EUROSTUDENT VI, via European Data Journalism Network (July 17, 2018)",
    },
  ],
};
