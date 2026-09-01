/**
 * The two accounts, named.
 *
 * The page used to open on "Two accounts, from zero" and then show exactly one
 * of them, which is a claim a reader cannot check. Both are named here, both are
 * linked, and the window I ran them is stated — July to December 2024 — so the
 * numbers underneath have a period attached instead of floating.
 *
 * Provenance, traced 2026-09-01 through the résumé history on disk. The numbers
 * do not appear at all in RESUME - DEC 24.pdf, which says only "significantly
 * increased follower growth". They show up complete for the first time in
 * AnnaBartlett_Resume_Jan2025.pdf (24 Jan 2025), a month after the co-op ended
 * and while the Insights were still in hand. Every version since carries the
 * same 900% and 78.9%, so those two have never moved.
 *
 * One had moved. The January bullet reads "viral co-op content maintaining
 * 3,230 average views"; a résumé redesign on 21 Oct 2025 turned that into
 * 2,330, and every résumé and this site inherited the transposition. It is back
 * to 3,230, with the qualifier the original had — it was the average on the
 * co-op content that took off, never an average across everything posted.
 *
 * The stats are the Central Co-op feed only, not the pair. Two things say so:
 * Anna's own recollection, and the fact that 60.6K total views over 2,330 views
 * per post comes to exactly 26 posts — one account's worth of a six-month run,
 * not two. The label above them says which feed they belong to, because a stat
 * block sitting under a heading that says "two accounts" will otherwise be read
 * as covering both.
 *
 * The two feeds are worth seeing together because they are not the same design
 * problem. Central Co-op talks to a domestic audience in Northeastern's red and
 * black. Global Co-op talks to students about to leave the country, and its work
 * sits in a completely different register — teal, butter yellow, aeroplanes.
 */

type Stat = { value?: string; label?: string };

const ACCOUNTS = [
  {
    handle: "@nucoopeducation",
    href: "https://www.instagram.com/nucoopeducation/",
    name: "Central Co-op",
    body: "The main feed: co-op advice, student spotlights, trek recaps and logistics, for students, employers and faculty. Everything in the graphic-design and editorial folders ran here.",
  },
  {
    handle: "@nuglobalcoop",
    href: "https://www.instagram.com/nuglobalcoop/",
    name: "Global Co-op Council",
    body: "The second feed, for students placed on co-op abroad — workshops, send-offs, and the practical business of leaving the country for six months.",
  },
];

export default function CcAccounts({
  stats,
  accent = "#363f9e",
}: {
  stats?: Stat[];
  accent?: string;
}) {
  return (
    <>
      <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
        <p
          className="mono text-[12px] font-bold tracking-widest"
          style={{ color: accent }}
        >
          TWO FEEDS · JULY&ndash;DECEMBER 2024
        </p>
        <h2 className="display mt-3 text-3xl">Two accounts, six months.</h2>
        <p className="serif mt-4 text-lg leading-relaxed opacity-90">
          Both co-managed, and both young enough that what went out still
          decided what the account became. The calendar came from the
          platform&rsquo;s own analytics rather than a hunch &mdash; which posts
          held people, which died, what time of day a co-op student is awake and
          worrying.
        </p>

        <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {ACCOUNTS.map((a) => (
            <li
              key={a.handle}
              className="rounded-xl border border-[var(--kraft)] bg-[var(--paper)] p-5"
            >
              <a
                href={a.href}
                target="_blank"
                rel="noopener"
                className="mono text-[13px] font-bold tracking-wide underline-offset-4 hover:underline"
                style={{ color: accent }}
              >
                {a.handle} ↗
              </a>
              <p className="mono mt-1 text-[10px] tracking-widest opacity-55">
                {a.name.toUpperCase()}
              </p>
              <p className="serif mt-3 mb-0 text-base leading-relaxed opacity-85">
                {a.body}
              </p>
            </li>
          ))}
        </ul>

        {stats && stats.length > 0 && (
          <>
            <p className="mono mt-11 text-[11px] tracking-widest opacity-60">
              @NUCOOPEDUCATION · THE SIX MONTHS I RAN IT
            </p>
            <div className="mt-4 flex flex-wrap gap-10">
              {stats.map((st, n) => (
                <div key={n}>
                  <div className="display text-4xl" style={{ color: accent }}>
                    {st.value}
                  </div>
                  <div className="mono text-[11px] tracking-widest opacity-70">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mono mt-6 text-[10px] leading-relaxed tracking-widest opacity-55">
              SOURCE · INSTAGRAM INSIGHTS, COMPILED JANUARY 2025 AT THE CLOSE OF
              THE CO-OP · THE CENTRAL CO-OP FEED ONLY · CO-MANAGED WITH JUSTIN
              WILLIAMS
            </p>
          </>
        )}
      </section>

      <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
        <p
          className="mono text-[12px] font-bold tracking-widest"
          style={{ color: accent }}
        >
          THE SECOND FEED · A DIFFERENT ROOM
        </p>
        <h2 className="display mt-3 text-3xl">
          Same office, and nothing else the same.
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:items-start">
          <figure className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/central-coop/global-sendoff.jpg"
              alt="Global Co-op Send Off event graphic: teal type and a butter-yellow globe with dashed flight paths and aeroplanes on a cream ground, for a December 3rd event at the Curry Student Center"
              loading="lazy"
              className="block w-full rounded-lg border"
              style={{ borderColor: "var(--kraft)" }}
            />
            <figcaption className="mono mt-3 text-[10.5px] tracking-widest opacity-60">
              GLOBAL CO-OP SEND OFF · DECEMBER 2024
            </figcaption>
          </figure>
          <div className="serif text-lg leading-relaxed">
            <p>
              The Global Co-op feed could not borrow the main account&rsquo;s
              voice. Central Co-op is talking to a student deciding whether to
              apply for something; Global Co-op is talking to one who has
              already been accepted and now has to get on a plane.
            </p>
            <p className="mt-4">
              So it got its own register &mdash; teal and butter yellow instead
              of red and black, a globe and dashed flight paths instead of the
              network motif, and a warmer, slower typographic pace. The
              Northeastern signature stays at the top of both, which is the only
              thing holding them to the same office.
            </p>
            <p className="mt-4">
              This one is a mandatory send-off for spring placements: dinner, an
              alumni panel, an RSVP code. Roughly a third of the design job on a
              feed like that is logistics, legible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
