import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn, formatElevation, formatDate } from "@/lib/utils";
import { getFeaturedPeaks } from "@/lib/data/peaks-data";
import type { PeakWithClimb } from "@/types";

function FeaturedCard({
  peak,
  featured = false,
}: {
  peak: PeakWithClimb;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/peaks/${peak.slug}`}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl",
        "border border-border hover:border-border-light",
        "transition-all duration-500",
        featured ? "min-h-[420px] md:min-h-[520px]" : "min-h-[280px] md:min-h-[340px]"
      )}
    >
      {/* Background image */}
      {peak.heroImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={peak.heroImageUrl}
            alt={peak.name}
            fill
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 img-overlay" />
          {/* Subtle top vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative p-5 md:p-6 space-y-3">
        {/* State code + completion badge */}
        <div className="flex items-center justify-between">
          <span className="text-label">{peak.state}</span>
          {peak.climb?.completed && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-summit/20 border border-summit/30">
              <CheckCircle2 className="w-3 h-3 text-summit" />
              <span className="text-xs font-mono text-summit">
                {formatDate(peak.climb.completedDate!)}
              </span>
            </div>
          )}
        </div>

        <div>
          <h3
            className={cn(
              "font-display text-text-primary tracking-tight leading-tight",
              featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
            )}
          >
            {peak.name}
          </h3>
          <p className="text-sm text-text-secondary mt-1 font-mono">
            {formatElevation(peak.elevationFt)} elevation
          </p>
        </div>

        {featured && peak.shortDescription && (
          <p className="text-sm text-text-secondary leading-relaxed clamp-2">
            {peak.shortDescription}
          </p>
        )}

        {/* Arrow indicator */}
        <div className="flex items-center gap-1 text-text-muted group-hover:text-summit transition-colors duration-200">
          <span className="text-xs font-mono">View peak</span>
          <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedPeaks() {
  const featured = getFeaturedPeaks();
  // First peak gets the big card, rest are smaller
  const [hero, ...rest] = featured.filter((p) => p.heroImageUrl).slice(0, 5);

  return (
    <section className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-label block mb-2">Featured Summits</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-tight">
              The peaks that define the journey.
            </h2>
          </div>
          <Link
            href="/peaks"
            className="hidden sm:flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            All {50} peaks
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid layout: big hero left + 2x2 right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {hero && (
            <div className="md:col-span-3">
              <FeaturedCard peak={hero} featured />
            </div>
          )}
          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            {rest.slice(0, 2).map((peak) => (
              <FeaturedCard key={peak.id} peak={peak} />
            ))}
          </div>
        </div>

        {/* Second row */}
        {rest.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {rest.slice(2, 5).map((peak) => (
              <FeaturedCard key={peak.id} peak={peak} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
