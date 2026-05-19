import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Route, Clock3, TrendingUp } from "lucide-react";
import { getPublicProfileByUsername } from "@/lib/data/records";
import { MiniSummitMapCard } from "@/components/map/mini-summit-map-card";
import { ProfileRecapCard } from "@/components/public/share-cards";
import { formatDistance, formatDuration, formatElevation, statusLabel } from "@/lib/utils";

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

  return (
    <div className="pt-14 min-h-screen">
      <section className="container-wide py-12 md:py-16 space-y-8">
        <div className="grid lg:grid-cols-[1.45fr,0.95fr] gap-6">
          <div className="card-base p-8 md:p-10 bg-gradient-to-br from-summit/10 via-transparent to-transparent">
            <span className="text-label block mb-3">Adventure profile</span>
            <h1 className="font-display text-5xl md:text-6xl tracking-tight text-text-primary">
              {profile.displayName}
            </h1>
            <p className="text-text-muted font-mono mt-2">@{profile.username}</p>
            <p className="text-text-secondary mt-5 max-w-2xl leading-relaxed">
              {profile.bio || "A published trail journal of summits, revisits, highpoints, and memorable miles."}
            </p>
            <div className="flex flex-wrap gap-5 mt-8 text-sm text-text-secondary">
              {profile.homeBase && (
                <div className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-summit" />
                  {profile.homeBase}
                </div>
              )}
              <div className="inline-flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-summit" />
                {stats.totalPeaksClimbed} published completions
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProfileRecapCard
              peaksClimbed={stats.totalPeaksClimbed}
              totalElevationGainFt={stats.totalElevationGainFt}
              highestSummit={stats.highestSummit?.name}
            />
            <MiniSummitMapCard
              records={records}
              description="A quick glance at published summit coverage across the classic state-highpoint map."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              icon: Route,
              value: formatDistance(stats.totalDistanceMiles),
              label: "Distance",
            },
            {
              icon: TrendingUp,
              value: formatElevation(stats.totalElevationGainFt),
              label: "Elevation gain",
            },
            {
              icon: Clock3,
              value: formatDuration(stats.totalTrailMinutes),
              label: "Trail time",
            },
            {
              icon: MapPin,
              value: `${stats.statesCovered.length} states/regions`,
              label: "Coverage",
            },
          ].map((item) => (
            <div key={item.label} className="card-base p-5">
              <item.icon className="w-4 h-4 text-summit mb-4" />
              <div className="font-mono text-2xl text-text-primary">{item.value}</div>
              <div className="text-sm text-text-secondary mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        <section className="space-y-4">
          <div>
            <span className="text-label block mb-2">Published climbs</span>
            <h2 className="font-display text-3xl text-text-primary tracking-tight">The portfolio</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {records.map((record) => (
              <Link key={record.id} href={`/u/${profile.username}/climbs/${record.slug}`} className="card-base p-5 space-y-3 hover:bg-card-hover">
                <div className="flex items-center justify-between gap-3">
                  <span className="tag">{statusLabel(record.status)}</span>
                  {record.dateClimbed && (
                    <span className="text-xs font-mono text-text-muted">{record.dateClimbed}</span>
                  )}
                </div>
                <h3 className="font-display text-2xl text-text-primary">{record.peakName}</h3>
                <p className="text-sm text-text-secondary">
                  {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
                </p>
                <p className="text-sm text-text-muted clamp-3">
                  {record.publicNotes || record.specialMemories || "Published without a written story yet."}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
