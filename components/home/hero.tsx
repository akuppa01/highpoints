import Link from "next/link";
import { ArrowRight, BookOpenText, Map } from "lucide-react";
import { getFeaturedPeaks } from "@/lib/data/peaks-data";
import { SummitImage } from "@/components/media/summit-image";

export function Hero() {
  const [primary, secondary, tertiary] = getFeaturedPeaks().slice(0, 3);

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
        <div className="space-y-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-label block mb-5">Peaks, Hikes, and Highpoints</span>
            <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.92] tracking-tight text-text-primary">
              Track the climbs that
              <br />
              actually shape your story.
            </h1>
            <p className="mt-7 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-text-secondary">
              Browse the 50 state highpoints, study summit pages, plan future goals,
              and turn your own climbs into polished public stories with photos,
              notes, maps, and shareable recaps.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/peaks" className="btn-primary">
                Explore Peaks
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/map" className="btn-secondary">
                <Map className="w-4 h-4" />
                Browse the Map
              </Link>
              <Link href="/login" className="btn-secondary">
                <BookOpenText className="w-4 h-4" />
                Start a Journal
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                {
                  value: "50",
                  label: "canonical US highpoints",
                },
                {
                  value: "Private + public",
                  label: "climb records in one system",
                },
                {
                  value: "Photos, notes, Strava",
                  label: "ready for storytelling",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-card/70 px-4 py-4 backdrop-blur-sm">
                  <p className="font-mono text-sm text-summit-amber">{item.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.label}</p>
                </div>
                ))}
              </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
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
                  <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">
                    {primary.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                    Canonical summit pages pair mountain facts with room for personal stories,
                    route detail, media, and publishable climb records.
                  </p>
                </div>
              </article>
            )}

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-border bg-card p-5 md:p-6">
                <span className="text-label block mb-3">Why it feels different</span>
                <p className="font-display text-2xl text-text-primary tracking-tight">
                  Clean peak intel for visitors, calm journaling for climbers, and public pages that feel worth sharing.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  The strongest outdoor products combine route context, memory capture, and visual storytelling.
                  Summit should feel useful before sign-in and deeply personal after it.
                </p>
              </div>

              {secondary && tertiary && (
                <div className="grid grid-cols-2 gap-3">
                  {[secondary, tertiary].map((peak) => (
                    <div key={peak.id} className="relative overflow-hidden rounded-[24px] border border-border min-h-[190px]">
                      <SummitImage
                        src={peak.heroImageUrl}
                        alt={peak.name}
                        sizes="(max-width: 1024px) 50vw, 24vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-white/55">
                          {peak.stateCode}
                        </p>
                        <p className="mt-2 font-display text-xl text-white tracking-tight">
                          {peak.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
