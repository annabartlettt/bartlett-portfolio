import SplitPage from "@/components/SplitPage";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <SplitPage
        eyebrow="About"
        title="Anna Bartlett"
        lede="I talk to people until the problem is clear, then design learning experiences that give them their time back."
    >
        {/* The mark goes here rather than in the nav or the footer. It is two
            letters overprinting, and below about 48px the overlap closes up and
            the whole idea turns to mud, so it is given room instead of being
            shrunk into chrome it cannot survive. */}
        <div className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/anna-bartlett.jpg"
            alt="Anna Bartlett, smiling, outdoors in a cream collared top"
            width={720}
            height={1080}
            className="h-auto w-[200px] rounded-xl border border-[var(--kraft)] object-cover sm:w-[220px]"
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
          I&rsquo;m a UX and learning designer. I design interactive tools for
          the web and mobile that help people learn something, and I start every
          one with research: interviews, focus groups, usability tests, and a
          lot of listening. Too much of a teacher&rsquo;s or student&rsquo;s day
          goes to tools that cost time instead of saving it. That&rsquo;s the
          problem I want to work on.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
          This site is a research cabinet, and the folders are in that order on
          purpose. The first three are learning tools: StoryBridge, an AI reading
          platform where the AI adapts the level but never rewrites the writer;
          the student focus groups I pioneered for Northeastern&rsquo;s Central
          Co-op Office; and Financial Blueprint, a financial literacy app. After
          them comes research-led interactive work on anxiety, public parks, and
          music, then the data and craft pieces that taught me how to see.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
          I&rsquo;m most interested in education, edtech, and AI as a learning
          tool, and in products that respect people&rsquo;s time instead of
          competing for it. I finished my BFA in Design at Northeastern in April
          2026, where I also taught first-year students as a teaching assistant,
          and I&rsquo;m now based in Washington, DC.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
          When I&rsquo;m not designing, I&rsquo;m making or seeing art, playing
          guitar, producing music in Logic Pro X, teaching myself Spanish, or out
          on a run.
        </p>
        {/* Education, practice and availability were a column on the
            homepage's closing panel, which is gone. They are the facts a
            hiring reader scans for, so they sit here with the prose rather
            than interrupting the folders. */}
        <dl className="mt-12 max-w-2xl border-t border-[var(--kraft)]">
          {[
            [
              "Education",
              "BFA Design, Marketing minor · Northeastern University · magna cum laude",
            ],
            [
              "Practice",
              "UX research · Interactive design for web and mobile · Learning design · Design systems · AI in education",
            ],
            [
              "Available for",
              "UX research and learning design roles in education, edtech, and AI for learning · hybrid or in person · Washington DC",
            ],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-[var(--kraft)] py-4">
              <dt className="mono text-[10px] tracking-widest uppercase opacity-70">
                {k}
              </dt>
              <dd className="mt-1.5 ml-0 text-[15px] leading-relaxed opacity-85">
                {v}
              </dd>
            </div>
          ))}
        </dl>

        {/* Contact used to be its own route: a heading and this same mailto,
            nothing else. It is here now, where someone who has just read the
            page is actually ready to write. /contact 301s to this anchor. */}
        <div id="say-hello" className="mt-14 scroll-mt-24">
          <p className="mono text-[11px] tracking-widest opacity-60">
            SAY HELLO
          </p>
          <h2 className="display mt-3 text-3xl">Get in touch.</h2>
          <p className="serif mt-3 max-w-xl text-lg leading-relaxed opacity-85">
            For work, research, or collaboration. I read everything and reply to
            all of it.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a className="rc-btn pink" href="mailto:anna.bartlettt@gmail.com">
              Say hello →
            </a>
            <span className="mono text-[12px] tracking-widest opacity-70">
              anna.bartlettt@gmail.com
            </span>
          </div>
        </div>
    </SplitPage>
  );
}
