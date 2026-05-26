import { Hero } from "@/components/home/hero";
import { PlatformHighlights } from "@/components/home/platform-highlights";
import { MapPreviewSection } from "@/components/home/map-preview-section";
import { StartJournalCta } from "@/components/ui/start-journal-cta";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformHighlights />
      <MapPreviewSection />
      <div className="container-wide py-12 md:py-16">
        <StartJournalCta />
      </div>
    </>
  );
}
