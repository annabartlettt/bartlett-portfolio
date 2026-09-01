/**
 * Financial Blueprint's own palette, read out of the case study page in Figma
 * ("09 · Financial Blueprint — Inside Folder 03").
 *
 * The built screens use these rather than the site's tokens, so the product
 * looks like itself inside a case study that looks like her. Every value here
 * was sampled from her own frames — none of it is invented.
 */
export const FB = {
  /** The lavender panel every visual sits on. */
  panel: "#F7F3FF",
  /** Deep purple of the app screens. */
  screen: "#2E1A5E",
  /** The darker inset used for cards inside a screen. */
  screenInset: "#221448",
  /** Body ink on the lavender panel. */
  ink: "#2A1A4A",
  muted: "#5F5377",
  line: "#D9D2EC",
  card: "#FFFFFF",
  /** The brand violet — kickers, chat bubbles, progress. */
  violet: "#7B3FE4",
  /** The brand green — on-dark headings, buttons, the "mastered" ring. */
  green: "#57D982",
  /** A deeper green that reads on the light panel. */
  greenInk: "#2FA55E",
  /** Wash behind the how-might-we line. */
  greenWash: "#E4F5EA",
  /** Cream used for text inside the dark screens. */
  cream: "#FFF4E3",
} as const;
