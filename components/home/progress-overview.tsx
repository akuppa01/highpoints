import { computeProgress, formatElevation, formatDistance } from "@/lib/utils";
import { getAllPeaksWithClimbs } from "@/lib/data/peaks-data";
import { TrendingUp, Route, Clock, Star } from "lucide-react";

export function ProgressOverview() {
  const peaks = getAllPeaksWithClimbs();
  const stats = computeProgress(peaks);

  const statItems = [
    {
      icon: TrendingUp,
      value: formatElevation(stats.totalElevationGainFt),
      label: "Total Elevation Gained",
      sub: "across all summits",
    },
    {
      icon: Route,
      value: formatDistance(stats.totalDistanceMiles),
      label: "Total Distance",
      sub: "of trail logged",
    },
    {
      icon: Clock,
      value: `${stats.totalHours}h`,
      label: "Time on Trail",
      sub: "moving time",
    },
    {
      icon: Star,
      value: formatElevation(stats.highestPeak?.elevationFt ?? 0),
      label: "Highest Summit",
      sub: stats.highestPeak?.name ?? "—",
    },
  ];

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-wide py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-border">
          {statItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-4 lg:py-2 first:pl-0 last:pr-0">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-summit/10 border border-summit/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-summit" />
              </div>
              <div>
                <div className="font-mono text-xl md:text-2xl text-text-primary tabular-nums">
                  {item.value}
                </div>
                <div className="text-xs text-text-secondary mt-0.5">{item.label}</div>
                <div className="text-xs text-text-muted font-mono">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
