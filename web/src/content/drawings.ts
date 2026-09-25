import data from "./drawings.json";

/**
 * Anna's hand-drawn annotations: arrows, loops, and marks in the manner of her
 * Wikipedia booklet (a line that starts at a small open circle and ends in an
 * open arrowhead, carrying the story from one object to the next).
 *
 * One manifest feeds both the site and the "Drawing List" artifact where she
 * uploads them. A slot renders nothing on the live site until it has a `src`,
 * so an undrawn slot is invisible rather than a broken placeholder.
 *
 * placement:
 *   margin      sits in the gutter beside the section on wide screens, inline below
 *   inline      full-width inside the section flow
 *   image-slot  fills an existing captioned image slot in Sanity instead
 */
export type DrawingSlot = {
  id: string;
  slug: string;
  project: string;
  folder: string;
  section: string;
  kicker: string;
  kind: string;
  placement: "margin" | "inline" | "image-slot";
  canvas: [number, number];
  brief: string;
  first?: boolean;
  sanitySlot?: string;
  side?: "left" | "right";
  /** Public path once uploaded, e.g. "/drawings/cc-06-loop.svg". Black ink on transparent. */
  src?: string;
  /** Her handwritten aside, set in Caveat beside the drawing. Her words only. */
  words?: string;
  /** Her words placed on the drawing itself, in % of the canvas (label centre unless align says otherwise). */
  labels?: { text: string; x: number; y: number; align?: "start" | "center" | "end" }[];
};

export const DRAWINGS = data as DrawingSlot[];

export function drawingsFor(slug: string, section?: string) {
  return DRAWINGS.filter(
    (d) => d.slug === slug && d.placement !== "image-slot" && (section ? d.section === section : true),
  );
}
