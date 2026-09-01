/**
 * Global Mode's palette, read out of the case study page in Figma
 * ("12 · Spotify Global Mode — Inside Folder 08").
 *
 * Unlike the other projects, these panels are dark. Her whole Spotify case
 * study is built on #121212 — green is the accent, never the field — and the
 * phone mockups are transparent PNGs with their own bezel, so they only sit
 * correctly on the dark ground they were drawn against.
 */
export const SP = {
  /** The near-black every panel sits on. */
  ink: "#121212",
  /** A step up from it, for cards inside a panel. */
  card: "#1A1A1A",
  /** Spotify green — labels, accents, the platform's name. Never a background. */
  green: "#1DB954",
  /** Headings on the dark. */
  white: "#FFFFFF",
  /** Body copy on the dark. */
  grey: "#B3B3B3",
  /** Hairlines. */
  line: "rgba(255,255,255,0.12)",
} as const;
