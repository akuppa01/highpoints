import { CheckCircle2, Lock, Mountain } from "lucide-react";
import { SummitImage } from "@/components/media/summit-image";
import { IntentLink } from "@/components/ui/intent-link";
import {
  cn,
  difficultyBg,
  difficultyLabel,
  formatDateShort,
  formatElevation,
} from "@/lib/utils";
import type { PeakWithClimb } from "@/types";

interface PeakCardProps {
  peak: PeakWithClimb;
  variant?: "default" | "compact";
}

export function PeakCard({ peak, variant = "default" }: PeakCardProps) {
  const completed = peak.climb?.completed ?? false;

  return (
    <IntentLink
      href={`/peaks/${peak.slug}`}
      hoverPrefetch
      className={cn(
        "group relative flex min-h-[260px] flex-col card-base card-hover",
        variant === "compact" ? "min-h-[180px]" : "min-h-[260px]"
      )}
    >
      <div
        className={cn(
          "relative flex-shrink-0 overflow-hidden bg-surface",
          variant === "compact" ? "h-28" : "h-44"
        )}
      >
        {peak.heroImageUrl ? (
          <SummitImage
            src={peak.heroImageUrl}
            alt={peak.name}
            className="transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Mountain className="h-8 w-8 text-text-muted" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />

        <div className="absolute right-2.5 top-2.5">
          {completed ? (
            <div className="flex items-center gap-1 rounded-full border border-summit/50 bg-summit/90 px-2 py-0.5 backdrop-blur-sm">
              <CheckCircle2 className="h-3 w-3 text-white" />
              <span className="text-xs font-mono text-white">Done</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 backdrop-blur-sm">
              <Lock className="h-3 w-3 text-text-muted" />
            </div>
          )}
        </div>

        <div className="absolute bottom-2.5 left-2.5">
          <span className="text-xs font-mono text-white/50">{peak.stateCode}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base leading-tight tracking-tight text-text-primary transition-colors duration-200 group-hover:text-white">
              {peak.name}
            </h3>
            <p className="mt-0.5 text-xs text-text-muted">{peak.state}</p>
          </div>

          <div className="flex-shrink-0 text-right">
            <span className="font-mono text-sm text-summit-amber">
              {formatElevation(peak.elevationFt)}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-2">
          {peak.difficulty ? (
            <span className={cn("tag text-[10px]", difficultyBg(peak.difficulty))}>
              {difficultyLabel(peak.difficulty)}
            </span>
          ) : <span />}

          {completed && peak.climb?.completedDate ? (
            <span className="ml-auto text-[10px] font-mono text-text-muted">
              {formatDateShort(peak.climb.completedDate)}
            </span>
          ) : peak.region ? (
            <span className="ml-auto text-[10px] font-mono text-text-muted">
              {peak.region}
            </span>
          ) : null}
        </div>
      </div>
    </IntentLink>
  );
}
