"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { StartJournalCta } from "@/components/ui/start-journal-cta";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";
import { formatElevation } from "@/lib/utils";

const USMap = dynamic(() => import("@/components/map/us-map").then((m) => m.USMap), {
  ssr: false,
  loading: () => <div className="aspect-[2/1] w-full animate-pulse rounded-xl bg-surface" />,
});

export function MapPageClient() {
  const peaks = getAllPeaksWithClimbs();
  const highestPeaks = useMemo(
    () => [...peaks].sort((a, b) => b.elevationFt - a.elevationFt).slice(0, 5),
    [peaks]
  );
  const accessiblePeaks = useMemo(
    () => peaks.filter((peak) => peak.difficulty === "easy").slice(0, 5),
    [peaks]
  );

  return (
    <div className="min-h-screen pt-14">
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-8">
          <span className="text-label mb-2 block">Peak Explorer</span>
          <h1 className="font-display text-4xl tracking-tight text-text-primary md:text-5xl">
            The Highpoints Map
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Hover any state for the summit name and elevation, then open the canonical peak page.
            This is the public explorer for the 50 state highpoints.
          </p>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="absolute right-4 top-4 z-10 hidden flex-col gap-2 rounded-xl border border-border bg-base/90 p-3 backdrop-blur-sm md:flex">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border border-summit-light/50 bg-[#22312b]" />
                  <span className="text-xs font-mono text-text-secondary">Canonical peak page</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border border-border-light bg-[#1a1a1a]" />
                  <span className="text-xs font-mono text-text-secondary">Outside focus</span>
                </div>
              </div>

              <div className="p-4 md:p-8">
                <USMap peaks={peaks} interactive variant="catalog" />
              </div>
              <div className="border-t border-border p-4 md:hidden">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm border border-summit-light/50 bg-[#22312b]" />
                    <span className="text-xs font-mono text-text-secondary">Canonical peak page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm border border-border-light bg-[#1a1a1a]" />
                    <span className="text-xs font-mono text-text-secondary">Outside focus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card-base space-y-4 p-5">
              <span className="text-label block">At a glance</span>
              <div className="space-y-2">
                {[
                  { label: "Canonical peaks", value: "50" },
                  { label: "Regions represented", value: "8" },
                  { label: "Highest summit", value: "Denali" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{s.label}</span>
                    <span className="text-xs font-mono text-text-secondary">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base space-y-3 p-5">
              <span className="text-label block">Highest peaks</span>
              <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
                {highestPeaks.map((peak) => (
                  <Link
                    key={peak.id}
                    href={`/peaks/${peak.slug}`}
                    className="group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                        {peak.name}
                      </p>
                      <p className="text-[10px] font-mono text-text-muted">
                        {peak.stateCode} · {formatElevation(peak.elevationFt)}
                      </p>
                    </div>
                    <div className="ml-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-summit" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="card-base space-y-3 p-5">
              <span className="text-label block">Accessible starting points</span>
              <div className="space-y-1">
                {accessiblePeaks.map((peak) => (
                  <Link
                    key={peak.id}
                    href={`/peaks/${peak.slug}`}
                    className="group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                  >
                    <p className="truncate text-xs text-text-muted transition-colors group-hover:text-text-secondary">
                      {peak.name}, {peak.stateCode}
                    </p>
                    <span className="ml-2 flex-shrink-0 text-[10px] font-mono text-summit-amber">easy</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide pb-12 md:pb-16">
        <StartJournalCta
          title="Want this map to become your own progress board?"
          body="Sign in to track completed summits, attempts, and future goals while keeping the public explorer intact."
        />
      </div>
    </div>
  );
}
