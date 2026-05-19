import { Pool } from "pg";

function classify(error) {
  const text = `${error?.message || ""} ${JSON.stringify(error || {})}`.toLowerCase();
  if (
    text.includes("password authentication failed") ||
    text.includes("28p01") ||
    text.includes("invalid login credentials")
  ) {
    return "auth";
  }
  if (text.includes("ecircuitbreaker") || text.includes("too many authentication failures")) {
    return "pooler";
  }
  if (
    text.includes("timeout") ||
    text.includes("etimedout") ||
    text.includes("econnreset") ||
    text.includes("enotfound") ||
    text.includes("network")
  ) {
    return "network";
  }
  return "unknown";
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is missing");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  max: 1,
  connectionTimeoutMillis: 4000,
  idleTimeoutMillis: 4000,
  query_timeout: 4000,
  statement_timeout: 4000,
});

const startedAt = Date.now();

try {
  const result = await pool.query("select now() as now, current_user as current_user");
  console.log(
    JSON.stringify(
      {
        ok: true,
        latencyMs: Date.now() - startedAt,
        currentUser: result.rows[0]?.current_user ?? null,
      },
      null,
      2
    )
  );
} catch (error) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        kind: classify(error),
        message: error instanceof Error ? error.message : "Unknown database error",
      },
      null,
      2
    )
  );
  process.exit(1);
} finally {
  await pool.end().catch(() => undefined);
}
