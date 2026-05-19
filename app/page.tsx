import { Hero } from "@/components/home/hero";
import { PlatformHighlights } from "@/components/home/platform-highlights";
import { FeaturedPeaks } from "@/components/home/featured-peaks";
import { MapPreviewSection } from "@/components/home/map-preview-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MapPreviewSection />
      <FeaturedPeaks />
      <PlatformHighlights />
    </>
  );
}
