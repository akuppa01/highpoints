"use client";

import { useState } from "react";
import { X, Share2, Copy, Check } from "lucide-react";
import { ClimbRecapCard } from "@/components/public/share-cards";

export function ShareStoryButton({
  title,
  subtitle,
  location,
  elevationFt,
  distanceMiles,
  elevationGainFt,
  durationMinutes,
  rating,
  note,
  dateClimbed,
  heroImageUrl,
  username,
  url,
}: {
  title: string;
  subtitle: string;
  location?: string | null;
  elevationFt?: number | null;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  durationMinutes?: number | null;
  rating?: number | null;
  note?: string | null;
  dateClimbed?: string | null;
  heroImageUrl?: string | null;
  username?: string | null;
  url: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ title, text: subtitle, url }).catch(() => undefined);
      return;
    }
    await handleCopy();
  }

  return (
    <>
      <button type="button" className="btn-primary gap-2" onClick={() => setOpen(true)}>
        <Share2 className="w-4 h-4" />
        Share story
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 md:p-6 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-4xl rounded-[32px] border border-border bg-base/98 p-5 md:p-7 shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-label mb-2">Story card</p>
                <h3 className="font-display text-2xl text-text-primary">
                  Screenshot & share
                </h3>
                <p className="mt-1.5 text-sm text-text-muted max-w-xs">
                  Screenshot the card below for Instagram Stories, text, or anywhere else you want to flex your summit.
                </p>
              </div>
              <button
                type="button"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-text-muted hover:text-text-primary hover:border-border-light transition-colors"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Two-column: card + info */}
            <div className="grid gap-6 md:grid-cols-[auto,1fr] items-start">
              {/* The shareable card — screenshot this */}
              <div className="flex justify-center">
                <ClimbRecapCard
                  title={title}
                  subtitle={subtitle}
                  location={location}
                  elevationFt={elevationFt}
                  distanceMiles={distanceMiles}
                  elevationGainFt={elevationGainFt}
                  durationMinutes={durationMinutes}
                  rating={rating}
                  note={note}
                  dateClimbed={dateClimbed}
                  heroImageUrl={heroImageUrl}
                  username={username}
                />
              </div>

              {/* Instructions + link share */}
              <div className="space-y-5">
                {/* Step guide */}
                <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
                  <p className="text-label">How to share</p>
                  {[
                    { n: "1", text: "Take a screenshot of the card on the left" },
                    { n: "2", text: "Crop to the card and post to Instagram Stories, iMessage, or wherever" },
                    { n: "3", text: "Or share the link directly below" },
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-summit/30 bg-summit/10 text-[11px] font-mono text-summit">
                        {step.n}
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{step.text}</p>
                    </div>
                  ))}
                </div>

                {/* Link share */}
                <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3">
                  <p className="text-label">Public link</p>
                  <div className="flex items-center gap-2 rounded-xl border border-border-light bg-base/70 px-3 py-2.5">
                    <p className="flex-1 truncate text-xs font-mono text-text-muted">{url}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex-1 btn-secondary text-xs gap-1.5 justify-center"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-summit" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex-1 btn-primary text-xs gap-1.5 justify-center"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Stats reminder */}
                <p className="text-[11px] text-text-muted text-center font-mono">
                  Card includes your stats, peak info & Highpoints branding
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
