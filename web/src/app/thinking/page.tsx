export const metadata = { title: "Thinking" };

export default function ThinkingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="mono text-xs tracking-widest opacity-70">THINKING</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Map, don&rsquo;t fix.</h1>
      <p className="serif mt-6 text-xl italic opacity-85">
        My method is the same across every folder: find an invisible system,
        map it instead of pathologizing it, then make it tangible.
      </p>
      <div className="mono mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["STEP 01", "Find the system", "Notice the invisible pattern behind a felt problem."],
          ["STEP 02", "Map it", "Turn the pattern into a legible structure — a diagram, a model, a gradient."],
          ["STEP 03", "Make it tangible", "Build the artifact that lets someone else see and use it."],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-xl border border-[var(--kraft)] bg-[var(--paper)] p-5">
            <p className="text-[11px] tracking-widest opacity-60">{n}</p>
            <p className="display mt-2 text-lg">{t}</p>
            <p className="mt-2 text-sm leading-relaxed opacity-80">{d}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
