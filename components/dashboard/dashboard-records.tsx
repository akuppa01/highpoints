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
import { Mountain, Route, TrendingUp, Clock3, Plus } from "lucide-react";

function StatusSelect({ recordId, status }: { recordId: string; status: RecordStatus }) {
  return (
    <form action={quickStatusUpdateAction}>
      <input type="hidden" name="record_id" value={recordId} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="bg-transparent text-[11px] font-mono text-text-muted border border-border rounded-lg px-2 py-1 focus:outline-none hover:border-border-light hover:text-text-secondary transition-colors"
      >
        {RECORD_STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-card text-text-primary">
            {opt.label}
          </option>
        ))}
      </select>
    </form>
  );
}

function StatChip({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Route }) {
  return (
    <div className="rounded-xl border border-border bg-base/60 px-3 py-2.5">
      <p className="font-mono text-sm text-text-primary leading-none">{value}</p>
      <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function RecordCard({ record, username }: { record: PeakRecord; username: string }) {
  const publicHref = record.isPublished ? `/u/${username}/climbs/${record.slug}` : null;
  const thumbUrl = record.heroPhotoUrl ?? record.peak?.heroImageUrl ?? null;

  return (
    <article className="card-base overflow-hidden group hover:border-border-light transition-all duration-300">
      {/* Thumbnail strip */}
      <div className="relative h-36 bg-surface border-b border-border overflow-hidden">
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt={record.peakName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0e1a12] to-surface">
            <Mountain className="w-7 h-7 text-summit/25" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between gap-2">
          <span className={cn("tag text-[10px]", statusAccent(record.status))}>{statusLabel(record.status)}</span>
          {record.dateClimbed && (
            <span className="text-[10px] font-mono text-white/50">{formatDateShort(record.dateClimbed)}</span>
          )}
          {record.plannedFor && !record.dateClimbed && (
            <span className="text-[10px] font-mono text-white/40">→ {formatDateShort(record.plannedFor)}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div>
          <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint>
            <h3 className="font-display text-xl text-text-primary leading-tight group-hover:text-white transition-colors">
              {record.peakName}
            </h3>
          </IntentLink>
          <p className="mt-1 text-xs font-mono text-text-muted">
            {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatChip icon={Route} label="Distance" value={formatMaybeDistance(record.distanceMiles)} />
          <StatChip icon={TrendingUp} label="Gain" value={formatMaybeElevation(record.elevationGainFt)} />
          <StatChip icon={Clock3} label="Time" value={formatMaybeDuration(record.durationMinutes)} />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3 text-xs font-mono">
            <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint className="text-text-muted hover:text-text-secondary transition-colors">
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
                  Publish
                </button>
              </form>
            )}
          </div>
          <StatusSelect recordId={record.id} status={record.status} />
        </div>
      </div>
    </article>
  );
}

function RecordRow({ record, username }: { record: PeakRecord; username: string }) {
  const publicHref = record.isPublished ? `/u/${username}/climbs/${record.slug}` : null;
  const thumbUrl = record.heroPhotoUrl ?? record.peak?.heroImageUrl ?? null;

  return (
    <article className="flex gap-4 rounded-2xl border border-border bg-card/70 px-4 py-4 hover:border-border-light hover:bg-card-hover transition-all duration-200 md:items-center">
      {/* Tiny thumb */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface flex-shrink-0 border border-border">
        {thumbUrl ? (
          <img src={thumbUrl} alt={record.peakName} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <Mountain className="w-5 h-5 text-text-muted/40" />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={cn("tag text-[10px]", statusAccent(record.status))}>{statusLabel(record.status)}</span>
            {record.dateClimbed && (
              <span className="text-[10px] font-mono text-text-muted">{formatDateShort(record.dateClimbed)}</span>
            )}
          </div>
          <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint>
            <h3 className="font-display text-xl text-text-primary leading-tight truncate">{record.peakName}</h3>
          </IntentLink>
          <p className="text-xs font-mono text-text-muted mt-0.5 truncate">
            {record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs font-mono text-text-muted">
            <IntentLink href={`/dashboard/records/${record.id}`} hoverPrefetch pendingHint className="hover:text-text-secondary transition-colors">Edit</IntentLink>
            {publicHref ? (
              <IntentLink href={publicHref} hoverPrefetch pendingHint className="text-summit hover:text-summit-light transition-colors">View story</IntentLink>
            ) : (
              <form action={quickPublishRecordAction}>
                <input type="hidden" name="record_id" value={record.id} />
                <button type="submit" className="text-summit hover:text-summit-light transition-colors">Publish</button>
              </form>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="grid grid-cols-3 gap-2 w-52">
            <StatChip icon={Route} label="Dist" value={formatMaybeDistance(record.distanceMiles)} />
            <StatChip icon={TrendingUp} label="Gain" value={formatMaybeElevation(record.elevationGainFt)} />
            <StatChip icon={Clock3} label="Time" value={formatMaybeDuration(record.durationMinutes)} />
          </div>
          <StatusSelect recordId={record.id} status={record.status} />
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
          <p className="text-xs text-text-muted">{meta.description}</p>
        </div>
        <span className="text-xs font-mono text-text-muted">{records.length}</span>
      </div>

      {records.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-5 text-center text-sm text-text-muted">
          Nothing here yet.
        </div>
      ) : cardMode ? (
        <div className="grid gap-4">
          {records.map((r) => <RecordCard key={r.id} record={r} username={username} />)}
        </div>
      ) : (
        <div className="space-y-2.5">
          {records.map((r) => <RecordRow key={r.id} record={r} username={username} />)}
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
        <div
          key={stage}
          className={cn("rounded-3xl border p-5 md:p-6 space-y-4", JOURNAL_STAGE_META[stage].tone)}
        >
          <JournalSection
            stage={stage}
            records={grouped[stage].slice(0, 6)}
            username={username}
            cardMode={true}
          />
          {grouped[stage].length > 6 && (
            <p className="text-xs font-mono text-text-muted text-center">
              +{grouped[stage].length - 6} more
            </p>
          )}
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
    <div className="space-y-10">
      {stages.map((stage) => (
        <JournalSection key={stage} stage={stage} records={grouped[stage]} username={username} cardMode={false} />
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
      <div className="card-base p-10 md:p-16 text-center space-y-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-summit/10 border border-summit/20 mx-auto">
          <Mountain className="w-7 h-7 text-summit" />
        </div>
        <h2 className="font-display text-3xl text-text-primary">Start with one meaningful summit.</h2>
        <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
          Add a canonical state highpoint or create a custom peak record.
          Save privately first, then publish the ones worth sharing.
        </p>
        <IntentLink href="/dashboard/new" hoverPrefetch pendingHint className="btn-primary inline-flex mt-2">
          <Plus className="w-4 h-4" />
          Add first record
        </IntentLink>
      </div>
    );
  }

  if (viewMode === "board") {
    return <BoardView records={records} username={username} />;
  }

  return <ListView records={records} username={username} stageFilter={stageFilter} />;
}
