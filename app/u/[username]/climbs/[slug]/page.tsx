import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  ExternalLink,
  MapPin,
  Mountain,
  Route,
  TrendingUp,
  User,
} from "lucide-react";
import { ClimbRecapCard } from "@/components/public/share-cards";
import { JourneyMap } from "@/components/public/journey-map";
import { ShareCopyButton } from "@/components/public/share-copy-button";
import { getPublishedRecord } from "@/lib/data/records";
import { getBaseUrl } from "@/lib/supabase/config";
import {
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

  if (!record) {
    return {
      title: "Climb not found",
    };
  }

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

  return (
    <article className="pt-14 min-h-screen">
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-summit/15 via-transparent to-summit-amber/10" />
        <div className="container-wide relative py-8 md:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href={`/u/${username}`}
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to @{username}
            </Link>
            <ShareCopyButton url={publicUrl} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr,0.9fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`tag ${statusAccent(record.status)}`}>{statusLabel(record.status)}</span>
                {record.dateClimbed && (
                  <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4 text-summit" />
                    {formatDate(record.dateClimbed)}
                  </span>
                )}
              </div>

              <div>
                <span className="text-label block mb-3">Published climb</span>
                <h1 className="font-display text-4xl md:text-6xl tracking-tight text-text-primary">
                  {record.peakName}
                </h1>
                <p className="text-text-secondary mt-4 max-w-2xl leading-relaxed">
                  {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
                </p>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-text-secondary">
                <div className="inline-flex items-center gap-2">
                  <User className="w-4 h-4 text-summit" />
                  {record.userDisplayName}
                </div>
                {record.routeName && (
                  <div className="inline-flex items-center gap-2">
                    <Route className="w-4 h-4 text-summit" />
                    {record.routeName}
                  </div>
                )}
                {record.weather && (
                  <div className="inline-flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-summit" />
                    {record.weather}
                  </div>
                )}
              </div>
            </div>

            <ClimbRecapCard
              title={record.peakName}
              subtitle={`@${record.username} • Tracked with High Points`}
              distanceMiles={record.distanceMiles}
              elevationGainFt={record.elevationGainFt}
              durationMinutes={record.durationMinutes}
            />
          </div>
        </div>
      </section>

      <section className="container-wide py-10 md:py-14 space-y-8">
        {heroImage && (
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-card min-h-[320px] md:min-h-[460px]">
            <Image
              src={heroImage}
              alt={record.peakName}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent" />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="card-base p-5">
            <Route className="w-4 h-4 text-summit mb-4" />
            <div className="font-mono text-2xl text-text-primary">{formatMaybeDistance(record.distanceMiles)}</div>
            <div className="text-sm text-text-secondary mt-1">Distance</div>
          </div>
          <div className="card-base p-5">
            <TrendingUp className="w-4 h-4 text-summit mb-4" />
            <div className="font-mono text-2xl text-text-primary">{formatMaybeElevation(record.elevationGainFt)}</div>
            <div className="text-sm text-text-secondary mt-1">Elevation gain</div>
          </div>
          <div className="card-base p-5">
            <Clock3 className="w-4 h-4 text-summit mb-4" />
            <div className="font-mono text-2xl text-text-primary">{formatMaybeDuration(record.durationMinutes)}</div>
            <div className="text-sm text-text-secondary mt-1">Time on trail</div>
          </div>
          <div className="card-base p-5">
            <MapPin className="w-4 h-4 text-summit mb-4" />
            <div className="font-mono text-2xl text-text-primary">{record.state || record.country || "—"}</div>
            <div className="text-sm text-text-secondary mt-1">Region</div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr,0.9fr]">
          <div className="space-y-8">
            {(record.publicNotes || record.specialMemories || record.anecdotes) && (
              <section className="card-base p-6 md:p-8 space-y-5">
                <div>
                  <span className="text-label block mb-2">Story</span>
                  <h2 className="font-display text-3xl text-text-primary tracking-tight">
                    The memory of the climb
                  </h2>
                </div>
                {record.publicNotes && (
                  <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                    {record.publicNotes}
                  </p>
                )}
                {record.specialMemories && (
                  <div className="rounded-2xl border border-border bg-card px-5 py-4">
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-2">
                      Special memory
                    </p>
                    <p className="text-text-secondary leading-relaxed">{record.specialMemories}</p>
                  </div>
                )}
                {record.anecdotes && (
                  <div className="rounded-2xl border border-border bg-card px-5 py-4">
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-2">
                      Anecdotes
                    </p>
                    <p className="text-text-secondary leading-relaxed">{record.anecdotes}</p>
                  </div>
                )}
              </section>
            )}

            {(record.favoriteMoment || record.lessonsLearned || record.gearNotes) && (
              <section className="grid gap-4 md:grid-cols-3">
                {record.favoriteMoment && (
                  <div className="card-base p-5">
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-3">
                      Favorite moment
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">{record.favoriteMoment}</p>
                  </div>
                )}
                {record.lessonsLearned && (
                  <div className="card-base p-5">
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-3">
                      Lessons learned
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">{record.lessonsLearned}</p>
                  </div>
                )}
                {record.gearNotes && (
                  <div className="card-base p-5">
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-3">
                      Gear notes
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">{record.gearNotes}</p>
                  </div>
                )}
              </section>
            )}

            {record.media.length > 0 && (
              <section className="space-y-4">
                <div>
                  <span className="text-label block mb-2">Photos</span>
                  <h2 className="font-display text-3xl text-text-primary tracking-tight">
                    Highlights from the day
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {record.media.map((media) => (
                    <figure
                      key={media.id}
                      className="overflow-hidden rounded-[28px] border border-border bg-card"
                    >
                      <div className="relative min-h-[240px]">
                        <Image
                          src={media.mediaUrl}
                          alt={media.caption || record.peakName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {media.caption && (
                        <figcaption className="px-5 py-4 text-sm text-text-secondary">
                          {media.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <section className="card-base p-6 space-y-4">
              <div>
                <span className="text-label block mb-2">Location</span>
                <h2 className="font-display text-2xl text-text-primary tracking-tight">
                  Place on the map
                </h2>
              </div>
              <JourneyMap
                points={[
                  {
                    id: record.id,
                    name: record.peakName,
                    latitude: record.latitude,
                    longitude: record.longitude,
                  },
                ]}
              />
            </section>

            {(record.strava.activityUrl || record.strava.activityTitle) && (
              <section className="card-base p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-label block mb-2">Strava</span>
                    <h2 className="font-display text-2xl text-text-primary tracking-tight">
                      Activity summary
                    </h2>
                  </div>
                  {record.strava.activityUrl && (
                    <Link
                      href={record.strava.activityUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-summit hover:text-summit-light transition-colors inline-flex items-center gap-2"
                    >
                      Open
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                <div className="rounded-2xl border border-[#fc5200]/20 bg-[#fc5200]/5 p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {record.strava.activityTitle || "Strava activity"}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {record.strava.activityDate ? formatDate(record.strava.activityDate) : "Manual import"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <p className="font-mono text-text-primary">{formatMaybeDistance(record.strava.distanceMiles)}</p>
                      <p className="text-text-muted mt-1">Distance</p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <p className="font-mono text-text-primary">{formatMaybeElevation(record.strava.elevationGainFt)}</p>
                      <p className="text-text-muted mt-1">Elevation</p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <p className="font-mono text-text-primary">{formatMaybeDuration(record.strava.movingTimeMinutes)}</p>
                      <p className="text-text-muted mt-1">Moving time</p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <p className="font-mono text-text-primary">{record.strava.paceText || "—"}</p>
                      <p className="text-text-muted mt-1">Pace</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {record.externalAlbumLinks.length > 0 && (
              <section className="card-base p-6 space-y-4">
                <div>
                  <span className="text-label block mb-2">Albums</span>
                  <h2 className="font-display text-2xl text-text-primary tracking-tight">
                    External photo collections
                  </h2>
                </div>
                <div className="space-y-3">
                  {record.externalAlbumLinks.map((link) => (
                    <Link
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-border bg-card px-4 py-4 text-sm text-text-secondary hover:bg-card-hover transition-colors"
                    >
                      <span className="inline-flex items-center gap-2 text-text-primary">
                        Open album
                        <ExternalLink className="w-4 h-4 text-summit" />
                      </span>
                      <span className="block mt-2 break-all text-xs text-text-muted">{link}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
