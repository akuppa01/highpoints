import { Clock4, Compass, Mountain, Route } from "lucide-react";
import type { DashboardStats } from "@/types";
import { formatDistance, formatDuration, formatElevation } from "@/lib/utils";

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
      sub: stats.highestPeakName
        ? `Featured summit: ${stats.highestPeakName}`
        : "Across logged outings",
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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="card-base flex items-start gap-4 px-5 py-5">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-summit/20 bg-summit/10">
              <Icon className="h-4 w-4 text-summit" />
            </div>
            <div>
              <p className="font-mono text-xl text-text-primary md:text-2xl">{item.value}</p>
              <p className="text-sm text-text-secondary">{item.label}</p>
              <p className="text-xs font-mono text-text-muted">{item.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
