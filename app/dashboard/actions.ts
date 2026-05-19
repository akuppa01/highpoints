"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  buildRecordSlug,
  getCanonicalPeakById,
  requireProfile,
  syncPublishedRecord,
} from "@/lib/data/records";
import { getPeakWithClimbById } from "@/lib/data/peaks-data";
import { slugify } from "@/lib/utils";
import type { Peak } from "@/types";

function parseString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function parseOptionalString(value: FormDataEntryValue | null) {
  const parsed = parseString(value);
  return parsed.length > 0 ? parsed : null;
}

function parseOptionalNumber(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function parseOptionalInteger(value: FormDataEntryValue | null) {
  const numeric = parseOptionalNumber(value);
  return numeric === null ? null : Math.round(numeric);
}

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function parseLines(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return [];
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

async function uploadPhotos(recordId: string, formData: FormData) {
  const files = formData
    .getAll("photos")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (files.length === 0 || !isSupabaseConfigured()) return;

  const supabase = await createClient();

  for (const [index, file] of files.entries()) {
    const extension = file.name.split(".").pop() || "jpg";
    const path = `${recordId}/${Date.now()}-${index}.${extension}`;
    const { data, error } = await supabase.storage
      .from("climb-photos")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error || !data) continue;

    const {
      data: { publicUrl },
    } = supabase.storage.from("climb-photos").getPublicUrl(data.path);

    await supabase.from("peak_record_media").insert({
      peak_record_id: recordId,
      storage_path: data.path,
      media_url: publicUrl,
      source_type: "upload",
      visibility: parseBoolean(formData.get("show_media_publicly")) ? "public" : "private",
      is_highlight: index === 0,
      sort_order: index,
    });
  }
}

async function ensureUniqueSlug(
  userId: string,
  desiredSlug: string,
  existingRecordId?: string
) {
  const supabase = await createClient();

  for (let index = 0; index < 20; index += 1) {
    const candidate = index === 0 ? desiredSlug : `${desiredSlug}-${index + 1}`;
    const query = supabase
      .from("peak_records")
      .select("id")
      .eq("user_id", userId)
      .eq("slug", candidate);

    const { data } = existingRecordId
      ? await query.neq("id", existingRecordId).maybeSingle()
      : await query.maybeSingle();

    if (!data) return candidate;
  }

  return `${desiredSlug}-${Date.now().toString().slice(-4)}`;
}

async function ensureCanonicalPeakRow(peak: Peak) {
  const supabase = await createClient();
  const payload = {
    id: peak.id,
    slug: peak.slug,
    name: peak.name,
    state: peak.state,
    state_code: peak.stateCode,
    elevation_ft: peak.elevationFt,
    prominence_ft: peak.prominenceFt ?? null,
    latitude: peak.latitude,
    longitude: peak.longitude,
    difficulty: peak.difficulty ?? null,
    region: peak.region,
    short_description: peak.shortDescription ?? null,
    long_description: peak.longDescription ?? null,
    hero_image_url: peak.heroImageUrl ?? null,
    featured: peak.featured,
  };

  const { error } = await supabase.from("peaks").upsert(payload, {
    onConflict: "id",
  });

  if (error) {
    console.error("[dashboard.ensureCanonicalPeakRow] failed", error.message);
    return null;
  }

  return peak.id;
}

export async function savePeakRecordAction(formData: FormData) {
  const profile = await requireProfile();
  if (!isSupabaseConfigured()) {
    redirect("/dashboard?error=supabase");
  }

  const supabase = await createClient();
  const mode = parseString(formData.get("mode")) === "edit" ? "edit" : "create";
  const recordId = parseString(formData.get("record_id"));
  const canonicalPeakId = parseOptionalString(formData.get("canonical_peak_id"));
  const canonicalPeak = getCanonicalPeakById(canonicalPeakId);
  const canonicalPeakWithClimb = getPeakWithClimbById(canonicalPeakId);
  const defaultClimb = canonicalPeakWithClimb?.climb;
  const useCanonicalDefaults = parseBoolean(formData.get("use_canonical_defaults"));
  const peakName =
    parseString(formData.get("peak_name")) || canonicalPeak?.name || "Untitled climb";
  const dateClimbed = parseOptionalString(formData.get("date_climbed"));
  const slugBase = buildRecordSlug(peakName, dateClimbed);
  const desiredSlug = parseString(formData.get("slug")) || slugBase || slugify(peakName);
  const slug = await ensureUniqueSlug(profile.id, desiredSlug, recordId || undefined);
  const canonicalPeakIdForSave = canonicalPeak
    ? await ensureCanonicalPeakRow(canonicalPeak)
    : null;
  const locationLabel =
    parseOptionalString(formData.get("location_label")) ||
    [canonicalPeak?.state, "United States"].filter(Boolean).join(", ");

  const payload = {
    user_id: profile.id,
    canonical_peak_id: canonicalPeakIdForSave,
    slug,
    peak_name: peakName,
    location_label: locationLabel,
    state: parseOptionalString(formData.get("state")) || canonicalPeak?.state || null,
    country: parseOptionalString(formData.get("country")) || "United States",
    latitude: parseOptionalNumber(formData.get("latitude")) ?? canonicalPeak?.latitude ?? null,
    longitude: parseOptionalNumber(formData.get("longitude")) ?? canonicalPeak?.longitude ?? null,
    status: parseString(formData.get("status")) || "want_to_climb",
    date_climbed: dateClimbed,
    planned_for: parseOptionalString(formData.get("planned_for")),
    route_name:
      parseOptionalString(formData.get("route_name")) ||
      (useCanonicalDefaults ? defaultClimb?.routeName ?? null : null),
    companions: parseOptionalString(formData.get("companions")),
    weather: parseOptionalString(formData.get("weather")),
    difficulty: parseOptionalString(formData.get("difficulty")) || canonicalPeak?.difficulty || null,
    distance_miles:
      parseOptionalNumber(formData.get("distance_miles")) ??
      (useCanonicalDefaults ? defaultClimb?.distanceMiles ?? null : null),
    elevation_gain_ft:
      parseOptionalInteger(formData.get("elevation_gain_ft")) ??
      (useCanonicalDefaults ? defaultClimb?.elevationGainFt ?? null : null),
    duration_minutes:
      parseOptionalInteger(formData.get("duration_minutes")) ??
      (useCanonicalDefaults ? defaultClimb?.durationMinutes ?? null : null),
    notes: parseOptionalString(formData.get("notes")),
    anecdotes: parseOptionalString(formData.get("anecdotes")),
    special_memories: parseOptionalString(formData.get("special_memories")),
    private_notes: parseOptionalString(formData.get("private_notes")),
    public_notes: parseOptionalString(formData.get("public_notes")),
    favorite_moment: parseOptionalString(formData.get("favorite_moment")),
    lessons_learned: parseOptionalString(formData.get("lessons_learned")),
    gear_notes: parseOptionalString(formData.get("gear_notes")),
    audio_transcript: parseOptionalString(formData.get("audio_transcript")),
    external_album_links: parseLines(formData.get("external_album_links")),
    hero_photo_url: parseOptionalString(formData.get("hero_photo_url")) || canonicalPeak?.heroImageUrl || null,
    is_published: parseBoolean(formData.get("is_published")),
    show_notes_publicly: parseBoolean(formData.get("show_notes_publicly")),
    show_media_publicly: parseBoolean(formData.get("show_media_publicly")),
    show_stats_publicly: parseBoolean(formData.get("show_stats_publicly")),
    show_strava_publicly: parseBoolean(formData.get("show_strava_publicly")),
    strava_activity_url: parseOptionalString(formData.get("strava_activity_url")),
    strava_activity_title: parseOptionalString(formData.get("strava_activity_title")),
    strava_activity_date: parseOptionalString(formData.get("strava_activity_date")),
    strava_distance_miles: parseOptionalNumber(formData.get("strava_distance_miles")),
    strava_elevation_gain_ft: parseOptionalInteger(formData.get("strava_elevation_gain_ft")),
    strava_moving_time_minutes: parseOptionalInteger(formData.get("strava_moving_time_minutes")),
    strava_pace_text: parseOptionalString(formData.get("strava_pace_text")),
    strava_route_map_image_url: parseOptionalString(formData.get("strava_route_map_image_url")),
    strava_source: parseOptionalString(formData.get("strava_source")) || "manual",
    published_at: parseBoolean(formData.get("is_published")) ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const query = recordId
    ? supabase
        .from("peak_records")
        .update(payload)
        .eq("id", recordId)
        .eq("user_id", profile.id)
        .select("id")
        .single()
    : supabase.from("peak_records").insert(payload).select("id").single();

  const { data, error } = await query;

  if (error || !data) {
    redirect(`/dashboard?error=${encodeURIComponent(error?.message ?? "save-failed")}`);
  }

  await uploadPhotos(String(data.id), formData);
  await syncPublishedRecord(String(data.id), profile.id);
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/records/${data.id}`);
  revalidatePath(`/u/${profile.username}`);
  revalidatePath(`/u/${profile.username}/climbs/${slug}`);

  if (mode === "create") {
    redirect(`/dashboard?created=1&record=${data.id}`);
  }

  redirect(`/dashboard/records/${data.id}?saved=1`);
}

export async function quickStatusUpdateAction(formData: FormData) {
  const profile = await requireProfile();
  const recordId = parseString(formData.get("record_id"));
  const status = parseString(formData.get("status"));
  if (!recordId || !status) return;

  const supabase = await createClient();
  await supabase
    .from("peak_records")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", recordId)
    .eq("user_id", profile.id);

  await syncPublishedRecord(recordId, profile.id);
  revalidatePath("/dashboard");
}

export async function deleteMediaAction(formData: FormData) {
  const profile = await requireProfile();
  const mediaId = parseString(formData.get("media_id"));
  const recordId = parseString(formData.get("record_id"));
  if (!mediaId || !recordId) return;

  const supabase = await createClient();
  const { data } = await supabase
    .from("peak_record_media")
    .select("storage_path")
    .eq("id", mediaId)
    .single();

  if (data?.storage_path) {
    await supabase.storage.from("climb-photos").remove([String(data.storage_path)]);
  }

  await supabase.from("peak_record_media").delete().eq("id", mediaId);
  await syncPublishedRecord(recordId, profile.id);
  revalidatePath(`/dashboard/records/${recordId}`);
}

export async function signOutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
