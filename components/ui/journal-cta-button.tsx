"use client";

import { useEffect, useState } from "react";
import { BookOpenText } from "lucide-react";
import { IntentLink } from "@/components/ui/intent-link";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Auth-aware CTA button.
 * - Not logged in  →  /login
 * - Already logged in  →  /dashboard
 *
 * Starts with /login to avoid flash-of-wrong-href, then resolves on mount.
 */
export function JournalCtaButton({
  label = "Start a journal for free",
  className = "btn-primary",
}: {
  label?: string;
  className?: string;
}) {
  const [href, setHref] = useState<"/login" | "/dashboard">("/login");

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        if (user) setHref("/dashboard");
      });
  }, []);

  return (
    <IntentLink href={href} hoverPrefetch pendingHint className={className}>
      <BookOpenText className="w-4 h-4" />
      {label}
    </IntentLink>
  );
}
