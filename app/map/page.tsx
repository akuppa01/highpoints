"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { getAllPeaksWithClimbs, COMPLETED_PEAKS, TOTAL_PEAKS } from "@/lib/data/peaks-data";
import { computeProgress, formatElevation, formatDistance } from "@/lib/utils";
import type { Region } from "@/types";

const USMap = dynamic(
  () => import("@/components/map/us-map").then((m) => ({ default: m.USMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[2/1] bg-surface animate-pulse rounded-xl" />
    ),
  }
);

const REGIONS: (Region | "all")[] = [
  "all", "Northeast", "Southeast", "Midwest", "Southwest", "West", "Northwest", "Alaska", "Hawaii",
];

export default function MapPage() {
  const peaks = getAllPeaksWithClimbs();
  const stats = computeProgress(peaks);
  const [regionFilter] = useState<Region | "all">("all");

  const filteredPeaks = regionFilter === "all"
    ? peaks
    : peaks.filter((p) => p.region === regionFilter);

  const completed = peaks.filter((p) => p.climb?.completed);
  const pct = Math.round((COMPLETED_PEAKS / TOTAL_PEAKS) * 100);

  return (
    <div className="pt-14 min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-8">
          <span className="text-label block mb-2">Progress Map</span>
          <h1 className="font-display text-4xl md:text-5xl text-text-primary tracking-tight">
            The Summit Map
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Click any state to view its highpoint.
          </p>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl border border-border bg-surface overflow-hidden">
              {/* Legend */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-base/90 backdrop-blur-sm border border-border rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-summit border border-summit-light/50" />
                  <span className="text-xs font-mono text-text-secondary">
                    Summited ({COMPLETED_PEAKS})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#1a1a1a] border border-border-light" />
                  <span className="text-xs font-mono text-text-secondary">
                    Remaining ({TOTAL_PEAKS - COMPLETED_PEAKS})
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-8">
                <USMap peaks={filteredPeaks} interactive />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Progress */}
            <div className="card-base p-5 space-y-4">
              <span className="text-label block">Progress</span>

              {/* Big number */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl text-text-primary">{COMPLETED_PEAKS}</span>
                  <span className="font-mono text-xl text-text-muted">/ {TOTAL_PEAKS}</span>
                </div>
                <div className="mt-2 w-full h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-summit rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs font-mono text-text-muted mt-1.5">{pct}% complete</p>
              </div>

              {/* Stats */}
              <div className="space-y-2 pt-2 border-t border-border">
                {[
                  {
                    label: "Elevation Gained",
                    value: formatElevation(stats.totalElevationGainFt),
                  },
                  {
                    label: "Distance Hiked",
                    value: formatDistance(stats.totalDistanceMiles),
                  },
                  {
                    label: "Hours on Trail",
                    value: `${stats.totalHours}h`,
                  },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{s.label}</span>
                    <span className="text-xs font-mono text-text-secondary">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed peaks list */}
            <div className="card-base p-5 space-y-3">
              <span className="text-label block">Summited</span>
              <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                {completed
                  .sort((a, b) =>
                    (b.climb?.completedDate ?? "").localeCompare(
                      a.climb?.completedDate ?? ""
                    )
                  )
                  .map((peak) => (
                    <a
                      key={peak.id}
                      href={`/peaks/${peak.slug}`}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors truncate">
                          {peak.name}
                        </p>
                        <p className="text-[10px] text-text-muted font-mono">
                          {peak.stateCode} · {formatElevation(peak.elevationFt)}
                        </p>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-summit flex-shrink-0 ml-2" />
                    </a>
                  ))}
              </div>
            </div>

            {/* Highest unclimbed */}
            <div className="card-base p-5 space-y-3">
              <span className="text-label block">Next Targets</span>
              <div className="space-y-1">
                {peaks
                  .filter((p) => !p.climb?.completed)
                  .sort((a, b) => b.elevationFt - a.elevationFt)
                  .slice(0, 5)
                  .map((peak) => (
                    <a
                      key={peak.id}
                      href={`/peaks/${peak.slug}`}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors truncate">
                        {peak.name}, {peak.stateCode}
                      </p>
                      <span className="text-[10px] font-mono text-summit-amber flex-shrink-0 ml-2">
                        {formatElevation(peak.elevationFt)}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
