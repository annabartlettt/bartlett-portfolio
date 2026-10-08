/**
 * The Esplanade service blueprint, built as markup from Anna's simplified
 * blueprint: ten moments of a visitor's journey across four lanes, with the
 * line of interaction, the line of visibility, and the line of internal
 * interaction between them. Scrolls sideways on a phone rather than shrinking
 * to unreadable.
 */
const STAGES = [
  "Enter park",
  "Confused where to go",
  "Look for map",
  "Find map",
  "Find where to go",
  "Touch dial / blocks",
  "Discover new places",
  "Wants more information",
  "Gets more information",
  "Leave map",
];

type Lane = { name: string; bg: string; fg: string; cells: (string[] | null)[]; line?: string };

const LANES: Lane[] = [
  {
    name: "Front stage",
    bg: "#E2D3E3",
    fg: "#3E2A40",
    line: "Line of interaction",
    cells: [
      null,
      ["Can’t get their bearings"],
      null,
      ["Sees the map"],
      ["Wayfinding blocks"],
      ["Interacts with the map"],
      ["Interacts with the blocks"],
      ["Finds info, needs more"],
      ["Scans QR code"],
      null,
    ],
  },
  {
    name: "Technology",
    bg: "#F2E2A6",
    fg: "#4A3B05",
    line: "Line of visibility",
    cells: [
      null,
      null,
      null,
      ["Weather-safe and sturdy"],
      ["3D textures", "Braille", "Listen to audio"],
      null,
      ["Blocks rotate on touch"],
      null,
      null,
      null,
    ],
  },
  {
    name: "Backstage action",
    bg: "#CFDCF0",
    fg: "#1F3354",
    line: "Line of internal interaction",
    cells: [
      null,
      null,
      null,
      null,
      ["Plays recorded audio"],
      null,
      ["Motors and shafts"],
      null,
      ["AI assistant"],
      null,
    ],
  },
  {
    name: "Support process",
    bg: "#CFE6C9",
    fg: "#1E4220",
    cells: [
      null,
      null,
      null,
      null,
      ["Textures kept unbroken"],
      null,
      ["Code for the blocks"],
      null,
      ["Code for the chatbot", "Logs common questions"],
      null,
    ],
  },
];

export default function EspBlueprint() {
  return (
    <figure className="m-0 mt-8" lang="en">
      <div className="overflow-x-auto rounded-xl border border-[var(--kraft)] bg-white">
        <div className="min-w-[800px] p-4">
          {/* the journey */}
          <div className="grid grid-cols-[92px_repeat(10,minmax(0,1fr))] gap-2">
            <p className="mono self-end text-[9.5px] tracking-widest uppercase opacity-60">Visitor journey</p>
            {STAGES.map((s, i) => (
              <div key={s} className="relative">
                <p className="mono text-[9px] tracking-widest uppercase" style={{ color: "#0C3B1A" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-0.5 text-[10.5px] font-semibold leading-tight">{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t-2" style={{ borderColor: "#0C3B1A" }} aria-hidden />

          {LANES.map((lane) => (
            <div key={lane.name}>
              <div className="grid grid-cols-[92px_repeat(10,minmax(0,1fr))] gap-2 py-3">
                <div className="flex items-center">
                  <span
                    className="rounded-md px-2 py-1.5 text-[10.5px] font-semibold leading-tight"
                    style={{ background: lane.bg, color: lane.fg }}
                  >
                    {lane.name}
                  </span>
                </div>
                {lane.cells.map((c, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    {c?.map((t) => (
                      <span
                        key={t}
                        className="rounded-md px-2 py-1.5 text-[10.5px] leading-snug"
                        style={{ background: lane.bg, color: lane.fg }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              {lane.line && (
                <div className="flex items-center gap-3" aria-hidden>
                  <span className="flex-1 border-t border-dashed border-[var(--kraft)]" />
                  <span className="mono text-[9px] tracking-widest uppercase opacity-55">{lane.line}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mono mt-3 text-[11px] tracking-wide opacity-60">
        Simplified service blueprint · from entering the park to leaving the map · scroll sideways on a phone
      </figcaption>
    </figure>
  );
}
