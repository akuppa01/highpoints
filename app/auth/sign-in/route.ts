import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getBaseUrl,
  getRequestBaseUrl,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

function getSafeNext(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.length === 0) return "/dashboard";
  if (!value.startsWith("/")) return "/dashboard";
  if (value.startsWith("//")) return "/dashboard";
  return value;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const baseUrl = getRequestBaseUrl(request);
  const provider = typeof formData.get("provider") === "string" ? String(formData.get("provider")) : "";
  const next = getSafeNext(formData.get("next"));

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL(`/login?error=supabase&next=${encodeURIComponent(next)}`, getBaseUrl()), {
      status: 303,
    });
  }

  const supabase = await createClient();

  if (provider === "google") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error || !data.url) {
      return NextResponse.redirect(new URL(`/login?error=google_sign_in_failed&next=${encodeURIComponent(next)}`, getBaseUrl()), {
        status: 303,
      });
    }

    return NextResponse.redirect(data.url, { status: 303 });
  }

  if (provider === "email") {
    const email = typeof formData.get("email") === "string" ? String(formData.get("email")).trim() : "";

    if (!email) {
      return NextResponse.redirect(new URL(`/login?error=missing_email&next=${encodeURIComponent(next)}`, getBaseUrl()), {
        status: 303,
      });
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      return NextResponse.redirect(new URL(`/login?error=email_sign_in_failed&next=${encodeURIComponent(next)}`, getBaseUrl()), {
        status: 303,
      });
    }

    return NextResponse.redirect(
      new URL(`/login?sent=1&email=${encodeURIComponent(email)}&next=${encodeURIComponent(next)}`, getBaseUrl()),
      { status: 303 }
    );
  }

  return NextResponse.redirect(new URL(`/login?error=unknown_provider&next=${encodeURIComponent(next)}`, getBaseUrl()), {
    status: 303,
  });
}
