"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Mountain } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PeakWithClimb } from "@/types";

const USMap = dynamic(
  () => import("@/components/map/us-map").then((m) => m.USMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[2/1] animate-pulse rounded-2xl bg-base/70 border border-border" />
    ),
  }
);

/**
 * Renders the US map colored by a user's progress.
 *
 * Accepts `peaks` pre-built by a server component (via buildProgressPeaks).
 * Subscribes to Supabase Realtime and calls router.refresh() when
 * peak_records change — no client-side auth or data fetching required.
 */
export function MiniSummitMapCard({
  peaks,
  title = "Highpoints map",
  description = "Your canonical highpoint progress at a glance.",
  compact = false,
  interactive = false,
}: {
  peaks: PeakWithClimb[];
  title?: string;
  description?: string;
  compact?: boolean;
  interactive?: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("map-peak-records-refresh")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "peak_records" },
        () => {
          // Let the server re-fetch and pass fresh peaks as props
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

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
