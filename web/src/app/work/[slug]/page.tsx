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
            kicker="THE FORMAT · THREE GUIDES, ONE TEMPLATE"
            title="Answering the question before it gets asked."
            blurb="The account's job was rarely to announce something. It was to answer a question a student already had at eleven at night. That turned into a repeatable shape: a dated cover, one idea per card, and a closing slide asking the reader to save it for later. The skeleton never moved. Everything on top of it did."
            decks={[
              {
                name: "Resume Red Flags",
                href: "https://www.instagram.com/p/C-dKF0_uek3/",
                note: "August. The earliest of the three, and it looks it: stock photography on the cover, tilted paper, red banners knocked back over a shadow. Four things not to put on a resume.",
                slides: [
                  { src: "/images/central-coop/resume-1.jpg", alt: "Cover slide dated 8.9.2024 reading Resume Red Flags, What NOT to Include", label: "Cover" },
                  { src: "/images/central-coop/resume-2.jpg", alt: "Slide reading Spelling Mistakes and Grammar Errors", label: "Spelling and grammar" },
                  { src: "/images/central-coop/resume-3.jpg", alt: "Slide reading Inconsistent or Conflicting Information", label: "Conflicting information" },
                  { src: "/images/central-coop/resume-4.jpg", alt: "Slide reading Irrelevant Work Experience", label: "Irrelevant experience" },
                  { src: "/images/central-coop/resume-5.jpg", alt: "Slide reading Acronyms and Complex Fonts", label: "Acronyms and fonts" },
                  { src: "/images/central-coop/resume-6.jpg", alt: "Closing slide reading Find This Helpful? Save as a Reminder", label: "Save as a reminder" },
                ],
              },
              {
                name: "Political Discussions",
                href: "https://www.instagram.com/p/DBhDsOISGak/",
                note: "October, six days before the election, for students newly placed in an office who could not afford to alienate a supervisor. It takes no political position at all. What it hands them is a ladder: make conversations opt-in, notice the room, step away, speak up if a comment crosses into bias, escalate if it does not stop. The cover is drawn rather than photographed, which is where the format starts getting confident.",
                slides: [
                  { src: "/images/central-coop/politics-1.jpg", alt: "Cover slide dated 10.24.2024 reading Navigating Political Discussions on Co-op with a vote ballot box illustration", label: "Cover" },
                  { src: "/images/central-coop/politics-2.jpg", alt: "Slide reading Set Boundaries", label: "Set Boundaries" },
                  { src: "/images/central-coop/politics-3.jpg", alt: "Slide reading Speak Up", label: "Speak Up" },
                  { src: "/images/central-coop/politics-4.jpg", alt: "Slide reading Make Conversations Opt-In", label: "Make Conversations Opt-In" },
                  { src: "/images/central-coop/politics-5.jpg", alt: "Slide reading Contact a Co-op Coordinator", label: "Contact a Co-op Coordinator" },
                  { src: "/images/central-coop/politics-6.jpg", alt: "Slide reading Remember Cultural Differences", label: "Remember Cultural Differences" },
                  { src: "/images/central-coop/politics-7.jpg", alt: "Closing slide reading Find This Helpful? Save as a Reminder", label: "Save as a reminder" },
                ],
              },
              {
                name: "Career Fair",
                href: "https://www.instagram.com/p/DBwK-OoOLOq/",
                note: "Six days later again, for the fair itself. The briefcase holds the type and the leaves date it to fall recruiting. Same skeleton, third wardrobe.",
                slides: [
                  { src: "/images/central-coop/career-fair-1.jpg", alt: "Cover slide dated 10.30.2024 reading How to Prepare for a Career Fair", label: "Cover" },
                  { src: "/images/central-coop/career-fair-2.jpg", alt: "Slide reading Have Resumes Prepared", label: "Have Resumes Prepared" },
                  { src: "/images/central-coop/career-fair-3.jpg", alt: "Slide reading Company Research", label: "Company Research" },
                  { src: "/images/central-coop/career-fair-4.jpg", alt: "Slide reading Prepare Specific Questions", label: "Prepare Specific Questions" },
                  { src: "/images/central-coop/career-fair-5.jpg", alt: "Slide reading LinkedIn or Email Contact", label: "LinkedIn or Email Contact" },
                  { src: "/images/central-coop/career-fair-6.jpg", alt: "Closing slide reading Find This Helpful? Save as a Reminder", label: "Save as a reminder" },
                ],
              },
            ]}
            numbered
            accent={brand.primary ?? primary}
          />
        )}
        {slug === "central-co-op" && s.number === "02" && (
          <SlideDeck
            kicker="A DIFFERENT JOB · PROFILES"
            title="DC Co-ops."
            blurb="Advice is one job. Showing a student someone who already did the thing is another, and it needs a different form. These run as profiles: a speech bubble for the name and the facts, the event photography desaturated so the portrait carries the only color, and the student's own words left in their voice."
            decks={[
              {
                name: "DC Co-ops",
                href: "https://www.instagram.com/p/C-qKegTOl3_/",
                slides: [
                  { src: "/images/central-coop/dc-1-kate.jpg", alt: "DC Co-ops profile card for Kate Lo, third-year civil engineering and architecture student on co-op with Hensel Phelps", label: "Kate Lo" },
                  { src: "/images/central-coop/dc-2-natalia.jpg", alt: "DC Co-ops profile card for Natalia Ivanov, third-year computer science student on co-op with Riverside Research", label: "Natalia Ivanov" },
                  { src: "/images/central-coop/dc-3-sofie.jpg", alt: "DC Co-ops profile card for Sofie Wendell, fourth-year Spanish and international affairs student on co-op with Control Risks", label: "Sofie Wendell" },
                ],
              },
            ]}
            accent={brand.primary ?? primary}
          />
        )}
        {slug === "central-co-op" && s.number === "02" && (
          <SlideDeck
            kicker="ON LOCATION · HUSKY TREK"
            title="Salesforce, Bay Area."
            blurb="Not every post was made at a desk. Central Co-op ran Husky Treks that took students inside companies, and the recap had to make a reader who was not there want to sign up for the next one."
            decks={[
              {
                name: "Salesforce",
                href: "https://www.instagram.com/p/DCr1DyLSCPW/",
                slides: [
                  { src: "/images/central-coop/trek-6.jpg", alt: "Salesforce West building entrance" },
                  { src: "/images/central-coop/trek-7.jpg", alt: "Blaze Your Trail sign on a redwood column at Salesforce" },
                  { src: "/images/central-coop/trek-3.jpg", alt: "Northeastern E-TREKS feather flag on the Oakland campus" },
                  { src: "/images/central-coop/trek-5.jpg", alt: "Northeastern N marker on the Oakland campus" },
                ],
              },
            ]}
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
