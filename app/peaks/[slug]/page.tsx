import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  Calendar,
  Route,
  Clock,
  TrendingUp,
  Star,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Wind,
  Camera,
} from "lucide-react";
import {
  getPeakBySlug,
  getAllPeaksWithClimbs,
} from "@/lib/data/peaks-data";
import {
  cn,
  formatElevation,
  formatElevationGain,
  formatDistance,
  formatDuration,
  formatDate,
  difficultyBg,
  difficultyLabel,
} from "@/lib/utils";

export async function generateStaticParams() {
  const peaks = getAllPeaksWithClimbs();
  return peaks.map((p) => ({ slug: p.slug }));
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
      peak.shortDescription ?? `${peak.name} — ${peak.state} state highpoint at ${formatElevation(peak.elevationFt)}.`,
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

  const { climb } = peak;
  const completed = climb?.completed ?? false;

  return (
    <article className="pt-14 min-h-screen">
      {/* ----------------------------------------------------------------- */}
      {/* Hero image                                                         */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative h-[60vh] md:h-[72vh] min-h-[400px] overflow-hidden bg-surface">
        {peak.heroImageUrl && (
          <Image
            src={peak.heroImageUrl}
            alt={peak.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link
            href="/peaks"
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Peaks
          </Link>
        </div>

        {/* Completion badge */}
        {completed && (
          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-summit/90 backdrop-blur-sm border border-summit/60">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-mono">
                Summited {formatDate(climb!.completedDate!)}
              </span>
            </div>
          </div>
        )}

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
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

      {/* ----------------------------------------------------------------- */}
      {/* Stat bar (if climbed)                                              */}
      {/* ----------------------------------------------------------------- */}
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
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-4 first:pl-0 last:pr-0">
                  <s.icon className="w-4 h-4 text-summit flex-shrink-0" />
                  <div>
                    <div className="font-mono text-lg text-text-primary">{s.value}</div>
                    <div className="text-xs text-text-muted">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Content                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            {(peak.longDescription || peak.shortDescription) && (
              <section>
                <span className="text-label block mb-4">About this peak</span>
                {peak.longDescription ? (
                  <div className="space-y-4">
                    {peak.longDescription.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className={cn(
                          "leading-relaxed",
                          i === 0
                            ? "text-lg text-text-secondary"
                            : "text-base text-text-muted"
                        )}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {peak.shortDescription}
                  </p>
                )}
              </section>
            )}

            {/* Route info */}
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

            {/* Personal notes / story */}
            {climb?.personalNotes && (
              <section>
                <span className="text-label block mb-4">Field Notes</span>
                <div className="relative pl-5 border-l-2 border-summit/40">
                  <p className="text-base text-text-secondary leading-relaxed italic">
                    &ldquo;{climb.personalNotes}&rdquo;
                  </p>
                </div>
              </section>
            )}

            {/* Conditions */}
            {(climb?.weatherNotes || climb?.gearNotes) && (
              <section>
                <span className="text-label block mb-4">Conditions & Gear</span>
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

            {/* Photo gallery */}
            {climb?.photos && climb.photos.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-label">Photos</span>
                  <Camera className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-xs font-mono text-text-muted">
                    {climb.photos.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {climb.photos.map((photo, i) => (
                    <div
                      key={photo.id}
                      className={cn(
                        "relative overflow-hidden rounded-xl bg-surface border border-border",
                        i === 0 && climb.photos!.length > 2
                          ? "sm:col-span-2 aspect-[16/9]"
                          : "aspect-[4/3]"
                      )}
                    >
                      <Image
                        src={photo.imageUrl}
                        alt={photo.caption ?? `${peak.name} photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                          <p className="text-xs text-white/80">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Peak details card */}
            <div className="card-base p-5 space-y-4">
              <span className="text-label block">Peak Details</span>

              <div className="space-y-3 divide-y divide-border">
                {[
                  { label: "Elevation", value: formatElevation(peak.elevationFt) },
                  peak.prominenceFt
                    ? { label: "Prominence", value: formatElevation(peak.prominenceFt) }
                    : null,
                  { label: "State", value: `${peak.state} (${peak.stateCode})` },
                  { label: "Region", value: peak.region },
                  peak.difficulty
                    ? { label: "Difficulty", value: difficultyLabel(peak.difficulty) }
                    : null,
                  {
                    label: "Coordinates",
                    value: `${peak.latitude.toFixed(4)}°N, ${Math.abs(peak.longitude).toFixed(4)}°W`,
                  },
                ]
                  .filter(Boolean)
                  .map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 pt-3 first:pt-0">
                      <span className="text-xs text-text-muted">{item!.label}</span>
                      <span className="text-xs font-mono text-text-secondary text-right">
                        {item!.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tags */}
            {peak.tags && peak.tags.length > 0 && (
              <div className="card-base p-5 space-y-3">
                <span className="text-label block">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {peak.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* External links */}
            {(climb?.stravaUrl || climb?.alltrailsUrl) && (
              <div className="card-base p-5 space-y-3">
                <span className="text-label block">External Links</span>
                <div className="space-y-2">
                  {climb.alltrailsUrl && (
                    <a
                      href={climb.alltrailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group p-2.5 rounded-lg bg-surface hover:bg-card-hover border border-border transition-colors duration-150"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#51B749]/20 flex items-center justify-center">
                          <Mountain className="w-3.5 h-3.5 text-[#51B749]" />
                        </div>
                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                          AllTrails
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                    </a>
                  )}
                  {climb.stravaUrl && (
                    <a
                      href={climb.stravaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group p-2.5 rounded-lg bg-surface hover:bg-card-hover border border-border transition-colors duration-150"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#FC4C02]/20 flex items-center justify-center">
                          <Route className="w-3.5 h-3.5 text-[#FC4C02]" />
                        </div>
                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                          Strava Activity
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Location link */}
            <a
              href={`https://maps.google.com/?q=${peak.latitude},${peak.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors group"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View on Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </aside>
        </div>
      </div>
    </article>
  );
}
