"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";

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
            <span className="text-label block mb-2">Map Explorer</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-tight">
              Browse every state highpoint in one glance.
            </h2>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Hover for the summit name and elevation, then jump straight into the peak page.
              It works as a clean public explorer before anyone creates an account.
            </p>
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
              <div className="w-3 h-3 rounded-sm bg-[#22312b] border border-summit/50" />
              <span className="text-xs font-mono text-text-secondary">Peak page available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#1a1a1a] border border-border-light" />
              <span className="text-xs font-mono text-text-secondary">Outside focus</span>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <USMap peaks={peaks} interactive={true} variant="catalog" />
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
