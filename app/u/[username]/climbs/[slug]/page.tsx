import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  ExternalLink,
  Flag,
  MapPin,
  Mountain,
  Route,
  Star,
  TrendingUp,
  User,
  Wind,
} from "lucide-react";
import { ShareCopyButton } from "@/components/public/share-copy-button";
import { ShareStoryButton } from "@/components/public/share-story-button";
import { IntentLink } from "@/components/ui/intent-link";
import { getPublishedRecord } from "@/lib/data/records";
import { getPeakWithClimbById } from "@/lib/data/peaks-data";
import { getBaseUrl } from "@/lib/supabase/config";
import {
  cn,
  difficultyBg,
  difficultyLabel,
  formatDate,
  formatMaybeDistance,
  formatMaybeDuration,
  formatMaybeElevation,
  statusAccent,
  statusLabel,
} from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const record = await getPublishedRecord(username, slug);

  if (!record) return { title: "Climb not found" };

  return {
    title: `${record.peakName} by ${record.userDisplayName}`,
    description:
      record.publicNotes ||
      record.specialMemories ||
      `A published climb record for ${record.peakName}.`,
  };
}

export default async function PublicClimbPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const record = await getPublishedRecord(username, slug);

  if (!record) notFound();

  const publicUrl = `${getBaseUrl()}/u/${username}/climbs/${slug}`;
  const heroImage = record.media.find((item) => item.isHighlight)?.mediaUrl ?? record.heroPhotoUrl;
  const canonicalPeak = getPeakWithClimbById(record.peak?.id);
  const canonicalRoute = canonicalPeak?.climb;
  const featuredMedia = record.media.slice(0, 5);
  const locationLabel = record.locationLabel || [record.state, record.country].filter(Boolean).join(", ");

  const storyLead =
    record.publicNotes ||
    record.specialMemories ||
    canonicalPeak?.shortDescription ||
    null;

  const dateDisplay = record.dateClimbed ? formatDate(record.dateClimbed) : null;

  return (
    <article className="pt-14 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image or gradient */}
        <div
          className="relative"
          style={{ minHeight: heroImage ? "70vh" : "auto" }}
        >
          {heroImage && (
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt={record.peakName}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/95" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            </div>
          )}

          {!heroImage && canonicalPeak?.heroImageUrl && (
            <div className="absolute inset-0">
              <Image
                src={canonicalPeak.heroImageUrl}
                alt={record.peakName}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/98" />
            </div>
          )}

          {!heroImage && !canonicalPeak?.heroImageUrl && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1810] via-[#080f0b] to-base">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse at 20% 30%, rgba(74,122,92,0.5) 0%, transparent 60%)" }} />
            </div>
          )}

          <div className="relative container-wide pt-8 pb-14 md:pb-20 flex flex-col min-h-full">
            {/* Nav row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-auto pb-12 md:pb-16">
              <IntentLink
                href={`/u/${username}`}
                hoverPrefetch
                pendingHint
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                @{username}
              </IntentLink>

              <div className="flex flex-wrap items-center gap-2">
                <ShareStoryButton
                  title={record.peakName}
                  subtitle={`@${record.username} · Tracked with Highpoints`}
                  location={locationLabel}
                  elevationFt={canonicalPeak?.elevationFt ?? null}
                  distanceMiles={record.distanceMiles}
                  elevationGainFt={record.elevationGainFt}
                  durationMinutes={record.durationMinutes}
                  rating={record.rating}
                  note={record.favoriteMoment || record.publicNotes}
                  dateClimbed={dateDisplay}
                  heroImageUrl={heroImage ?? canonicalPeak?.heroImageUrl ?? null}
                  username={record.username}
                  url={publicUrl}
                />
                <ShareCopyButton url={publicUrl} />
              </div>
            </div>

            {/* Main hero content */}
            <div className="mt-auto">
              {/* Status + date */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={cn("tag text-[11px]", statusAccent(record.status))}>
                  {statusLabel(record.status)}
                </span>
                {canonicalPeak?.difficulty && (
                  <span className={cn("tag text-[11px] border", difficultyBg(canonicalPeak.difficulty))}>
                    {difficultyLabel(canonicalPeak.difficulty)}
                  </span>
                )}
                {dateDisplay && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/60 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {dateDisplay}
                  </span>
                )}
              </div>

              {/* Location */}
              {locationLabel && (
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-summit-amber flex-shrink-0" />
                  <span className="text-sm font-mono text-summit-amber/80 tracking-wider uppercase">{locationLabel}</span>
                </div>
              )}

              {/* Peak name */}
              <h1 className="font-display leading-[0.9] tracking-tight text-white" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                {record.peakName}
              </h1>

              {/* Elevation */}
              {canonicalPeak?.elevationFt && (
                <p className="mt-3 font-mono text-summit-amber text-xl">
                  {canonicalPeak.elevationFt.toLocaleString()} ft elevation
                </p>
              )}

              {/* Climber + route */}
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/55">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {record.userDisplayName}
                </div>
                {record.routeName && (
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4" />
                    {record.routeName}
                  </div>
                )}
                {record.weather && (
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4" />
                    {record.weather}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key stats bar ──────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface/90 backdrop-blur-sm">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-border">
            {[
              { icon: Route, value: formatMaybeDistance(record.distanceMiles), label: "Distance" },
              { icon: TrendingUp, value: formatMaybeElevation(record.elevationGainFt), label: "Elevation gain" },
              { icon: Clock3, value: formatMaybeDuration(record.durationMinutes), label: "Time on trail" },
              { icon: Star, value: record.rating ? `${record.rating}/5` : "—", label: "Rating" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 px-6 py-5">
                  <Icon className="h-4 w-4 flex-shrink-0 text-summit" />
                  <div>
                    <p className="font-mono text-lg text-text-primary leading-none">{item.value}</p>
                    <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr,0.85fr]">

          {/* Left column: story + peak info */}
          <div className="space-y-10">

            {/* Story / notes */}
            {storyLead && (
              <section className="space-y-5">
                <span className="text-label block">The climb</span>
                <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-sans">
                  {storyLead}
                </p>
                {record.specialMemories && record.specialMemories !== storyLead && (
                  <div className="rounded-3xl border border-border bg-card px-6 py-5">
                    <p className="text-label mb-3">Special memory</p>
                    <p className="text-text-secondary leading-relaxed">{record.specialMemories}</p>
                  </div>
                )}
                {record.anecdotes && (
                  <div className="rounded-3xl border border-border bg-card px-6 py-5">
                    <p className="text-label mb-3">From the trail</p>
                    <p className="text-text-secondary leading-relaxed">{record.anecdotes}</p>
                  </div>
                )}
              </section>
            )}

            {/* About the mountain */}
            {(canonicalPeak?.longDescription || (canonicalPeak?.shortDescription && !storyLead)) && (
              <section className="space-y-5">
                <span className="text-label block">About the mountain</span>
                <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-tight leading-tight">
                  {canonicalPeak?.name}
                </h2>
                {canonicalPeak?.longDescription ? (
                  <div className="space-y-4">
                    {canonicalPeak.longDescription.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className={i === 0
                          ? "text-base md:text-lg leading-relaxed text-text-secondary"
                          : "text-sm md:text-base leading-relaxed text-text-muted"}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                    {canonicalPeak?.shortDescription}
                  </p>
                )}
              </section>
            )}

            {/* Route info */}
            {(record.routeName || canonicalRoute?.routeName) && (
              <section className="space-y-4">
                <span className="text-label block">Route</span>
                <div className="rounded-3xl border border-border bg-card p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Route className="w-4 h-4 text-summit mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-primary">{record.routeName || canonicalRoute?.routeName}</p>
                      {canonicalRoute?.routeDescription && (
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">{canonicalRoute.routeDescription}</p>
                      )}
                    </div>
                  </div>
                  {(canonicalRoute?.weatherNotes || canonicalRoute?.gearNotes) && (
                    <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border">
                      {canonicalRoute?.weatherNotes && (
                        <div>
                          <p className="text-label mb-1.5">Conditions</p>
                          <p className="text-sm text-text-muted">{canonicalRoute.weatherNotes}</p>
                        </div>
                      )}
                      {canonicalRoute?.gearNotes && (
                        <div>
                          <p className="text-label mb-1.5">Gear</p>
                          <p className="text-sm text-text-muted">{canonicalRoute.gearNotes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Personal field notes */}
            {(record.favoriteMoment || record.lessonsLearned || record.gearNotes) && (
              <section className="space-y-4">
                <span className="text-label block">Field notes</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  {record.favoriteMoment && (
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <p className="text-label mb-3">Favorite moment</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{record.favoriteMoment}</p>
                    </div>
                  )}
                  {record.lessonsLearned && (
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <p className="text-label mb-3">Lessons learned</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{record.lessonsLearned}</p>
                    </div>
                  )}
                  {record.gearNotes && (
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <p className="text-label mb-3">Gear</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{record.gearNotes}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Photos */}
            {featuredMedia.length > 0 && (
              <section className="space-y-5">
                <span className="text-label block">Photos</span>
                <h2 className="font-display text-3xl text-text-primary tracking-tight">Highlights from the day</h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-2 px-2">
                  {featuredMedia.map((media, index) => (
                    <figure
                      key={media.id}
                      className={cn(
                        "snap-start flex-shrink-0 overflow-hidden rounded-3xl border border-border bg-card",
                        index === 0 ? "w-[82%] md:w-[65%]" : "w-[72%] md:w-[40%]"
                      )}
                    >
                      <div className="relative min-h-[260px] md:min-h-[340px]">
                        <Image
                          src={media.mediaUrl}
                          alt={media.caption || record.peakName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 85vw, 45vw"
                        />
                      </div>
                      {media.caption && (
                        <figcaption className="px-5 py-4 text-sm text-text-muted">{media.caption}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* External albums */}
            {record.externalAlbumLinks.length > 0 && (
              <section className="space-y-4">
                <span className="text-label block">Photo albums</span>
                <div className="grid gap-4 md:grid-cols-2">
                  {record.externalAlbumLinks.map((link, index) => {
                    let host = "External album";
                    try { host = new URL(link).hostname.replace(/^www\./, ""); } catch {}
                    return (
                      <a
                        key={`${link}-${index}`}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="card-base card-hover p-5"
                      >
                        <p className="text-label mb-2">{host}</p>
                        <p className="text-base text-text-primary">Open full album →</p>
                        <p className="mt-1 text-xs text-text-muted break-all truncate">{link}</p>
                      </a>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">

            {/* Summit reference */}
            <div className="card-base p-6 space-y-5">
              <span className="text-label block">Summit reference</span>
              <div className="space-y-3">
                {[
                  { label: "State / region", value: canonicalPeak?.state ?? record.state ?? locationLabel ?? "—" },
                  { label: "Summit elevation", value: canonicalPeak?.elevationFt ? `${canonicalPeak.elevationFt.toLocaleString()} ft` : record.elevationGainFt ? `${record.elevationGainFt.toLocaleString()} ft gain` : "—" },
                  { label: "Prominence", value: canonicalPeak?.prominenceFt ? `${canonicalPeak.prominenceFt.toLocaleString()} ft` : "—" },
                  { label: "Difficulty", value: canonicalPeak?.difficulty ? difficultyLabel(canonicalPeak.difficulty) : record.difficulty ?? "—" },
                  { label: "Region", value: canonicalPeak?.region ?? record.country ?? "—" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-3">
                    <span className="text-xs text-text-muted flex-shrink-0">{item.label}</span>
                    <span className="text-xs font-mono text-text-secondary text-right">{item.value}</span>
                  </div>
                ))}
              </div>
              {canonicalPeak?.tags?.length ? (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {canonicalPeak.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">{tag}</span>
                  ))}
                </div>
              ) : null}
              {canonicalPeak && (
                <Link
                  href={`/peaks/${canonicalPeak.slug}`}
                  className="mt-2 flex items-center gap-2 text-xs font-mono text-summit hover:text-summit-light transition-colors"
                >
                  <Mountain className="w-3.5 h-3.5" />
                  View full peak page →
                </Link>
              )}
            </div>

            {/* Strava */}
            {(record.strava.activityUrl || record.strava.activityTitle) && (
              <div className="card-base p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-label">Strava activity</span>
                  {record.strava.activityUrl && (
                    <Link
                      href={record.strava.activityUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-summit hover:text-summit-light transition-colors inline-flex items-center gap-1.5"
                    >
                      Open <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
                <div className="rounded-2xl border border-[#fc5200]/20 bg-[#fc5200]/5 p-4 space-y-3">
                  <p className="text-sm font-medium text-text-primary">
                    {record.strava.activityTitle || "Strava activity"}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: "Distance", value: formatMaybeDistance(record.strava.distanceMiles) },
                      { label: "Elevation", value: formatMaybeElevation(record.strava.elevationGainFt) },
                      { label: "Moving time", value: formatMaybeDuration(record.strava.movingTimeMinutes) },
                      { label: "Pace", value: record.strava.paceText || "—" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-white/8 bg-white/5 p-2.5">
                        <p className="font-mono text-text-primary">{s.value}</p>
                        <p className="text-text-muted mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tags / extra beta */}
            {(canonicalRoute?.weatherNotes || canonicalRoute?.gearNotes) && !(record.routeName || canonicalRoute?.routeName) && (
              <div className="card-base p-6 space-y-4">
                <span className="text-label block">Conditions &amp; gear</span>
                {canonicalRoute?.weatherNotes && (
                  <div>
                    <p className="text-label mb-2">Typical conditions</p>
                    <p className="text-sm text-text-secondary">{canonicalRoute.weatherNotes}</p>
                  </div>
                )}
                {canonicalRoute?.gearNotes && (
                  <div>
                    <p className="text-label mb-2">Gear notes</p>
                    <p className="text-sm text-text-secondary">{canonicalRoute.gearNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
