import Link from "next/link";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PROJECT_QUERY } from "@/sanity/queries";
import SlideDeck from "@/components/SlideDeck";
import InstagramEmbed from "@/components/InstagramEmbed";
import Drawer from "@/components/Drawer";
import CcBrandSystem from "@/components/CcBrandSystem";
import CcPolls from "@/components/CcPolls";
import CcPersonas from "@/components/CcPersonas";
import CcTemplate from "@/components/CcTemplate";
import CcAccounts from "@/components/CcAccounts";
import { PARTS, GUIDES, REPORTING } from "@/content/central-coop";
import type { Project } from "@/sanity/types";

export const revalidate = 60;

export function generateStaticParams() {
  return PARTS.map((p) => ({ part: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;
  const meta = PARTS.find((p) => p.slug === part);
  if (!meta) return {};
  return { title: `${meta.title} — Central Co-op`, description: meta.blurb };
}

export default async function CentralCoopPart({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;
  const meta = PARTS.find((p) => p.slug === part);
  if (!meta) notFound();

  const p = await client.fetch<Project>(PROJECT_QUERY, {
    slug: "central-co-op",
  });
  if (!p) notFound();

  const primary = p.brand?.primary ?? "#363f9e";
  const i = PARTS.findIndex((x) => x.slug === part);
  const next = PARTS[(i + 1) % PARTS.length];
  const brandSection = p.sections?.find((s) => s.number === "02");
  const research = p.sections?.find((s) => s.number === "03");

  return (
    <main>
      <section
        className="px-6 py-12 text-[var(--cream)]"
        style={{ background: primary }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="mono text-[11px] tracking-widest opacity-80">
            <Link href="/" className="underline-offset-2 hover:underline">
              Anna Bartlett
            </Link>
            <span> ▸ </span>
            <Link
              href="/work/central-co-op"
              className="underline-offset-2 hover:underline"
            >
              Central Co-op
            </Link>
            <span> ▸ {meta.title}</span>
          </p>
          <h1 className="display mt-3 text-3xl md:text-4xl">{meta.title}</h1>
          <p className="serif mt-3 text-lg italic opacity-90">{meta.blurb}</p>
        </div>
      </section>

      {/* Section 02 in Sanity covers brand and reach in one paragraph, which is
          why it renders as the stats block on /social rather than here. The
          brand workstream has enough of its own artefacts to carry a page. */}
      {part === "brand" && <CcBrandSystem accent={primary} />}

      {part === "social" && (
        <>
          <CcAccounts stats={brandSection?.stats} accent={primary} />
          <InstagramEmbed
            code="DDhoqSUOqrj"
            kicker="MOTION · ON THE FEED"
            title="Some of that reach was video."
            blurb="Alongside the stills, I shot and edited motion work for both feeds. This one ran on Central Co-op."
            caption="Central Co-op · Instagram"
            accent={primary}
          />
        </>
      )}

      {part === "graphic-design" && (
        <>
          <CcTemplate accent={primary} />
          <SlideDeck
            kicker="THE FORMAT · FOUR GUIDES, ONE TEMPLATE"
            title="Answering the question before it gets asked."
            blurb="The account's job was rarely to announce something. It was to answer a question a student already had at eleven at night. That turned into a repeatable shape: a dated cover, one idea per card, and a closing slide asking the reader to save it for later. The skeleton never moved. Everything on top of it did."
            decks={GUIDES}
            numbered
            accent={primary}
            border={false}
          />
        </>
      )}

      {part === "editorial" && (
        <SlideDeck
          kicker="THE OTHER HALF · REPORTING"
          title="Going out and finding things."
          blurb="The guides answer a question a student already has. The rest of the account went and found things they did not know to ask about: someone already on co-op in a city they might move to, a company they could get inside, a shuttle that would take them to a job in Burlington for $2.50. Different job, so the template loosens. Two of these ran as named series rather than one-offs, which is the difference between posting and programming."
          decks={REPORTING}
          accent={primary}
          border={false}
        />
      )}

      {part === "research" && research && (
        <>
          <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
            <h2 className="display text-3xl">{research.title}</h2>
            {research.body && (
              <div className="rich serif mt-4 text-lg leading-relaxed">
                <PortableText value={research.body as PortableTextBlock[]} />
              </div>
            )}
            {research.drawer?.label && (
              <Drawer
                label={research.drawer.label}
                content={research.drawer.content}
                accent={primary}
              />
            )}
          </section>
          <CcPolls accent={primary} />
          <CcPersonas accent={primary} />
        </>
      )}

      <section className="mx-auto max-w-4xl border-t border-[var(--kraft)] px-6 py-10">
        <div className="mono flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-widest">
          <Link
            href="/work/central-co-op"
            className="underline-offset-2 hover:underline"
          >
            ▸ BACK TO THE FOLDER
          </Link>
          <Link
            href={`/work/central-co-op/${next.slug}`}
            className="underline-offset-2 hover:underline"
            style={{ color: primary }}
          >
            NEXT · {next.title.toUpperCase()} ▸
          </Link>
        </div>
      </section>
    </main>
  );
}
