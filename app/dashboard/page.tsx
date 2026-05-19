import { Plus, ExternalLink } from "lucide-react";
import { signOutAction } from "@/app/dashboard/actions";
import { getDashboardRecords } from "@/lib/data/records";
import { DashboardStatsBar } from "@/components/dashboard/dashboard-stats";
import { DashboardRecords } from "@/components/dashboard/dashboard-records";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { MiniSummitMapCard } from "@/components/map/mini-summit-map-card";
import { IntentLink } from "@/components/ui/intent-link";
import { SummitImage } from "@/components/media/summit-image";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const view = params.view === "all" ? "all" : "overview";
  const tab =
    typeof params.tab === "string" &&
    ["overview", "plan", "in_progress", "completed", "published", "all"].includes(params.tab)
      ? params.tab
      : "overview";
  const created = params.created === "1";
  const recordId = typeof params.record === "string" ? params.record : null;
  const error = typeof params.error === "string" ? params.error : null;
  const deleted = params.deleted === "1";
  const bulk = typeof params.bulk === "string" ? params.bulk : null;
  const bulkCount = typeof params.count === "string" ? Number(params.count) : null;
  const { profile, records, stats } = await getDashboardRecords();
  const enabled = isSupabaseConfigured();
  const journalHero = records.find((record) => record.heroPhotoUrl)?.heroPhotoUrl ?? records.find((record) => record.peak?.heroImageUrl)?.peak?.heroImageUrl ?? null;

  const TABS = [
    { key: "overview", label: "Overview" },
    { key: "plan", label: "Planning" },
    { key: "in_progress", label: "In progress" },
    { key: "completed", label: "Completed" },
    { key: "published", label: "Published" },
    { key: "all", label: "All records" },
  ] as const;

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
                Your planning list, completed hikes, drafts, and published stories all live here.
                Start fast, refine later, and publish only what deserves a permanent page.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {enabled && (
                  <>
                    <IntentLink href={`/u/${profile.username}`} hoverPrefetch pendingHint className="btn-secondary">
                      Public profile
                      <ExternalLink className="w-4 h-4" />
                    </IntentLink>
                    <form action={signOutAction}>
                      <button type="submit" className="btn-secondary">
                        Sign out
                      </button>
                    </form>
                  </>
                )}
                <IntentLink href="/dashboard/new" hoverPrefetch pendingHint className="btn-primary">
                  <Plus className="w-4 h-4" />
                  New record
                </IntentLink>
              </div>
              </div>
            </div>

            <MiniSummitMapCard
              records={records}
              title="Journal map"
              description="A quick read on your canonical summit coverage, right beside the journal where you track the story."
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

        {deleted && (
          <div className="rounded-2xl border border-summit/25 bg-summit/10 px-5 py-4 text-sm text-text-secondary">
            Record deleted from your journal.
          </div>
        )}

        {bulk && bulkCount ? (
          <div className="rounded-2xl border border-summit/25 bg-summit/10 px-5 py-4 text-sm text-text-secondary">
            Applied <span className="text-text-primary">{bulk.replaceAll("_", " ")}</span> to {bulkCount} record{bulkCount === 1 ? "" : "s"}.
          </div>
        ) : null}

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-label mb-2">Journal tabs</p>
            <div className="flex flex-wrap items-center gap-2">
              {TABS.map((item) => (
                <IntentLink
                  key={item.key}
                  href={`/dashboard?view=${item.key === "overview" ? "overview" : "all"}&tab=${item.key}`}
                  pendingHint
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${tab === item.key ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
                >
                  {item.label}
                </IntentLink>
              ))}
            </div>
          </div>
          <p className="text-xs font-mono text-text-muted">{records.length} records in view</p>
        </div>
          <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
            <div className="card-base p-5 md:p-6">
              <p className="text-label mb-2">Journal direction</p>
              <p className="font-display text-2xl tracking-tight text-text-primary">
                Use planning tabs for future goals, completed tabs for finished stories, and published tabs when you want to manage what the public sees.
              </p>
            </div>
            <div className="card-base p-5 md:p-6">
              <p className="text-label mb-2">Public journal</p>
              <p className="text-sm leading-relaxed text-text-secondary">
                Your shareable journal already lives at <span className="text-text-primary">/u/{profile.username}</span>.
                Published climb pages stay unique per record, so repeated hikes of the same peak can each have their own story and URL.
              </p>
            </div>
          </div>
        </div>

        <DashboardRecords records={records} view={view} tab={tab as "overview" | "plan" | "in_progress" | "completed" | "published" | "all"} username={profile.username} />
      </div>
    </div>
  );
}
