import { Hero } from "@/components/home/hero";
import { ProgressOverview } from "@/components/home/progress-overview";
import { FeaturedPeaks } from "@/components/home/featured-peaks";
import { MapPreviewSection } from "@/components/home/map-preview-section";
import { StateGrid } from "@/components/home/state-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgressOverview />
      <FeaturedPeaks />
      <MapPreviewSection />
      <StateGrid />
    </>
  );
}
