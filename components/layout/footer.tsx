import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container-wide py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-summit/20 border border-summit/30 flex items-center justify-center">
              <Mountain className="w-3.5 h-3.5 text-summit-light" />
            </div>
            <span className="font-display text-base text-text-primary">Summit</span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
            <Link href="/peaks" className="hover:text-text-secondary transition-colors">
              All Peaks
            </Link>
            <Link href="/map" className="hover:text-text-secondary transition-colors">
              Map
            </Link>
            <a
              href="https://en.wikipedia.org/wiki/List_of_U.S._states_by_elevation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              About Highpointing
            </a>
          </div>

          <p className="text-xs text-text-muted font-mono">
            Track the roof of every state.
          </p>
        </div>
      </div>
    </footer>
  );
}
