"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SummitImage } from "@/components/media/summit-image";
import { StartJournalCta } from "@/components/ui/start-journal-cta";
import { cn, formatElevation } from "@/lib/utils";
import type { PeakWithClimb, Region } from "@/types";
import type { TrailQuote } from "@/lib/data/trail-quotes";

type FilterState = "all" | "completed" | "remaining";

const REGIONS: Region[] = [
  "Northeast",
  "Southeast",
  "Midwest",
  "Southwest",
  "West",
  "Northwest",
  "Alaska",
  "Hawaii",
];

export function PeaksPageClient({
  allPeaks,
  quote,
}: {
  allPeaks: PeakWithClimb[];
  quote: TrailQuote;
}) {
  const [filter, setFilter] = useState<FilterState>("all");
  const [regionFilter, setRegionFilter] = useState<Region | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return allPeaks
      .filter((p) => {
        if (filter === "completed") return p.climb?.completed;
        if (filter === "remaining") return !p.climb?.completed;
        return true;
      })
      .filter((p) => regionFilter === "all" || p.region === regionFilter)
      .filter((p) => {
        const q = search.toLowerCase();
        return (
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.stateCode.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (a.climb?.completed && !b.climb?.completed) return -1;
        if (!a.climb?.completed && b.climb?.completed) return 1;
        return a.state.localeCompare(b.state);
      });
  }, [allPeaks, filter, regionFilter, search]);

  return (
    <div className="pt-14 min-h-screen">
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-10">
          <span className="text-label block mb-3">Canonical Peaks</span>
          <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl tracking-tight text-text-primary md:text-5xl">
                50 State Highpoints
              </h1>
              <p className="mt-2 max-w-xl text-text-secondary">
                “{quote.text}”
                <span className="ml-2 text-text-muted">— {quote.author}</span>
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search peaks or states…"
                className="w-64 rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-text-primary placeholder-text-muted transition-all duration-200 focus:border-border-light focus:outline-none focus:ring-1 focus:ring-summit/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-14 z-30 border-b border-border bg-base">
        <div className="container-wide">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {(["all", "completed", "remaining"] as FilterState[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex min-w-[88px] flex-shrink-0 items-center justify-center rounded-lg px-3 py-1.5 text-center text-xs font-mono capitalize whitespace-nowrap transition-colors duration-150",
                  filter === f
                    ? "border border-summit/40 bg-summit/20 text-summit"
                    : "border border-transparent text-text-muted hover:border-border hover:text-text-secondary"
                )}
              >
                {f}
              </button>
            ))}

            <div className="mx-1 h-4 w-px flex-shrink-0 bg-border" />

            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(regionFilter === r ? "all" : r)}
                className={cn(
                  "inline-flex min-w-[92px] flex-shrink-0 items-center justify-center rounded-lg px-3 py-1.5 text-center text-xs font-mono whitespace-nowrap transition-colors duration-150",
                  regionFilter === r
                    ? "border border-border-light bg-white/10 text-text-primary"
                    : "border border-transparent text-text-muted hover:border-border hover:text-text-secondary"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-wide py-10">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-text-muted">No peaks match your filters.</p>
            <button
              onClick={() => {
                setFilter("all");
                setRegionFilter("all");
                setSearch("");
              }}
              className="mt-4 text-sm text-summit transition-colors hover:text-summit-light"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-xs font-mono text-text-muted">{filtered.length} peaks</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((peak) => (
                <Link
                  key={peak.id}
                  href={`/peaks/${peak.slug}`}
                  className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 hover:border-border-light"
                >
                  <div className="relative h-44 overflow-hidden bg-surface">
                    {peak.heroImageUrl ? (
                      <SummitImage
                        src={peak.heroImageUrl}
                        alt={peak.name}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2521] via-[#121716] to-[#0b0d0d]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-mono text-white/65">{peak.stateCode}</span>
                    </div>
                    <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/55 px-2 py-1 text-[10px] font-mono text-white/80 backdrop-blur-sm">
                      {peak.climb?.completed ? "Done" : peak.region}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold tracking-tight text-text-primary">
                          {peak.name}
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">{peak.state}</p>
                      </div>
                      <span className="shrink-0 text-xs font-mono text-summit-amber">
                        {formatElevation(peak.elevationFt)}
                      </span>
                    </div>

                    <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                      {peak.shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted">
                      <span>{peak.difficulty ?? "classic"}</span>
                      <span>{peak.region}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="container-wide pb-12 md:pb-16">
        <StartJournalCta
          title="Seen enough peaks to start your own list?"
          body="Save completed climbs, keep a planning queue, and turn the best days into public story pages."
        />
      </div>
    </div>
  );
}
