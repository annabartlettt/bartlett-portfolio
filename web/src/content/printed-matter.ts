/**
 * Printed pieces, shown as objects rather than case studies. The colophon rows
 * are copied from the piece's own colophon, and "My part" names only what the
 * piece credits to Anna.
 */
export type PrintImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type PrintedPiece = {
  slug: string;
  title: string;
  /** One line on what the piece is. */
  dek: string;
  cover: PrintImage;
  colophon: { label: string; value: string }[];
  /** The part of the piece Anna made, shown large. */
  mine: PrintImage;
  /** Smaller pages that show how the whole piece is put together. */
  details: PrintImage[];
  note?: string;
  /** A downloadable PDF of the piece (or of Anna's part of it). */
  download?: { href: string; label: string; size: string };
};

const GIANTS = "/images/printed-matter/giants";
const WAYLAND = "/images/printed-matter/wayland";
const PLANETARIUM = "/images/printed-matter/planetarium";
const WINGS = "/images/printed-matter/wings";

export const PRINTED: PrintedPiece[] = [
  {
    slug: "standing-on-the-shoulders-of-giants",
    title: "Standing on the Shoulders of Giants",
    dek: "A class book of essays about designing alongside algorithms.",
    cover: {
      src: `${GIANTS}/cover-spread.jpg`,
      width: 2400,
      height: 1493,
      alt: "Cover spread: the word GIANTS in large green letters overprinted with a pink outline, on a field of scattered green and pink letters.",
    },
    colophon: [
      { label: "Format", value: "Two-color risograph, green and pink" },
      { label: "Edition", value: "30 copies, second edition" },
      { label: "Printer", value: "RISO MH9450U" },
      { label: "Made in", value: "Algorithmic Graphic Design, Northeastern University, Fall 2025" },
      { label: "Instructor", value: "Todd Linkner" },
      { label: "My part", value: "Essay and spread, “15 Samples vs. 1.76 Trillion Parameters.” Cover, with Laura Song." },
    ],
    mine: {
      src: `${GIANTS}/fifteen-samples.jpg`,
      width: 2400,
      height: 1500,
      alt: "The spread “15 Samples vs. 1.76 Trillion Parameters” by Anna Bartlett: boxed text blocks in green and pink between vertical waveform bars.",
      caption:
        "My spread. Roger Linn’s LM-1 drum machine held 15 drum samples. ChatGPT has an estimated 1.76 trillion parameters you can’t see. So set the ones you can.",
    },
    details: [
      {
        src: `${GIANTS}/contents.jpg`,
        width: 2400,
        height: 1500,
        alt: "Contents spread: numbered essay titles and authors, each paired with a photograph of two dice.",
        caption: "Contents",
      },
      {
        src: `${GIANTS}/colophon.jpg`,
        width: 1200,
        height: 1500,
        alt: "Colophon page headed FROM THE MINDS OF, listing every contributor and who made each part of the book.",
        caption: "Colophon",
      },
    ],
    note: "The other spreads are my classmates’ work, so they aren’t shown here.",
    download: {
      href: "/print/standing-on-the-shoulders-of-giants-excerpt.pdf",
      label: "Cover and my spread",
      size: "1 MB",
    },
  },
  {
    slug: "wayland-native-plants",
    title: "Wayland Native Plants",
    dek: "A yard sign and the one-page brand guide behind it.",
    cover: {
      src: `${WAYLAND}/yard-sign.jpg`,
      width: 2400,
      height: 1806,
      alt: "Yard sign on dark green: the word NATIVE in cream letters with leaves and wildflowers cut into them, over the line “This yard supports pollinators, birds, and biodiversity. Learn more at WaylandNativePlants.org.”",
    },
    colophon: [
      { label: "Format", value: "Yard sign, 24 × 18 in, and a one-page brand guide" },
      { label: "Typeface", value: "Source Sans Pro" },
      { label: "Made in", value: "Graphic design course, Northeastern University, 2025" },
      { label: "My part", value: "All of it: wordmark, “N” mark, sign, and guidelines." },
    ],
    mine: {
      src: `${WAYLAND}/brand-guidelines.jpg`,
      width: 2400,
      height: 1806,
      alt: "Brand guidelines page: the full NATIVE wordmark, the N logo, primary and secondary colors, typography, a type hierarchy with point sizes, brand voice, and applications.",
      caption: "The guide: wordmark, mark, color, type hierarchy, voice, and where each one goes.",
    },
    details: [],
    download: { href: "/print/wayland-native-plants.pdf", label: "Sign and guidelines", size: "3 MB" },
  },
  {
    slug: "arlington-planetarium",
    title: "Friends of Arlington’s Planetarium",
    dek: "Three posters recruiting student advisors, one system across all three.",
    cover: {
      src: `${PLANETARIUM}/series.jpg`,
      width: 2400,
      height: 1200,
      alt: "Three tall pink and violet posters side by side, each with a hand-drawn glowing illustration: a radio dish (Join Us), a spiral galaxy (Your Mission), and a comet (Unlock).",
    },
    colophon: [
      { label: "Format", value: "Three posters, 32 × 48 in" },
      { label: "Made in", value: "Graphic design course, Northeastern University, 2025" },
      { label: "My part", value: "Illustration, type, and layout for all three." },
    ],
    mine: {
      src: `${PLANETARIUM}/join-us.jpg`,
      width: 1200,
      height: 1800,
      alt: "Poster: FRIENDS OF ARLINGTON, JOIN US, Become a Student Advisor for 2025-26, above a hand-drawn radio dish.",
      caption: "Join Us: the first poster, which sets the headline, illustration, and footer the other two follow.",
    },
    details: [
      {
        src: `${PLANETARIUM}/your-mission.jpg`,
        width: 1200,
        height: 1802,
        alt: "Poster: STUDENT ADVISOR, YOUR MISSION, with a spiral galaxy illustration and a list of advisor duties.",
        caption: "Your Mission",
      },
      {
        src: `${PLANETARIUM}/unlock.jpg`,
        width: 1200,
        height: 1800,
        alt: "Poster: STUDENT ADVISOR, UNLOCK, with a comet illustration, a list of benefits, and a QR code to apply.",
        caption: "Unlock",
      },
    ],
    download: { href: "/print/arlington-planetarium-posters.pdf", label: "All three posters", size: "4 MB" },
  },
  {
    slug: "wings-of-philadelphia",
    title: "Wings of Philadelphia",
    dek: "A sixteen-page book on how the Eagles’ logo changed, told in one green.",
    cover: {
      src: `${WINGS}/early-years.jpg`,
      width: 2400,
      height: 1200,
      alt: "Spread titled EARLY YEARS: an NRA eagle badge, an eagle sculpture, a team photo, and a dotted arrow leading to the word STEAGLES, all in green duotone.",
    },
    colophon: [
      { label: "Format", value: "16 pages, 6 × 6 in" },
      { label: "Typefaces", value: "Proxima Nova and Racing Sans One" },
      { label: "Made in", value: "Typography, Northeastern University, 2024" },
      { label: "My part", value: "Design, layout, and the duotone image system." },
    ],
    mine: {
      src: `${WINGS}/logo-evolution.jpg`,
      width: 2400,
      height: 1200,
      alt: "Spread tracing the logo from an eagle carrying a football to the stylized wings, joined by a curved arrow, beside a green duotone game photograph.",
      caption: "The arrow carries the logo from one era to the next across the spread.",
    },
    details: [
      {
        src: `${WINGS}/colophon.jpg`,
        width: 2400,
        height: 1200,
        alt: "Colophon spread: the word Colophon on the left and a wall of repeated green EAGLES wordmarks on the right.",
        caption: "Colophon",
      },
    ],
    note: "Text adapted from Wikipedia’s “Philadelphia Eagles” article; logos and photographs belong to their owners. A student project.",
    download: { href: "/print/wings-of-philadelphia.pdf", label: "The whole book", size: "4 MB" },
  },
];
