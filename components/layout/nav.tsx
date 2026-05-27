import Link from "next/link";
import { Mountain } from "lucide-react";
import { NavAuth } from "@/components/layout/nav-auth";

const NAV_LINKS = [
  { href: "/peaks", label: "Peaks" },
  { href: "/map", label: "Map" },
  { href: "/dashboard", label: "Journal" },
];

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-base/80 backdrop-blur-xl">
      <div className="container-wide">
        <div className="flex h-14 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-summit/30 bg-summit/20">
              <Mountain className="h-4 w-4 text-summit-light" />
            </div>
            <span className="font-display font-semibold text-[15px] tracking-tight" style={{ color: "#d4b483" }}>
              Highpoints
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-w-[84px] items-center justify-center rounded-md px-3 py-1.5 text-sm text-text-secondary transition-colors duration-150 hover:bg-white/5 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <NavAuth />
          </div>
        </div>
      </div>
    </header>
  );
}
