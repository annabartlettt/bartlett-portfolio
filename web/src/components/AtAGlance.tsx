import type { Glance } from "@/sanity/types";

/**
 * The thirty-second version of a case study, sitting right under the cover.
 * Someone who reads only this should be able to describe the object.
 * Rows with nothing in them (size, usually) are left out, not left blank.
 */
export default function AtAGlance({
  glance,
  accent,
}: {
  glance?: Glance;
  accent: string;
}) {
  if (!glance) return null;
  const rows: [string, string | undefined][] = [
    ["BRIEF", glance.brief],
    ["MY PART", glance.myPart],
    ["WHAT WAS MADE", glance.made],
    ["SIZE", glance.size],
    ["WHO IT'S FOR", glance.forWho],
  ];
  const filled = rows.filter(([, v]) => v?.trim());
  if (!filled.length) return null;

  return (
    <section
      aria-label="At a glance"
      className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-12"
    >
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        AT A GLANCE
      </p>
      <dl className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-[10rem_1fr]">
        {filled.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="mono pt-1 text-[11px] tracking-widest opacity-60">
              {label}
            </dt>
            <dd className="serif text-lg leading-snug">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
