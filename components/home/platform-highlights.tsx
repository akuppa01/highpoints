import { Camera, LayoutGrid, MapPinned, Mountain, Share2 } from "lucide-react";

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
  {
    icon: MapPinned,
    eyebrow: "Map view",
    title: "See the shape of the journey at a glance.",
    body:
      "The map experience still honors the 50-state highpoints, but it can now stretch to any peak, trail, or mountain objective that matters to you.",
  },
];

export function PlatformHighlights() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-wide py-16 md:py-20">
        <div className="max-w-3xl mb-10">
          <span className="text-label block mb-3">What the site does</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary">
            The best parts of discovery, planning, logging, and sharing.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            Research from products like Strava, AllTrails, and Peakbagger points the same way:
            people stay when a product combines map context, stats, memory, and a profile worth revisiting.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {HIGHLIGHTS.map((item) => (
            <article key={item.title} className="card-base p-6 md:p-7 bg-card/80">
              <div className="w-10 h-10 rounded-2xl border border-summit/20 bg-summit/10 flex items-center justify-center mb-5">
                <item.icon className="w-4 h-4 text-summit" />
              </div>
              <p className="text-label mb-3">{item.eyebrow}</p>
              <h3 className="font-display text-2xl text-text-primary tracking-tight leading-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
