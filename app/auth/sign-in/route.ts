import { NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function getSafeNextPath(next: FormDataEntryValue | null) {
  if (typeof next !== "string" || !next.startsWith("/")) {
    return "/dashboard";
  }

  return next;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const provider = formData.get("provider");
  const next = getSafeNextPath(formData.get("next"));
  const baseUrl = getBaseUrl();
  const callbackUrl = new URL("/auth/callback", baseUrl);
  callbackUrl.searchParams.set("next", next);

  const supabase = await createClient();

  if (provider === "email") {
    const email = formData.get("email");
    const url = new URL("/login", baseUrl);
    url.searchParams.set("next", next);

    if (typeof email !== "string" || !email.trim()) {
      url.searchParams.set("error", "missing_email");
      return NextResponse.redirect(url, { status: 303 });
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      url.searchParams.set("error", "email_sign_in_failed");
      return NextResponse.redirect(url, { status: 303 });
    }

    url.searchParams.set("sent", "1");
    url.searchParams.set("email", email.trim());
    return NextResponse.redirect(url, { status: 303 });
  }

  if (provider === "google") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });

    if (error || !data.url) {
      const url = new URL("/login", baseUrl);
      url.searchParams.set("error", "google_sign_in_failed");
      url.searchParams.set("next", next);
      return NextResponse.redirect(url, { status: 303 });
    }

    return NextResponse.redirect(data.url, { status: 303 });
  }

  const url = new URL("/login", baseUrl);
  url.searchParams.set("error", "unknown_provider");
  url.searchParams.set("next", next);
  return NextResponse.redirect(url, { status: 303 });
}
