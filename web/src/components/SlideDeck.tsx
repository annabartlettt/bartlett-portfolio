/**
 * A set of related images from one piece of published work.
 *
 * `numbered` turns the grid into a sequence, which is how a carousel was
 * meant to be read: the slide order is part of the design, not an accident
 * of how the files were saved.
 */
export default function SlideDeck({
  kicker,
  title,
  blurb,
  slides,
  numbered = false,
  columns = 3,
  accent = "#B5502F",
  border = true,
}: {
  kicker: string;
  title: string;
  blurb: string;
  slides: { src: string; alt: string; label?: string }[];
  numbered?: boolean;
  columns?: 2 | 3;
  accent?: string;
  border?: boolean;
}) {
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      className={`mx-auto max-w-4xl px-6 py-16 ${
        border ? "border-b border-[var(--kraft)]" : ""
      }`}
    >
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <h2 className="display mt-3 text-3xl">{title}</h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">{blurb}</p>

      <div className={`mt-8 grid grid-cols-1 gap-5 ${cols}`}>
        {slides.map((s, i) => (
          <figure key={s.src} className="m-0">
            <div
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--kraft)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="block w-full"
                style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
              />
            </div>
            {(numbered || s.label) && (
              <figcaption className="mono mt-2 flex gap-2 text-[10px] tracking-widest opacity-60">
                {numbered && (
                  <span style={{ color: accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                {s.label && <span>{s.label}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
