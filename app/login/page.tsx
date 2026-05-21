import { Mail } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getFeaturedPeaks } from "@/lib/data/peaks-data";
import { SummitImage } from "@/components/media/summit-image";
import { IntentLink } from "@/components/ui/intent-link";
import { FormSubmitButton } from "@/components/ui/form-submit-button";
import { getTrailQuote } from "@/lib/data/trail-quotes";

export const dynamic = "force-dynamic";

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
  const [heroPeak] = getFeaturedPeaks().slice(0, 1);
  const quote = getTrailQuote("login");

  return (
    <div className="pt-14 min-h-screen bg-base overflow-hidden">
      <section className="relative min-h-[calc(100vh-3.5rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(119,199,146,0.18),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(120,155,228,0.16),transparent_22%),linear-gradient(180deg,rgba(8,8,8,0.42),rgba(8,8,8,0.82))]" />
        <div className="container-wide relative py-10 md:py-14 h-full">
          <div className="grid min-h-[calc(100vh-7.5rem)] gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-[34px] border border-border/80 bg-card/35">
              <div className="absolute inset-0">
                <SummitImage src={heroPeak?.heroImageUrl} alt={heroPeak?.name ?? "Peak"} sizes="(max-width: 1024px) 100vw, 48vw" priority />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/45 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <span className="text-label mb-3">Highpoints journal</span>
                <h1 className="max-w-xl font-display text-4xl font-semibold md:text-5xl tracking-tight text-white">
                  Keep a trail journal
                  <br />
                  that is worth sharing.
                </h1>
                <blockquote className="mt-5 max-w-lg text-sm leading-relaxed text-white/80">
                  “{quote.text}”
                </blockquote>
                <p className="mt-2 text-xs font-mono uppercase tracking-[0.24em] text-white/55">{quote.author}</p>
              </div>
            </div>

            <div className="flex items-center lg:justify-end">
              <div className="w-full max-w-[520px] rounded-[32px] border border-border bg-card/95 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:p-9">
                <span className="text-label block mb-3">Sign in</span>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary">Welcome back</h2>
                <p className="mt-3 max-w-md text-text-secondary">
                  Save a climb, keep it private, and publish the good ones later.
                </p>

                <div className="mt-6 space-y-4">
                  {!enabled && (
                    <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                      Auth is not configured yet. Add Supabase environment variables to enable magic links, Google sign-in, storage, and personal records.
                    </div>
                  )}

                  {sent && (
                    <div className="rounded-xl border border-summit/30 bg-summit/10 px-4 py-3 text-sm text-text-secondary">
                      Magic link sent to <span className="text-text-primary">{email}</span>.
                    </div>
                  )}

                  {error && !sent && (
                    <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                      Sign-in could not be completed. Check the auth provider settings and callback URL, then try again.
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <form action="/auth/sign-in" method="post">
                    <input type="hidden" name="provider" value="google" />
                    <input type="hidden" name="next" value={next} />
                    <button
                      type="submit"
                      disabled={!enabled}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_10px_34px_rgba(255,255,255,0.12)] transition-all hover:-translate-y-[1px] hover:shadow-[0_16px_40px_rgba(255,255,255,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="grid grid-cols-2 gap-0.5">
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#4285F4]" />
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#EA4335]" />
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#FBBC05]" />
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#34A853]" />
                      </span>
                      Continue with Google
                    </button>
                  </form>

                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
                    <span className="h-px flex-1 bg-border" />
                    <span>or magic link</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>

                  <form action="/auth/sign-in" method="post" className="space-y-4">
                    <fieldset disabled={!enabled} className="space-y-4 disabled:opacity-60">
                      <input type="hidden" name="provider" value="email" />
                      <input type="hidden" name="next" value={next} />
                      <label className="block space-y-2">
                        <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
                          Email address
                        </span>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@trailmail.com"
                            className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-border bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-light"
                          />
                        </div>
                      </label>
                      <FormSubmitButton
                        idleLabel="Email me a magic link"
                        pendingLabel="Sending magic link..."
                        fullWidth
                        className="rounded-2xl py-3.5"
                      />
                    </fieldset>
                  </form>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
                  <p className="text-sm text-text-muted">No password. Just a quick link back in.</p>
                  <IntentLink href="/" hoverPrefetch pendingHint className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    Back to site
                  </IntentLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
