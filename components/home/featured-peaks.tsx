import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SummitImage } from "@/components/media/summit-image";
import { getFeaturedPeaks } from "@/lib/data/peaks-data";
import { cn, formatDate, formatElevation } from "@/lib/utils";
import type { PeakWithClimb } from "@/types";

function FeaturedCard({
  peak,
  featured = false,
  showCompletion = false,
}: {
  peak: PeakWithClimb;
  featured?: boolean;
  showCompletion?: boolean;
}) {
  return (
    <Link
      href={`/peaks/${peak.slug}`}
      className={cn(
        "group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-border-light",
        featured ? "md:min-h-[520px]" : "md:min-h-[340px]"
      )}
    >
      {peak.heroImageUrl ? (
        <div className="absolute inset-0">
          <SummitImage
            src={peak.heroImageUrl}
            alt={peak.name}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
          />
          <div className="absolute inset-0 img-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="relative space-y-3 p-5 md:p-6">
        <div className="flex items-center justify-between">
          <span className="text-label">{peak.state}</span>
          {showCompletion && peak.climb?.completed ? (
            <div className="flex items-center gap-1.5 rounded-full border border-summit/30 bg-summit/20 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-summit" />
              <span className="text-xs font-mono text-summit">
                {formatDate(peak.climb.completedDate ?? "")}
              </span>
            </div>
          ) : null}
        </div>

        <div>
          <h3
            className={cn(
              "font-display leading-tight tracking-tight text-text-primary",
              featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
            )}
          >
            {peak.name}
          </h3>
          <p className="mt-1 font-mono text-sm text-text-secondary">
            {formatElevation(peak.elevationFt)} elevation
          </p>
        </div>

        {featured && peak.shortDescription ? (
          <p className="clamp-2 text-sm leading-relaxed text-text-secondary">
            {peak.shortDescription}
          </p>
        ) : null}

        <div className="flex items-center gap-1 text-text-muted transition-colors duration-200 group-hover:text-summit">
          <span className="text-xs font-mono">View peak</span>
          <ArrowRight className="h-3 w-3 translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedPeaks({ showCompletion = false }: { showCompletion?: boolean }) {
  const featured = getFeaturedPeaks();
  const [hero, ...rest] = featured.filter((peak) => peak.heroImageUrl).slice(0, 5);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-label mb-2 block">Featured Summits</span>
            <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
              A few iconic peaks to start with.
            </h2>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Browse the canonical list like a field guide: classic mountains,
              clean visuals, and a quick sense of what makes each summit memorable.
            </p>
          </div>
          <Link
            href="/peaks"
            className="hidden items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-secondary sm:flex"
          >
            All 50 peaks
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {hero ? (
            <div className="md:col-span-3">
              <FeaturedCard peak={hero} featured showCompletion={showCompletion} />
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:col-span-2">
            {rest.slice(0, 2).map((peak) => (
              <FeaturedCard key={peak.id} peak={peak} showCompletion={showCompletion} />
            ))}
          </div>
        </div>

        {rest.length > 2 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {rest.slice(2, 5).map((peak) => (
              <FeaturedCard key={peak.id} peak={peak} showCompletion={showCompletion} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
