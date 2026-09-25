/**
 * Margin notes: research sits beside the exact sentence it supports instead of
 * behind a drop-down. Each note names an anchor phrase that appears verbatim in
 * the section's Sanity body; the phrase becomes the link, the note sits in the
 * margin. Content is visible at rest; hover or focus only ties note to phrase,
 * and a click keeps that pairing lit (and opens the note inline on narrow screens).
 *
 * Copy comes from each section's former drawer, lightly edited (American
 * English, no em dashes). If an anchor stops matching the body text, the note
 * is skipped rather than shown in the wrong place.
 */
export type SideNoteDef = {
  slug: string;
  section: string;
  /** Optional Sanity block _key, when the phrase could appear in more than one paragraph. */
  block?: string;
  anchor: string;
  note: string;
  source?: string;
  /** Where the source line links, e.g. the paper PDF at a page. */
  href?: string;
};

const PAPER = "/papers/transforming-anxiety.pdf";

export const SIDENOTES: SideNoteDef[] = [
  {
    slug: "anosity",
    section: "01",
    block: "s1b5",
    anchor: "That sentence is the part no app was measuring",
    note: "The paper calls it self-stigma: even as public stigma around anxiety eases, many people still downplay how much their symptoms affect their daily lives.",
    source: "Transforming Anxiety, p. 2",
    href: `${PAPER}#page=2`,
  },
  {
    slug: "anosity",
    section: "02",
    block: "s2b1",
    anchor: "Design and Mental Health course",
    note: "ARTG 5000 at Northeastern with Professor Robinaugh, spring 2025. The research became a design case study paper, and the notes on this page cite it by page.",
    source: "Read the paper (PDF)",
    href: PAPER,
  },
  {
    slug: "anosity",
    section: "02",
    block: "s2b4",
    anchor: "weak-not-sick",
    note: "The opposite trap is real too. Conversations meant to destigmatize anxiety online have shifted toward \"romanticizing mental illness, including the creation of memes and content glamorizing conditions such as anxiety.\" The design had to do neither.",
    source: "Issaka et al. (2024) · paper, p. 2",
    href: `${PAPER}#page=2`,
  },
  {
    slug: "anosity",
    section: "03",
    block: "s3b4",
    anchor: "curious awareness",
    note: "Non-judgmental observation of thoughts, sensations, and behaviors, shifting from avoidance and control to understanding the pattern. The research points to the posterior cingulate cortex (PCC).",
    source: "Brewer (2021) · paper, p. 4",
    href: `${PAPER}#page=4`,
  },
  {
    slug: "anosity",
    section: "03",
    block: "s3b4",
    anchor: "the automatic pattern loosens its grip",
    note: "Model-based, not model-free: Anosity leans on understanding a pattern's structure rather than reacting to it. That is what lets curiosity interrupt the automatic loop.",
    source: "Transforming Anxiety, p. 4",
    href: `${PAPER}#page=4`,
  },
  {
    slug: "anosity",
    section: "03",
    block: "s3b5",
    anchor: "isn't a defect",
    note: "From the paper: experiencing high levels of anxiety is \"just an unhealthy association or habit to which the brain responds.\"",
    source: "Transforming Anxiety, p. 3",
    href: `${PAPER}#page=3`,
  },
  {
    slug: "anosity",
    section: "04",
    block: "s4b4",
    anchor: "a dartboard",
    note: "\"When we are sad or anxious all the time, that sadness or anxiety becomes familiar, a place that we gravitate toward, something like a morning routine or a regular route to work.\" Yael Millgram's research, which the paper uses to support the dartboard.",
    source: "Brewer (2021), p. 89 · paper, p. 6",
    href: `${PAPER}#page=6`,
  },
  {
    slug: "anosity",
    section: "06",
    block: "s6l3",
    anchor: "the emotion has cooled enough to let you actually learn from it",
    note: "\"Sometimes reflecting with hindsight is a better time for learning because you are less emotionally affected.\"",
    source: "Brewer (2021), p. 127 · paper, p. 7",
    href: `${PAPER}#page=7`,
  },
  {
    slug: "anosity",
    section: "07",
    block: "s7l3",
    anchor: "before this ever sits in someone's pocket unsupervised",
    note: "The paper's next steps: mental health practitioners review every questionnaire and domain, and users who recognize their anxiety needs professional care get a clear pathway to it. Anosity was never meant to be treatment.",
    source: "Transforming Anxiety, pp. 3 and 8",
    href: `${PAPER}#page=8`,
  },
];

export function sidenotesFor(slug: string, section?: string) {
  return SIDENOTES.filter((n) => n.slug === slug && n.section === section);
}

type PtSpan = { _type: string; _key?: string; text?: string; marks?: string[] };
type PtBlock = { _type?: string; _key?: string; children?: PtSpan[]; markDefs?: Record<string, unknown>[] };

/**
 * Split the span holding each anchor phrase and mark the phrase with a
 * `sidenote` annotation, so PortableText renders it through the SideNote mark.
 */
export function withSidenotes(body: unknown[], notes: SideNoteDef[]): unknown[] {
  if (notes.length === 0) return body;
  const blocks = structuredClone(body) as PtBlock[];

  notes.forEach((n, i) => {
    const key = `sidenote-${i + 1}`;
    for (const b of blocks) {
      if (b._type !== "block" || !Array.isArray(b.children)) continue;
      if (n.block && b._key !== n.block) continue;
      const idx = b.children.findIndex(
        (c) => c._type === "span" && typeof c.text === "string" && c.text.includes(n.anchor),
      );
      if (idx < 0) continue;

      const span = b.children[idx];
      const text = span.text ?? "";
      const at = text.indexOf(n.anchor);
      // Take any punctuation that closes the phrase along with it, so a note
      // opened inline on a phone never strands a lone period on the next line.
      let end = at + n.anchor.length;
      while (end < text.length && /[.,;:!?)]/.test(text[end])) end++;
      const base = span.marks ?? [];
      const id = span._key ?? "span";
      const parts: PtSpan[] = [];
      if (at > 0) parts.push({ ...span, _key: `${id}-pre${i}`, text: text.slice(0, at) });
      parts.push({ ...span, _key: `${id}-note${i}`, text: text.slice(at, end), marks: [...base, key] });
      if (end < text.length) parts.push({ ...span, _key: `${id}-post${i}`, text: text.slice(end) });

      b.children.splice(idx, 1, ...parts);
      b.markDefs = [
        ...(b.markDefs ?? []),
        { _key: key, _type: "sidenote", n: i + 1, note: n.note, source: n.source, href: n.href },
      ];
      break;
    }
  });

  return blocks;
}
