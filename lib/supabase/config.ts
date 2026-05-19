import { getDatabaseConfig, getProjectRef, getPublicSiteUrl } from "@/lib/db/config";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getBaseUrl() {
  return getPublicSiteUrl();
}

export { getDatabaseConfig, getProjectRef };
