/**
 * A section number set inside a small shape, the way the Wikipedia booklet sets
 * its page numbers inside a football. The shape takes the project's own color;
 * the numeral picks whichever of white or ink reads better on it, measured by
 * contrast rather than guessed from brightness.
 */

function luminance(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return 0;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrast(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export default function SectionFolio({ number, color }: { number?: string; color: string }) {
  if (!number) return null;
  const ink = contrast(color, "#FFFFFF") >= contrast(color, "#1A1A1A") ? "#FFFFFF" : "#1A1A1A";
  return (
    <span
      aria-hidden
      className="mono inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-[50%] text-[11px] font-bold tracking-normal"
      style={{ background: color, color: ink }}
    >
      {number}
    </span>
  );
}
