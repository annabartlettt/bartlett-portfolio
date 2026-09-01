/**
 * The header every non-home page wears, so arriving from the dock lands you
 * somewhere that belongs to the same cabinet: the layered edge, a mono
 * eyebrow, and the display title. The tint band is the section's colour —
 * pink for thinking, indigo for the rest — matching the drawers on the home
 * page.
 */
export default function PageHead({
  eyebrow,
  title,
  lede,
  tint = "ink",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  tint?: "ink" | "pink";
}) {
  return (
    <header className={`rc-pagehead ${tint === "pink" ? "pink" : ""}`}>
      <div className="rc-wrap">
        <div className="rc-edge">
          <i />
          <i />
          <i />
        </div>
        <p className="rc-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="sub">{lede}</p>}
      </div>
    </header>
  );
}
