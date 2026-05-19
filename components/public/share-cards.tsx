import { formatDistance, formatDuration, formatElevation, formatMaybeElevation } from "@/lib/utils";

export function ClimbRecapCard({
  title,
  subtitle,
  distanceMiles,
  elevationGainFt,
  durationMinutes,
}: {
  title: string;
  subtitle: string;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  durationMinutes?: number | null;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-[#121818] via-[#0d1111] to-[#0a0a0a] p-6">
      <div className="absolute inset-0 opacity-20 bg-gradient-radial from-summit/25 via-transparent to-transparent" />
      <div className="relative">
        <p className="text-label mb-3">Share card</p>
        <h3 className="font-display text-3xl text-text-primary leading-tight">{title}</h3>
        <p className="text-text-secondary mt-2">{subtitle}</p>
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
          Tracked with High Points
        </p>
      </div>
    </div>
  );
}

export function ProfileRecapCard({
  peaksClimbed,
  totalElevationGainFt,
  highestSummit,
}: {
  peaksClimbed: number;
  totalElevationGainFt: number;
  highestSummit?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-[#141614] via-[#100e0d] to-[#0a0908] p-6">
      <div className="absolute inset-0 opacity-25 bg-gradient-radial from-summit-amber/20 via-transparent to-transparent" />
      <div className="relative">
        <p className="text-label mb-3">Profile recap</p>
        <h3 className="font-display text-4xl text-text-primary tracking-tight">{peaksClimbed} peaks climbed</h3>
        <p className="text-text-secondary mt-3">
          {formatElevation(totalElevationGainFt)} gained across published adventures.
        </p>
        <div className="mt-8 rounded-2xl border border-white/8 bg-white/5 p-4">
          <p className="text-xs text-text-muted">Highest summit</p>
          <p className="font-display text-2xl text-text-primary mt-1">{highestSummit || "Still climbing"}</p>
        </div>
        <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.24em] text-text-muted">
          Tracked with High Points
        </p>
      </div>
    </div>
  );
}
