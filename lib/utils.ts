import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";
import type { Difficulty, ProgressStats, PeakWithClimb } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatElevation(ft: number): string {
  return `${ft.toLocaleString()} ft`;
}

export function formatElevationGain(ft: number): string {
  return `+${ft.toLocaleString()} ft`;
}

export function formatDistance(miles: number): string {
  return `${miles.toFixed(1)} mi`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMMM d, yyyy");
}

export function formatDateShort(dateString: string): string {
  return format(new Date(dateString), "MMM yyyy");
}

export function formatRelativeDate(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function difficultyLabel(difficulty: Difficulty): string {
  const labels: Record<Difficulty, string> = {
    easy: "Easy",
    moderate: "Moderate",
    hard: "Hard",
    technical: "Technical",
  };
  return labels[difficulty];
}

export function difficultyColor(difficulty: Difficulty): string {
  const colors: Record<Difficulty, string> = {
    easy: "text-green-400",
    moderate: "text-yellow-400",
    hard: "text-orange-400",
    technical: "text-red-400",
  };
  return colors[difficulty];
}

export function difficultyBg(difficulty: Difficulty): string {
  const colors: Record<Difficulty, string> = {
    easy: "bg-green-400/10 text-green-400 border-green-400/20",
    moderate: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    hard: "bg-orange-400/10 text-orange-400 border-orange-400/20",
    technical: "bg-red-400/10 text-red-400 border-red-400/20",
  };
  return colors[difficulty];
}

export function computeProgress(peaks: PeakWithClimb[]): ProgressStats {
  const completed = peaks.filter((p) => p.climb?.completed);

  return {
    completed: completed.length,
    total: peaks.length,
    totalElevationGainFt: completed.reduce(
      (sum, p) => sum + (p.climb?.elevationGainFt ?? 0),
      0
    ),
    totalDistanceMiles: completed.reduce(
      (sum, p) => sum + (p.climb?.distanceMiles ?? 0),
      0
    ),
    totalHours: Math.round(
      completed.reduce((sum, p) => sum + (p.climb?.durationMinutes ?? 0), 0) /
        60
    ),
    highestPeak: completed.sort(
      (a, b) => b.elevationFt - a.elevationFt
    )[0],
    latestClimb: completed
      .filter((p) => p.climb?.completedDate)
      .sort(
        (a, b) =>
          new Date(b.climb!.completedDate!).getTime() -
          new Date(a.climb!.completedDate!).getTime()
      )[0],
  };
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
