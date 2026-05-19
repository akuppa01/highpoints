"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";
import { formatElevation } from "@/lib/utils";

const USMap = dynamic(
  () => import("@/components/map/us-map").then((m) => ({ default: m.USMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[2/1] bg-surface animate-pulse rounded-xl" />
    ),
  }
);

export default function MapPage() {
  const peaks = getAllPeaksWithClimbs();
  const filteredPeaks = peaks;
  const highestPeaks = useMemo(
    () => [...filteredPeaks].sort((a, b) => b.elevationFt - a.elevationFt).slice(0, 5),
    [filteredPeaks]
  );
  const accessiblePeaks = useMemo(
    () => filteredPeaks.filter((peak) => peak.difficulty === "easy").slice(0, 5),
    [filteredPeaks]
  );

  return (
    <div className="pt-14 min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-8">
          <span className="text-label block mb-2">Peak Explorer</span>
          <h1 className="font-display text-4xl md:text-5xl text-text-primary tracking-tight">
            The Summit Map
          </h1>
          <p className="text-text-muted mt-2 text-sm max-w-2xl">
            Hover any state for the summit name and elevation, then open the canonical peak page.
            This is the public explorer for the 50 state highpoints.
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
                  <div className="w-3 h-3 rounded-sm bg-[#22312b] border border-summit-light/50" />
                  <span className="text-xs font-mono text-text-secondary">
                    Canonical peak page
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#1a1a1a] border border-border-light" />
                  <span className="text-xs font-mono text-text-secondary">
                    Outside focus
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-8">
                <USMap peaks={filteredPeaks} interactive variant="catalog" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card-base p-5 space-y-4">
              <span className="text-label block">At a glance</span>
              <div className="space-y-2">
                {[
                  {
                    label: "Canonical peaks",
                    value: "50",
                  },
                  {
                    label: "Regions represented",
                    value: "8",
                  },
                  {
                    label: "Highest summit",
                    value: "Denali",
                  },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{s.label}</span>
                    <span className="text-xs font-mono text-text-secondary">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base p-5 space-y-3">
              <span className="text-label block">Highest peaks</span>
              <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                {highestPeaks.map((peak) => (
                    <Link
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
                    </Link>
                  ))}
              </div>
            </div>

            <div className="card-base p-5 space-y-3">
              <span className="text-label block">Accessible starting points</span>
              <div className="space-y-1">
                {accessiblePeaks.map((peak) => (
                    <Link
                      key={peak.id}
                      href={`/peaks/${peak.slug}`}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors truncate">
                        {peak.name}, {peak.stateCode}
                      </p>
                      <span className="text-[10px] font-mono text-summit-amber flex-shrink-0 ml-2">
                        easy
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
