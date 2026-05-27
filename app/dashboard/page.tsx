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
    records.find((r) => r.heroPhotoUrl)?.heroPhotoUrl ??
    records.find((r) => r.peak?.heroImageUrl)?.peak?.heroImageUrl ??
    null;

  return (
    <div className="pt-14 min-h-screen">

      {/* ── Journal hero header ────────────────────────────────────────── */}
      <div className="relative border-b border-border overflow-hidden">
        {/* Background image or gradient */}
        <div className="absolute inset-0">
          {journalHero ? (
            <>
              <SummitImage
                src={journalHero}
                alt={profile.displayName}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-base" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1810] via-[#09100c] to-base">
              <div
                className="absolute inset-0 opacity-25"
                style={{ backgroundImage: "radial-gradient(ellipse at 20% 30%, rgba(74,122,92,0.45) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(200,148,58,0.12) 0%, transparent 50%)" }}
              />
            </div>
          )}
        </div>

        <div className="relative container-wide py-10 md:py-14">
          <div className="grid gap-6 xl:grid-cols-[1.35fr,0.65fr] xl:items-start">

            {/* Profile block */}
            <div className="space-y-4">
              <span className="text-label text-white/50">Personal dashboard</span>
              <h1
                className="font-display text-white leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
              >
                {profile.displayName}
              </h1>
              <p className="text-base text-white/55 font-mono tracking-wide">Climbing Journal</p>
              <p className="text-white/50 max-w-xl leading-relaxed text-sm md:text-base">
                Track meaningful climbs, future plans, and unfinished attempts in one calm workspace.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {enabled && (
                  <IntentLink
                    href={`/u/${profile.username}`}
                    hoverPrefetch
                    pendingHint
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors backdrop-blur-sm bg-black/25 px-4 py-2 rounded-xl border border-white/10"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Public profile
                  </IntentLink>
                )}
                <IntentLink
                  href="/dashboard/new"
                  hoverPrefetch
                  pendingHint
                  className="inline-flex items-center gap-2 text-sm bg-summit text-white px-4 py-2 rounded-xl border border-summit-light/30 hover:bg-summit-light transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New record
                </IntentLink>
              </div>
            </div>

            {/* Compact map — right side of hero */}
            <MiniSummitMapCard
              records={records}
              title="Highpoints map"
              description="Your progress at a glance."
              compact
            />
          </div>
        </div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface/80">
        <div className="container-wide py-1">
          <DashboardStatsBar stats={stats} />
        </div>
      </div>

      {/* ── Records section ───────────────────────────────────────────── */}
      <div className="container-wide py-10 space-y-6">

        {/* Alerts */}
        {created && (
          <div className="rounded-2xl border border-summit/25 bg-summit/10 px-5 py-4 text-sm text-text-secondary">
            Record saved to your journal.
            {recordId && (
              <IntentLink href={`/dashboard/records/${recordId}`} hoverPrefetch pendingHint className="ml-2 text-summit hover:text-summit-light transition-colors">
                Open the full editor →
              </IntentLink>
            )}
          </div>
        )}
        {deleted && (
          <div className="rounded-2xl border border-summit/25 bg-summit/10 px-5 py-4 text-sm text-text-secondary">
            Record removed from your journal.
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-100">
            Could not save record.
            <span className="ml-2 text-rose-200/70">{decodeURIComponent(error)}</span>
          </div>
        )}
        {!enabled && (
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm text-amber-50">
            Supabase is not configured — running in setup mode. Add auth + database env vars to persist records.
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            {/* View toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-border bg-card/60 p-1 w-fit">
              <IntentLink
                href="/dashboard?view=board"
                hoverPrefetch pendingHint
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${viewMode === "board" ? "bg-surface border border-border-light text-text-primary" : "text-text-muted hover:text-text-secondary"}`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Board
              </IntentLink>
              <IntentLink
                href={`/dashboard?view=list${stageFilter !== "all" ? `&stage=${stageFilter}` : ""}`}
                hoverPrefetch pendingHint
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${viewMode === "list" ? "bg-surface border border-border-light text-text-primary" : "text-text-muted hover:text-text-secondary"}`}
              >
                <List className="h-3.5 w-3.5" />
                List
              </IntentLink>
            </div>

            {/* Stage filter pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <IntentLink
                href={`/dashboard?view=${viewMode}`}
                hoverPrefetch pendingHint
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono transition-colors ${stageFilter === "all" ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
              >
                All
              </IntentLink>
              {(["plan", "in_progress", "completed"] as JournalStage[]).map((stage) => (
                <IntentLink
                  key={stage}
                  href={`/dashboard?view=${viewMode}&stage=${stage}`}
                  hoverPrefetch pendingHint
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono transition-colors ${stageFilter === stage ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
                >
                  {JOURNAL_STAGE_META[stage].label}
                </IntentLink>
              ))}
            </div>
          </div>

          {/* New record CTA — top-right of the board */}
          <IntentLink
            href="/dashboard/new"
            hoverPrefetch
            pendingHint
            className="inline-flex items-center gap-2 self-start lg:self-auto text-sm bg-summit text-white px-4 py-2 rounded-xl border border-summit-light/30 hover:bg-summit-light transition-all flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            New record
          </IntentLink>
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
