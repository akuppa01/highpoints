import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  ExternalLink,
  Flag,
  Mountain,
  Route,
  TrendingUp,
  User,
} from "lucide-react";
import { ClimbRecapCard } from "@/components/public/share-cards";
import { ShareCopyButton } from "@/components/public/share-copy-button";
import { ShareStoryButton } from "@/components/public/share-story-button";
import { IntentLink } from "@/components/ui/intent-link";
import { getPublishedRecord } from "@/lib/data/records";
import { getPeakWithClimbById } from "@/lib/data/peaks-data";
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
  const featuredMedia = record.media.slice(0, 5);
  const canonicalPeak = getPeakWithClimbById(record.peak?.id);
  const canonicalRoute = canonicalPeak?.climb;
  const storyLead =
    record.publicNotes ||
    record.specialMemories ||
    canonicalPeak?.shortDescription ||
    "A personal climbing record with route stats, photos, and mountain context.";

  return (
    <article className="pt-14 min-h-screen">
      <section className="relative overflow-hidden border-b border-border bg-surface">
        {heroImage ? (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={record.peakName}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(120,178,132,0.2),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(114,153,232,0.18),transparent_22%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/72 to-base" />
        <div className="container-wide relative py-8 md:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <IntentLink
              href={`/u/${username}`}
              hoverPrefetch
              pendingHint
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to @{username}
            </IntentLink>
            <div className="flex flex-wrap items-center gap-3">
              <ShareStoryButton
                title={record.peakName}
                subtitle={`@${record.username} • Tracked with Highpoints`}
                distanceMiles={record.distanceMiles}
                elevationGainFt={record.elevationGainFt}
                durationMinutes={record.durationMinutes}
                note={record.publicNotes || record.favoriteMoment || canonicalPeak?.shortDescription}
                url={publicUrl}
              />
              <ShareCopyButton url={publicUrl} />
            </div>
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
                <p className="text-text-secondary/90 mt-4 max-w-2xl leading-relaxed">
                  {storyLead}
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
              subtitle={`@${record.username} • Tracked with Highpoints`}
              distanceMiles={record.distanceMiles}
              elevationGainFt={record.elevationGainFt}
              durationMinutes={record.durationMinutes}
              note={record.favoriteMoment || canonicalPeak?.shortDescription}
            />
          </div>
        </div>
      </section>

      <section className="container-wide py-10 md:py-14 space-y-8">
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
            <Flag className="w-4 h-4 text-summit mb-4" />
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

            {(canonicalPeak?.longDescription || canonicalPeak?.shortDescription) && (
              <section className="card-base p-6 md:p-8 space-y-5">
                <div>
                  <span className="text-label block mb-2">About the mountain</span>
                  <h2 className="font-display text-3xl text-text-primary tracking-tight">
                    Why this summit matters
                  </h2>
                </div>
                {canonicalPeak?.longDescription ? (
                  <div className="space-y-4">
                    {canonicalPeak.longDescription.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className={index === 0 ? "text-base md:text-lg leading-relaxed text-text-secondary" : "text-sm md:text-base leading-relaxed text-text-muted"}
                      >
                        {paragraph}
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

            {(record.routeName || canonicalRoute?.routeName) && (
              <section className="card-base p-6 md:p-8 space-y-5">
                <div>
                  <span className="text-label block mb-2">Route</span>
                  <h2 className="font-display text-3xl text-text-primary tracking-tight">
                    {record.routeName ? "Chosen route" : "Default route guidance"}
                  </h2>
                </div>
                <div className="rounded-2xl border border-border bg-card px-5 py-4">
                  <p className="text-lg text-text-primary">
                    {record.routeName || canonicalRoute?.routeName}
                  </p>
                  {canonicalRoute?.routeDescription ? (
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {canonicalRoute.routeDescription}
                    </p>
                  ) : null}
                </div>
              </section>
            )}

            {(canonicalRoute?.weatherNotes || canonicalRoute?.gearNotes || canonicalRoute?.rating || canonicalPeak?.tags?.length) && (
              <section className="card-base p-6 md:p-8 space-y-5">
                <div>
                  <span className="text-label block mb-2">Extra beta</span>
                  <h2 className="font-display text-3xl text-text-primary tracking-tight">
                    More context around the climb
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {canonicalRoute?.weatherNotes ? (
                    <div className="rounded-2xl border border-border bg-card px-5 py-4">
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-2">Typical conditions</p>
                      <p className="text-text-secondary">{canonicalRoute.weatherNotes}</p>
                    </div>
                  ) : null}
                  {canonicalRoute?.gearNotes ? (
                    <div className="rounded-2xl border border-border bg-card px-5 py-4">
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-2">Gear notes</p>
                      <p className="text-text-secondary">{canonicalRoute.gearNotes}</p>
                    </div>
                  ) : null}
                  {typeof canonicalRoute?.rating === "number" ? (
                    <div className="rounded-2xl border border-border bg-card px-5 py-4">
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-2">Route rating</p>
                      <p className="text-text-secondary">{canonicalRoute.rating}/5 from the built-in route guide</p>
                    </div>
                  ) : null}
                  {canonicalPeak?.tags?.length ? (
                    <div className="rounded-2xl border border-border bg-card px-5 py-4">
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-2">Peak tags</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {canonicalPeak.tags.map((tag) => (
                          <span key={tag} className="tag text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
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

            {featuredMedia.length > 0 && (
              <section className="space-y-4">
                <div>
                  <span className="text-label block mb-2">Photos</span>
                  <h2 className="font-display text-3xl text-text-primary tracking-tight">
                    Highlights from the day
                  </h2>
                </div>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                  {featuredMedia.map((media, index) => (
                    <figure
                      key={media.id}
                      className={`snap-start flex-shrink-0 overflow-hidden rounded-[28px] border border-border bg-card ${
                        index === 0 ? "w-[82%] md:w-[68%]" : "w-[72%] md:w-[42%]"
                      }`}
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
                        <figcaption className="px-5 py-4 text-sm text-text-secondary">
                          {media.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {record.externalAlbumLinks.length > 0 && (
              <section className="space-y-4">
                <div>
                  <span className="text-label block mb-2">Albums</span>
                  <h2 className="font-display text-3xl text-text-primary tracking-tight">
                    The rest of the photo roll
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {record.externalAlbumLinks.map((link, index) => {
                    let host = "External album";
                    try {
                      host = new URL(link).hostname.replace(/^www\./, "");
                    } catch {}

                    return (
                      <IntentLink
                        key={`${link}-${index}`}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="card-base p-5 hover:bg-card-hover"
                      >
                        <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted mb-3">
                          {host}
                        </p>
                        <p className="text-lg text-text-primary leading-snug">
                          Open full album
                        </p>
                        <p className="mt-2 text-sm text-text-secondary break-all">
                          {link}
                        </p>
                      </IntentLink>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <section className="card-base p-6 space-y-4">
              <div>
                <span className="text-label block mb-2">Peak facts</span>
                <h2 className="font-display text-2xl text-text-primary tracking-tight">
                  Summit reference
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: "State", value: canonicalPeak?.state ?? record.state ?? "—" },
                  { label: "Elevation", value: canonicalPeak?.elevationFt ? `${canonicalPeak.elevationFt.toLocaleString()} ft` : "—" },
                  { label: "Prominence", value: canonicalPeak?.prominenceFt ? `${canonicalPeak.prominenceFt.toLocaleString()} ft` : "—" },
                  { label: "Region", value: canonicalPeak?.region ?? record.country ?? "—" },
                  { label: "Difficulty", value: canonicalPeak?.difficulty ?? record.difficulty ?? "—" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-text-muted">{item.label}</span>
                    <span className="text-xs font-mono text-text-secondary text-right">{item.value}</span>
                  </div>
                ))}
              </div>
              {canonicalPeak?.tags?.length ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {canonicalPeak.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
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

            {canonicalPeak?.climb?.personalNotes ? (
              <section className="card-base p-6 space-y-4">
                <div>
                  <span className="text-label block mb-2">Sample field notes</span>
                  <h2 className="font-display text-2xl text-text-primary tracking-tight">
                    Default summit notes
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary italic">
                  {canonicalPeak.climb.personalNotes}
                </p>
              </section>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
