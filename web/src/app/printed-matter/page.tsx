import PageHead from "@/components/PageHead";
import { PRINTED, type PrintImage } from "@/content/printed-matter";

export const metadata = {
  title: "Printed Matter",
  description: "Printed pieces by Anna Bartlett, shown as objects.",
};

function Plate({ img, priority }: { img: PrintImage; priority?: boolean }) {
  return (
    <figure className="m-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        className="block h-auto w-full max-w-full border border-[var(--kraft)] bg-white"
      />
      {img.caption && (
        <figcaption className="mono mt-3 text-[11px] leading-relaxed tracking-widest text-[var(--muted)]">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function PrintedMatterPage() {
  return (
    <main>
      <PageHead
        eyebrow="Printed Matter"
        title="Things that exist on paper."
        lede="Printed pieces, shown as the objects they are. The colophon says who made what."
      />
      <div className="rc-wrap rc-pagebody">
        {PRINTED.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            className="border-t border-[var(--kraft)] pt-8 first:border-t-0 first:pt-0"
          >
            <h2 className="display text-2xl leading-tight md:text-3xl">{p.title}</h2>
            <p className="serif mt-2 text-lg leading-relaxed opacity-80">{p.dek}</p>

            <div className="mt-8">
              <Plate img={p.cover} priority={i === 0} />
            </div>

            <dl className="mt-8 grid max-w-3xl grid-cols-[max-content_minmax(0,1fr)] gap-x-6 gap-y-2 border-y border-[var(--kraft)] py-5">
              {p.colophon.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="mono text-[11px] uppercase tracking-widest text-[var(--kraft-dk)]">
                    {row.label}
                  </dt>
                  <dd className="m-0 leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12">
              <Plate img={p.mine} />
            </div>

            <div className="mt-12 grid grid-cols-1 items-start gap-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              {p.details.map((d) => (
                <Plate key={d.src} img={d} />
              ))}
            </div>

            {p.note && <p className="mt-8 max-w-2xl opacity-70">{p.note}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
