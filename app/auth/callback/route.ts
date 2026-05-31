import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRequestBaseUrl } from "@/lib/supabase/config";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const baseUrl = getRequestBaseUrl(request);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        new URL(
          `/login?error=callback_exchange_failed&next=${encodeURIComponent(next)}`,
          baseUrl
        ),
        { status: 303 }
      );
    }
  }

  return NextResponse.redirect(new URL(next, baseUrl), { status: 303 });
}
