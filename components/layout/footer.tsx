import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="container-wide py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-summit/30 bg-summit/20">
              <Mountain className="h-3.5 w-3.5 text-summit-light" />
            </div>
            <span className="text-base text-text-primary">Highpoints</span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
            <Link href="/peaks" className="transition-colors hover:text-text-secondary">
              All Peaks
            </Link>
            <Link href="/map" className="transition-colors hover:text-text-secondary">
              Map
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-text-secondary">
              Journal
            </Link>
            <a
              href="https://en.wikipedia.org/wiki/List_of_U.S._states_by_elevation"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-secondary"
            >
              About Highpointing
            </a>
          </div>

          <p className="text-xs font-mono text-text-muted">
            Track the peaks that define your journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
