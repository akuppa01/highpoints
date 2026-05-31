import { PeaksPageClient } from "@/components/peaks/peaks-page-client";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";
import { getTrailQuote } from "@/lib/data/trail-quotes";

export const revalidate = 3600;

export default function PeaksPage() {
  return (
    <PeaksPageClient
      allPeaks={getAllPeaksWithClimbs()}
      quote={getTrailQuote("peaks")}
    />
  );
}
