"use client";

/**
 * A YouTube video embedded in a page.
 *
 * Mirrors LoomEmbed's framing so motion work sits in the same furniture as the
 * StoryBridge walkthrough. Defaults to 16:9; pass `ratio` for anything else.
 */
export default function YouTubeEmbed({
  id,
  kicker,
  title,
  blurb,
  caption,
  ratio = 9 / 16,
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
  const watch = `https://www.youtube.com/watch?v=${id}`;

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
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      </div>

      <p className="mono mt-3 text-[11px] tracking-wide opacity-60">
        {caption} ·{" "}
        <a href={watch} target="_blank" rel="noopener" className="underline">
          watch on YouTube ↗
        </a>
      </p>
    </section>
  );
}
