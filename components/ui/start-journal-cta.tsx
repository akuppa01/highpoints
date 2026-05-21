import { ArrowRight, BookOpenText } from "lucide-react";
import { IntentLink } from "@/components/ui/intent-link";

export function StartJournalCta({
  title = "Start a journal for free",
  body = "Keep your climbs private at first, then publish the ones worth sharing.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="card-base overflow-hidden border-summit/20 bg-gradient-to-br from-summit/12 via-card to-card">
      <div className="container-wide py-12 md:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-label mb-3 block">Get started</span>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              {body}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <IntentLink href="/login" hoverPrefetch pendingHint className="btn-primary">
              <BookOpenText className="h-4 w-4" />
              Start a journal
            </IntentLink>
            <IntentLink href="/peaks" hoverPrefetch pendingHint className="btn-secondary">
              Browse peaks
              <ArrowRight className="h-4 w-4" />
            </IntentLink>
          </div>
        </div>
      </div>
    </section>
  );
}
