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
};

const GIANTS = "/images/printed-matter/giants";

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
  },
];
