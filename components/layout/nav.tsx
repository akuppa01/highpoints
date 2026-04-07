"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPLETED_PEAKS, TOTAL_PEAKS } from "@/lib/data/peaks-data";

const NAV_LINKS = [
  { href: "/peaks", label: "Peaks" },
  { href: "/map", label: "Map" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-base/80 backdrop-blur-xl">
      <div className="container-wide">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-summit/20 border border-summit/30 flex items-center justify-center group-hover:bg-summit/30 transition-colors duration-200">
              <Mountain className="w-4 h-4 text-summit-light" />
            </div>
            <span className="font-display text-lg tracking-tight text-text-primary">
              Summit
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm transition-colors duration-150",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-text-primary bg-white/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: progress pill */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface">
              {/* Mini progress dots */}
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1 h-1 rounded-full",
                      i < Math.ceil((COMPLETED_PEAKS / TOTAL_PEAKS) * 10)
                        ? "bg-summit"
                        : "bg-border-light"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-text-secondary">
                <span className="text-text-primary">{COMPLETED_PEAKS}</span>
                <span className="text-text-muted">/{TOTAL_PEAKS}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
