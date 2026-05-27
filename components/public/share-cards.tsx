import { Mountain, TrendingUp, Route, Clock, Star, MapPin } from "lucide-react";
import { formatDistance, formatDuration, formatElevation, formatMaybeElevation } from "@/lib/utils";

// ── iPhone-story-sized share card (9:16 ratio) ─────────────────────────────
export function ClimbRecapCard({
  title,
  subtitle,
  location,
  elevationFt,
  distanceMiles,
  elevationGainFt,
  durationMinutes,
  rating,
  note,
  dateClimbed,
  heroImageUrl,
  displayName,
}: {
  title: string;
  subtitle: string;
  location?: string | null;
  elevationFt?: number | null;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  durationMinutes?: number | null;
  rating?: number | null;
  note?: string | null;
  dateClimbed?: string | null;
  heroImageUrl?: string | null;
  displayName?: string | null;
}) {
  const stats = [
    { icon: Route, label: "Distance", value: typeof distanceMiles === "number" ? formatDistance(distanceMiles) : null },
    { icon: TrendingUp, label: "Elevation Gain", value: typeof elevationGainFt === "number" ? formatMaybeElevation(elevationGainFt) : null },
    { icon: Clock, label: "Time on Trail", value: typeof durationMinutes === "number" ? formatDuration(durationMinutes) : null },
    { icon: Star, label: "Rating", value: typeof rating === "number" ? `${rating}/5` : null },
  ].filter((s) => s.value);

  return (
    // iPhone story ratio: 9:16
    <div
      className="relative overflow-hidden rounded-[28px] bg-[#050807]"
      style={{ aspectRatio: "9/16", maxWidth: 360, margin: "0 auto" }}
    >
      {/* Background hero image — plain <img> so html2canvas can capture it */}
      {heroImageUrl ? (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImageUrl}
            alt={title}
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Layered gradient: dark on top-left for logo, heavy at bottom for content */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
        </div>
      ) : (
        /* Fallback gradient background */
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1810] via-[#080f0b] to-[#050807]">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(74,122,92,0.5) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(200,148,58,0.2) 0%, transparent 50%)"
          }} />
          {/* Topographic-style lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q20 20 40 40 Q60 60 80 40" fill="none" stroke="#ede9e0" strokeWidth="1"/>
                <path d="M0 60 Q20 40 40 60 Q60 80 80 60" fill="none" stroke="#ede9e0" strokeWidth="0.5"/>
                <path d="M0 20 Q20 0 40 20 Q60 40 80 20" fill="none" stroke="#ede9e0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo)"/>
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col px-7 py-8">
        {/* Top: Highpoints brand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-summit/90 backdrop-blur-sm border border-summit-light/30">
            <Mountain className="w-4 h-4 text-white" />
          </div>
          <span className="text-[11px] font-mono text-white/60 tracking-[0.2em] uppercase">Highpoints</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom content block */}
        <div className="space-y-5">
          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-summit-amber flex-shrink-0" />
              <span className="text-[11px] font-mono text-summit-amber/90 tracking-widest uppercase">{location}</span>
            </div>
          )}

          {/* Peak name */}
          <div>
            <h2
              className="font-display text-white leading-[0.88]"
              style={{ fontSize: "clamp(2rem, 10vw, 2.75rem)", fontOpticalSizing: "auto" }}
            >
              {title}
            </h2>
            {elevationFt && (
              <p className="mt-2 font-mono text-summit-amber text-lg tracking-wide">
                {formatElevation(elevationFt)} elev.
              </p>
            )}
          </div>

          {/* Date + climber */}
          {(dateClimbed || displayName) && (
            <div className="flex flex-col gap-1">
              {displayName && (
                <p className="text-[12px] font-mono text-white/70 tracking-wide">
                  Summited by <span className="text-white/90 font-semibold">{displayName}</span>
                </p>
              )}
              {dateClimbed && (
                <p className="text-[11px] font-mono text-white/40 tracking-wide">{dateClimbed}</p>
              )}
            </div>
          )}

          {/* Personal note */}
          {note && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 backdrop-blur-sm">
              <p className="text-[13px] leading-relaxed text-white/75 italic">"{note}"</p>
            </div>
          )}

          {/* Stats grid */}
          {stats.length > 0 && (
            <div className={`grid gap-2 ${stats.length === 4 ? "grid-cols-2" : stats.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm"
                  >
                    <Icon className="w-3 h-3 text-summit-light mb-2 opacity-80" />
                    <p className="font-mono text-white text-base leading-none">{stat.value}</p>
                    <p className="text-[10px] text-white/45 mt-1 tracking-wide uppercase">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Branding footer */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <p className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">Tracked with Highpoints</p>
            <p className="text-[10px] font-mono text-white/20">highpoints.app</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Public profile recap card ───────────────────────────────────────────────
export function ProfileRecapCard({
  peaksClimbed,
  totalElevationGainFt,
  totalTrailMinutes,
  statesCoveredCount,
  featuredClimbName,
}: {
  peaksClimbed: number;
  totalElevationGainFt: number;
  totalTrailMinutes: number;
  statesCoveredCount: number;
  featuredClimbName?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#141a14] via-[#100e0d] to-[#0a0908] p-7">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: "radial-gradient(ellipse at 25% 25%, rgba(74,122,92,0.35) 0%, transparent 60%)"
      }} />
      <div className="relative">
        <p className="text-label mb-4">Adventure recap</p>
        <h3 className="font-display text-5xl text-text-primary tracking-tight leading-none">
          {peaksClimbed}
        </h3>
        <p className="text-text-secondary mt-1 text-lg">
          {peaksClimbed === 1 ? "peak summited" : "peaks summited"}
        </p>
        <p className="text-text-muted mt-1 text-sm">
          {formatElevation(totalElevationGainFt)} of vertical gain tracked
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1.5">States</p>
            <p className="font-display text-2xl text-text-primary">{statesCoveredCount}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1.5">Trail time</p>
            <p className="font-display text-2xl text-text-primary">{formatDuration(totalTrailMinutes)}</p>
          </div>
        </div>

        {featuredClimbName && (
          <div className="mt-5 flex items-center gap-2">
            <Mountain className="w-3.5 h-3.5 text-summit flex-shrink-0" />
            <p className="text-sm text-text-secondary">
              Featured: <span className="text-text-primary font-medium">{featuredClimbName}</span>
            </p>
          </div>
        )}

        <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">
          Tracked with Highpoints
        </p>
      </div>
    </div>
  );
}
