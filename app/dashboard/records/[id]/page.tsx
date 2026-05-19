import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Route, Clock3, TrendingUp, Trash2 } from "lucide-react";
import { deleteRecordAction } from "@/app/dashboard/actions";
import { PeakRecordForm } from "@/components/dashboard/peak-record-form";
import { IntentLink } from "@/components/ui/intent-link";
import { getRecordForEdit, requireProfile } from "@/lib/data/records";
import { formatMaybeDistance, formatMaybeDuration, formatMaybeElevation, statusAccent, statusLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EditRecordPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const profile = await requireProfile();
  const { id } = await params;
  const query = await searchParams;
  const record = await getRecordForEdit(id);

  if (!record) notFound();

  const heroImage = record.media?.find((item) => item.isHighlight)?.mediaUrl ?? record.heroPhotoUrl;
  const saved = query.saved === "1";
  const published = query.published === "1";
  const draft = query.draft === "1";

  return (
    <div className="pt-14 min-h-screen">
      <div className="container-wide py-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <IntentLink href="/dashboard" pendingHint className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </IntentLink>
          <div className="flex flex-wrap items-center gap-3">
            {record.isPublished && (
              <IntentLink href={`/u/${profile.username}/climbs/${record.slug}`} hoverPrefetch pendingHint className="btn-secondary">
                View public page
                <ExternalLink className="w-4 h-4" />
              </IntentLink>
            )}
            <form action={deleteRecordAction}>
              <input type="hidden" name="record_id" value={record.id} />
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-100 hover:bg-rose-400/20 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete record
              </button>
            </form>
          </div>
        </div>

        {saved && (
          <div className="rounded-2xl border border-summit/25 bg-summit/10 px-5 py-4 text-sm text-text-secondary">
            {published
              ? "Public story updated."
              : draft
                ? "Saved as a draft in your journal."
                : "Changes saved to your journal."}
            {record.isPublished ? (
              <IntentLink href={`/u/${profile.username}/climbs/${record.slug}`} hoverPrefetch pendingHint className="ml-2 text-summit hover:text-summit-light transition-colors">
                View the live story
              </IntentLink>
            ) : null}
          </div>
        )}

        <section className="card-base overflow-hidden">
          <div className="grid lg:grid-cols-[1.15fr,0.85fr]">
            <div className="p-6 md:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`tag ${statusAccent(record.status)}`}>{statusLabel(record.status)}</span>
                <span className="text-sm text-text-muted">{record.locationLabel || [record.state, record.country].filter(Boolean).join(", ")}</span>
              </div>
              <div>
                <span className="text-label block mb-2">Story preview</span>
                <h1 className="font-display text-4xl md:text-5xl tracking-tight text-text-primary">{record.peakName}</h1>
                <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
                  {record.publicNotes || record.favoriteMoment || "This record is still in progress. Add a short story, a few photos, and Summit will turn it into something worth sharing."}
                </p>
                <p className="mt-3 text-xs font-mono text-text-muted">
                  Public URL: /u/{profile.username}/climbs/{record.slug}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card px-4 py-4">
                  <Route className="w-4 h-4 text-summit mb-3" />
                  <p className="font-mono text-text-primary">{formatMaybeDistance(record.distanceMiles)}</p>
                  <p className="text-xs text-text-muted mt-1">Distance</p>
                </div>
                <div className="rounded-2xl border border-border bg-card px-4 py-4">
                  <TrendingUp className="w-4 h-4 text-summit mb-3" />
                  <p className="font-mono text-text-primary">{formatMaybeElevation(record.elevationGainFt)}</p>
                  <p className="text-xs text-text-muted mt-1">Elevation gain</p>
                </div>
                <div className="rounded-2xl border border-border bg-card px-4 py-4">
                  <Clock3 className="w-4 h-4 text-summit mb-3" />
                  <p className="font-mono text-text-primary">{formatMaybeDuration(record.durationMinutes)}</p>
                  <p className="text-xs text-text-muted mt-1">Time on trail</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[280px] border-t border-border lg:border-l lg:border-t-0 bg-surface">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={record.peakName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-8 text-center text-sm text-text-muted">
                  Add 1 to 5 standout photos and this preview becomes the cover for your climb story.
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent" />
            </div>
          </div>
        </section>

        <PeakRecordForm record={record} mode="edit" />
      </div>
    </div>
  );
}
