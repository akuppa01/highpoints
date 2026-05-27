import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock3, MapPin, Mountain, Route, TrendingUp } from "lucide-react";
import { getPublicProfileByUsername } from "@/lib/data/records";
import { buildProgressPeaks } from "@/lib/data/peaks-data";
import { MiniSummitMapCard } from "@/components/map/mini-summit-map-card";
import { ProfileRecapCard } from "@/components/public/share-cards";
import { IntentLink } from "@/components/ui/intent-link";
import { formatDate, formatDistance, formatDuration, formatElevation, statusLabel } from "@/lib/utils";

export const revalidate = 3600;

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const payload = await getPublicProfileByUsername(username);
  if (!payload) notFound();

  const { profile, records, stats } = payload;

  // Build peak progress server-side for the map
  const progressPeaks = buildProgressPeaks(
    records.map((r) => ({ id: r.peak?.id, status: r.status }))
  );

  // Hero: prefer user-uploaded photo, fall back to peak hero
  const heroImage =
    records.find((r) => r.heroPhotoUrl)?.heroPhotoUrl ??
    records.find((r) => r.peak?.heroImageUrl)?.peak?.heroImageUrl ??
    null;

  const featuredRecord = records[0];

  return (
    <div className="pt-14 min-h-screen">

      {/* ── Profile hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background */}
        <div className="absolute inset-0">
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt={profile.displayName}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-base" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1810] via-[#08100b] to-base">
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(ellipse at 25% 35%, rgba(74,122,92,0.5) 0%, transparent 60%), radial-gradient(ellipse at 75% 65%, rgba(200,148,58,0.15) 0%, transparent 50%)" }}
              />
            </div>
          )}
        </div>

        <div className="relative container-wide py-14 md:py-20">
          <div className="grid lg:grid-cols-[1.5fr,0.85fr] gap-8 items-end">
            <div className="space-y-5">
              <span className="text-label text-white/50">Adventure profile</span>
              <div>
                <h1
                  className="font-display text-white leading-[0.9] tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
                >
                  {profile.displayName}
                </h1>
                <p className="mt-2 font-mono text-sm text-white/40 tracking-wider">@{profile.username}</p>
              </div>

              {profile.bio && (
                <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-xl">
                  {profile.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-white/50">
                {profile.homeBase && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-summit-light" />
                    {profile.homeBase}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-summit-light" />
                  {stats.totalPeaksClimbed} {stats.totalPeaksClimbed === 1 ? "peak" : "peaks"} documented
                </div>
              </div>
            </div>

            {/* Aggregate stats pill strip */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Elevation gained", value: formatElevation(stats.totalElevationGainFt), icon: TrendingUp },
                { label: "Trail time", value: formatDuration(stats.totalTrailMinutes), icon: Clock3 },
                { label: "Distance", value: formatDistance(stats.totalDistanceMiles), icon: Route },
                { label: "States / regions", value: String(stats.statesCovered.length), icon: MapPin },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-4">
                    <Icon className="w-3.5 h-3.5 text-summit-light mb-2" />
                    <p className="font-mono text-xl text-white leading-none">{s.value}</p>
                    <p className="text-[11px] text-white/40 mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="container-wide py-12 md:py-16 space-y-12">

        {/* Recap + map */}
        <div className="grid lg:grid-cols-[1fr,0.9fr] gap-6">
          <ProfileRecapCard
            peaksClimbed={stats.totalPeaksClimbed}
            totalElevationGainFt={stats.totalElevationGainFt}
            totalTrailMinutes={stats.totalTrailMinutes}
            statesCoveredCount={stats.statesCovered.length}
            featuredClimbName={featuredRecord?.peakName}
          />
          <MiniSummitMapCard
            peaks={progressPeaks}
            title="Summit map"
            description="Canonical highpoint coverage across the US."
          />
        </div>

        {/* Published climbs */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-label block mb-2">Published climbs</span>
              <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-tight">Story archive</h2>
            </div>
            {records.length > 0 && (
              <span className="font-mono text-sm text-text-muted">{records.length} {records.length === 1 ? "story" : "stories"}</span>
            )}
          </div>

          {records.length === 0 ? (
            <div className="card-base p-10 text-center">
              <Mountain className="w-8 h-8 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">No published climbs yet.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {records.map((record) => {
                const thumb = record.heroPhotoUrl ?? record.peak?.heroImageUrl ?? null;
                return (
                  <IntentLink
                    key={record.id}
                    href={`/u/${profile.username}/climbs/${record.slug}`}
                    hoverPrefetch
                    className="group card-base overflow-hidden hover:border-border-light transition-all duration-300"
                  >
                    {/* Thumb */}
                    <div className="relative h-52 border-b border-border bg-surface overflow-hidden">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={record.peakName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 1280px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0e1810] to-surface">
                          <Mountain className="w-8 h-8 text-summit/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                        <span className="tag text-[10px]">{statusLabel(record.status)}</span>
                        {record.dateClimbed && (
                          <span className="text-[10px] font-mono text-white/50 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(record.dateClimbed)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-display text-2xl text-text-primary leading-tight group-hover:text-white transition-colors">
                        {record.peakName}
                      </h3>
                      <p className="text-xs font-mono text-text-muted">
                        {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
                      </p>

                      {/* Stats mini row */}
                      <div className="flex gap-3 text-xs font-mono text-text-muted pt-1">
                        {record.distanceMiles != null && (
                          <span className="flex items-center gap-1">
                            <Route className="w-3 h-3" />{formatDistance(record.distanceMiles)}
                          </span>
                        )}
                        {record.elevationGainFt != null && (
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />{formatElevation(record.elevationGainFt)}
                          </span>
                        )}
                        {record.durationMinutes != null && (
                          <span className="flex items-center gap-1">
                            <Clock3 className="w-3 h-3" />{formatDuration(record.durationMinutes)}
                          </span>
                        )}
                      </div>

                      {(record.publicNotes || record.specialMemories) && (
                        <p className="text-sm text-text-muted leading-relaxed clamp-2 pt-1">
                          {record.publicNotes || record.specialMemories}
                        </p>
                      )}

                      <div className="flex items-center gap-1 text-xs font-mono text-summit group-hover:text-summit-light transition-colors pt-1">
                        Read story →
                      </div>
                    </div>
                  </IntentLink>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
