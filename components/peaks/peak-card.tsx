import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Lock, Mountain } from "lucide-react";
import { cn, formatElevation, difficultyBg, difficultyLabel, formatDateShort } from "@/lib/utils";
import type { PeakWithClimb } from "@/types";

interface PeakCardProps {
  peak: PeakWithClimb;
  variant?: "default" | "compact";
}

export function PeakCard({ peak, variant = "default" }: PeakCardProps) {
  const completed = peak.climb?.completed ?? false;

  return (
    <Link
      href={`/peaks/${peak.slug}`}
      className={cn(
        "group relative flex flex-col card-base card-hover",
        variant === "compact" ? "min-h-[180px]" : "min-h-[260px]"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-surface flex-shrink-0",
          variant === "compact" ? "h-28" : "h-44"
        )}
      >
        {peak.heroImageUrl ? (
          <Image
            src={peak.heroImageUrl}
            alt={peak.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Mountain className="w-8 h-8 text-text-muted" />
          </div>
        )}

        {/* Completion overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-2.5 right-2.5">
          {completed ? (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-summit/90 backdrop-blur-sm border border-summit/50">
              <CheckCircle2 className="w-3 h-3 text-white" />
              <span className="text-xs text-white font-mono">Done</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
              <Lock className="w-3 h-3 text-text-muted" />
            </div>
          )}
        </div>

        {/* State code */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="text-xs font-mono text-white/50">{peak.stateCode}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-base text-text-primary leading-tight tracking-tight truncate group-hover:text-white transition-colors duration-200">
              {peak.name}
            </h3>
            <p className="text-xs text-text-muted mt-0.5">{peak.state}</p>
          </div>

          {/* Elevation */}
          <div className="text-right flex-shrink-0">
            <span className="font-mono text-sm text-summit-amber">
              {formatElevation(peak.elevationFt)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          {peak.difficulty && (
            <span className={cn("tag text-[10px]", difficultyBg(peak.difficulty))}>
              {difficultyLabel(peak.difficulty)}
            </span>
          )}
          {completed && peak.climb?.completedDate && (
            <span className="text-[10px] font-mono text-text-muted ml-auto">
              {formatDateShort(peak.climb.completedDate)}
            </span>
          )}
          {!completed && peak.region && (
            <span className="text-[10px] font-mono text-text-muted ml-auto">
              {peak.region}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
