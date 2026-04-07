"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import type { PeakWithClimb } from "@/types";
import { formatElevation } from "@/lib/utils";

// US Atlas TopoJSON from CDN — states at medium resolution
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// FIPS state code → state abbreviation mapping
const FIPS_TO_CODE: Record<string, string> = {
  "01": "AL","02": "AK","04": "AZ","05": "AR","06": "CA",
  "08": "CO","09": "CT","10": "DE","12": "FL","13": "GA",
  "15": "HI","16": "ID","17": "IL","18": "IN","19": "IA",
  "20": "KS","21": "KY","22": "LA","23": "ME","24": "MD",
  "25": "MA","26": "MI","27": "MN","28": "MS","29": "MO",
  "30": "MT","31": "NE","32": "NV","33": "NH","34": "NJ",
  "35": "NM","36": "NY","37": "NC","38": "ND","39": "OH",
  "40": "OK","41": "OR","42": "PA","44": "RI","45": "SC",
  "46": "SD","47": "TN","48": "TX","49": "UT","50": "VT",
  "51": "VA","53": "WA","54": "WV","55": "WI","56": "WY",
};

interface TooltipState {
  peak: PeakWithClimb;
  x: number;
  y: number;
}

interface USMapProps {
  peaks: PeakWithClimb[];
  interactive?: boolean;
}

export function USMap({ peaks, interactive = true }: USMapProps) {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Build a map of stateCode → peak for quick lookup
  const peakByCode = Object.fromEntries(peaks.map((p) => [p.stateCode, p]));

  const handleStateClick = (stateCode: string) => {
    if (!interactive) return;
    const peak = peakByCode[stateCode];
    if (peak) {
      router.push(`/peaks/${peak.slug}`);
    }
  };

  const handleStateEnter = (
    stateCode: string,
    event: React.MouseEvent<SVGElement>
  ) => {
    const peak = peakByCode[stateCode];
    if (!peak) return;
    const rect = (event.target as SVGElement)
      .closest("svg")
      ?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      peak,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoAlbersUsa"
        className="w-full h-auto"
        style={{ background: "transparent" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const fips = geo.id as string;
              const stateCode = FIPS_TO_CODE[fips];
              const peak = peakByCode[stateCode];
              const completed = peak?.climb?.completed ?? false;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleStateClick(stateCode)}
                  onMouseEnter={(e) => handleStateEnter(stateCode, e)}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: {
                      fill: completed ? "#2d4a38" : "#1a1a1a",
                      stroke: "#0f0f0f",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: completed ? "#4a7a5c" : "#252525",
                      stroke: completed ? "#5f9970" : "#2d2d2d",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: interactive ? "pointer" : "default",
                    },
                    pressed: {
                      fill: completed ? "#3d6b4e" : "#2a2a2a",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 12,
            transform: "translateY(-100%)",
          }}
        >
          <div className="bg-surface border border-border rounded-lg px-3 py-2.5 shadow-xl min-w-[160px]">
            <div className="flex items-center gap-1.5 mb-1">
              {tooltip.peak.climb?.completed && (
                <div className="w-1.5 h-1.5 rounded-full bg-summit flex-shrink-0" />
              )}
              <span className="text-xs font-mono text-text-muted">
                {tooltip.peak.stateCode}
              </span>
            </div>
            <p className="text-sm font-display text-text-primary leading-tight">
              {tooltip.peak.name}
            </p>
            <p className="text-xs text-text-secondary font-mono mt-0.5">
              {formatElevation(tooltip.peak.elevationFt)}
            </p>
            {tooltip.peak.climb?.completed ? (
              <p className="text-xs text-summit mt-1">Summited</p>
            ) : (
              <p className="text-xs text-text-muted mt-1">Not yet climbed</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
