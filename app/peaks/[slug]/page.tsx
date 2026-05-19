import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Mountain,
  Route,
  Star,
  TrendingUp,
  Wind,
} from "lucide-react";
import { getAllPeaksWithClimbs, getPeakBySlug } from "@/lib/data/peaks-data";
import {
  cn,
  difficultyBg,
  difficultyLabel,
  formatDate,
  formatDistance,
  formatDuration,
  formatElevation,
  formatElevationGain,
} from "@/lib/utils";
import { SummitImage } from "@/components/media/summit-image";

export async function generateStaticParams() {
  return getAllPeaksWithClimbs().map((peak) => ({ slug: peak.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const peak = getPeakBySlug(slug);
  if (!peak) return {};

  return {
    title: `${peak.name}, ${peak.state}`,
    description:
      peak.shortDescription ??
      `${peak.name} — ${peak.state} state highpoint at ${formatElevation(peak.elevationFt)}.`,
  };
}

export default async function PeakDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const peak = getPeakBySlug(slug);

  if (!peak) notFound();

  const climb = peak.climb;
  const completed = Boolean(climb?.completed);

  return (
    <article className="pt-14 min-h-screen">
      <div className="relative h-[60vh] md:h-[72vh] min-h-[420px] overflow-hidden bg-surface">
        {peak.heroImageUrl && (
          <SummitImage
            src={peak.heroImageUrl}
            alt={peak.name}
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        <div className="absolute top-6 left-6">
          <Link
            href="/peaks"
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Peaks
          </Link>
        </div>

        {completed && climb?.completedDate && (
          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-summit/90 backdrop-blur-sm border border-summit/60">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-mono">
                Summited {formatDate(climb.completedDate)}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <div className="container-wide px-0">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-label">{peak.state}</span>
                  {peak.difficulty && (
                    <span className={cn("tag border", difficultyBg(peak.difficulty))}>
                      {difficultyLabel(peak.difficulty)}
                    </span>
                  )}
                </div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none">
                  {peak.name}
                </h1>
              </div>
              <div className="text-right">
                <div className="font-mono text-summit-amber text-3xl md:text-4xl">
                  {formatElevation(peak.elevationFt)}
                </div>
                <div className="text-xs text-white/50 font-mono mt-0.5">elevation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {completed && climb && (
        <div className="border-b border-border bg-surface">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-border">
              {[
                {
                  icon: Route,
                  value: climb.distanceMiles ? formatDistance(climb.distanceMiles) : "—",
                  label: "Distance",
                },
                {
                  icon: TrendingUp,
                  value: climb.elevationGainFt ? formatElevationGain(climb.elevationGainFt) : "—",
                  label: "Elevation Gain",
                },
                {
                  icon: Clock,
                  value: climb.durationMinutes ? formatDuration(climb.durationMinutes) : "—",
                  label: "Duration",
                },
                {
                  icon: Star,
                  value: climb.rating ? `${climb.rating}/5` : "—",
                  label: "Rating",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-6 py-4 first:pl-0 last:pr-0">
                  <item.icon className="w-4 h-4 text-summit flex-shrink-0" />
                  <div>
                    <div className="font-mono text-lg text-text-primary">{item.value}</div>
                    <div className="text-xs text-text-muted">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {(peak.longDescription || peak.shortDescription) && (
              <section>
                <span className="text-label block mb-4">About this peak</span>
                {peak.longDescription ? (
                  <div className="space-y-4">
                    {peak.longDescription.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className={cn(
                          "leading-relaxed",
                          index === 0 ? "text-lg text-text-secondary" : "text-base text-text-muted"
                        )}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg text-text-secondary leading-relaxed">{peak.shortDescription}</p>
                )}
              </section>
            )}

            {climb?.routeName && (
              <section>
                <span className="text-label block mb-4">Route</span>
                <div className="card-base p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <Route className="w-4 h-4 text-summit mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{climb.routeName}</p>
                      {climb.routeDescription && (
                        <p className="text-sm text-text-muted mt-1 leading-relaxed">
                          {climb.routeDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {climb?.personalNotes && (
              <section>
                <span className="text-label block mb-4">Field notes</span>
                <div className="relative pl-5 border-l-2 border-summit/40">
                  <p className="text-base text-text-secondary leading-relaxed italic">
                    &ldquo;{climb.personalNotes}&rdquo;
                  </p>
                </div>
              </section>
            )}

            {(climb?.weatherNotes || climb?.gearNotes) && (
              <section>
                <span className="text-label block mb-4">Conditions and gear</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {climb.weatherNotes && (
                    <div className="card-base p-4 space-y-2">
                      <div className="flex items-center gap-2 text-text-muted">
                        <Wind className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono uppercase tracking-wider">Weather</span>
                      </div>
                      <p className="text-sm text-text-secondary">{climb.weatherNotes}</p>
                    </div>
                  )}
                  {climb.gearNotes && (
                    <div className="card-base p-4 space-y-2">
                      <div className="flex items-center gap-2 text-text-muted">
                        <Mountain className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono uppercase tracking-wider">Gear</span>
                      </div>
                      <p className="text-sm text-text-secondary">{climb.gearNotes}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            <div className="card-base p-5 space-y-4">
              <span className="text-label block">Peak facts</span>
              <div className="space-y-3">
                {[
                  { label: "State", value: peak.state },
                  { label: "Elevation", value: formatElevation(peak.elevationFt) },
                  { label: "Prominence", value: peak.prominenceFt ? formatElevation(peak.prominenceFt) : "—" },
                  { label: "Region", value: peak.region },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-text-muted">{item.label}</span>
                    <span className="text-xs font-mono text-text-secondary text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {completed && climb?.completedDate && (
              <div className="card-base p-5 space-y-3">
                <span className="text-label block">Sample climb</span>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar className="w-4 h-4 text-summit" />
                  <span className="text-sm">{formatDate(climb.completedDate)}</span>
                </div>
                <p className="text-sm text-text-muted">
                  This canonical page can also sit beside personal climb records, public stories,
                  and richer journal entries in the broader product.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
