"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { PeakWithClimb } from "@/types";
import { formatElevation } from "@/lib/utils";

interface TooltipState {
  peak: PeakWithClimb;
}

interface USMapProps {
  peaks: PeakWithClimb[];
  interactive?: boolean;
  variant?: "progress" | "catalog";
}

type Tile = {
  code: string;
  row: number;
  col: number;
};

const TILE_LAYOUT: Tile[] = [
  { code: "AK", row: 6, col: 0 },
  { code: "HI", row: 7, col: 1 },
  { code: "WA", row: 0, col: 1 },
  { code: "OR", row: 1, col: 1 },
  { code: "CA", row: 2, col: 1 },
  { code: "ID", row: 1, col: 2 },
  { code: "NV", row: 2, col: 2 },
  { code: "UT", row: 2, col: 3 },
  { code: "AZ", row: 3, col: 2 },
  { code: "MT", row: 0, col: 3 },
  { code: "WY", row: 1, col: 3 },
  { code: "CO", row: 2, col: 4 },
  { code: "NM", row: 3, col: 4 },
  { code: "ND", row: 0, col: 5 },
  { code: "SD", row: 1, col: 5 },
  { code: "NE", row: 2, col: 5 },
  { code: "KS", row: 3, col: 5 },
  { code: "OK", row: 4, col: 5 },
  { code: "TX", row: 5, col: 5 },
  { code: "MN", row: 0, col: 6 },
  { code: "IA", row: 1, col: 6 },
  { code: "MO", row: 2, col: 6 },
  { code: "AR", row: 3, col: 6 },
  { code: "LA", row: 4, col: 6 },
  { code: "WI", row: 0, col: 7 },
  { code: "IL", row: 1, col: 7 },
  { code: "MS", row: 3, col: 7 },
  { code: "MI", row: 0, col: 8 },
  { code: "IN", row: 1, col: 8 },
  { code: "KY", row: 2, col: 8 },
  { code: "TN", row: 3, col: 8 },
  { code: "AL", row: 4, col: 8 },
  { code: "GA", row: 4, col: 9 },
  { code: "FL", row: 5, col: 10 },
  { code: "OH", row: 1, col: 9 },
  { code: "WV", row: 2, col: 9 },
  { code: "VA", row: 2, col: 10 },
  { code: "NC", row: 3, col: 10 },
  { code: "SC", row: 4, col: 10 },
  { code: "PA", row: 1, col: 10 },
  { code: "NY", row: 0, col: 10 },
  { code: "VT", row: 0, col: 11 },
  { code: "NH", row: 0, col: 12 },
  { code: "ME", row: 0, col: 13 },
  { code: "MD", row: 2, col: 11 },
  { code: "DE", row: 2, col: 12 },
  { code: "NJ", row: 1, col: 11 },
  { code: "CT", row: 1, col: 12 },
  { code: "RI", row: 1, col: 13 },
  { code: "MA", row: 0, col: 12 },
];

function getTileClass({
  hasPeak,
  completed,
  variant,
  interactive,
}: {
  hasPeak: boolean;
  completed: boolean;
  variant: "progress" | "catalog";
  interactive: boolean;
}) {
  if (!hasPeak) {
    return "border-border/40 bg-[#121212] text-text-muted/40";
  }

  if (variant === "catalog") {
    return interactive
      ? "border-summit/25 bg-summit/10 text-text-primary hover:border-summit/45 hover:bg-summit/20"
      : "border-summit/25 bg-summit/10 text-text-primary";
  }

  if (completed) {
    return interactive
      ? "border-summit/45 bg-summit/25 text-white hover:border-summit-light hover:bg-summit/35"
      : "border-summit/45 bg-summit/25 text-white";
  }

  return interactive
    ? "border-border bg-[#151515] text-text-secondary hover:border-border-light hover:bg-[#1b1b1b]"
    : "border-border bg-[#151515] text-text-secondary";
}

export function USMap({
  peaks,
  interactive = true,
  variant = "progress",
}: USMapProps) {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const peakByCode = useMemo(
    () => Object.fromEntries(peaks.map((peak) => [peak.stateCode, peak])),
    [peaks]
  );

  return (
    <div className="space-y-4">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(14, minmax(0, 1fr))",
        }}
      >
        {TILE_LAYOUT.map((tile) => {
          const peak = peakByCode[tile.code];
          const completed = peak?.climb?.completed ?? false;
          const hasPeak = Boolean(peak);

          return (
            <button
              key={tile.code}
              type="button"
              disabled={!interactive || !peak}
              onClick={() => {
                if (interactive && peak) router.push(`/peaks/${peak.slug}`);
              }}
              onMouseEnter={() => peak && setTooltip({ peak })}
              onMouseLeave={() => setTooltip(null)}
              onFocus={() => peak && setTooltip({ peak })}
              onBlur={() => setTooltip(null)}
              className={`aspect-square min-h-8 rounded-lg border text-[10px] font-mono transition-colors disabled:cursor-default ${getTileClass({
                hasPeak,
                completed,
                variant,
                interactive,
              })}`}
              style={{
                gridColumn: tile.col + 1,
                gridRow: tile.row + 1,
              }}
              aria-label={peak ? `${peak.name}, ${peak.state}` : tile.code}
            >
              {tile.code}
            </button>
          );
        })}
      </div>

      {tooltip?.peak ? (
        <div className="rounded-2xl border border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            {variant === "progress" && tooltip.peak.climb?.completed ? (
              <span className="h-2 w-2 rounded-full bg-summit" />
            ) : null}
            <span className="text-xs font-mono text-text-muted">
              {tooltip.peak.stateCode}
            </span>
          </div>
          <p className="font-display text-lg text-text-primary leading-tight">
            {tooltip.peak.name}
          </p>
          <p className="text-xs font-mono text-text-secondary mt-1">
            {formatElevation(tooltip.peak.elevationFt)}
          </p>
          {variant === "progress" ? (
            <p className="text-xs mt-2 text-text-muted">
              {tooltip.peak.climb?.completed ? "Summited" : "Not yet climbed"}
            </p>
          ) : (
            <p className="text-xs mt-2 text-text-muted">Open peak page</p>
          )}
        </div>
      ) : (
        <p className="text-xs text-text-muted">
          Hover or tap a state tile to preview the peak.
        </p>
      )}
    </div>
  );
}
