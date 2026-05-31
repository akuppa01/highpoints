import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Globe2,
  LockKeyhole,
  Route,
  Timer,
  TrendingUp,
} from "lucide-react";
import {
  ClimbRecapCard,
  ProfileRecapCard,
} from "@/components/public/share-cards";

const EXAMPLE_NOTES = [
  "Route: Henrys Fork trailhead + summit ridge",
  "Companions: two friends, alpine start",
  "Private note: train legs for the final talus push",
  "Public note: sunrise above Dollar Lake Basin should lead the story",
];

const PUBLISH_DETAILS = [
  { icon: Globe2, text: "Public notes and photos" },
  { icon: LockKeyhole, text: "Private field notes stay private" },
  { icon: Globe2, text: "Stats and Strava can be shared separately" },
];

export function Showcase() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.95fr]">
          <div className="card-base bg-gradient-to-br from-[#111615] via-card to-card p-6 md:p-8">
            <span className="text-label mb-3 block">Journal experience</span>
            <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
              Structured like a great memory card.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">
              The editor should feel calm and intentional: part route log, part field
              notebook, part scrapbook. Enough structure to be useful, enough warmth to
              keep the climb human.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="space-y-4 rounded-[24px] border border-border bg-base/60 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="tag border-sky-400/20 bg-sky-400/10 text-sky-300">
                    Planning
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    example record
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl text-text-primary">Kings Peak</h3>
                  <p className="mt-1 text-sm text-text-muted">Uinta Mountains, Utah</p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-2xl border border-border bg-card px-3 py-3">
                    <Route className="mb-2 h-3.5 w-3.5 text-summit" />
                    <p className="font-mono text-text-primary">27.8 mi</p>
                    <p className="mt-1 text-text-muted">Distance</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card px-3 py-3">
                    <TrendingUp className="mb-2 h-3.5 w-3.5 text-summit" />
                    <p className="font-mono text-text-primary">4,850 ft</p>
                    <p className="mt-1 text-text-muted">Gain</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card px-3 py-3">
                    <Timer className="mb-2 h-3.5 w-3.5 text-summit" />
                    <p className="font-mono text-text-primary">12h</p>
                    <p className="mt-1 text-text-muted">Estimated</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {EXAMPLE_NOTES.map((line) => (
                    <div
                      key={line}
                      className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-secondary"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <ClimbRecapCard
                  title="Whitney at sunrise"
                  subtitle="Example climb share card"
                  distanceMiles={22}
                  elevationGainFt={6100}
                  durationMinutes={760}
                />

                <div className="rounded-[24px] border border-border bg-card p-5">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Eye className="h-4 w-4 text-summit" />
                    <span className="text-sm">Publish controls</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {PUBLISH_DETAILS.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.text}
                          className="flex items-center gap-3 rounded-xl border border-border bg-base/70 px-4 py-3 text-sm text-text-secondary"
                        >
                          <Icon className="h-4 w-4 text-summit" />
                          {item.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProfileRecapCard
              peaksClimbed={7}
              totalElevationGainFt={24329}
              totalTrailMinutes={3340}
              statesCoveredCount={7}
              featuredClimbName="Mount Whitney"
            />

            <div className="card-base p-6 md:p-7">
              <span className="text-label mb-3 block">Why visitors still benefit</span>
              <h3 className="font-display text-3xl tracking-tight text-text-primary">
                Come for the mountain intel. Stay for the stories.
              </h3>
              <p className="mt-4 leading-relaxed text-text-secondary">
                Even without an account, visitors should be able to compare summits,
                browse the full state list, inspect the map, and get a feel for how
                other climbers document memorable days outside.
              </p>
              <Link
                href="/peaks"
                className="mt-6 inline-flex items-center gap-2 text-sm text-summit transition-colors hover:text-summit-light"
              >
                See the canonical peaks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
