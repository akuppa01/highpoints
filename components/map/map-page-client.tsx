"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Mountain } from "lucide-react";
import { StartJournalCta } from "@/components/ui/start-journal-cta";
import { createClient } from "@/lib/supabase/client";
import { formatElevation } from "@/lib/utils";
import type { PeakWithClimb } from "@/types";

const USMap = dynamic(() => import("@/components/map/us-map").then((m) => m.USMap), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[2/1] animate-pulse rounded-2xl bg-surface border border-border flex items-center justify-center">
      <Mountain className="w-8 h-8 text-text-muted/30" />
    </div>
  ),
});

export function MapPageClient({
  peaks,
  hasUserData = false,
}: {
  peaks: PeakWithClimb[];
  hasUserData?: boolean;
}) {
  const router = useRouter();

  // When the user is signed in, subscribe to realtime so the map updates live
  useEffect(() => {
    if (!hasUserData) return;
    const supabase = createClient();
    const channel = supabase
      .channel("map-page-peak-records-refresh")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "peak_records" },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [hasUserData, router]);

  const highestPeaks = useMemo(
    () => [...peaks].sort((a, b) => b.elevationFt - a.elevationFt).slice(0, 8),
    [peaks]
  );
  const accessiblePeaks = useMemo(
    () => peaks.filter((p) => p.difficulty === "easy").slice(0, 6),
    [peaks]
  );

  return (
    <div className="min-h-screen pt-14">

      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-10 md:py-14">
          <span className="text-label mb-3 block">Peak Explorer</span>
          <h1 className="font-display text-text-primary leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            The Highpoints Map
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-text-muted leading-relaxed">
            {hasUserData
              ? "Your climb data is reflected here — completed summits, plans, and everything in between."
              : "Hover any state for the summit name and elevation, then open the canonical peak page. The complete geographic explorer for all 50 US state highpoints."}
          </p>
        </div>
      </div>

      <div className="container-wide py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-surface p-5 md:p-8">
              <USMap
                peaks={peaks}
                interactive
                variant={hasUserData ? "progress" : "catalog"}
                showLegend
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* At a glance */}
            <div className="card-base p-5 space-y-4">
              <span className="text-label block">At a glance</span>
              <div className="space-y-2.5">
                {[
                  { label: "Canonical peaks", value: "50" },
                  { label: "Regions", value: "8" },
                  { label: "Highest summit", value: "Denali, AK" },
                  { label: "Lowest summit", value: "Britton Hill, FL" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-text-muted">{s.label}</span>
                    <span className="text-xs font-mono text-text-secondary">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highest peaks */}
            <div className="card-base p-5 space-y-3">
              <span className="text-label block">Highest peaks</span>
              <div className="space-y-0.5">
                {highestPeaks.map((peak, i) => (
                  <Link
                    key={peak.id}
                    href={`/peaks/${peak.slug}`}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-text-muted w-5 text-right flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary group-hover:text-text-primary transition-colors truncate">{peak.name}</p>
                      <p className="text-[10px] font-mono text-text-muted">{peak.stateCode}</p>
                    </div>
                    <span className="text-[10px] font-mono text-summit-amber flex-shrink-0">{formatElevation(peak.elevationFt)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Easy starts */}
            <div className="card-base p-5 space-y-3">
              <span className="text-label block">Easy starting points</span>
              <div className="space-y-0.5">
                {accessiblePeaks.map((peak) => (
                  <Link
                    key={peak.id}
                    href={`/peaks/${peak.slug}`}
                    className="group flex items-center justify-between rounded-xl px-2 py-2 hover:bg-white/5 transition-colors"
                  >
                    <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors truncate">
                      {peak.name}, {peak.stateCode}
                    </p>
                    <span className="ml-2 flex-shrink-0 text-[10px] font-mono text-summit-light">easy</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!hasUserData && (
        <div className="container-wide pb-14">
          <StartJournalCta
            title="Want this map to show your own progress?"
            body="Sign in to track completed summits, attempts, and future goals. Your summited states light up in green."
          />
        </div>
      )}
    </div>
  );
}
