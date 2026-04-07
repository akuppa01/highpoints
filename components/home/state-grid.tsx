import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";

export function StateGrid() {
  const peaks = getAllPeaksWithClimbs();
  const sortedPeaks = [...peaks].sort((a, b) => a.state.localeCompare(b.state));

  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-label block mb-2">All 50 States</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-tight">
              The complete list.
            </h2>
          </div>
        </div>

        {/* Compact state grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {sortedPeaks.map((peak) => {
            const completed = peak.climb?.completed ?? false;
            return (
              <Link
                key={peak.id}
                href={`/peaks/${peak.slug}`}
                className={cn(
                  "group flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg border text-center",
                  "transition-all duration-200",
                  completed
                    ? "border-summit/40 bg-summit/10 hover:bg-summit/15 hover:border-summit/60"
                    : "border-border bg-surface hover:border-border-light hover:bg-card"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-mono font-medium",
                    completed ? "text-summit" : "text-text-muted"
                  )}
                >
                  {peak.stateCode}
                </span>
                {completed && (
                  <CheckCircle2 className="w-3 h-3 text-summit flex-shrink-0" />
                )}
                <span className="text-[10px] text-text-muted leading-tight text-center hidden sm:block">
                  {peak.name.length > 12 ? peak.name.slice(0, 12) + "…" : peak.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
