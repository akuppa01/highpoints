import { Pool } from "pg";
import { getDatabaseConfig, isDatabaseConfigured } from "@/lib/db/config";
import { classifyDatabaseError } from "@/lib/db/retry";

export async function checkDatabaseHealth() {
  const config = getDatabaseConfig();

  if (!isDatabaseConfigured()) {
    return {
      ok: false,
      kind: "unknown",
      message: "DATABASE_URL and DIRECT_URL are not fully configured.",
      config,
    };
  }

  const pool = new Pool({
    connectionString: config.pooledUrl,
    max: 1,
    connectionTimeoutMillis: 4000,
    idleTimeoutMillis: 4000,
    query_timeout: 4000,
    statement_timeout: 4000,
  });

  const startedAt = Date.now();

  try {
    const result = await pool.query("select now() as now, current_user as current_user");
    return {
      ok: true,
      kind: "unknown",
      latencyMs: Date.now() - startedAt,
      message: "Database connection healthy.",
      currentUser: result.rows[0]?.current_user ?? null,
      config,
    };
  } catch (error) {
    return {
      ok: false,
      kind: classifyDatabaseError(error),
      latencyMs: Date.now() - startedAt,
      message: error instanceof Error ? error.message : "Unknown database error",
      config,
    };
  } finally {
    await pool.end().catch(() => undefined);
  }
}
