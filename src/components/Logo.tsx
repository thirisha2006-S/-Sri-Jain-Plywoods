import { cn } from "@/lib/utils";

/** Original SJ monogram: walnut tile, gold tree-ring arcs, layered-ply base lines. */
export function LogoMark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const tile = tone === "dark" ? "var(--ivory)" : "var(--walnut)";
  const ink = tone === "dark" ? "var(--walnut)" : "var(--gold)";
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-12 w-12", className)}
      role="img"
      aria-label="Sri Jain Plywood monogram"
    >
      <rect x="1" y="1" width="62" height="62" rx="6" fill={tile} />
      <g fill="none" stroke={ink} strokeWidth="0.8" opacity="0.55">
        <path d="M63 14a22 22 0 0 0-22-13" />
        <path d="M63 22a30 30 0 0 0-30-21" />
        <path d="M63 30a38 38 0 0 0-38-29" />
      </g>
      <text
        x="31"
        y="42"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="30"
        fontWeight="600"
        fill={ink}
        letterSpacing="-1"
      >
        SJ
      </text>
      <g stroke={ink} strokeWidth="1">
        <line x1="14" y1="50" x2="50" y2="50" />
        <line x1="17" y1="53" x2="47" y2="53" opacity="0.7" />
        <line x1="20" y1="56" x2="44" y2="56" opacity="0.45" />
      </g>
    </svg>
  );
}

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark tone={tone} />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span
          className={cn(
            "font-display text-2xl md:text-[1.7rem] font-bold tracking-[0.12em]",
            tone === "dark" ? "text-ivory" : "text-walnut",
          )}
        >
          SRI JAIN
        </span>
        <span className="mt-1 text-[0.7rem] font-bold tracking-[0.5em] text-gold">PLYWOOD</span>
      </span>
    </span>
  );
}
