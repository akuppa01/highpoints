import { MapPageClient } from "@/components/map/map-page-client";
import { getCurrentSessionUser } from "@/lib/data/records";
import { buildProgressPeaks, getAllPeaksWithClimbs } from "@/lib/data/peaks-data";
import { createClient } from "@/lib/supabase/server";
import type { PeakWithClimb } from "@/types";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const user = await getCurrentSessionUser();

  let peaks: PeakWithClimb[];
  let hasUserData = false;

  if (user) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("peak_records")
      .select("canonical_peak_id, slug, state, status")
      .eq("user_id", user.id);

    if (data && data.length > 0) {
      hasUserData = true;
      peaks = buildProgressPeaks(
        data.map((r) => ({
          id: (r.canonical_peak_id as string | null) ?? null,
          slug: (r.slug as string | null) ?? null,
          state: (r.state as string | null) ?? null,
          status: r.status,
        }))
      );
    } else {
      peaks = getAllPeaksWithClimbs();
    }
  } else {
    peaks = getAllPeaksWithClimbs();
  }

  return <MapPageClient peaks={peaks} hasUserData={hasUserData} />;
}
