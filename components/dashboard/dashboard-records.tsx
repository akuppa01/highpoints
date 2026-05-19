"use client";

import Link from "next/link";
import { quickStatusUpdateAction } from "@/app/dashboard/actions";
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

function RecordRow({ record }: { record: PeakRecord }) {
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
        <Link href={`/dashboard/records/${record.id}`} className="block">
          <h3 className="font-display text-2xl leading-tight text-text-primary">{record.peakName}</h3>
        </Link>
        <p className="mt-1 text-sm text-text-muted">
          {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:justify-end">
        <div className="grid grid-cols-3 gap-2 min-w-[240px]">
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

function RecordCard({ record }: { record: PeakRecord }) {
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
          <Link href={`/dashboard/records/${record.id}`} className="block">
            <h3 className="font-display text-2xl leading-tight text-text-primary">{record.peakName}</h3>
          </Link>
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
        <Link href={`/dashboard/records/${record.id}`} className="text-xs font-mono text-summit hover:text-summit-light transition-colors">
          Open editor
        </Link>
      </div>
    </article>
  );
}

function JournalSection({
  stage,
  records,
  cardMode = false,
}: {
  stage: JournalStage;
  records: PeakRecord[];
  cardMode?: boolean;
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
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <RecordRow key={record.id} record={record} />
          ))}
        </div>
      )}
    </section>
  );
}

function DashboardOverview({ records }: { records: PeakRecord[] }) {
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
      <JournalSection stage="plan" records={grouped.plan.slice(0, 5)} />
      <JournalSection stage="in_progress" records={grouped.in_progress.slice(0, 5)} />
      <JournalSection stage="completed" records={recentSummits} cardMode />
    </div>
  );
}

function GroupedRecords({ records }: { records: PeakRecord[] }) {
  const grouped = groupRecordsByJournalStage(records);

  return (
    <div className="space-y-8">
      {JOURNAL_STAGE_ORDER.map((stage) => (
        <JournalSection key={stage} stage={stage} records={grouped[stage]} cardMode={stage === "completed"} />
      ))}
    </div>
  );
}

export function DashboardRecords({
  records,
  view,
}: {
  records: PeakRecord[];
  view: "overview" | "all";
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

  if (view === "overview") {
    return <DashboardOverview records={records} />;
  }

  return <GroupedRecords records={records} />;
}
