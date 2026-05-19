type RetryOptions = {
  label: string;
  retries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
};

type ErrorKind = "auth" | "network" | "pooler" | "unknown";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function classifyDatabaseError(error: unknown): ErrorKind {
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "";
  const details = JSON.stringify(error ?? {});
  const text = `${message} ${details}`.toLowerCase();

  if (
    text.includes("password authentication failed") ||
    text.includes("invalid login credentials") ||
    text.includes("authapierror") ||
    text.includes("28p01") ||
    text.includes("jwt")
  ) {
    return "auth";
  }

  if (text.includes("ecircuitbreaker") || text.includes("too many authentication failures")) {
    return "pooler";
  }

  if (
    text.includes("etimedout") ||
    text.includes("timeout") ||
    text.includes("econnreset") ||
    text.includes("enotfound") ||
    text.includes("eai_again") ||
    text.includes("fetch failed") ||
    text.includes("network")
  ) {
    return "network";
  }

  return "unknown";
}

export function logDatabaseError(label: string, error: unknown) {
  const kind = classifyDatabaseError(error);
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";

  console.error(`[db:${label}] ${kind} failure`, {
    kind,
    message,
  });
}

export async function withDatabaseRetry<T>(
  task: () => Promise<T>,
  options: RetryOptions
) {
  const retries = options.retries ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 250;
  const maxDelayMs = options.maxDelayMs ?? 2000;

  let attempt = 0;
  while (true) {
    try {
      return await task();
    } catch (error) {
      attempt += 1;
      const kind = classifyDatabaseError(error);

      if (kind === "auth" || attempt > retries) {
        logDatabaseError(options.label, error);
        throw error;
      }

      const delay = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs);
      console.warn(`[db:${options.label}] retrying after ${delay}ms`, {
        attempt,
        retries,
        kind,
      });
      await sleep(delay);
    }
  }
}
