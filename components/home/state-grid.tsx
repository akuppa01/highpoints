import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";

export function StateGrid({
  showCompletion = false,
}: {
  showCompletion?: boolean;
}) {
  const peaks = getAllPeaksWithClimbs();
  const sortedPeaks = [...peaks].sort((a, b) => a.state.localeCompare(b.state));

  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-label block mb-2">All 50 States</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-tight">
              The complete canonical list.
            </h2>
            <p className="mt-3 max-w-2xl text-text-secondary">
              State by state, this is the classic American highpointing circuit.
              Browse it like a reference list or use it as the backbone of a
              bigger climbing journal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {sortedPeaks.map((peak) => {
            const completed = peak.climb?.completed ?? false;

            return (
              <Link
                key={peak.id}
                href={`/peaks/${peak.slug}`}
                className={cn(
                  "group flex flex-col items-center gap-1.5 rounded-lg border px-3 py-2.5 text-center transition-all duration-200",
                  showCompletion && completed
                    ? "border-summit/40 bg-summit/10 hover:border-summit/60 hover:bg-summit/15"
                    : "border-border bg-surface hover:border-border-light hover:bg-card"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-mono font-medium",
                    showCompletion && completed ? "text-summit" : "text-text-muted"
                  )}
                >
                  {peak.stateCode}
                </span>

                {showCompletion && completed && (
                  <span
                    className="h-3 w-3 rounded-full border border-summit/40 bg-summit/15"
                    aria-label={`${peak.name} completed`}
                  />
                )}

                <span className="text-sm text-text-primary leading-tight">
                  {peak.state}
                </span>
                <span className="text-[11px] font-mono text-text-muted leading-none">
                  {peak.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
