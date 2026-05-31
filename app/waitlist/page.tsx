import Script from "next/script";
import { getFeaturedPeaks } from "@/lib/data/peaks-data";
import { SummitImage } from "@/components/media/summit-image";

export const metadata = {
  title: "Join the Waitlist — Highpoints",
  description: "Be the first to know when Highpoints launches. Join the waitlist.",
};

export default async function WaitlistPage() {
  const [heroPeak] = getFeaturedPeaks().slice(0, 1);

  return (
    <div className="pt-14 min-h-screen bg-base overflow-hidden">
      <section className="relative min-h-[calc(100vh-3.5rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(119,199,146,0.18),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(120,155,228,0.16),transparent_22%),linear-gradient(180deg,rgba(8,8,8,0.42),rgba(8,8,8,0.82))]" />
        <div className="container-wide relative py-10 md:py-14 h-full">
          <div className="grid min-h-[calc(100vh-7.5rem)] gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-stretch">
            {/* Hero image panel */}
            <div className="relative overflow-hidden rounded-[34px] border border-border/80 bg-card/35">
              <div className="absolute inset-0">
                <SummitImage
                  src={heroPeak?.heroImageUrl}
                  alt={heroPeak?.name ?? "Peak"}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/45 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <span className="text-label mb-3">Highpoints journal</span>
                <h1 className="max-w-xl font-display text-4xl font-semibold md:text-5xl tracking-tight text-white">
                  Keep a trail journal
                  <br />
                  that is worth sharing.
                </h1>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80">
                  Log every summit, write the story behind it, and share the ones worth remembering.
                </p>
              </div>
            </div>

            {/* Waitlist form panel */}
            <div className="flex items-center lg:justify-end">
              <div className="w-full max-w-[520px] rounded-[32px] border border-border bg-card/95 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:p-9">
                <span className="text-label block mb-3">Early access</span>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary">
                  Join the waitlist
                </h2>
                <p className="mt-3 max-w-md text-text-secondary">
                  We&apos;re opening up access soon. Drop your info below and we&apos;ll reach out when it&apos;s your turn.
                </p>

                <div className="mt-6">
                  <iframe
                    data-tally-src="https://tally.so/embed/Bz0ja7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="551"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Join the Highpoints Waitlist"
                  />
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
                  <p className="text-sm text-text-muted">Explore the app while you wait.</p>
                  <div className="flex gap-3 text-sm">
                    <a href="/peaks" className="text-text-secondary hover:text-text-primary transition-colors">
                      Peaks
                    </a>
                    <a href="/map" className="text-text-secondary hover:text-text-primary transition-colors">
                      Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="tally-embed"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}`,
        }}
      />
    </div>
  );
}
