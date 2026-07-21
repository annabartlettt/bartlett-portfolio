export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="mono text-xs tracking-widest opacity-70">ABOUT</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Anna Bartlett</h1>
      <p className="serif mt-6 text-xl italic opacity-85">
        I investigate complex human systems — emotional, learning, structural,
        algorithmic — and turn them into experiences people can understand,
        question, and act on.
      </p>
      <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
        This site is a research cabinet. Each folder is a system I found, mapped
        instead of pathologized, and made tangible — from a hand-woven map of
        economic mobility to an anxiety app that refuses to flatten its users.
        The through-line isn&rsquo;t a medium or a job title; it&rsquo;s a way of
        seeing.
      </p>
      <p className="mt-6 max-w-2xl leading-relaxed opacity-85">
        I&rsquo;m a Northeastern BFA design student and researcher, currently
        working toward computational design and AI in education.
      </p>
      <a
        className="mono mt-8 inline-block underline"
        href="mailto:anna.bartlettt@gmail.com"
      >
        anna.bartlettt@gmail.com
      </a>
    </main>
  );
}
