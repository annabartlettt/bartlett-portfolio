import Link from "next/link";
import { client } from "@/sanity/client";
import { ESSAYS_QUERY } from "@/sanity/queries";
import type { Essay } from "@/sanity/types";
import PageHead from "@/components/PageHead";

export const metadata = { title: "Thinking" };
export const revalidate = 60;

function formatDate(d?: string) {
  if (!d) return null;
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default async function ThinkingPage() {
  const essays = await client.fetch<Essay[]>(ESSAYS_QUERY);

  return (
    <main>
      <PageHead
        eyebrow="Thinking"
        title="Writing about the work of other people."
        lede="Essays on design, data, and the things people build to make one legible to the other. Where the folders show what I made, this is where I work out what I think."
        tint="pink"
      />
      <div className="rc-wrap rc-pagebody">

      {essays.length === 0 ? (
        <p className="mt-16 opacity-60">Nothing published here yet.</p>
      ) : (
        <div className="mt-14 border-t border-[var(--kraft)]">
          {essays.map((e) => (
            <article
              key={e._id}
              className="border-b border-[var(--kraft)] py-8"
            >
              <div className="mono flex flex-wrap items-center gap-3 text-[11px] tracking-widest opacity-60">
                {formatDate(e.publishedAt) && <span>{formatDate(e.publishedAt)}</span>}
                {e.credit && <span>· {e.credit}</span>}
              </div>
              <h2 className="display mt-2 text-2xl md:text-3xl">
                <Link href={`/thinking/${e.slug}`} className="hover:underline">
                  {e.title}
                </Link>
              </h2>
              {e.dek && (
                <p className="serif mt-3 max-w-2xl text-lg leading-relaxed opacity-85">
                  {e.dek}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {e.topics?.map((t) => (
                  <span
                    key={t}
                    className="mono rounded-full border border-[var(--kraft)] px-2.5 py-1 text-[10px] tracking-widest uppercase opacity-70"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={`/thinking/${e.slug}`}
                className="mono mt-4 inline-block text-[11px] tracking-widest underline"
              >
                READ ↗
              </Link>
            </article>
          ))}
        </div>
      )}
      </div>
    </main>
  );
}
