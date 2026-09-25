import type { Paper } from "@/content/papers";

/**
 * The hand-off from essay to paper. The thumbnail is the paper's real APA title
 * page set in markup (running head, page number, centered title block), so it
 * reads as the document it links to rather than as a button. It sits slightly
 * askew like a page on a desk and straightens on hover.
 */
export default function PaperCard({ paper, color }: { paper: Paper; color: string }) {
  return (
    <figure className="my-12 grid grid-cols-1 items-center gap-7 sm:grid-cols-[190px_minmax(0,1fr)]">
      <a
        href={paper.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the paper, ${paper.title} ${paper.titleItalic ?? ""} (PDF, opens in a new tab)`}
        className="mx-auto block aspect-[8.5/11] w-[170px] -rotate-2 bg-white px-4 py-5 text-[#1c1c1c] shadow-[0_1px_2px_rgba(0,0,0,.08),0_14px_30px_-14px_rgba(0,0,0,.35)] transition-transform duration-200 hover:rotate-0 motion-reduce:transition-none sm:mx-0 sm:w-full"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        <span className="flex justify-between text-[6.5px] tracking-wide">
          <span>{paper.runningHead}</span>
          <span>1</span>
        </span>
        <span className="mt-7 block text-center text-[7.5px] leading-[1.5]">
          {paper.title} {paper.titleItalic && <i>{paper.titleItalic}</i>}
        </span>
        <span className="mt-2 block text-center text-[7px] leading-[1.9]">
          {paper.author}
          <br />
          {paper.school}
          <br />
          {paper.course}
          <br />
          {paper.professor}
          <br />
          {paper.date}
        </span>
      </a>

      <figcaption>
        <p className="mono text-[11px] font-bold tracking-widest" style={{ color }}>
          THE PAPER BEHIND THIS CASE STUDY
        </p>
        <h3 className="display mt-2 text-2xl leading-tight">
          {paper.title.replace(/:.*$/, "")}
        </h3>
        <p className="serif mt-2 text-base leading-relaxed opacity-75">
          {paper.course} · {paper.professor} · {paper.date}
        </p>
        <p className="serif mt-3 text-lg leading-relaxed">
          {paper.pages} pages and {paper.sources} sources. The margin notes on this page cite it by page
          number, so any claim here can be checked against the original.
        </p>
        {paper.note && (
          <p className="hand mt-2 text-[21px] leading-snug" style={{ color }}>
            {paper.note}
          </p>
        )}
        <a
          href={paper.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mono mt-4 inline-block border-b-2 pb-0.5 text-[12px] font-bold tracking-widest"
          style={{ borderColor: color, color }}
        >
          READ THE PAPER (PDF) ↗
        </a>
      </figcaption>
    </figure>
  );
}
