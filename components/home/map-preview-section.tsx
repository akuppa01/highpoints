"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { getAllPeaksWithClimbs, COMPLETED_PEAKS, TOTAL_PEAKS } from "@/lib/data/peaks-data";

// Dynamic import to avoid SSR issues with react-simple-maps
const USMap = dynamic(
  () => import("@/components/map/us-map").then((m) => ({ default: m.USMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[2/1] bg-surface animate-pulse rounded-xl" />
    ),
  }
);

export function MapPreviewSection() {
  const peaks = getAllPeaksWithClimbs();

  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-label block mb-2">Progress Map</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-tight">
              {COMPLETED_PEAKS} states down.{" "}
              <span className="text-text-muted">{TOTAL_PEAKS - COMPLETED_PEAKS} to go.</span>
            </h2>
          </div>
          <Link
            href="/map"
            className="hidden sm:flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Full map
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Map container */}
        <div className="relative rounded-2xl border border-border bg-surface overflow-hidden">
          {/* Legend */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-base/80 backdrop-blur-sm border border-border rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-summit border border-summit-light/50" />
              <span className="text-xs font-mono text-text-secondary">Summited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#1a1a1a] border border-border-light" />
              <span className="text-xs font-mono text-text-secondary">Remaining</span>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <USMap peaks={peaks} interactive={true} />
          </div>
        </div>

        {/* Mobile link */}
        <div className="mt-4 sm:hidden text-center">
          <Link href="/map" className="btn-secondary w-full justify-center">
            Open full map
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
