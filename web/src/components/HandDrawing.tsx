import type { CSSProperties } from "react";
import type { DrawingSlot } from "@/content/drawings";

/**
 * One of Anna's hand drawings, recolored to the project's ink.
 *
 * She draws in black on a transparent canvas; the file is used as a CSS mask
 * over a block of the project's color, so one drawing takes any brand without
 * being redrawn. Her handwritten aside, when she has written one, is set in
 * the site's hand face beside it as real text.
 *
 * With no file yet it renders nothing, unless SHOW_DRAWING_SLOTS=1 is set
 * locally, which outlines every empty slot so placement can be checked.
 */
export default function HandDrawing({ slot, color }: { slot: DrawingSlot; color: string }) {
  const showSlots = process.env.SHOW_DRAWING_SLOTS === "1";
  if (!slot.src && !showSlots) return null;

  const [w, h] = slot.canvas;
  const side = slot.side ?? "right";
  const wrap =
    slot.placement === "margin"
      ? `my-6 ml-auto w-full max-w-[220px] min-[1400px]:absolute min-[1400px]:my-0 min-[1400px]:w-52 ${
          side === "right" ? "min-[1400px]:-right-56" : "min-[1400px]:-left-56"
        }`
      : h / w > 0.6
        ? "mx-auto my-8 w-full max-w-md"
        : "mx-auto my-8 w-full max-w-2xl";

  const mask: CSSProperties = slot.src
    ? {
        aspectRatio: `${w} / ${h}`,
        backgroundColor: color,
        WebkitMaskImage: `url(${slot.src})`,
        maskImage: `url(${slot.src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }
    : {};

  return (
    <figure className={wrap} data-drawing={slot.id}>
      {slot.src ? (
        <span className="relative block">
          <span aria-hidden className="block" style={mask} />
          {slot.labels?.map((l) => (
            <span
              key={l.text}
              className="hand absolute whitespace-nowrap text-[clamp(15px,3.6vw,22px)] leading-none"
              style={{
                color,
                left: `${l.x}%`,
                top: `${l.y}%`,
                transform: `translate(${l.align === "start" ? "0" : l.align === "end" ? "-100%" : "-50%"}, -50%)`,
              }}
            >
              {l.text}
            </span>
          ))}
        </span>
      ) : (
        <span
          className="flex items-center justify-center rounded-md border border-dashed p-2 text-center"
          style={{ aspectRatio: `${w} / ${h}`, borderColor: color, color }}
        >
          <span className="mono text-[9.5px] leading-snug tracking-widest">✎ {slot.id}</span>
        </span>
      )}
      {slot.words && (
        <figcaption className="hand mt-1 text-[22px] leading-tight" style={{ color }}>
          {slot.words}
        </figcaption>
      )}
    </figure>
  );
}
