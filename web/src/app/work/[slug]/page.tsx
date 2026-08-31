import { client } from "@/sanity/client";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Drawer from "@/components/Drawer";
import EarlyLofis from "@/components/EarlyLofis";
import BsoSketch from "@/components/BsoSketch";
import LoomEmbed from "@/components/LoomEmbed";
import InstagramEmbed from "@/components/InstagramEmbed";
import SlideDeck from "@/components/SlideDeck";
import { urlFor } from "@/sanity/image";
import { Fragment, type CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/sanity/types";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await client.fetch<Project | null>(PROJECT_QUERY, { slug });
  if (!p) return {};
  const desc = p.invisibleSystem ?? p.coverSub ?? undefined;
  const ogImage = p.coverImage?.asset
    ? urlFor(p.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;
  return {
    title: p.title,
    description: desc,
    openGraph: {
      title: `${p.title} · Anna Bartlett`,
      description: desc,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await client.fetch<Project | null>(PROJECT_QUERY, { slug });
  if (!p) notFound();

  const brand = p.brand ?? {};
  const primary = brand.primary ?? "#363f9e";
  const onDark = brand.onDark ?? "#ffffff";

  return (
    <main>
      {/* Cover */}
      <section className="px-6 py-20 text-[var(--cream)]" style={{ background: primary }}>
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="mono text-[11px] tracking-widest opacity-80">
            ← BACK TO CABINET
          </Link>
          <p className="mono mt-8 text-[12px] tracking-widest" style={{ color: onDark }}>
            FOLDER {p.folderNumber} · OPENED
          </p>
          <h1 className="display mt-3 text-5xl md:text-6xl">
            {p.coverHeadline ?? p.title}
          </h1>
          {p.coverSub && (
            <p className="serif mt-5 max-w-2xl text-2xl italic opacity-90">
              {p.coverSub}
            </p>
          )}
          <div className="mono mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[13px]">
            {p.role && (
              <span>
                <b className="opacity-60">ROLE </b>
                {p.role}
              </span>
            )}
            {p.timeline && (
              <span>
                <b className="opacity-60">TIMELINE </b>
                {p.timeline}
              </span>
            )}
            {p.team && (
              <span>
                <b className="opacity-60">TEAM </b>
                {p.team}
              </span>
            )}
          </div>

          {p.coverImage?.asset && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(p.coverImage).width(1800).auto("format").url()}
              alt={p.coverImage.alt ?? `${p.title} — cover`}
              className="mt-12 w-full rounded-2xl"
            />
          )}
        </div>
      </section>

      {/* Sections */}
      {p.sections?.map((s) => (
        <Fragment key={s._key}>
        <section
          className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-16"
        >
          <p
            className="mono text-[12px] font-bold tracking-widest"
            style={{ color: s.accent ?? primary }}
          >
            {s.number} · {s.kicker}
          </p>
          <h2 className="display mt-3 text-3xl">{s.title}</h2>
          <div
            className="rich serif mt-4 text-lg leading-relaxed opacity-90"
            style={
              { "--rich-accent": s.accent ?? primary } as CSSProperties
            }
          >
            <PortableText value={(s.body ?? []) as PortableTextBlock[]} />
          </div>

          {s.image?.asset && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(s.image).width(1500).auto("format").url()}
              alt={s.image.alt ?? s.title ?? ""}
              className="mt-8 w-full rounded-xl border border-[var(--kraft)]"
            />
          )}

          {(() => {
            const filled = (s.images ?? []).filter((im) => im.image?.asset);
            if (filled.length === 0) return null;
            return (
              <div
                className={`mt-8 grid gap-5 ${filled.length > 1 ? "sm:grid-cols-2" : ""}`}
              >
                {filled.map((im, i) => (
                  <figure key={im._key ?? i} className="m-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlFor(im.image!).width(1400).auto("format").url()}
                      alt={im.alt ?? im.caption ?? s.title ?? ""}
                      className="w-full rounded-xl border border-[var(--kraft)]"
                    />
                    {im.caption && (
                      <figcaption className="mono mt-2 text-[11px] tracking-wide opacity-60">
                        {im.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );
          })()}

          {s.stats && s.stats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-10">
              {s.stats.map((st, i) => (
                <div key={i}>
                  <div
                    className="display text-4xl"
                    style={{ color: s.accent ?? primary }}
                  >
                    {st.value}
                  </div>
                  <div className="mono text-[11px] tracking-widest opacity-70">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {s.drawer?.label && (
            <Drawer
              label={s.drawer.label}
              content={s.drawer.content}
              accent={s.accent ?? primary}
            />
          )}
        </section>
        {slug === "anosity" && s.number === "03" && <EarlyLofis />}
        {slug === "boston-symphony-orchestra" && s.number === "04" && (
          <BsoSketch accent={brand.secondary ?? primary} />
        )}
        {slug === "storybridge" && s.number === "04" && (
          <LoomEmbed
            id="f90ed4bac3354529a95fb042162b1a76"
            kicker="WALKTHROUGH · THE WORKING PROTOTYPE"
            title="Five minutes inside StoryBridge."
            blurb="The roles above, in motion — an author drafting a story, a reader browsing the cards, and the adapted copy sitting beside the original rather than replacing it."
            caption="StoryBridge: AI Matched Stories for Students · 4:58"
            accent={brand.primary ?? primary}
          />
        )}
        {slug === "central-co-op" && s.number === "02" && (
          <InstagramEmbed
            code="DDhoqSUOqrj"
            kicker="MOTION · ON THE FEED"
            title="Some of that reach was video."
            blurb="Alongside the stills, I shot and edited motion work for the two accounts. This one ran on the Central Co-op feed."
            caption="Central Co-op · Instagram"
            accent={brand.primary ?? primary}
          />
        )}
        {slug === "central-co-op" && s.number === "02" && (
          <SlideDeck
            kicker="THE FORMAT · A SIX-SLIDE GUIDE"
            title="How to Prepare for a Career Fair."
            blurb="The account's job was rarely to announce something. It was to answer a question a student had at eleven at night. That turned into a repeatable shape: a dated cover, one idea per card, and a closing slide asking the reader to save it for later. Here the briefcase holds the type and the leaves put it in fall recruiting season."
            slides={[
              { src: "/images/central-coop/career-fair-1.jpg", alt: "Cover slide dated 10.30.2024 reading How to Prepare for a Career Fair", label: "Cover" },
              { src: "/images/central-coop/career-fair-2.jpg", alt: "Slide reading Have Resumes Prepared", label: "Have Resumes Prepared" },
              { src: "/images/central-coop/career-fair-3.jpg", alt: "Slide reading Company Research", label: "Company Research" },
              { src: "/images/central-coop/career-fair-4.jpg", alt: "Slide reading Prepare Specific Questions", label: "Prepare Specific Questions" },
              { src: "/images/central-coop/career-fair-5.jpg", alt: "Slide reading LinkedIn or Email Contact", label: "LinkedIn or Email Contact" },
              { src: "/images/central-coop/career-fair-6.jpg", alt: "Closing slide reading Find This Helpful? Save as a Reminder", label: "Save as a reminder" },
            ]}
            numbered
            accent={brand.primary ?? primary}
          />
        )}
        {slug === "central-co-op" && s.number === "02" && (
          <SlideDeck
            kicker="THE RANGE · THE HARDEST BRIEF"
            title="Navigating Political Discussions on Co-op."
            blurb="Six days before the 2024 election, for students who were new in an office and could not afford to alienate a supervisor. It takes no political position at all. What it does is give someone a ladder: make conversations opt-in, notice who you are talking to, step away if you need to, say something if a comment crosses into bias, and escalate to a coordinator if it does not stop. Same skeleton as the career fair guide, dated cover through save-as-reminder card, rebuilt in ballot-box red and blue. The template held while the entire visual system changed."
            slides={[
              { src: "/images/central-coop/politics-1.jpg", alt: "Cover slide dated 10.24.2024 reading Navigating Political Discussions on Co-op with a vote ballot box illustration", label: "Cover" },
              { src: "/images/central-coop/politics-2.jpg", alt: "Slide reading Set Boundaries", label: "Set Boundaries" },
              { src: "/images/central-coop/politics-3.jpg", alt: "Slide reading Speak Up", label: "Speak Up" },
              { src: "/images/central-coop/politics-4.jpg", alt: "Slide reading Make Conversations Opt-In", label: "Make Conversations Opt-In" },
              { src: "/images/central-coop/politics-5.jpg", alt: "Slide reading Contact a Co-op Coordinator", label: "Contact a Co-op Coordinator" },
              { src: "/images/central-coop/politics-6.jpg", alt: "Slide reading Remember Cultural Differences", label: "Remember Cultural Differences" },
              { src: "/images/central-coop/politics-7.jpg", alt: "Closing slide reading Find This Helpful? Save as a Reminder", label: "Save as a reminder" },
            ]}
            numbered
            accent="#4A6DD8"
          />
        )}
        {slug === "central-co-op" && s.number === "02" && (
          <SlideDeck
            kicker="ON LOCATION · HUSKY TREK"
            title="Salesforce, Bay Area."
            blurb="Not every post was made at a desk. Central Co-op ran Husky Treks that took students inside companies, and the recap had to make a reader who was not there want to sign up for the next one."
            slides={[
              { src: "/images/central-coop/trek-6.jpg", alt: "Salesforce West building entrance" },
              { src: "/images/central-coop/trek-7.jpg", alt: "Blaze Your Trail sign on a redwood column at Salesforce" },
              { src: "/images/central-coop/trek-3.jpg", alt: "Northeastern E-TREKS feather flag on the Oakland campus" },
              { src: "/images/central-coop/trek-5.jpg", alt: "Northeastern N marker on the Oakland campus" },
            ]}
            columns={2}
            accent={brand.primary ?? primary}
          />
        )}
        </Fragment>
      ))}

      {/* Notes */}
      {p.notes && p.notes.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="mono text-[11px] tracking-widest opacity-70">
            CASE STUDY NOTES
          </p>
          <div className="rich serif mt-3 text-lg italic opacity-80">
            <PortableText value={p.notes as PortableTextBlock[]} />
          </div>
        </section>
      )}
    </main>
  );
}
