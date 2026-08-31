"use client";

/**
 * An Instagram post embedded in a page.
 *
 * Instagram renders nothing server-side, but its client bundle does render for
 * logged-out visitors, so the player works for anyone. The embed's chrome
 * (account bar, caption footer) is fixed pixels while the media scales, so the
 * frame is capped at Instagram's own 400px design width and given a fixed
 * height rather than a pure aspect ratio.
 */
export default function InstagramEmbed({
  id,
  code,
  kicker,
  title,
  blurb,
  caption,
  height = 660,
  accent = "#B5502F",
}: {
  id?: string;
  code: string;
  kicker: string;
  title: string;
  blurb: string;
  caption: string;
  height?: number;
  accent?: string;
}) {
  const post = `https://www.instagram.com/p/${code}/`;

  return (
    <section id={id} className="mx-auto max-w-4xl scroll-mt-20 border-b border-[var(--kraft)] px-6 py-16">
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <h2 className="display mt-3 text-3xl">{title}</h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">{blurb}</p>

      <div
        className="mt-8 overflow-hidden rounded-xl border"
        style={{ borderColor: accent, maxWidth: 400 }}
      >
        <iframe
          src={`https://www.instagram.com/p/${code}/embed/`}
          title={title}
          loading="lazy"
          scrolling="no"
          allowFullScreen
          className="block w-full"
          style={{ border: 0, height }}
        />
      </div>

      <p className="mono mt-3 text-[11px] tracking-wide opacity-60">
        {caption} ·{" "}
        <a href={post} target="_blank" rel="noopener" className="underline">
          open on Instagram ↗
        </a>
      </p>
    </section>
  );
}
