"use client";

import { useState, useMemo } from "react";
import { PeakCard } from "@/components/peaks/peak-card";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";
import { cn } from "@/lib/utils";
import type { Region } from "@/types";
import { Search } from "lucide-react";

type FilterState = "all" | "completed" | "remaining";

const REGIONS: Region[] = [
  "Northeast", "Southeast", "Midwest", "Southwest", "West", "Northwest", "Alaska", "Hawaii",
];

export default function PeaksPage() {
  const allPeaks = getAllPeaksWithClimbs();
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
        // Completed first
        if (a.climb?.completed && !b.climb?.completed) return -1;
        if (!a.climb?.completed && b.climb?.completed) return 1;
        return a.state.localeCompare(b.state);
      });
  }, [allPeaks, filter, regionFilter, search]);

  const completedCount = allPeaks.filter((p) => p.climb?.completed).length;

  return (
    <div className="pt-14 min-h-screen">
      {/* Page header */}
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-10">
          <span className="text-label block mb-3">All Peaks</span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-text-primary tracking-tight">
                50 State Highpoints
              </h1>
              <p className="text-text-secondary mt-2">
                <span className="text-text-primary font-mono">{completedCount}</span>
                {" "}summited ·{" "}
                <span className="text-text-muted font-mono">{50 - completedCount}</span>
                {" "}remaining
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search peaks or states…"
                className="pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-border-light focus:ring-1 focus:ring-summit/20 w-64 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-base sticky top-14 z-30">
        <div className="container-wide">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            {/* Status filters */}
            {(["all", "completed", "remaining"] as FilterState[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono capitalize whitespace-nowrap transition-colors duration-150 flex-shrink-0",
                  filter === f
                    ? "bg-summit/20 text-summit border border-summit/40"
                    : "text-text-muted border border-transparent hover:border-border hover:text-text-secondary"
                )}
              >
                {f}
              </button>
            ))}

            <div className="w-px h-4 bg-border mx-1 flex-shrink-0" />

            {/* Region filters */}
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(regionFilter === r ? "all" : r)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors duration-150 flex-shrink-0",
                  regionFilter === r
                    ? "bg-white/10 text-text-primary border border-border-light"
                    : "text-text-muted border border-transparent hover:border-border hover:text-text-secondary"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Peaks grid */}
      <div className="container-wide py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">No peaks match your filters.</p>
            <button
              onClick={() => {
                setFilter("all");
                setRegionFilter("all");
                setSearch("");
              }}
              className="mt-4 text-sm text-summit hover:text-summit-light transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-mono text-text-muted mb-6">
              {filtered.length} peaks
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((peak) => (
                <PeakCard key={peak.id} peak={peak} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
