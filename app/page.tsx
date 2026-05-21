import { Hero } from "@/components/home/hero";
import { PlatformHighlights } from "@/components/home/platform-highlights";
import { StartJournalCta } from "@/components/ui/start-journal-cta";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformHighlights />
      <div className="container-wide py-12 md:py-16">
        <StartJournalCta />
      </div>
    </>
  );
}
