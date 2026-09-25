/**
 * Papers behind case studies, shown as a document object where the essay
 * hands off to the full research. The fields are copied from the paper's own
 * APA title page, including its original spelling of the project name.
 */
export type Paper = {
  slug: string;
  /** Section the card follows. */
  section: string;
  href: string;
  runningHead: string;
  title: string;
  /** Italicized tail of the title, as the paper sets it. */
  titleItalic?: string;
  author: string;
  school: string;
  course: string;
  professor: string;
  date: string;
  pages: number;
  sources: number;
  /** A line of context under the card, e.g. how the project name changed since the paper. */
  note?: string;
};

export const PAPERS: Paper[] = [
  {
    slug: "anosity",
    section: "03",
    href: "/papers/transforming-anxiety.pdf",
    runningHead: "ANOCITY",
    title: "Transforming Anxiety From Stigma to Understanding: A Design Case Study of",
    titleItalic: "Anocity",
    author: "Anna L. Bartlett",
    school: "Northeastern University",
    course: "ARTG 5000: Design and Mental Health",
    professor: "Professor Robinaugh",
    date: "April 22, 2025",
    pages: 12,
    sources: 10,
    note: "Written in 2025 as Anocity. The name became Anosity: the overlap of anxious and curiosity.",
  },
];

export function paperFor(slug: string, section?: string) {
  return PAPERS.find((p) => p.slug === slug && p.section === section);
}
