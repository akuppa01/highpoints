import { ArrowRight, Map } from "lucide-react";
import { getFeaturedPeaks } from "@/lib/data/peaks-data";
import { SummitImage } from "@/components/media/summit-image";
import { IntentLink } from "@/components/ui/intent-link";
import { JournalCtaButton } from "@/components/ui/journal-cta-button";
import { getDailyTrailQuote } from "@/lib/data/trail-quotes";

export function Hero() {
  const [primary] = getFeaturedPeaks().slice(0, 1);
  const quote = getDailyTrailQuote();

  return (
    <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="absolute inset-0 bg-base" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(95,153,112,0.16),transparent_32%),radial-gradient(circle_at_80%_25%,rgba(200,169,106,0.08),transparent_24%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(236,232,223,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,223,0.9) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      <div className="container-wide relative">
        <div className="space-y-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-label block mb-5">Peaks, Hikes, and Highpoints</span>
            <h1 className="font-display text-[clamp(44px,7vw,84px)] font-semibold leading-[0.96] tracking-tight text-text-primary">
              Track the climbs that
              <br />
              actually shape your story.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-text-secondary">
              Explore the classic highpoints, save your own climbs fast, and publish the adventures that are worth sharing.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <IntentLink href="/peaks" hoverPrefetch pendingHint className="btn-secondary">
                Explore Peaks
                <ArrowRight className="w-4 h-4" />
              </IntentLink>
              <JournalCtaButton label="Start a journal for free" />
              <IntentLink href="/map" hoverPrefetch pendingHint className="btn-secondary">
                <Map className="w-4 h-4" />
                Browse the Map
              </IntentLink>
            </div>

            <div className="mt-10 rounded-[26px] border border-border bg-card/70 px-6 py-5 backdrop-blur-sm">
              <p className="text-label mb-3">Trail note</p>
              <blockquote className="font-display text-xl md:text-2xl font-semibold tracking-tight text-text-primary">
                “{quote.text}”
              </blockquote>
              <p className="mt-3 text-sm text-text-secondary">{quote.author}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
            {primary && (
              <article className="relative overflow-hidden rounded-[30px] border border-border min-h-[360px] md:min-h-[440px]">
                <SummitImage
                  src={primary.heroImageUrl}
                  alt={primary.name}
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  priority
                />
                <div className="absolute inset-0 img-overlay" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span className="text-label block mb-2">{primary.state}</span>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    {primary.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                    Canonical summit pages give people clean route context first, then make space for real personal stories and public climb pages.
                  </p>
                </div>
              </article>
            )}

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-border bg-card p-5 md:p-6">
                <span className="text-label block mb-3">Why it feels different</span>
                <p className="font-display text-2xl font-semibold text-text-primary tracking-tight">
                  Less checklist energy.
                  <br />
                  More field guide plus brag sheet.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  Use the site without an account, then step into your own journal when you want to save a climb, post a story, or build a public profile.
                </p>
              </div>
              <div className="rounded-[28px] border border-border bg-card/80 p-5 md:p-6">
                <p className="text-label mb-3">What you can do</p>
                <ul className="space-y-3 text-sm leading-relaxed text-text-secondary">
                  <li>Study all 50 state highpoints with clean peak pages.</li>
                  <li>Keep a private journal of completed, attempted, and planned climbs.</li>
                  <li>Turn your best hikes into shareable story pages and recap cards.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
