import { Plus, ExternalLink, LayoutGrid, List } from "lucide-react";
import { getDashboardRecords } from "@/lib/data/records";
import { DashboardStatsBar } from "@/components/dashboard/dashboard-stats";
import { DashboardRecords } from "@/components/dashboard/dashboard-records";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { MiniSummitMapCard } from "@/components/map/mini-summit-map-card";
import { IntentLink } from "@/components/ui/intent-link";
import { SummitImage } from "@/components/media/summit-image";
import { JOURNAL_STAGE_META, type JournalStage } from "@/lib/records-ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const stageFilter =
    typeof params.stage === "string" &&
    ["plan", "in_progress", "completed"].includes(params.stage)
      ? (params.stage as JournalStage)
      : "all";
  const viewMode = params.view === "list" ? "list" : "board";
  const created = params.created === "1";
  const recordId = typeof params.record === "string" ? params.record : null;
  const error = typeof params.error === "string" ? params.error : null;
  const deleted = params.deleted === "1";
  const { profile, records, stats } = await getDashboardRecords();
  const enabled = isSupabaseConfigured();
  const journalHero =
    records.find((record) => record.heroPhotoUrl)?.heroPhotoUrl ??
    records.find((record) => record.peak?.heroImageUrl)?.peak?.heroImageUrl ??
    null;

  return (
    <div className="pt-14 min-h-screen">
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-10 space-y-8">
          <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr] xl:items-stretch">
            <div className="card-base relative overflow-hidden">
              {journalHero ? (
                <div className="absolute inset-0 opacity-25">
                  <SummitImage
                    src={journalHero}
                    alt={profile.displayName}
                    sizes="(max-width: 1280px) 100vw, 55vw"
                  />
                </div>
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-br from-base via-base/92 to-base/78" />
              <div className="relative p-7 md:p-8">
                <span className="text-label block mb-3">Personal dashboard</span>
                <h1 className="font-display text-4xl md:text-5xl tracking-tight text-text-primary">
                  {profile.displayName}
                </h1>
                <p className="mt-2 text-lg text-text-secondary">Climbing Journal</p>
                <p className="text-text-secondary mt-5 max-w-2xl leading-relaxed">
                  Track meaningful climbs, future plans, and unfinished attempts in one calm workspace.
                </p>
              </div>
            </div>

            <MiniSummitMapCard
              records={records}
              title="Highpoints map"
              description="A quick read on your canonical summit coverage, right beside the journal."
            />
          </div>

          <DashboardStatsBar stats={stats} />
        </div>
      </div>

      <div className="container-wide py-10 space-y-6">
        {created && (
          <div className="rounded-2xl border border-summit/25 bg-summit/10 px-5 py-4 text-sm text-text-secondary">
            Record saved to your journal.
            {recordId ? (
              <IntentLink href={`/dashboard/records/${recordId}`} hoverPrefetch pendingHint className="ml-2 text-summit hover:text-summit-light transition-colors">
                Open the full editor
              </IntentLink>
            ) : null}
          </div>
        )}

        {deleted && (
          <div className="rounded-2xl border border-summit/25 bg-summit/10 px-5 py-4 text-sm text-text-secondary">
            Record deleted from your journal.
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-100">
            Record could not be saved yet.
            <span className="ml-2 text-rose-200/80">{decodeURIComponent(error)}</span>
          </div>
        )}

        {!enabled && (
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm text-amber-50">
            Supabase is not configured in this environment yet, so this dashboard is running in setup mode.
            Add auth and database env vars to persist records and publish public pages.
          </div>
        )}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <IntentLink
                href="/dashboard?view=board"
                hoverPrefetch
                pendingHint
                className={`inline-flex min-w-[116px] items-center justify-center gap-2 px-3 py-2 rounded-lg border text-center text-sm transition-colors ${viewMode === "board" ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
              >
                <LayoutGrid className="h-4 w-4" />
                Board view
              </IntentLink>
              <IntentLink
                href={`/dashboard?view=list${stageFilter !== "all" ? `&stage=${stageFilter}` : ""}`}
                hoverPrefetch
                pendingHint
                className={`inline-flex min-w-[116px] items-center justify-center gap-2 px-3 py-2 rounded-lg border text-center text-sm transition-colors ${viewMode === "list" ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
              >
                <List className="h-4 w-4" />
                List view
              </IntentLink>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <IntentLink
                href={`/dashboard?view=${viewMode}`}
                hoverPrefetch
                pendingHint
                className={`inline-flex min-w-[84px] items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-center text-xs font-mono transition-colors ${stageFilter === "all" ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
              >
                All
              </IntentLink>
              {(["plan", "in_progress", "completed"] as JournalStage[]).map((stage) => (
                <IntentLink
                  key={stage}
                  href={`/dashboard?view=${viewMode}&stage=${stage}`}
                  hoverPrefetch
                  pendingHint
                  className={`inline-flex min-w-[108px] items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-center text-xs font-mono transition-colors ${stageFilter === stage ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
                >
                  {JOURNAL_STAGE_META[stage].label}
                </IntentLink>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            {enabled ? (
              <IntentLink href={`/u/${profile.username}`} hoverPrefetch pendingHint className="btn-secondary">
                Public profile
                <ExternalLink className="w-4 h-4" />
              </IntentLink>
            ) : null}
            <IntentLink href="/dashboard/new" hoverPrefetch pendingHint className="btn-primary">
              <Plus className="w-4 h-4" />
              New record
            </IntentLink>
          </div>
        </div>

        <DashboardRecords
          records={records}
          viewMode={viewMode}
          stageFilter={stageFilter}
          username={profile.username}
        />
      </div>
    </div>
  );
}
