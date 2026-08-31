import Link from "next/link";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { ESSAY_QUERY, ESSAY_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { Essay } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ESSAY_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = await client.fetch<Essay>(ESSAY_QUERY, { slug });
  if (!e) return {};
  return { title: e.title, description: e.dek };
}

function formatDate(d?: string) {
  if (!d) return null;
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = await client.fetch<Essay>(ESSAY_QUERY, { slug });
  if (!e) notFound();

  return (
    <main>
      <article className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/thinking"
          className="mono text-[11px] tracking-widest opacity-60 hover:opacity-100"
        >
          ← BACK TO THINKING
        </Link>

        <div className="mono mt-8 flex flex-wrap items-center gap-3 text-[11px] tracking-widest opacity-60">
          {formatDate(e.publishedAt) && <span>{formatDate(e.publishedAt)}</span>}
          {e.credit && <span>· {e.credit}</span>}
        </div>

        <h1 className="display mt-3 text-4xl leading-tight md:text-5xl">
          {e.title}
        </h1>

        {e.dek && (
          <p className="serif mt-6 text-xl leading-relaxed italic opacity-85">
            {e.dek}
          </p>
        )}

        {e.heroImage && (
          <figure className="mt-10 m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(e.heroImage).width(1600).auto("format").url()}
              alt={e.heroImage.alt ?? e.title}
              className="w-full rounded-xl border border-[var(--kraft)]"
            />
            {e.heroImage.caption && (
              <figcaption className="mono mt-2 text-[11px] leading-relaxed tracking-wide opacity-60">
                {e.heroImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        {e.body && (
          <div className="rich serif mt-10 text-lg leading-relaxed">
            <PortableText
              value={e.body as PortableTextBlock[]}
              components={{
                block: {
                  h2: ({ children }) => (
                    <h2 className="display mt-12 mb-3 text-2xl">{children}</h2>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-2 border-[var(--charcoal)] pl-5 text-xl italic opacity-90">
                      {children}
                    </blockquote>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-5">{children}</p>
                  ),
                },
                types: {
                  captionedImage: ({ value }) =>
                    value?.image ? (
                      <figure className="my-10 m-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={urlFor(value.image).width(1400).auto("format").url()}
                          alt={value.alt ?? value.caption ?? ""}
                          className="w-full rounded-xl border border-[var(--kraft)]"
                        />
                        {value.caption && (
                          <figcaption className="mono mt-2 text-[11px] leading-relaxed tracking-wide opacity-60">
                            {value.caption}
                          </figcaption>
                        )}
                      </figure>
                    ) : null,
                },
              }}
            />
          </div>
        )}

        {e.relatedProject?.slug && (
          <p className="mono mt-14 border-t border-[var(--kraft)] pt-6 text-[11px] tracking-widest">
            RELATED FOLDER ·{" "}
            <Link href={`/work/${e.relatedProject.slug}`} className="underline">
              {e.relatedProject.title} ↗
            </Link>
          </p>
        )}

        {e.sources && (e.sources as unknown[]).length > 0 && (
          <section className="mt-12 border-t border-[var(--kraft)] pt-6">
            <p className="mono text-[11px] tracking-widest opacity-70">SOURCES</p>
            <div className="rich mt-3 text-sm leading-relaxed opacity-75">
              <PortableText value={e.sources as PortableTextBlock[]} />
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
