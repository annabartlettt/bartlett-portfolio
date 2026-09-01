/**
 * The four guides, laid side by side.
 *
 * The carousel below this makes a claim it cannot itself demonstrate — that the
 * four guides are one template in four wardrobes — because it shows one slide of
 * one deck at a time. You have to hold four covers in your head to check it.
 *
 * So the claim gets its own evidence: the opening frames in a row, then the
 * closing frames in a row. The top row is four different pieces of art. The
 * bottom row is the same card four times. That contrast is the whole system, and
 * it reads in about a second.
 */

const OPENS = [
  {
    src: "/images/central-coop/summer-1.jpg",
    alt: "Reminders For Huskies series title card set on torn notebook paper over an aerial photograph of Boston",
    cap: "Series card",
  },
  {
    src: "/images/central-coop/resume-1.jpg",
    alt: "Resume Red Flags cover slide dated 8.9.2024, red banners knocked back over a photograph",
    cap: "8.9.2024",
  },
  {
    src: "/images/central-coop/politics-1.jpg",
    alt: "Navigating Political Discussions on Co-op cover slide dated 10.24.2024, with a drawn ballot box",
    cap: "10.24.2024",
  },
  {
    src: "/images/central-coop/career-fair-1.jpg",
    alt: "How to Prepare for a Career Fair cover slide dated 10.30.2024, with a drawn briefcase and autumn leaves",
    cap: "10.30.2024",
  },
];

const CLOSES = [
  {
    src: "/images/central-coop/summer-6.jpg",
    alt: "Closing slide reading Find This Helpful? Save as a Reminder",
  },
  {
    src: "/images/central-coop/resume-6.jpg",
    alt: "Closing slide reading Find This Helpful? Save as a Reminder",
  },
  {
    src: "/images/central-coop/politics-7.jpg",
    alt: "Closing slide reading Find This Helpful? Save as a Reminder",
  },
  {
    src: "/images/central-coop/career-fair-6.jpg",
    alt: "Closing slide reading Find This Helpful? Save as a Reminder",
  },
];

function Row({
  items,
  captioned = false,
}: {
  items: { src: string; alt: string; cap?: string }[];
  captioned?: boolean;
}) {
  return (
    <ul className="mt-3 grid list-none grid-cols-4 gap-3 p-0">
      {items.map((s) => (
        <li key={s.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.src}
            alt={s.alt}
            loading="lazy"
            className="block aspect-square w-full rounded-md border object-cover"
            style={{ borderColor: "var(--kraft)" }}
          />
          {captioned && s.cap && (
            <p className="mono mt-2 text-[10px] tracking-widest opacity-55">
              {s.cap}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function CcTemplate({
  accent = "#363f9e",
}: {
  accent?: string;
}) {
  return (
    <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        THE PROOF · FOUR OPENINGS, ONE ENDING
      </p>
      <h2 className="display mt-3 text-3xl">Four ways in. One way out.</h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">
        The guides had to look like they belonged to the same account without
        looking like they had been made from a fill-in-the-blank. So the
        variation was spent at the front, where a student decides whether to
        stop scrolling, and nowhere else.
      </p>

      <div className="mt-9">
        <p className="mono text-[11px] tracking-widest opacity-60">
          THE OPENING · FOUR DIFFERENT PIECES OF ART
        </p>
        <Row items={OPENS} captioned />
        <p className="serif mt-3 text-base leading-relaxed opacity-75">
          A photograph I took, then the one piece of stock in the whole run, then
          a drawn cover, then a photograph with drawn leaves over it. Three carry
          a date because they answered something time-bound. The first carries a
          series name instead, because it was built to run again.
        </p>
      </div>

      <div className="mt-9">
        <p className="mono text-[11px] tracking-widest opacity-60">
          THE CLOSE · THE SAME CARD, REPAINTED
        </p>
        <Row items={CLOSES} />
        <p className="serif mt-3 text-base leading-relaxed opacity-75">
          One composition every time — the monogram, the four action chips, the
          ask, the hashtag — repainted in whatever the guide above it was
          wearing. The shape is the part a reader learns to recognise; the colour
          is what keeps a set of four from reading like a form letter.
        </p>
        <p className="serif mt-3 text-base leading-relaxed opacity-75">
          And the ask is for the save, not the like. A saved post comes back at
          the moment it is needed, which for a co-op student is usually months
          later, at eleven at night, right before the thing they were dreading.
        </p>
      </div>
    </section>
  );
}
