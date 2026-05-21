import { statusLabel } from "@/lib/utils";
import type { PeakRecord, PublishedPeakRecord, RecordStatus } from "@/types";

export const RECORD_STATUS_OPTIONS: {
  value: RecordStatus;
  label: string;
  description: string;
}[] = [
  {
    value: "want_to_climb",
    label: statusLabel("want_to_climb"),
    description: "A summit on the long-range list.",
  },
  {
    value: "planning",
    label: statusLabel("planning"),
    description: "Actively organizing logistics, permits, or timing.",
  },
  {
    value: "partially_climbed",
    label: statusLabel("partially_climbed"),
    description: "Attempted or explored, but not fully completed.",
  },
  {
    value: "visited",
    label: statusLabel("visited"),
    description: "Reached the place, overlook, or approach without a full climb.",
  },
  {
    value: "completed",
    label: statusLabel("completed"),
    description: "Completed summit or intended route.",
  },
  {
    value: "revisit",
    label: statusLabel("revisit"),
    description: "Already done, but worth returning to someday.",
  },
];

export const JOURNAL_STAGE_ORDER = ["plan", "in_progress", "completed"] as const;

export type JournalStage = (typeof JOURNAL_STAGE_ORDER)[number];

export const JOURNAL_STAGE_META: Record<
  JournalStage,
  {
    label: string;
    description: string;
    statuses: RecordStatus[];
    tone: string;
  }
> = {
  plan: {
    label: "Planning",
    description: "Future climbs and active planning.",
    statuses: ["want_to_climb", "planning"],
    tone: "border-sky-400/20 bg-sky-400/8",
  },
  in_progress: {
    label: "Attempted",
    description: "Attempts, visits, and unfinished stories.",
    statuses: ["partially_climbed", "visited"],
    tone: "border-amber-400/20 bg-amber-400/8",
  },
  completed: {
    label: "Completed",
    description: "Finished climbs and return-worthy favorites.",
    statuses: ["completed", "revisit"],
    tone: "border-emerald-400/20 bg-emerald-400/8",
  },
};

export function getJournalStage(status: RecordStatus): JournalStage {
  if (JOURNAL_STAGE_META.plan.statuses.includes(status)) return "plan";
  if (JOURNAL_STAGE_META.in_progress.statuses.includes(status)) return "in_progress";
  return "completed";
}

export function groupRecordsByJournalStage<T extends Pick<PeakRecord, "status"> | Pick<PublishedPeakRecord, "status">>(
  records: T[]
) {
  return JOURNAL_STAGE_ORDER.reduce(
    (accumulator, stage) => {
      accumulator[stage] = records.filter(
        (record) => getJournalStage(record.status) === stage
      );
      return accumulator;
    },
    {
      plan: [] as T[],
      in_progress: [] as T[],
      completed: [] as T[],
    }
  );
}
