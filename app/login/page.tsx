import Link from "next/link";
import { Mountain, Mail, ArrowRight } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";

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

  return (
    <div className="pt-14 min-h-screen bg-base">
      <section className="container-tight py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="card-base grain overflow-hidden">
            <div className="p-8 md:p-10 border-b border-border bg-gradient-to-br from-summit/12 via-transparent to-transparent">
              <span className="text-label block mb-3">Sign in</span>
              <h1 className="font-display text-4xl md:text-5xl tracking-tight text-text-primary">
                Keep the public summit guide.
                <br />
                <span className="text-gradient">Add your own climbing journal.</span>
              </h1>
              <p className="text-text-secondary leading-relaxed mt-4 max-w-xl">
                Save climbs, plan future peaks, publish polished trail stories, and
                build a shareable adventure profile without changing the public
                browsing experience.
              </p>
            </div>

            <div className="p-8 md:p-10 space-y-6">
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

              <div className="divider" />

              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
                  What unlocks after login
                </p>
                <div className="grid gap-3 sm:grid-cols-2 text-sm text-text-secondary">
                  <div className="card-base p-4">Private climb records with structured notes, stats, photos, and Strava references.</div>
                  <div className="card-base p-4">A flexible board for any peak, hike, scramble, or summit goal.</div>
                  <div className="card-base p-4">A public adventure portfolio at <span className="text-text-primary">/u/username</span>.</div>
                  <div className="card-base p-4">Share-ready recap cards that match the current Summit visual language.</div>
                </div>
              </div>

              <Link href="/" className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-2">
                Back to the public site
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
