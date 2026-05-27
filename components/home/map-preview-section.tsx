"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Mountain } from "lucide-react";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";

const USMap = dynamic(
  () => import("@/components/map/us-map").then((m) => ({ default: m.USMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[2/1] bg-surface animate-pulse rounded-2xl flex items-center justify-center">
        <Mountain className="w-8 h-8 text-text-muted/25" />
      </div>
    ),
  }
);

export function MapPreviewSection() {
  const peaks = getAllPeaksWithClimbs();

  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-label block mb-3">Map Explorer</span>
            <h2 className="font-display text-text-primary tracking-tight leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
              Browse every state highpoint in one glance.
            </h2>
            <p className="mt-3 max-w-xl text-text-muted leading-relaxed text-sm md:text-base">
              Hover any state for the summit name and elevation. Click to explore the full peak page.
            </p>
          </div>
          <Link
            href="/map"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors flex-shrink-0"
          >
            Full map
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-4 md:p-6">
          <USMap peaks={peaks} interactive={true} variant="catalog" compact />
        </div>

        {/* Expanded key */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-[#1a2e22] border border-[#3d6b4f] flex-shrink-0" />
            <span className="text-[11px] font-mono text-text-muted">State highpoint page live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-[#111111] border border-[#1e1e1e] flex-shrink-0" />
            <span className="text-[11px] font-mono text-text-muted">No data yet</span>
          </div>
          <span className="text-[11px] font-mono text-text-muted opacity-40">·</span>
          <span className="text-[11px] font-mono text-text-muted opacity-50">50 state highpoints total</span>
          <span className="text-[11px] font-mono text-text-muted opacity-40">·</span>
          <span className="hidden sm:inline text-[11px] font-mono text-text-muted opacity-50">Hover a state for the summit name &amp; elevation · Click to open the peak page</span>
        </div>

        <div className="mt-5 sm:hidden">
          <Link href="/map" className="btn-secondary w-full justify-center">
            Open full map
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
