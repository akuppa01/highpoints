"use client";

import { usePathname } from "next/navigation";
import { IntentLink } from "@/components/ui/intent-link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/peaks", label: "Peaks" },
  { href: "/map", label: "Map" },
  { href: "/dashboard", label: "Journal" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-1 items-center justify-center gap-2 overflow-x-auto">
      {NAV_LINKS.map((link) => (
        <IntentLink
          key={link.href}
          href={link.href}
          hoverPrefetch
          pendingHint
          className={cn(
            "inline-flex min-w-[84px] justify-center px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors duration-150",
            pathname === link.href || pathname.startsWith(link.href + "/")
              ? "text-text-primary bg-white/5"
              : "text-text-secondary hover:text-text-primary hover:bg-white/5"
          )}
        >
          {link.label}
        </IntentLink>
      ))}
    </nav>
  );
}
