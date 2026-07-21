"use client";

import { useState } from "react";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

export default function Drawer({
  label,
  content,
  accent,
}: {
  label?: string;
  content?: unknown[];
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  const color = accent ?? "#363f9e";

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="mono rounded-t-xl rounded-b border px-5 py-3 text-[12px] font-bold tracking-widest transition"
        style={{ borderColor: color, color }}
      >
        {open ? "－ " : "＋ "}
        {label ?? "OPEN DRAWER"}
      </button>
      {open && content && (
        <div
          className="rounded-b-xl rounded-tr-xl border p-6 text-sm leading-relaxed"
          style={{ borderColor: color, background: "var(--paper)" }}
        >
          <PortableText value={content as PortableTextBlock[]} />
        </div>
      )}
    </div>
  );
}
