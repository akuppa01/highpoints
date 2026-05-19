import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await checkDatabaseHealth();
  const status = health.ok ? 200 : 503;

  return NextResponse.json(health, { status });
}
