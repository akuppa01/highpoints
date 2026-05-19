import { Mountain } from "lucide-react";
import { NavAuth } from "@/components/layout/nav-auth";
import { NavLinks } from "@/components/layout/nav-links";
import { IntentLink } from "@/components/ui/intent-link";
export function Nav() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-base/80 backdrop-blur-xl">
      <div className="container-wide">
        <div className="flex items-center justify-between gap-3 h-14">
          <IntentLink href="/" className="flex items-center gap-2.5 group" pendingHint>
            <div className="w-7 h-7 rounded-lg bg-summit/20 border border-summit/30 flex items-center justify-center group-hover:bg-summit/30 transition-colors duration-200">
              <Mountain className="w-4 h-4 text-summit-light" />
            </div>
            <span className="font-display text-lg tracking-tight text-text-primary">
              Summit
            </span>
          </IntentLink>

          <NavLinks />

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-mono text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-summit" />
              Peaks, hikes, and highpoints
            </div>
            <NavAuth />
          </div>
        </div>
      </div>
    </header>
  );
}
