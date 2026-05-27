"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Mountain } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ALL_PEAKS } from "@/lib/data/peaks-data";
import type { PeakWithClimb, PeakRecord, PublishedPeakRecord, RecordStatus } from "@/types";

const USMap = dynamic(
  () => import("@/components/map/us-map").then((m) => m.USMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[2/1] animate-pulse rounded-2xl bg-base/70 border border-border" />
    ),
  }
);

type RecordLike =
  | Pick<PeakRecord, "canonicalPeakId" | "status">
  | Pick<PublishedPeakRecord, "peak" | "status">;

interface RecordSnap {
  canonical_peak_id: string | null;
  status: RecordStatus;
}

function resolveCanonicalPeakId(record: RecordLike): string | null {
  if ("canonicalPeakId" in record) return record.canonicalPeakId ?? null;
  const pub = record as Pick<PublishedPeakRecord, "peak">;
  return pub.peak?.id ?? null;
}

function buildProgressPeaks(records: RecordLike[]): PeakWithClimb[] {
  const byPeakId = new Map<string, RecordStatus>();
  for (const r of records) {
    const id = resolveCanonicalPeakId(r);
    if (id) byPeakId.set(id, r.status);
  }

  return ALL_PEAKS.map((peak) => {
    const status = byPeakId.get(peak.id);
    return {
      ...peak,
      climb: {
        id: `progress-${peak.id}`,
        peakId: peak.id,
        completed: status === "completed" || status === "revisit",
        mapStatus: status ?? null,
      },
    };
  });
}

export function MiniSummitMapCard({
  records: initialRecords,
  title = "Highpoints map",
  description = "Your canonical highpoint progress at a glance.",
  compact = false,
  interactive = false,
}: {
  records: RecordLike[];
  title?: string;
  description?: string;
  compact?: boolean;
  interactive?: boolean;
}) {
  const [records, setRecords] = useState<RecordLike[]>(initialRecords);
  const peaks = buildProgressPeaks(records);

  useEffect(() => {
    const supabase = createClient();

    async function refreshRecords() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("peak_records")
        .select("canonical_peak_id, status")
        .eq("user_id", user.id);
      if (data) {
        setRecords(
          (data as RecordSnap[]).map((r) => ({
            canonicalPeakId: r.canonical_peak_id,
            status: r.status,
          }))
        );
      }
    }

    // Fetch immediately on mount so the map always reflects the latest DB state
    refreshRecords();

    const channel = supabase
      .channel("map-peak-records-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "peak_records" },
        () => {
          refreshRecords();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="card-base p-5 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mountain className="w-4 h-4 text-summit" />
        <span className="text-label">{title}</span>
      </div>
      <p className="text-sm text-text-muted mb-4">{description}</p>
      <div className="rounded-2xl border border-border bg-base/70 p-3">
        <USMap
          peaks={peaks}
          interactive={interactive}
          variant="progress"
          compact={compact}
        />
      </div>
    </section>
  );
}
