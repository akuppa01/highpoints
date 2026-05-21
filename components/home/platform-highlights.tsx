import { Camera, LayoutGrid, Mountain, Share2 } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Mountain,
    eyebrow: "Peak intel",
    title: "Browse real summit pages, not generic list entries.",
    body:
      "Each canonical highpoint can hold mountain facts, location context, route flavor, and future enrichment without losing the clean editorial feel of the site.",
  },
  {
    icon: LayoutGrid,
    eyebrow: "Planning board",
    title: "Move climbs from idea to plan to completed memory.",
    body:
      "The journal model supports wish lists, planning, partial attempts, revisits, and finished climbs instead of forcing everything into a yes-or-no checkbox.",
  },
  {
    icon: Camera,
    eyebrow: "Memory card",
    title: "Capture the emotional details as well as the stats.",
    body:
      "Photos, anecdotes, route notes, favorite moments, lessons learned, and gear notes sit together like a modern climb card instead of scattered app fragments.",
  },
  {
    icon: Share2,
    eyebrow: "Publishing",
    title: "Turn private records into polished public pages.",
    body:
      "Profiles and climb pages can be public only when you choose, with controls for which notes, media, stats, and Strava details actually get published.",
  },
];

export function PlatformHighlights() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-wide py-16 md:py-20">
        <div className="mb-8 max-w-2xl">
          <span className="text-label mb-3 block">What the site does</span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Study peaks, log climbs, and share the ones you are proud of.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Highpoints works as a public field guide first and a personal trail journal second.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="card-base bg-card/80 p-6 md:p-7">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-summit/20 bg-summit/10">
                  <Icon className="h-4 w-4 text-summit" />
                </div>
                <p className="text-label mb-3">{item.eyebrow}</p>
                <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
