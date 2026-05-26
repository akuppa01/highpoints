"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { PeakWithClimb } from "@/types";
import { formatElevation } from "@/lib/utils";

// US Atlas TopoJSON — states only
const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// FIPS code → state abbreviation
const FIPS_TO_CODE: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "12": "FL", "13": "GA",
  "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA",
  "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD",
  "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO",
  "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ",
  "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
  "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC",
  "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT",
  "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY",
};

interface USMapProps {
  peaks: PeakWithClimb[];
  interactive?: boolean;
  variant?: "progress" | "catalog";
  compact?: boolean;
}

interface TooltipState {
  peak: PeakWithClimb;
  x: number;
  y: number;
}

export function USMap({
  peaks,
  interactive = true,
  variant = "progress",
  compact = false,
}: USMapProps) {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const peakByCode = useMemo(
    () => Object.fromEntries(peaks.map((p) => [p.stateCode, p])),
    [peaks]
  );

  function getFill(stateCode: string) {
    const peak = peakByCode[stateCode];
    if (!peak) return "#111111";

    if (variant === "catalog") return "#1a2e22";

    const completed = peak.climb?.completed ?? false;
    return completed ? "#2d5c3f" : "#1a1a1a";
  }

  function getStroke(stateCode: string) {
    const peak = peakByCode[stateCode];
    if (!peak) return "#1e1e1e";

    if (variant === "catalog") return "#3d6b4f";

    const completed = peak.climb?.completed ?? false;
    return completed ? "#4a7a5c" : "#2a2a2a";
  }

  return (
    <div className="relative w-full" style={{ userSelect: "none" }}>
      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: "100%", height: "auto" }}
        projectionConfig={{ scale: compact ? 680 : 860 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const fips = geo.id as string;
              const stateCode = FIPS_TO_CODE[fips];
              const peak = stateCode ? peakByCode[stateCode] : undefined;
              const hasPeak = Boolean(peak);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={stateCode ? getFill(stateCode) : "#111111"}
                  stroke={stateCode ? getStroke(stateCode) : "#1a1a1a"}
                  strokeWidth={0.5}
                  className="geo-map-state"
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: hasPeak ? (variant === "catalog" ? "#264535" : (peak?.climb?.completed ? "#3d7a54" : "#222222")) : "#131313" },
                    pressed: { outline: "none" },
                  }}
                  onClick={() => {
                    if (interactive && peak) router.push(`/peaks/${peak.slug}`);
                  }}
                  onMouseEnter={(evt) => {
                    if (peak) {
                      const rect = (evt.target as SVGElement).closest("svg")?.getBoundingClientRect();
                      setTooltip({
                        peak,
                        x: evt.clientX - (rect?.left ?? 0),
                        y: evt.clientY - (rect?.top ?? 0),
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  tabIndex={interactive && hasPeak ? 0 : -1}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && interactive && peak) {
                      router.push(`/peaks/${peak.slug}`);
                    }
                  }}
                  role={interactive && hasPeak ? "button" : undefined}
                  aria-label={peak ? `${peak.name}, ${peak.state} — ${formatElevation(peak.elevationFt)}` : stateCode}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Floating tooltip */}
      {tooltip?.peak && (
        <div
          className="pointer-events-none absolute z-20 min-w-[160px] rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-2xl backdrop-blur-md"
          style={{
            left: Math.min(tooltip.x + 12, 9999),
            top: Math.max(tooltip.y - 60, 4),
            transform: "translateX(min(0px, calc(100vw - 100% - 16px)))",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            {variant === "progress" && tooltip.peak.climb?.completed && (
              <span className="h-2 w-2 rounded-full bg-summit-light flex-shrink-0" />
            )}
            <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
              {tooltip.peak.stateCode}
            </span>
          </div>
          <p className="font-display text-base text-text-primary leading-tight">{tooltip.peak.name}</p>
          <p className="text-xs font-mono text-summit-amber mt-1">{formatElevation(tooltip.peak.elevationFt)}</p>
          {variant === "progress" ? (
            <p className="text-[11px] mt-1.5 text-text-muted">
              {tooltip.peak.climb?.completed ? "✓ Summited" : "Not yet climbed"}
            </p>
          ) : (
            <p className="text-[11px] mt-1.5 text-text-muted">Click to explore →</p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {variant === "progress" ? (
          <>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-[#2d5c3f] border border-[#4a7a5c]" />
              <span className="text-[11px] font-mono text-text-muted">Summited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-[#1a1a1a] border border-[#2a2a2a]" />
              <span className="text-[11px] font-mono text-text-muted">Not yet</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-[#1a2e22] border border-[#3d6b4f]" />
              <span className="text-[11px] font-mono text-text-muted">Peak page available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-[#111111] border border-[#1e1e1e]" />
              <span className="text-[11px] font-mono text-text-muted">No data</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
