"use client";

import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import { COMPLETED_PEAKS, TOTAL_PEAKS } from "@/lib/data/peaks-data";

export function Hero() {
  const pct = Math.round((COMPLETED_PEAKS / TOTAL_PEAKS) * 100);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14">
      {/* Background layers */}
      <div className="absolute inset-0 bg-base" />

      {/* Radial gradient — summit glow from center */}
      <div className="absolute inset-0 bg-gradient-radial from-summit/8 via-transparent to-transparent" />

      {/* Subtle horizontal line grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ece8df 0px, #ece8df 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Large decorative number in background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[22vw] font-display font-normal leading-none text-white/[0.018] select-none pointer-events-none hidden lg:block pr-16">
        {COMPLETED_PEAKS}
      </div>

      <div className="container-wide relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="mb-8 animate-fade-in">
            <span className="text-label">US State Highpoints</span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display text-[clamp(52px,8vw,112px)] leading-[0.92] tracking-tight text-text-primary mb-8 animate-slide-up"
            style={{ animationDelay: "80ms" }}
          >
            Track the roof
            <br />
            <span className="text-gradient">of every state.</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-12 animate-slide-up"
            style={{ animationDelay: "160ms" }}
          >
            50 states. 50 summits. One obsession. A personal record of every
            state highpoint — the peaks, the routes, the stories.
          </p>

          {/* Progress block */}
          <div
            className="mb-12 animate-slide-up"
            style={{ animationDelay: "240ms" }}
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-6xl md:text-7xl font-light text-text-primary tabular-nums">
                {COMPLETED_PEAKS}
              </span>
              <span className="font-mono text-2xl text-text-muted">
                / {TOTAL_PEAKS}
              </span>
              <span className="text-text-muted text-lg ml-1">states</span>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-0.5 bg-border-light rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-summit rounded-full transition-all duration-1000 ease-out-expo"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-sm text-text-muted font-mono">{pct}% complete</p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3 animate-slide-up"
            style={{ animationDelay: "320ms" }}
          >
            <Link href="/peaks" className="btn-primary">
              Explore Peaks
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/map" className="btn-secondary">
              <Map className="w-4 h-4" />
              View Map
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
        <div className="w-px h-8 bg-text-muted" />
      </div>
    </section>
  );
}
