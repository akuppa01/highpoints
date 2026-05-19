export function JourneyMap({
  points,
}: {
  points: { id: string; name: string; latitude?: number | null; longitude?: number | null }[];
}) {
  const valid = points.filter(
    (point) =>
      typeof point.latitude === "number" &&
      typeof point.longitude === "number" &&
      Number.isFinite(point.latitude) &&
      Number.isFinite(point.longitude)
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#101615] via-[#0d0f10] to-[#090a0a] min-h-[300px]">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(95,153,112,0.35), transparent 25%), radial-gradient(circle at 80% 30%, rgba(236,232,223,0.12), transparent 22%), radial-gradient(circle at 50% 70%, rgba(95,153,112,0.22), transparent 28%)" }} />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(236,232,223,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,223,0.9) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />

      {valid.map((point) => {
        const x = ((point.longitude as number) + 180) / 360;
        const y = (90 - (point.latitude as number)) / 180;
        return (
          <div
            key={point.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
          >
            <div className="w-3 h-3 rounded-full bg-summit border border-summit-light/60 glow-summit" />
            <div className="mt-2 whitespace-nowrap rounded-full border border-border bg-base/90 px-2 py-1 text-[10px] font-mono text-text-secondary">
              {point.name}
            </div>
          </div>
        );
      })}

      {!valid.length && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-text-muted">
          Published climbs without coordinates still appear in the portfolio. Add latitude and longitude to place them on the journey map.
        </div>
      )}
    </div>
  );
}
