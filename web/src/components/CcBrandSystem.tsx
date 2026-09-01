/**
 * The brand workstream — what a given mark still leaves you to design.
 *
 * Northeastern hands its offices a finished lockup: the N-motto, the wordmark,
 * the monogram, in four colourways. None of that was mine and the page says so.
 * What was mine is everything the mark had to survive once it left the brand
 * portal — a pair of eight-foot roll-ups, a table that had to work at a career
 * fair, and the take-home pieces students actually pocketed.
 *
 * The two banners are shown together on purpose. They are the clearest evidence
 * in the folder that there was a system and not two posters: same skeleton, same
 * three beats, different wardrobe.
 */

const BEATS = [
  {
    n: "01",
    title: "Lockup, top-left, always",
    body: "One anchor at the top and nothing competing with it. On the first banner it is the photo-filled CO-OP over the university signature; on the second it is the Cooperative Education N-motto. Either way the first thing you read is who is talking.",
  },
  {
    n: "02",
    title: "A connection motif in the middle",
    body: "Both carry the same idea in different weights — hairline arcs with red nodes on one, a dotted globe throwing red flight paths on the other. It is a lot of empty white by design: at eight feet, read from across a hall, the middle of a banner is where a body stands.",
  },
  {
    n: "03",
    title: "Two words, one of them red",
    body: "The line lands at the bottom in two stacked words with the accent on alternating halves — Powered / By Experience, Experience / Unleashed. Same construction, opposite emphasis, so the pair reads as a set from across the room.",
  },
];

const FLOOR = [
  {
    src: "/images/central-coop/brand-banner-insitu.jpg",
    alt: "The Powered By Experience roll-up banner standing in a Northeastern lobby, with two members of the Central Co-op team either side of it",
    cap: "Eight feet of it, in the lobby it was built for.",
  },
  {
    src: "/images/central-coop/brand-booth-banners.jpg",
    alt: "A Central Co-op recruiting table with both roll-up banners standing behind it and printed Cooperative Education Program one-pagers on easels",
    cap: "Both banners behind the table — the pair doing the job it was designed for.",
  },
  {
    src: "/images/central-coop/brand-booth-merch.jpg",
    alt: "The Central Co-op booth at an event: a branded tablecloth, printed programme one-pagers on easel stands, pens, mints and puzzle cubes laid out",
    cap: "The booth kit: tablecloth, easel one-pagers, pens, mints, cubes.",
  },
];

export default function CcBrandSystem({
  accent = "#363f9e",
}: {
  accent?: string;
}) {
  return (
    <>
      <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
        <p
          className="mono text-[12px] font-bold tracking-widest"
          style={{ color: accent }}
        >
          THE BRIEF · WHAT WAS ALREADY DECIDED
        </p>
        <h2 className="display mt-3 text-3xl">
          The mark was given. Everything it had to survive was not.
        </h2>
        <div className="rich serif mt-4 text-lg leading-relaxed">
          <p>
            Central Co-op did not need a logo. It is a Northeastern office, and
            Northeastern issues its offices a finished identity — the N-motto, the
            wordmark, the monogram, four colourways, a portal to download them
            from. That part was settled before I arrived and I did not draw it.
          </p>
          <p>
            What was not settled was any of the places the office actually met a
            student: a pair of roll-up banners tall enough to find across a hall,
            a table that had to explain co-op to a stranger in ninety seconds, and
            something small enough to put in a pocket and find again in April. A
            downloadable logo does none of that. Six months of this co-op was the
            distance between a mark and a system.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
        <p
          className="mono text-[12px] font-bold tracking-widest"
          style={{ color: accent }}
        >
          THE PAIR · ONE SKELETON, TWO WARDROBES
        </p>
        <h2 className="display mt-3 text-3xl">Two banners, three beats.</h2>
        <p className="serif mt-4 text-lg leading-relaxed opacity-90">
          The office needed more than one banner and it could not look like it had
          bought them separately. So the two were built on the same three-beat
          spine, and only the middle changed.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-5">
          {[
            {
              src: "/images/central-coop/brand-banner-powered.jpg",
              alt: "Roll-up banner: the word CO-OP set in a mosaic of student photographs, the Northeastern University signature beneath it, hairline arcs with red nodes crossing the field, and Powered By Experience at the foot",
              cap: "POWERED BY EXPERIENCE · 33.5 × 89.7 IN",
            },
            {
              src: "/images/central-coop/brand-banner-unleashed.jpg",
              alt: "Roll-up banner: the Northeastern University Cooperative Education N-motto at the top, a dotted world map throwing red arcs across the field, and Experience Unleashed at the foot",
              cap: "EXPERIENCE UNLEASHED · 33.5 × 89.7 IN",
            },
          ].map((b) => (
            <figure key={b.src} className="m-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.src}
                alt={b.alt}
                loading="lazy"
                className="block w-full rounded-lg border bg-white"
                style={{ borderColor: "var(--kraft)" }}
              />
              <figcaption className="mono mt-3 text-[10.5px] tracking-widest opacity-60">
                {b.cap}
              </figcaption>
            </figure>
          ))}
        </div>

        <ol className="mt-10 list-none space-y-0 p-0">
          {BEATS.map((b) => (
            <li
              key={b.n}
              className="border-t border-[var(--kraft)] py-5 last:border-b"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="mono text-[11px] font-bold tracking-widest"
                  style={{ color: accent }}
                >
                  {b.n}
                </span>
                <div>
                  <h3 className="display m-0 text-[20px] leading-tight">
                    {b.title}
                  </h3>
                  <p className="serif mt-2 mb-0 text-base leading-relaxed opacity-85">
                    {b.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="serif mt-7 text-base leading-relaxed opacity-75">
          The first banner is the one I would defend hardest. Setting CO-OP in a
          mosaic of student photographs means the headline is made of the thing it
          is claiming — you cannot read the word without looking at the people.
        </p>
      </section>

      <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
        <p
          className="mono text-[12px] font-bold tracking-widest"
          style={{ color: accent }}
        >
          ON THE FLOOR · WHERE IT HAD TO WORK
        </p>
        <h2 className="display mt-3 text-3xl">
          A brand you can only see in a PDF isn&rsquo;t finished.
        </h2>
        <p className="serif mt-4 text-lg leading-relaxed opacity-90">
          All of it deployed at recruiting and admitted-student events — which is
          also where you find out what you got wrong. The banners read from across
          a hall. The table needed the printed one-pager to do the talking,
          because at a career fair nobody stops long enough to be talked at.
        </p>

        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-3">
          {FLOOR.map((f) => (
            <li key={f.src}>
              <figure className="m-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  className="block aspect-[4/3] w-full rounded-lg border object-cover"
                  style={{ borderColor: "var(--kraft)" }}
                />
                <figcaption className="mt-3 text-[13px] leading-snug opacity-70">
                  {f.cap}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
