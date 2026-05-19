"use client";

import { bulkRecordAction, quickStatusUpdateAction } from "@/app/dashboard/actions";
import { IntentLink } from "@/components/ui/intent-link";
import {
  groupRecordsByJournalStage,
  JOURNAL_STAGE_META,
  JOURNAL_STAGE_ORDER,
  RECORD_STATUS_OPTIONS,
  type JournalStage,
} from "@/lib/records-ui";
import {
  cn,
  formatDateShort,
  formatMaybeDistance,
  formatMaybeDuration,
  formatMaybeElevation,
  statusAccent,
  statusLabel,
} from "@/lib/utils";
import type { PeakRecord, RecordStatus } from "@/types";

type DashboardTab = "overview" | "plan" | "in_progress" | "completed" | "published" | "all";

function getRecordViewHref(record: PeakRecord, username: string) {
  if (record.isPublished) {
    return `/u/${username}/climbs/${record.slug}`;
  }

  return `/dashboard/records/${record.id}`;
}

function getRecordEditHref(record: PeakRecord) {
  return `/dashboard/records/${record.id}`;
}

function StatusSelect({ recordId, status }: { recordId: string; status: RecordStatus }) {
  return (
    <form action={quickStatusUpdateAction}>
      <input type="hidden" name="record_id" value={recordId} />
      <select
        name="status"
        defaultValue={status}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="bg-transparent text-xs font-mono text-text-secondary border border-border rounded-lg px-2 py-1 focus:outline-none"
      >
        {RECORD_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="bg-card text-text-primary">
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}

function SecondaryStatus({ status }: { status: RecordStatus }) {
  if (status === "completed") return null;

  return (
    <span className={cn("tag", statusAccent(status))}>
      {statusLabel(status)}
    </span>
  );
}

function RecordRow({ record, username }: { record: PeakRecord; username: string }) {
  const href = getRecordViewHref(record, username);
  const editHref = getRecordEditHref(record);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card/75 px-4 py-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={cn("tag", statusAccent(record.status))}>{statusLabel(record.status)}</span>
          {record.dateClimbed ? (
            <span className="text-[11px] font-mono text-text-muted">{formatDateShort(record.dateClimbed)}</span>
          ) : null}
          {record.plannedFor ? (
            <span className="text-[11px] font-mono text-text-muted">Planned {formatDateShort(record.plannedFor)}</span>
          ) : null}
        </div>
        <IntentLink href={href} hoverPrefetch pendingHint className="block">
          <h3 className="font-display text-2xl leading-tight text-text-primary">{record.peakName}</h3>
        </IntentLink>
        <p className="mt-1 text-sm text-text-muted">
          {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono">
          <IntentLink href={editHref} hoverPrefetch pendingHint className="text-text-secondary hover:text-text-primary transition-colors">
            Edit record
          </IntentLink>
          {record.isPublished ? (
            <IntentLink href={href} hoverPrefetch pendingHint className="text-summit hover:text-summit-light transition-colors">
              View public story
            </IntentLink>
          ) : (
            <span className="text-text-muted">Private draft</span>
          )}
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center gap-3 md:w-auto md:justify-end">
        <div className="grid w-full grid-cols-3 gap-2 md:min-w-[240px] md:w-auto">
          <div className="rounded-xl border border-border bg-base/70 px-3 py-2">
            <p className="font-mono text-text-primary">{formatMaybeDistance(record.distanceMiles)}</p>
            <p className="text-[11px] text-text-muted">Distance</p>
          </div>
          <div className="rounded-xl border border-border bg-base/70 px-3 py-2">
            <p className="font-mono text-text-primary">{formatMaybeElevation(record.elevationGainFt)}</p>
            <p className="text-[11px] text-text-muted">Gain</p>
          </div>
          <div className="rounded-xl border border-border bg-base/70 px-3 py-2">
            <p className="font-mono text-text-primary">{formatMaybeDuration(record.durationMinutes)}</p>
            <p className="text-[11px] text-text-muted">Time</p>
          </div>
        </div>
        <StatusSelect recordId={record.id} status={record.status} />
      </div>
    </article>
  );
}

function RecordCard({ record, username }: { record: PeakRecord; username: string }) {
  const href = getRecordViewHref(record, username);
  const editHref = getRecordEditHref(record);

  return (
    <article className="card-base p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="tag border border-summit/25 bg-summit/10 text-summit">Completed</span>
            <SecondaryStatus status={record.status} />
            {record.dateClimbed ? (
              <span className="text-[11px] font-mono text-text-muted">{formatDateShort(record.dateClimbed)}</span>
            ) : null}
          </div>
          <IntentLink href={href} hoverPrefetch pendingHint className="block">
            <h3 className="font-display text-2xl leading-tight text-text-primary">{record.peakName}</h3>
          </IntentLink>
          <p className="text-sm text-text-muted mt-1">
            {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
          </p>
        </div>
        <StatusSelect recordId={record.id} status={record.status} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-xl border border-border bg-base/70 px-3 py-2">
          <p className="font-mono text-text-primary">{formatMaybeDistance(record.distanceMiles)}</p>
          <p className="text-text-muted">Distance</p>
        </div>
        <div className="rounded-xl border border-border bg-base/70 px-3 py-2">
          <p className="font-mono text-text-primary">{formatMaybeElevation(record.elevationGainFt)}</p>
          <p className="text-text-muted">Gain</p>
        </div>
        <div className="rounded-xl border border-border bg-base/70 px-3 py-2">
          <p className="font-mono text-text-primary">{formatMaybeDuration(record.durationMinutes)}</p>
          <p className="text-text-muted">Time</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-text-muted">
          {record.isPublished ? "Published to public profile" : "Private draft"}
        </p>
        <div className="flex items-center gap-3">
          <IntentLink href={editHref} hoverPrefetch pendingHint className="text-xs font-mono text-text-secondary hover:text-text-primary transition-colors">
            Edit
          </IntentLink>
          <IntentLink href={href} hoverPrefetch pendingHint className="text-xs font-mono text-summit hover:text-summit-light transition-colors">
            {record.isPublished ? "View story" : "Preview"}
          </IntentLink>
        </div>
      </div>
    </article>
  );
}

function JournalSection({
  stage,
  records,
  cardMode = false,
  username,
}: {
  stage: JournalStage;
  records: PeakRecord[];
  cardMode?: boolean;
  username: string;
}) {
  const meta = JOURNAL_STAGE_META[stage];

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-label mb-1">{meta.label}</p>
          <p className="text-sm text-text-muted">{meta.description}</p>
        </div>
        <p className="text-xs font-mono text-text-muted">{records.length}</p>
      </div>

      {records.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-text-muted">
          Nothing here yet.
        </div>
      ) : cardMode ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {records.map((record) => (
            <RecordCard key={record.id} record={record} username={username} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <RecordRow key={record.id} record={record} username={username} />
          ))}
        </div>
      )}
    </section>
  );
}

function DashboardOverview({ records, username }: { records: PeakRecord[]; username: string }) {
  const grouped = groupRecordsByJournalStage(records);
  const recentSummits = [...grouped.completed]
    .sort((left, right) => {
      const leftDate = left.dateClimbed ?? left.updatedAt;
      const rightDate = right.dateClimbed ?? right.updatedAt;
      return new Date(rightDate).getTime() - new Date(leftDate).getTime();
    })
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <JournalSection stage="plan" records={grouped.plan.slice(0, 5)} username={username} />
      <JournalSection stage="in_progress" records={grouped.in_progress.slice(0, 5)} username={username} />
      <JournalSection stage="completed" records={recentSummits} cardMode username={username} />
    </div>
  );
}

function GroupedRecords({ records, username }: { records: PeakRecord[]; username: string }) {
  const grouped = groupRecordsByJournalStage(records);

  return (
    <div className="space-y-8">
      {JOURNAL_STAGE_ORDER.map((stage) => (
        <JournalSection key={stage} stage={stage} records={grouped[stage]} cardMode={stage === "completed"} username={username} />
      ))}
    </div>
  );
}

function BulkToolbar({ records }: { records: PeakRecord[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
            Bulk actions
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Best fits here: publish selected stories, make them private again, mark climbs completed, move future plans back to planning, or delete a batch of old drafts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="submit" name="bulk_action" value="publish" className="btn-secondary">
            Publish
          </button>
          <button type="submit" name="bulk_action" value="unpublish" className="btn-secondary">
            Make private
          </button>
          <button type="submit" name="bulk_action" value="mark_completed" className="btn-secondary">
            Mark completed
          </button>
          <button type="submit" name="bulk_action" value="move_to_planning" className="btn-secondary">
            Move to planning
          </button>
          <button type="submit" name="bulk_action" value="delete" className="inline-flex items-center rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-100 hover:bg-rose-400/20 transition-colors">
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {records.map((record) => (
          <label
            key={record.id}
            className="flex items-start gap-3 rounded-2xl border border-border bg-base/60 px-4 py-4"
          >
            <input
              type="checkbox"
              name="record_ids"
              value={record.id}
              className="mt-1 h-4 w-4 rounded border-border bg-transparent text-summit focus:ring-summit"
            />
            <span className="min-w-0">
              <span className="block text-sm text-text-primary">{record.peakName}</span>
              <span className="mt-1 block text-xs font-mono text-text-muted">
                {statusLabel(record.status)}{record.isPublished ? " · public" : " · private"}
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function DashboardRecords({
  records,
  view,
  tab,
  username,
}: {
  records: PeakRecord[];
  view: "overview" | "all";
  tab: DashboardTab;
  username: string;
}) {
  if (records.length === 0) {
    return (
      <div className="card-base p-8 md:p-10 text-center">
        <p className="font-display text-3xl text-text-primary">Start with one meaningful summit.</p>
        <p className="text-text-secondary mt-3 max-w-xl mx-auto">
          Add a canonical state highpoint or create your own custom peak record.
          Your journal can stay quick and private at first, then grow into a richer story over time.
        </p>
      </div>
    );
  }

  if (view === "overview" || tab === "overview") {
    return <DashboardOverview records={records} username={username} />;
  }

  const grouped = groupRecordsByJournalStage(records);
  const filteredRecords =
    tab === "published"
      ? records.filter((record) => record.isPublished)
      : tab === "all"
        ? records
        : grouped[tab as JournalStage];

  return (
    <form action={bulkRecordAction} className="space-y-6">
      <BulkToolbar records={filteredRecords} />
      {tab === "all" ? (
        <GroupedRecords records={filteredRecords} username={username} />
      ) : tab === "published" ? (
        <section className="space-y-3">
          <div>
            <p className="text-label mb-1">Published</p>
            <p className="text-sm text-text-muted">Stories already live on your public journal.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredRecords.map((record) => (
              <RecordCard key={record.id} record={record} username={username} />
            ))}
          </div>
        </section>
      ) : (
        <JournalSection
          stage={tab as JournalStage}
          records={filteredRecords}
          cardMode={tab === "completed"}
          username={username}
        />
      )}
    </form>
  );
}
