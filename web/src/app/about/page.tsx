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

    </main>
  );
}
