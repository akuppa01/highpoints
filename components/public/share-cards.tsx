import { formatDistance, formatDuration, formatElevation, formatMaybeElevation } from "@/lib/utils";

export function ClimbRecapCard({
  title,
  subtitle,
  distanceMiles,
  elevationGainFt,
  durationMinutes,
  note,
}: {
  title: string;
  subtitle: string;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  durationMinutes?: number | null;
  note?: string | null;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-[#121818] via-[#0d1111] to-[#0a0a0a] p-6">
      <div className="absolute inset-0 opacity-20 bg-gradient-radial from-summit/25 via-transparent to-transparent" />
      <div className="relative">
        <p className="text-label mb-3">Share card</p>
        <h3 className="font-display text-3xl font-semibold text-text-primary leading-tight">{title}</h3>
        <p className="text-text-secondary mt-2">{subtitle}</p>
        {note ? (
          <p className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm leading-relaxed text-text-secondary">
            {note}
          </p>
        ) : null}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
            <p className="font-mono text-text-primary">{typeof distanceMiles === "number" ? formatDistance(distanceMiles) : "—"}</p>
            <p className="text-xs text-text-muted mt-1">Distance</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
            <p className="font-mono text-text-primary">{formatMaybeElevation(elevationGainFt)}</p>
            <p className="text-xs text-text-muted mt-1">Gain</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
            <p className="font-mono text-text-primary">
              {typeof durationMinutes === "number" ? formatDuration(durationMinutes) : "—"}
            </p>
            <p className="text-xs text-text-muted mt-1">Time</p>
          </div>
        </div>
        <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.24em] text-text-muted">
          Tracked with Highpoints
        </p>
      </div>
    </div>
  );
}

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
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-[#141614] via-[#100e0d] to-[#0a0908] p-6">
      <div className="absolute inset-0 opacity-25 bg-gradient-radial from-summit-amber/20 via-transparent to-transparent" />
      <div className="relative">
        <p className="text-label mb-3">Profile recap</p>
        <h3 className="font-display text-4xl font-semibold text-text-primary tracking-tight">
          {peaksClimbed} {peaksClimbed === 1 ? "peak" : "peaks"} climbed
        </h3>
        <p className="text-text-secondary mt-3">
          {formatElevation(totalElevationGainFt)} gained across published climb stories.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-xs text-text-muted">Areas logged</p>
            <p className="font-display text-2xl font-semibold text-text-primary mt-1">
              {statesCoveredCount} areas
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-xs text-text-muted">Trail time</p>
            <p className="font-display text-2xl font-semibold text-text-primary mt-1">
              {formatDuration(totalTrailMinutes)}
            </p>
          </div>
        </div>
        {featuredClimbName ? (
          <p className="mt-5 text-sm text-text-secondary">
            Featured story: <span className="text-text-primary">{featuredClimbName}</span>
          </p>
        ) : null}
        <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.24em] text-text-muted">
          Tracked with Highpoints
        </p>
      </div>
    </div>
  );
}
