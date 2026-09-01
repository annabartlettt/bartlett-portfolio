/**
 * StoryBridge's own palette, read out of the Design System reference file.
 *
 * The built screens use these rather than the site's tokens, so the product
 * looks like itself inside a case study that looks like her. Badge tints are
 * mixed from these same values rather than invented, so nothing here is a
 * colour that does not exist in the design system.
 */
export const SB = {
  ink: "#1E1B18",
  muted: "#7A6F63",
  line: "#D9D0BF",
  paper: "#FAF8F5",
  surface: "#F2EDE4",
  accent: "#C1603A",
  green: "#2E5E3E",
  mint: "#7ABF8E",
  blue: "#5AABF0",
  yellow: "#F5C842",
  coral: "#F07B5A",
} as const;

/** A wash of one of the palette colours over paper, for badge backgrounds. */
export const tint = (c: string, pct = 26) =>
  `color-mix(in srgb, ${c} ${pct}%, ${SB.paper})`;
