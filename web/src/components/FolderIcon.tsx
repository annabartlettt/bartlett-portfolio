/** A folder, drawn the way an operating system draws one. */
export default function FolderIcon({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden focusable="false">
      {/* the tab, sitting behind the cover */}
      <path
        d="M6 30 Q6 16 20 16 H46 Q52 16 55 21 L60 30 Z"
        fill={color}
        opacity="0.82"
      />
      {/* the cover */}
      <path
        d="M6 30 H108 Q114 30 114 38 V80 Q114 88 106 88 H14 Q6 88 6 80 Z"
        fill={color}
      />
    </svg>
  );
}
