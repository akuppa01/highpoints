import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { signOutAction } from "@/app/dashboard/actions";
import { getDashboardRecords } from "@/lib/data/records";
import { DashboardStatsBar } from "@/components/dashboard/dashboard-stats";
import { DashboardRecords } from "@/components/dashboard/dashboard-records";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { MiniSummitMapCard } from "@/components/map/mini-summit-map-card";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const view = params.view === "all" ? "all" : "overview";
  const created = params.created === "1";
  const recordId = typeof params.record === "string" ? params.record : null;
  const error = typeof params.error === "string" ? params.error : null;
  const { profile, records, stats } = await getDashboardRecords();
  const enabled = isSupabaseConfigured();

  return (
    <div className="pt-14 min-h-screen">
      <div className="border-b border-border bg-surface">
        <div className="container-wide py-10 space-y-8">
          <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr] xl:items-stretch">
            <div className="card-base p-7 md:p-8">
              <span className="text-label block mb-3">Personal dashboard</span>
              <h1 className="font-display text-4xl md:text-5xl tracking-tight text-text-primary">
                {profile.displayName}
              </h1>
              <p className="mt-2 text-lg text-text-secondary">Climbing Journal</p>
              <p className="text-text-secondary mt-5 max-w-2xl leading-relaxed">
                Track meaningful climbs, future plans, and unfinished attempts in one calm workspace.
                Keep drafts private, then publish only the pieces worth sharing.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {enabled && (
                  <>
                    <Link href={`/u/${profile.username}`} className="btn-secondary">
                      Public profile
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <form action={signOutAction}>
                      <button type="submit" className="btn-secondary">
                        Sign out
                      </button>
                    </form>
                  </>
                )}
                <Link href="/dashboard/new" className="btn-primary">
                  <Plus className="w-4 h-4" />
                  New record
                </Link>
              </div>
            </div>

            <MiniSummitMapCard
              records={records}
              description="A compact read on your canonical state-highpoint progress without the extra visual noise."
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
              <Link href={`/dashboard/records/${recordId}`} className="ml-2 text-summit hover:text-summit-light transition-colors">
                Open the full editor
              </Link>
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

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-label mb-2">Journal view</p>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard?view=overview"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${view === "overview" ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
              >
                Overview
              </Link>
              <Link
                href="/dashboard?view=all"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${view === "all" ? "border-border-light bg-card text-text-primary" : "border-transparent text-text-muted hover:border-border hover:text-text-secondary"}`}
              >
                All records
              </Link>
            </div>
          </div>
          <p className="text-xs font-mono text-text-muted">{records.length} records in view</p>
        </div>

        <DashboardRecords records={records} view={view} />
      </div>
    </div>
  );
}
