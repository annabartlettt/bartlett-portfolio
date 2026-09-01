/**
 * The Boston Symphony Orchestra season's own palette, read out of the case
 * study page in Figma ("08 · Boston Symphony Orchestra — Inside Folder 06").
 *
 * The case study body sits on the site's cream; these panels sit a step warmer
 * than it so the poster work reads as pinned to a board rather than floating.
 */
export const BSO = {
  /** The sand panel every visual sits on. */
  panel: "#E6DCC2",
  /** Ink for headings on the panel. */
  ink: "#292929",
  /** Body copy. */
  body: "#2C2A27",
  /** Mono captions and parameter values. */
  muted: "#6B6659",
  /** The wine accent — kickers and stage numbers. */
  wine: "#5D2242",
  /** The slate accent some sections carry. */
  slate: "#4F5678",
  /** The sage the folder uses for affirmative marks. */
  sage: "#8CA163",
  /** Hairlines between stages. */
  line: "#CFC3A5",
} as const;
