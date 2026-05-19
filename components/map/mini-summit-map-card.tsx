import { Mountain } from "lucide-react";
import { USMap } from "@/components/map/us-map";
import { ALL_PEAKS } from "@/lib/data/peaks-data";
import type { PeakWithClimb, PublishedPeakRecord, PeakRecord, RecordStatus } from "@/types";

type RecordLike = Pick<PeakRecord, "canonicalPeakId" | "status"> | Pick<PublishedPeakRecord, "peak" | "status">;

function resolveCanonicalPeakId(record: RecordLike) {
  if ("canonicalPeakId" in record) {
    return record.canonicalPeakId;
  }

  const publishedRecord = record as Pick<PublishedPeakRecord, "peak">;
  return publishedRecord.peak?.id ?? null;
}

function isHighlightedStatus(status: RecordStatus) {
  return status === "completed" || status === "revisit";
}

function buildProgressPeaks(records: RecordLike[]): PeakWithClimb[] {
  const completedIds = new Set(
    records
      .filter((record) => isHighlightedStatus(record.status))
      .map(resolveCanonicalPeakId)
      .filter((value): value is string => Boolean(value))
  );

  return ALL_PEAKS.map((peak) => ({
    ...peak,
    climb: {
      id: `progress-${peak.id}`,
      peakId: peak.id,
      completed: completedIds.has(peak.id),
    },
  }));
}

export function MiniSummitMapCard({
  records,
  title = "Summit map",
  description = "Your canonical highpoint progress at a glance.",
}: {
  records: RecordLike[];
  title?: string;
  description?: string;
}) {
  const peaks = buildProgressPeaks(records);

  return (
    <section className="card-base p-5 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mountain className="w-4 h-4 text-summit" />
        <span className="text-label">{title}</span>
      </div>
      <p className="text-sm text-text-muted mb-4">{description}</p>
      <div className="rounded-2xl border border-border bg-base/70 p-3">
        <USMap peaks={peaks} interactive={false} variant="progress" />
      </div>
    </section>
  );
}
