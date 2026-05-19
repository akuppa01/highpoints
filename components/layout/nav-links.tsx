"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/peaks", label: "Peaks" },
  { href: "/map", label: "Map" },
  { href: "/dashboard", label: "Journal" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
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
  );
}
