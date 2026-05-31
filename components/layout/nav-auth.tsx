"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { UserProfile } from "@/types";

function getInitials(name: string) {
  const parts = name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "S";
}

function getFallbackProfile(user: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}): UserProfile {
  const emailPrefix = user.email?.split("@")[0] ?? "highpoints";
  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    emailPrefix;

  return {
    id: user.id,
    username: (user.user_metadata?.preferred_username as string | undefined) || emailPrefix,
    displayName,
    avatarUrl: (user.user_metadata?.avatar_url as string | undefined) ?? null,
    bio: null,
    homeBase: null,
    favoriteRegion: null,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  };
}

export function NavAuth() {
  const router = useRouter();
  const [viewer, setViewer] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(() => !isSupabaseConfigured());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    let active = true;

    const loadViewer = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        setViewer(null);
        setReady(true);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      setViewer(
        profile
          ? {
              id: String(profile.id),
              username: String(profile.username),
              displayName: String(profile.display_name),
              bio: profile.bio,
              avatarUrl: profile.avatar_url,
              homeBase: profile.home_base,
              favoriteRegion: profile.favorite_region,
              createdAt: String(profile.created_at),
              updatedAt: String(profile.updated_at),
            }
          : getFallbackProfile(user)
      );
      setReady(true);
    };

    void loadViewer();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadViewer();
      startTransition(() => router.refresh());
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (!ready) {
    return (
      <Link
        href="/waitlist"
        className="inline-flex items-center rounded-full border border-border px-3.5 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-border-light hover:bg-card transition-colors opacity-85"
      >
        Sign In
      </Link>
    );
  }

  if (!viewer) {
    return (
      <Link
        href="/waitlist"
        className="inline-flex items-center rounded-full border border-border px-3.5 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-border-light hover:bg-card transition-colors"
      >
        Sign In
      </Link>
    );
  }

  const initials = getInitials(viewer.displayName);

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5 hover:border-border-light transition-colors"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-summit/15 border border-summit/25 text-xs font-mono text-summit-light">
          {initials}
        </div>
        <div className="hidden xl:block pr-1 text-left min-w-0">
          <p className="text-sm text-text-primary leading-none">{viewer.displayName}</p>
          <p className="mt-1 text-[11px] font-mono text-text-muted leading-none">@{viewer.username}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={async () => {
          const supabase = createClient();
          await supabase.auth.signOut();
          startTransition(() => router.push("/"));
        }}
        className="inline-flex items-center gap-2 rounded-full border border-transparent px-2.5 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-card transition-colors disabled:cursor-wait"
        disabled={isPending}
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden lg:inline">Sign out</span>
      </button>
    </div>
  );
}
