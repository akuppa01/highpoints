"use client";

import Image from "next/image";
import { useState } from "react";
import { Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

export function SummitImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src?: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a2521] via-[#121716] to-[#0b0d0d]">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-summit/25 bg-summit/10">
            <Mountain className="h-5 w-5 text-summit-light" />
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-text-muted">
            Summit image unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
