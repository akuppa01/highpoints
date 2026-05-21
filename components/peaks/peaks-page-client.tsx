"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PeakCard } from "@/components/peaks/peak-card";
import { StartJournalCta } from "@/components/ui/start-journal-cta";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";
import { getTrailQuote } from "@/lib/data/trail-quotes";
import { cn } from "@/lib/utils";
import type { Region } from "@/types";

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

export function PeaksPageClient() {
  const allPeaks = getAllPeaksWithClimbs();
  const [filter, setFilter] = useState<FilterState>("all");
  const [regionFilter, setRegionFilter] = useState<Region | "all">("all");
  const [search, setSearch] = useState("");
  const quote = useMemo(() => getTrailQuote("peaks"), []);

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
                <PeakCard key={peak.id} peak={peak} />
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
