import { Compass, Mountain, Route, Clock4 } from "lucide-react";
import { formatElevation, formatDistance, formatDuration } from "@/lib/utils";
import type { DashboardStats } from "@/types";

export function DashboardStatsBar({ stats }: { stats: DashboardStats }) {
  const items = [
    {
      icon: Mountain,
      value: stats.completed.toString(),
      label: "Completed",
      sub: `${stats.totalRecords} total records`,
    },
    {
      icon: Compass,
      value: formatElevation(stats.totalElevationGainFt),
      label: "Elevation gained",
      sub: stats.highestPeakName ? `Highest summit: ${stats.highestPeakName}` : "Across logged outings",
    },
    {
      icon: Route,
      value: formatDistance(stats.totalDistanceMiles),
      label: "Distance logged",
      sub: `${stats.planned} in the queue`,
    },
    {
      icon: Clock4,
      value: formatDuration(stats.totalTrailMinutes),
      label: "Time on trail",
      sub: `${stats.revisits} revisit flags`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="card-base flex items-start gap-4 px-5 py-5">
          <div className="w-9 h-9 rounded-xl bg-summit/10 border border-summit/20 flex items-center justify-center flex-shrink-0">
            <item.icon className="w-4 h-4 text-summit" />
          </div>
          <div>
            <p className="font-mono text-xl md:text-2xl text-text-primary">{item.value}</p>
            <p className="text-sm text-text-secondary">{item.label}</p>
            <p className="text-xs text-text-muted font-mono">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
