"use client";

import { quickPublishRecordAction, quickStatusUpdateAction } from "@/app/dashboard/actions";
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

function RecordRow({ record, username }: { record: PeakRecord; username: string }) {
  const publicHref = record.isPublished ? `/u/${username}/climbs/${record.slug}` : null;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card/75 px-4 py-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={cn("tag", statusAccent(record.status))}>{statusLabel(record.status)}</span>
          {record.dateClimbed ? (
            <span className="text-[11px] font-mono text-text-muted">{formatDateShort(record.dateClimbed)}</span>
          ) : null}
          {record.plannedFor ? (
            <span className="text-[11px] font-mono text-text-muted">Planned {formatDateShort(record.plannedFor)}</span>
          ) : null}
        </div>

        <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint className="block">
          <h3 className="font-display text-2xl leading-tight text-text-primary">{record.peakName}</h3>
        </IntentLink>

        <p className="mt-1 text-sm text-text-muted">
          {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono">
          <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint className="text-text-secondary hover:text-text-primary transition-colors">
            Edit
          </IntentLink>
          {publicHref ? (
            <IntentLink href={publicHref} hoverPrefetch pendingHint className="text-summit hover:text-summit-light transition-colors">
              View story
            </IntentLink>
          ) : (
            <form action={quickPublishRecordAction}>
              <input type="hidden" name="record_id" value={record.id} />
              <button type="submit" className="text-summit hover:text-summit-light transition-colors">
                Publish now
              </button>
            </form>
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
  const publicHref = record.isPublished ? `/u/${username}/climbs/${record.slug}` : null;

  return (
    <article className="card-base p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={cn("tag", statusAccent(record.status))}>{statusLabel(record.status)}</span>
            {record.dateClimbed ? (
              <span className="text-[11px] font-mono text-text-muted">{formatDateShort(record.dateClimbed)}</span>
            ) : null}
          </div>
          <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint className="block">
            <h3 className="font-display text-2xl leading-tight text-text-primary">{record.peakName}</h3>
          </IntentLink>
          <p className="mt-1 text-sm text-text-muted">
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

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-text-muted">
          {record.isPublished ? "Published to public profile" : "Saved privately"}
        </p>
        <div className="flex items-center gap-3">
          <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint className="text-xs font-mono text-text-secondary hover:text-text-primary transition-colors">
            Edit
          </IntentLink>
          {publicHref ? (
            <IntentLink href={publicHref} hoverPrefetch pendingHint className="text-xs font-mono text-summit hover:text-summit-light transition-colors">
              View story
            </IntentLink>
          ) : (
            <form action={quickPublishRecordAction}>
              <input type="hidden" name="record_id" value={record.id} />
              <button type="submit" className="text-xs font-mono text-summit hover:text-summit-light transition-colors">
                Publish now
              </button>
            </form>
          )}
        </div>
      </div>
    </article>
  );
}

function JournalSection({
  stage,
  records,
  username,
  cardMode = false,
}: {
  stage: JournalStage;
  records: PeakRecord[];
  username: string;
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
        <div className="grid gap-4">
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

function BoardView({ records, username }: { records: PeakRecord[]; username: string }) {
  const grouped = groupRecordsByJournalStage(records);

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {JOURNAL_STAGE_ORDER.map((stage) => (
        <div key={stage} className={cn("rounded-[28px] border p-5 md:p-6", JOURNAL_STAGE_META[stage].tone)}>
          <JournalSection stage={stage} records={grouped[stage].slice(0, 6)} username={username} cardMode={stage === "completed"} />
        </div>
      ))}
    </div>
  );
}

function ListView({
  records,
  username,
  stageFilter,
}: {
  records: PeakRecord[];
  username: string;
  stageFilter: "all" | JournalStage;
}) {
  const grouped = groupRecordsByJournalStage(records);
  const stages = stageFilter === "all" ? JOURNAL_STAGE_ORDER : [stageFilter];

  return (
    <div className="space-y-8">
      {stages.map((stage) => (
        <JournalSection key={stage} stage={stage} records={grouped[stage]} username={username} cardMode={stage === "completed"} />
      ))}
    </div>
  );
}

export function DashboardRecords({
  records,
  viewMode,
  stageFilter,
  username,
}: {
  records: PeakRecord[];
  viewMode: "board" | "list";
  stageFilter: "all" | JournalStage;
  username: string;
}) {
  if (records.length === 0) {
    return (
      <div className="card-base p-8 md:p-10 text-center">
        <p className="font-display text-3xl text-text-primary">Start with one meaningful summit.</p>
        <p className="text-text-secondary mt-3 max-w-xl mx-auto">
          Add a canonical state highpoint or create your own custom peak record.
          Save it privately first, then publish the ones that are worth showing off.
        </p>
      </div>
    );
  }

  if (viewMode === "board") {
    return <BoardView records={records} username={username} />;
  }

  return <ListView records={records} username={username} stageFilter={stageFilter} />;
}
