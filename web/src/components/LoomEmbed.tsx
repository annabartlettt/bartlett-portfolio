"use client";

/**
 * A Loom walkthrough embedded inside a case study.
 *
 * Loom's player has no self-sizing message channel, so the frame holds the
 * recording's own aspect ratio and scales with the column width.
 */
export default function LoomEmbed({
  id,
  kicker,
  title,
  blurb,
  caption,
  ratio = 1249 / 1666,
  accent = "#B5502F",
}: {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  caption: string;
  ratio?: number;
  accent?: string;
}) {
  const share = `https://www.loom.com/share/${id}`;

  return (
    <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-16">
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <h2 className="display mt-3 text-3xl">{title}</h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">{blurb}</p>

      <div
        className="relative mt-8 overflow-hidden rounded-xl border"
        style={{ borderColor: accent, paddingBottom: `${ratio * 100}%` }}
      >
        <iframe
          src={`https://www.loom.com/embed/${id}?hideEmbedTopBar=true`}
          title={title}
          loading="lazy"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      </div>

      <p className="mono mt-3 text-[11px] tracking-wide opacity-60">
        {caption} ·{" "}
        <a href={share} target="_blank" rel="noopener" className="underline">
          watch on Loom ↗
        </a>
      </p>
    </section>
  );
}
