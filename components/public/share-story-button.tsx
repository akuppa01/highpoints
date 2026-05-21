"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ClimbRecapCard } from "@/components/public/share-cards";

export function ShareStoryButton({
  title,
  subtitle,
  distanceMiles,
  elevationGainFt,
  durationMinutes,
  note,
  url,
}: {
  title: string;
  subtitle: string;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  durationMinutes?: number | null;
  note?: string | null;
  url: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
        Share story card
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] border border-border bg-base p-5 md:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-label mb-2">Share with friends</p>
                <h3 className="font-display text-2xl font-semibold text-text-primary">
                  Screenshot this card for Instagram or text it out
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  This is the shareable recap view for your published climb story.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary hover:text-text-primary"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ClimbRecapCard
              title={title}
              subtitle={subtitle}
              distanceMiles={distanceMiles}
              elevationGainFt={elevationGainFt}
              durationMinutes={durationMinutes}
              note={note}
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="btn-secondary"
                onClick={async () => {
                  if (navigator.share) {
                    await navigator.share({ title, text: subtitle, url }).catch(() => undefined);
                    return;
                  }
                  await navigator.clipboard.writeText(url);
                }}
              >
                Share link
              </button>
              <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
