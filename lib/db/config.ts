const DEFAULT_LOCAL_SITE_URL = "http://localhost:3000";

function parseProjectRefFromSupabaseUrl(url?: string | null) {
  if (!url) return null;

  try {
    const hostname = new URL(url).hostname;
    const [subdomain] = hostname.split(".");
    return subdomain || null;
  } catch {
    return null;
  }
}

function maskUrl(url?: string | null) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "****";
    return parsed.toString();
  } catch {
    return url.replace(/:(.*?)@/, ":****@");
  }
}

function getConnectionWarnings(url: string | undefined, expectedUser: string, kind: "pooled" | "direct") {
  const warnings: string[] = [];
  if (!url) {
    warnings.push(`${kind} connection string is missing`);
    return warnings;
  }

  try {
    const parsed = new URL(url);
    if (parsed.username !== expectedUser) {
      warnings.push(
        `${kind} username should be "${expectedUser}" but is "${parsed.username || "<empty>"}"`
      );
    }

    if (kind === "pooled") {
      if (!parsed.hostname.includes(".pooler.supabase.com")) {
        warnings.push("pooled connection should use the Supavisor pooler host");
      }
      if (parsed.searchParams.get("pgbouncer") !== "true") {
        warnings.push('pooled connection should include "pgbouncer=true"');
      }
    }

    if (kind === "direct" && !parsed.hostname.startsWith("db.")) {
      warnings.push('direct connection should use host format "db.<project-ref>.supabase.co"');
    }
  } catch {
    warnings.push(`${kind} connection string could not be parsed`);
  }

  return warnings;
}

export function getProjectRef() {
  return (
    process.env.SUPABASE_PROJECT_REF ||
    parseProjectRefFromSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    null
  );
}

export function getDatabaseConfig() {
  const projectRef = getProjectRef();
  const pooledUrl = process.env.DATABASE_URL;
  const directUrl = process.env.DIRECT_URL;
  const expectedPoolerUser = projectRef ? `postgres.${projectRef}` : "postgres.[PROJECT_REF]";
  const expectedDirectUser = "postgres";

  const warnings = [
    ...getConnectionWarnings(pooledUrl, expectedPoolerUser, "pooled"),
    ...getConnectionWarnings(directUrl, expectedDirectUser, "direct"),
  ];

  return {
    projectRef,
    pooledUrl,
    directUrl,
    expectedPoolerUser,
    expectedDirectUser,
    maskedPooledUrl: maskUrl(pooledUrl),
    maskedDirectUrl: maskUrl(directUrl),
    warnings,
  };
}

export function isDatabaseConfigured() {
  const config = getDatabaseConfig();
  return Boolean(config.pooledUrl && config.directUrl);
}

export function getPublicSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/^/, "https://") ||
    DEFAULT_LOCAL_SITE_URL
  );
}
