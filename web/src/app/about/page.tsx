import YouTubeEmbed from "@/components/YouTubeEmbed";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="mono text-xs tracking-widest opacity-70">ABOUT</p>
        <h1 className="display mt-4 text-4xl md:text-5xl">Anna Bartlett</h1>
        <p className="serif mt-6 text-xl italic opacity-85">
          Design is not a subject I work in. It is the way I work on whatever
          subject is in front of me.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
          This site is a research cabinet. The folders look unrelated on purpose:
          a hand-woven map of economic mobility, an anxiety app that refuses to
          flatten its users, a generative identity for a symphony season, the
          brand and social presence of a new university office. What they share
          is not a medium or a job title. It is a way of seeing, and it transfers
          faster than any single tool I was taught.
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
          I&rsquo;m a designer and researcher. I finished my BFA in Design at
          Northeastern in April 2026 and moved to the DC area. The work points
          toward computational design and AI in education.
        </p>
        <a
          className="mono mt-8 inline-block underline"
          href="mailto:anna.bartlettt@gmail.com"
        >
          anna.bartlettt@gmail.com
        </a>
      </div>

      <YouTubeEmbed
        id="0iZFxVu8KNg"
        kicker="MOTION · STOP MOTION"
        title="Built frame by frame."
        blurb="I shoot and edit video as well as design it — Premiere Pro, and my own soundtracks when a piece needs one. Stop motion is the most patient version of the work: you assemble the whole thing frame by frame before anyone sees a second of it."
        caption="Stop Motion · more at youtube.com/@annabartlettt"
      />
    </main>
  );
}
