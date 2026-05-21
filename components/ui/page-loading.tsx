import { cn } from "@/lib/utils";

function InlineLoader({ label = "Loading this view" }: { label?: string }) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-[28px] border border-border bg-base px-5 py-4 shadow-2xl backdrop-blur-xl"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="route-loader-mark" aria-hidden="true">
        <svg
          viewBox="0 0 64 64"
          className="h-14 w-14 md:h-16 md:w-16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 50L28 16L38 34L46 22L54 50"
            className="route-loader-outline"
          />
          <path
            d="M10 50L28 16L38 34L46 22L54 50"
            className="route-loader-trace"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="font-display text-xl tracking-tight text-text-primary">
          Highpoints
        </p>
        <p className="mt-1 text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
          {label}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden="true">
        <span className="route-loader-dot delay-0" />
        <span className="route-loader-dot delay-150" />
        <span className="route-loader-dot delay-300" />
      </div>
    </div>
  );
}

export function PageLoadingShell({
  heroClassName,
  cards = 3,
}: {
  heroClassName?: string;
  cards?: number;
}) {
  return (
    <div className="pt-14 min-h-screen">
      <div className="container-wide py-8 md:py-10 space-y-6 md:space-y-8">
        <div className="flex justify-center">
          <InlineLoader label="Loading this view" />
        </div>
        <div className={cn("loading-shell min-h-[220px] md:min-h-[260px]", heroClassName)} />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: cards }).map((_, index) => (
            <div key={index} className="loading-shell h-28 md:h-32" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="loading-shell h-72 lg:col-span-2" />
          <div className="space-y-4">
            <div className="loading-shell h-40" />
            <div className="loading-shell h-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
