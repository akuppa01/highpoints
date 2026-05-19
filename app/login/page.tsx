import Link from "next/link";
import { Mountain, Mail, ArrowRight, Sparkles } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getFeaturedPeaks } from "@/lib/data/peaks-data";
import { SummitImage } from "@/components/media/summit-image";
import { IntentLink } from "@/components/ui/intent-link";

export const dynamic = "force-dynamic";

const LOGIN_NOTES = [
  {
    eyebrow: "Field note",
    title: "Save the climb while it still feels fresh.",
    body: "A quick record now can become a better story, map pin, and share card later.",
  },
  {
    eyebrow: "Why people stay",
    title: "Keep private notes and public memories in the same place.",
    body: "Summit is built so the first save is fast and the richer story can come later.",
  },
  {
    eyebrow: "After login",
    title: "Turn one peak into a portfolio.",
    body: "Track future goals, save completed climbs, and publish only what feels worth sharing.",
  },
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/dashboard";
  const sent = params.sent === "1";
  const email = typeof params.email === "string" ? params.email : "";
  const error = typeof params.error === "string" ? params.error : "";
  const enabled = isSupabaseConfigured();
  const featured = getFeaturedPeaks().filter((peak) => peak.heroImageUrl);
  const seed = Math.floor(Date.now() / 60000) % Math.max(featured.length, 1);
  const visualPeaks = Array.from({ length: 3 }, (_, index) => featured[(seed + index) % featured.length]).filter(Boolean);
  const note = LOGIN_NOTES[seed % LOGIN_NOTES.length];

  return (
    <div className="pt-14 min-h-screen bg-base">
      <section className="container-wide py-10 md:py-14">
        <div className="card-base grain overflow-hidden">
          <div className="grid lg:grid-cols-[0.92fr,1.08fr]">
            <div className="p-7 md:p-10 xl:p-12 space-y-6 border-b border-border lg:border-b-0 lg:border-r bg-gradient-to-br from-summit/10 via-transparent to-transparent">
              <div>
                <span className="text-label block mb-3">Sign in</span>
                <h1 className="font-display text-4xl md:text-5xl tracking-tight text-text-primary">
                  Pick up where your last climb left off.
                </h1>
                <p className="text-text-secondary leading-relaxed mt-4 max-w-lg">
                  Sign in to save climbs, plan future peaks, and publish the stories worth sharing.
                </p>
              </div>

              {!enabled && (
                <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                  Auth is not configured yet. Add Supabase environment variables to
                  enable magic links, Google sign-in, storage, and personal records.
                </div>
              )}

              {sent && (
                <div className="rounded-xl border border-summit/30 bg-summit/10 px-4 py-3 text-sm text-text-secondary">
                  Magic link sent to <span className="text-text-primary">{email}</span>.
                </div>
              )}

              {error && !sent && (
                <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                  Sign-in could not be completed. Check the auth provider settings and
                  callback URL, then try again.
                </div>
              )}

              <div className="space-y-4">
                <form action="/auth/sign-in" method="post" className="space-y-4">
                  <input type="hidden" name="provider" value="email" />
                  <input type="hidden" name="next" value={next} />
                  <label className="block space-y-2">
                    <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
                      Email for magic link
                    </span>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@trailmail.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-light"
                      />
                    </div>
                  </label>
                  <button type="submit" className="btn-primary w-full justify-center" disabled={!enabled}>
                    Send magic link
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <form action="/auth/sign-in" method="post">
                  <input type="hidden" name="provider" value="google" />
                  <input type="hidden" name="next" value={next} />
                  <button type="submit" className="btn-secondary w-full justify-center" disabled={!enabled}>
                    <Mountain className="w-4 h-4" />
                    Continue with Google
                  </button>
                </form>
              </div>

              <div className="rounded-2xl border border-border bg-card/80 p-4 md:p-5">
                <div className="flex items-center gap-2 text-summit mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-[0.24em]">After login</span>
                </div>
                <div className="grid gap-3 text-sm text-text-secondary sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div>Quick private logs for climbs, plans, and revisits.</div>
                  <div>Clean public pages for the stories you want to share.</div>
                </div>
              </div>

              <IntentLink href="/" pendingHint className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-2">
                Back to the public site
              </IntentLink>
            </div>

            <div className="relative overflow-hidden bg-surface p-7 md:p-10 xl:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(95,153,112,0.16),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(200,169,106,0.10),transparent_24%)]" />
              <div className="relative space-y-8">
                <div className="max-w-xl">
                  <span className="text-label block mb-3">Summit preview</span>
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight text-text-primary">
                    A calmer home for the peaks you remember.
                  </h2>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-text-secondary max-w-lg">
                    Each visit rotates a few iconic summits so the sign-in page feels alive without getting busy.
                  </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1.05fr,0.95fr]">
                  <div className="relative min-h-[320px] sm:min-h-[380px]">
                    {visualPeaks[0] ? (
                      <div className="absolute left-0 top-0 h-44 w-44 sm:h-56 sm:w-56 overflow-hidden rounded-full border border-border shadow-2xl">
                        <SummitImage
                          src={visualPeaks[0].heroImageUrl}
                          alt={visualPeaks[0].name}
                          sizes="(max-width: 640px) 176px, 224px"
                          priority
                        />
                      </div>
                    ) : null}
                    {visualPeaks[1] ? (
                      <div className="absolute right-2 top-14 h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full border border-border shadow-2xl">
                        <SummitImage
                          src={visualPeaks[1].heroImageUrl}
                          alt={visualPeaks[1].name}
                          sizes="(max-width: 640px) 144px, 176px"
                        />
                      </div>
                    ) : null}
                    {visualPeaks[2] ? (
                      <div className="absolute left-12 bottom-0 h-40 w-40 sm:h-52 sm:w-52 overflow-hidden rounded-full border border-border shadow-2xl">
                        <SummitImage
                          src={visualPeaks[2].heroImageUrl}
                          alt={visualPeaks[2].name}
                          sizes="(max-width: 640px) 160px, 208px"
                        />
                      </div>
                    ) : null}
                    <div className="absolute inset-x-0 bottom-0 rounded-[28px] border border-border bg-base/85 p-4 backdrop-blur-xl">
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Featured now</p>
                      <div className="mt-3 grid gap-2 text-sm text-text-secondary sm:grid-cols-3">
                        {visualPeaks.map((peak) => (
                          <div key={peak.id}>
                            <p className="text-text-primary">{peak.name}</p>
                            <p className="text-xs font-mono text-text-muted">{peak.state}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[28px] border border-border bg-card/85 p-5 md:p-6">
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
                        {note.eyebrow}
                      </p>
                      <h3 className="mt-3 font-display text-2xl tracking-tight text-text-primary">
                        {note.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {note.body}
                      </p>
                    </div>

                    <div className="rounded-[28px] border border-border bg-card/70 p-5 md:p-6">
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
                        What it becomes
                      </p>
                      <div className="mt-4 space-y-3 text-sm text-text-secondary">
                        <p>A quick climb log can grow into a map pin, story page, photo set, and shareable recap.</p>
                        <p>You do not need to fill everything out on day one. The point is to start.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
