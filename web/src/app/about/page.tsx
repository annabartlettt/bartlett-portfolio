import PageHead from "@/components/PageHead";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <PageHead
        eyebrow="About"
        title="Anna Bartlett"
        lede="Design is not a subject I work in. It is the way I work on whatever subject is in front of me."
      />
      <div className="rc-wrap rc-pagebody">
        {/* The mark goes here rather than in the nav or the footer. It is two
            letters overprinting, and below about 48px the overlap closes up and
            the whole idea turns to mud — so it is given room instead of being
            shrunk into chrome it cannot survive. */}
        <div className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mark/overprint.svg"
            alt="Anna Bartlett's monogram: an A and a B overlapping, with the crossing printing a third colour"
            width={124}
            height={152}
            className="h-[152px] w-auto"
          />
          <div className="max-w-md">
            <p className="display text-2xl leading-tight">
              I work in the overprint.
            </p>
            <p className="serif mt-3 text-lg leading-relaxed opacity-80">
              Two flat things cross, and the place they cross is a third thing
              that belongs to neither of them. That is the mark, and it is also
              the claim: the work I am proudest of sits where a craft meets a
              subject I care about.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-2xl leading-relaxed opacity-85">
          This site is a research cabinet. The folders look unrelated on purpose:
          a hand-woven map of economic mobility, an anxiety app that refuses to
          flatten its users, a generative identity for a symphony season, the
          brand and social presence of a new university office. What they share
          is not a medium or a job title. It is a way of seeing, and it transfers
          faster than any single tool I was taught.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
          I&rsquo;m a creative technologist. In practice that means the research
          comes first and the medium comes second: seven of the nine folders here
          began as research, and what each one turned into &mdash; an app, a
          generative system, a brand, a woven map &mdash; was decided by what the
          research found rather than by what I already knew how to make.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
          I finished my BFA in Design at Northeastern in April 2026 and moved to
          the DC area. The subjects I keep coming back to are health, learning,
          civic life and culture.
        </p>
        <a
          className="mono mt-8 inline-block underline"
          href="mailto:anna.bartlettt@gmail.com"
        >
          anna.bartlettt@gmail.com
        </a>
      </div>

    </main>
  );
}
