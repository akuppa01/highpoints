import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { ALL_PEAKS, getPeakWithClimbById } from "@/lib/data/peaks-data";
import { logDatabaseError, withDatabaseRetry } from "@/lib/db/retry";
import { slugify } from "@/lib/utils";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type {
  DashboardStats,
  Peak,
  PeakRecord,
  PeakRecordMedia,
  PeakSummary,
  PublicProfileStats,
  PublishedPeakRecord,
  RecordStatus,
  StravaSummary,
  UserProfile,
} from "@/types";

type SupabaseLikeRecord = Record<string, unknown>;

const DEFAULT_STRAVA: StravaSummary = {
  activityUrl: null,
  activityTitle: null,
  activityDate: null,
  distanceMiles: null,
  elevationGainFt: null,
  movingTimeMinutes: null,
  paceText: null,
  routeMapImageUrl: null,
  source: "manual",
};

function toPeakSummary(peak?: Peak | null): PeakSummary | null {
  if (!peak) return null;
  return {
    id: peak.id,
    slug: peak.slug,
    name: peak.name,
    state: peak.state,
    stateCode: peak.stateCode,
    country: "United States",
    latitude: peak.latitude,
    longitude: peak.longitude,
    elevationFt: peak.elevationFt,
    heroImageUrl: peak.heroImageUrl,
  };
}

export function getCanonicalPeaks() {
  return ALL_PEAKS;
}

export function getCanonicalPeakById(id?: string | null) {
  if (!id) return null;
  return ALL_PEAKS.find((peak) => peak.id === id) ?? null;
}

export function getCanonicalPeakBySlug(slug: string) {
  return ALL_PEAKS.find((peak) => peak.slug === slug) ?? null;
}

export function getPeakOptions() {
  return ALL_PEAKS.map((peak) => ({
    value: peak.id,
    label: `${peak.name}, ${peak.state}`,
  }));
}

function parseStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

function parseNumber(value: unknown) {
  return typeof value === "number" ? value : null;
}

function parseMedia(row: SupabaseLikeRecord): PeakRecordMedia {
  return {
    id: String(row.id),
    peakRecordId: String(row.peak_record_id),
    storagePath: (row.storage_path as string | null) ?? null,
    mediaUrl: String(row.media_url),
    thumbUrl: (row.thumb_url as string | null) ?? null,
    caption: (row.caption as string | null) ?? null,
    sourceType: (row.source_type as "upload" | "external") ?? "upload",
    visibility: (row.visibility as "private" | "public") ?? "private",
    isHighlight: Boolean(row.is_highlight),
    sortOrder: Number(row.sort_order ?? 0),
    createdAt: String(row.created_at),
  };
}

function parseStrava(row: SupabaseLikeRecord): StravaSummary {
  return {
    activityUrl: (row.strava_activity_url as string | null) ?? null,
    activityTitle: (row.strava_activity_title as string | null) ?? null,
    activityDate: (row.strava_activity_date as string | null) ?? null,
    distanceMiles: parseNumber(row.strava_distance_miles),
    elevationGainFt: typeof row.strava_elevation_gain_ft === "number" ? row.strava_elevation_gain_ft : null,
    movingTimeMinutes: typeof row.strava_moving_time_minutes === "number" ? row.strava_moving_time_minutes : null,
    paceText: (row.strava_pace_text as string | null) ?? null,
    routeMapImageUrl: (row.strava_route_map_image_url as string | null) ?? null,
    source: (row.strava_source as "manual" | "link" | "oauth") ?? "manual",
  };
}

function parsePeakRecord(
  row: SupabaseLikeRecord,
  media: PeakRecordMedia[] = []
): PeakRecord {
  const canonicalPeakId = (row.canonical_peak_id as string | null) ?? null;
  const canonicalPeak = getCanonicalPeakById(canonicalPeakId);
  const canonicalPeakWithClimb = getPeakWithClimbById(canonicalPeakId);
  const defaultClimb = canonicalPeakWithClimb?.climb;

  return {
    id: String(row.id),
    userId: String(row.user_id),
    canonicalPeakId: (row.canonical_peak_id as string | null) ?? null,
    slug: String(row.slug),
    peakName: String(row.peak_name),
    locationLabel: (row.location_label as string | null) ?? null,
    state: (row.state as string | null) ?? canonicalPeak?.state ?? null,
    country: (row.country as string | null) ?? "United States",
    latitude: typeof row.latitude === "number" ? row.latitude : canonicalPeak?.latitude ?? null,
    longitude: typeof row.longitude === "number" ? row.longitude : canonicalPeak?.longitude ?? null,
    status: (row.status as RecordStatus) ?? "want_to_climb",
    dateClimbed: (row.date_climbed as string | null) ?? null,
    plannedFor: (row.planned_for as string | null) ?? null,
    routeName: (row.route_name as string | null) ?? defaultClimb?.routeName ?? null,
    companions: (row.companions as string | null) ?? null,
    weather: (row.weather as string | null) ?? null,
    difficulty: (row.difficulty as string | null) ?? canonicalPeak?.difficulty ?? null,
    distanceMiles: parseNumber(row.distance_miles) ?? defaultClimb?.distanceMiles ?? null,
    elevationGainFt:
      (typeof row.elevation_gain_ft === "number" ? row.elevation_gain_ft : null) ??
      defaultClimb?.elevationGainFt ??
      null,
    durationMinutes:
      (typeof row.duration_minutes === "number" ? row.duration_minutes : null) ??
      defaultClimb?.durationMinutes ??
      null,
    notes: (row.notes as string | null) ?? null,
    anecdotes: (row.anecdotes as string | null) ?? null,
    specialMemories: (row.special_memories as string | null) ?? null,
    privateNotes: (row.private_notes as string | null) ?? null,
    publicNotes: (row.public_notes as string | null) ?? null,
    favoriteMoment: (row.favorite_moment as string | null) ?? null,
    lessonsLearned: (row.lessons_learned as string | null) ?? null,
    gearNotes: (row.gear_notes as string | null) ?? null,
    audioTranscript: (row.audio_transcript as string | null) ?? null,
    externalAlbumLinks: parseStringArray(row.external_album_links),
    heroPhotoUrl: (row.hero_photo_url as string | null) ?? canonicalPeak?.heroImageUrl ?? null,
    isPublished: Boolean(row.is_published),
    showNotesPublicly: Boolean(row.show_notes_publicly),
    showMediaPublicly: Boolean(row.show_media_publicly),
    showStatsPublicly: Boolean(row.show_stats_publicly),
    showStravaPublicly: Boolean(row.show_strava_publicly),
    strava: parseStrava(row),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    publishedAt: (row.published_at as string | null) ?? null,
    peak: toPeakSummary(canonicalPeak),
    media,
  };
}

function parsePublishedPeakRecord(
  row: SupabaseLikeRecord,
  media: PeakRecordMedia[] = []
): PublishedPeakRecord {
  const canonicalPeakId = (row.canonical_peak_id as string | null) ?? null;
  const canonicalPeak = getCanonicalPeakById(canonicalPeakId);
  const canonicalPeakWithClimb = getPeakWithClimbById(canonicalPeakId);
  const defaultClimb = canonicalPeakWithClimb?.climb;

  return {
    id: String(row.id),
    peakRecordId: String(row.peak_record_id),
    userId: String(row.user_id),
    username: String(row.username),
    userDisplayName: String(row.user_display_name),
    userAvatarUrl: (row.user_avatar_url as string | null) ?? null,
    slug: String(row.slug),
    peakName: String(row.peak_name),
    locationLabel: (row.location_label as string | null) ?? null,
    state: (row.state as string | null) ?? canonicalPeak?.state ?? null,
    country: (row.country as string | null) ?? "United States",
    latitude: typeof row.latitude === "number" ? row.latitude : canonicalPeak?.latitude ?? null,
    longitude: typeof row.longitude === "number" ? row.longitude : canonicalPeak?.longitude ?? null,
    status: (row.status as RecordStatus) ?? "completed",
    dateClimbed: (row.date_climbed as string | null) ?? null,
    routeName: (row.route_name as string | null) ?? defaultClimb?.routeName ?? null,
    weather: (row.weather as string | null) ?? null,
    difficulty: (row.difficulty as string | null) ?? canonicalPeak?.difficulty ?? null,
    distanceMiles: parseNumber(row.distance_miles) ?? defaultClimb?.distanceMiles ?? null,
    elevationGainFt:
      (typeof row.elevation_gain_ft === "number" ? row.elevation_gain_ft : null) ??
      defaultClimb?.elevationGainFt ??
      null,
    durationMinutes:
      (typeof row.duration_minutes === "number" ? row.duration_minutes : null) ??
      defaultClimb?.durationMinutes ??
      null,
    publicNotes: (row.public_notes as string | null) ?? null,
    anecdotes: (row.anecdotes as string | null) ?? null,
    specialMemories: (row.special_memories as string | null) ?? null,
    favoriteMoment: (row.favorite_moment as string | null) ?? null,
    lessonsLearned: (row.lessons_learned as string | null) ?? null,
    gearNotes: (row.gear_notes as string | null) ?? null,
    audioTranscript: (row.audio_transcript as string | null) ?? null,
    externalAlbumLinks: parseStringArray(row.external_album_links),
    heroPhotoUrl: (row.hero_photo_url as string | null) ?? canonicalPeak?.heroImageUrl ?? null,
    peak: toPeakSummary(canonicalPeak),
    media,
    strava: parseStrava(row),
    publishedAt: String(row.published_at),
    updatedAt: String(row.updated_at),
  };
}

export function buildDashboardStats(records: PeakRecord[]): DashboardStats {
  const completedRecords = records.filter(
    (record) => record.status === "completed" || record.status === "revisit"
  );
  const loggedRecords = records.filter(
    (record) =>
      !["want_to_climb", "planning"].includes(record.status) &&
      (record.distanceMiles !== null ||
        record.elevationGainFt !== null ||
        record.durationMinutes !== null)
  );
  const highest = completedRecords.reduce<PeakRecord | null>((best, record) => {
    const current = record.peak?.elevationFt ?? 0;
    const candidate = best?.peak?.elevationFt ?? 0;
    return current > candidate ? record : best;
  }, null);

  return {
    totalRecords: records.length,
    completed: completedRecords.length,
    planned: records.filter((record) =>
      record.status === "want_to_climb" || record.status === "planning"
    ).length,
    revisits: records.filter((record) => record.status === "revisit").length,
    totalElevationGainFt: loggedRecords.reduce(
      (sum, record) => sum + (record.elevationGainFt ?? 0),
      0
    ),
    totalDistanceMiles: loggedRecords.reduce(
      (sum, record) => sum + (record.distanceMiles ?? 0),
      0
    ),
    totalTrailMinutes: loggedRecords.reduce(
      (sum, record) => sum + (record.durationMinutes ?? 0),
      0
    ),
    highestPeakName: highest?.peakName,
  };
}

export function buildPublicProfileStats(records: PublishedPeakRecord[]): PublicProfileStats {
  const completedRecords = records.filter(
    (record) => record.status === "completed" || record.status === "revisit"
  );
  const loggedRecords = records.filter(
    (record) =>
      !["want_to_climb", "planning"].includes(record.status) &&
      (record.distanceMiles !== null ||
        record.elevationGainFt !== null ||
        record.durationMinutes !== null)
  );
  const highest = completedRecords.reduce<PublishedPeakRecord | null>((best, record) => {
    const current = record.peak?.elevationFt ?? 0;
    const candidate = best?.peak?.elevationFt ?? 0;
    return current > candidate ? record : best;
  }, null);

  return {
    totalPeaksClimbed: completedRecords.length,
    totalElevationGainFt: loggedRecords.reduce(
      (sum, record) => sum + (record.elevationGainFt ?? 0),
      0
    ),
    totalDistanceMiles: loggedRecords.reduce(
      (sum, record) => sum + (record.distanceMiles ?? 0),
      0
    ),
    totalTrailMinutes: loggedRecords.reduce(
      (sum, record) => sum + (record.durationMinutes ?? 0),
      0
    ),
    highestSummit: highest
      ? {
          name: highest.peakName,
          elevationFt: highest.peak?.elevationFt ?? null,
        }
      : undefined,
    regionsCovered: Array.from(
      new Set(
        completedRecords
          .map((record) => getCanonicalPeakById(record.peak?.id ?? null)?.region ?? record.country)
          .filter((value): value is string => Boolean(value))
      )
    ),
    statesCovered: Array.from(
      new Set(
        completedRecords
          .map((record) => record.state)
          .filter((value): value is string => Boolean(value))
      )
    ),
  };
}

export async function getCurrentSessionUser() {
  if (!isSupabaseConfigured()) return null;
  noStore();
  const supabase = await createServerClient();

  try {
    const {
      data: { user },
    } = await withDatabaseRetry(() => supabase.auth.getUser(), {
      label: "records.getCurrentSessionUser",
      retries: 2,
    });

    return user;
  } catch (error) {
    logDatabaseError("records.getCurrentSessionUser", error);
    return null;
  }
}

async function getProfileById(userId: string) {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (!data) return null;

  return {
    id: String(data.id),
    username: String(data.username),
    displayName: String(data.display_name),
    bio: data.bio,
    avatarUrl: data.avatar_url,
    homeBase: data.home_base,
    favoriteRegion: data.favorite_region,
    createdAt: String(data.created_at),
    updatedAt: String(data.updated_at),
  } satisfies UserProfile;
}

async function getUniqueUsername(base: string) {
  const supabase = await createServerClient();
  const root = slugify(base).slice(0, 20) || "highpoints-user";

  for (let index = 0; index < 25; index += 1) {
    const username = index === 0 ? root : `${root}-${index + 1}`;
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (!data) return username;
  }

  return `${root}-${Date.now().toString().slice(-6)}`;
}

export async function ensureCurrentProfile() {
  const user = await getCurrentSessionUser();
  if (!user || !isSupabaseConfigured()) return null;

  const existing = await getProfileById(user.id);
  if (existing) return existing;

  const emailPrefix = user.email?.split("@")[0] ?? "highpoints";
  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    emailPrefix;
  const username = await getUniqueUsername(
    (user.user_metadata?.preferred_username as string | undefined) || emailPrefix
  );

  const supabase = await createServerClient();
  const { data } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      username,
      display_name: displayName,
      avatar_url: (user.user_metadata?.avatar_url as string | undefined) ?? null,
    })
    .select("*")
    .single();

  if (!data) return null;

  return {
    id: String(data.id),
    username: String(data.username),
    displayName: String(data.display_name),
    bio: data.bio,
    avatarUrl: data.avatar_url,
    homeBase: data.home_base,
    favoriteRegion: data.favorite_region,
    createdAt: String(data.created_at),
    updatedAt: String(data.updated_at),
  } satisfies UserProfile;
}

export async function getOptionalViewerProfile() {
  if (!isSupabaseConfigured()) return null;
  return ensureCurrentProfile();
}

export async function requireProfile() {
  if (!isSupabaseConfigured()) {
    return {
      id: "setup-mode",
      username: "setup-mode",
      displayName: "Highpoints Setup",
      bio: "Configure Supabase to unlock personal journals, publishing, and storage.",
      avatarUrl: null,
      homeBase: null,
      favoriteRegion: null,
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date(0).toISOString(),
    } satisfies UserProfile;
  }

  const profile = await ensureCurrentProfile();
  if (!profile) redirect("/waitlist");
  return profile;
}

export async function getDashboardRecords() {
  const profile = await requireProfile();

  if (!isSupabaseConfigured()) {
    return { profile, records: [] as PeakRecord[], stats: buildDashboardStats([]) };
  }

  noStore();
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("peak_records")
    .select("*, peak_record_media(*)")
    .eq("user_id", profile.id)
    .order("updated_at", { ascending: false });

  const records = (data ?? []).map((row) =>
    parsePeakRecord(
      row,
      Array.isArray(row.peak_record_media)
        ? row.peak_record_media.map((mediaRow: unknown) =>
            parseMedia(mediaRow as SupabaseLikeRecord)
          )
        : []
    )
  );

  return { profile, records, stats: buildDashboardStats(records) };
}

export async function getRecordForEdit(recordId: string) {
  const profile = await requireProfile();
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("peak_records")
    .select("*, peak_record_media(*)")
    .eq("id", recordId)
    .eq("user_id", profile.id)
    .single();

  if (!data) return null;

  return parsePeakRecord(
    data,
    Array.isArray(data.peak_record_media)
      ? data.peak_record_media.map((mediaRow: unknown) =>
          parseMedia(mediaRow as SupabaseLikeRecord)
        )
      : []
  );
}

export function createEmptyRecord() {
  return {
    id: "",
    userId: "",
    canonicalPeakId: null,
    slug: "",
    peakName: "",
    locationLabel: "",
    state: "",
    country: "United States",
    latitude: null,
    longitude: null,
    status: "want_to_climb" as RecordStatus,
    dateClimbed: null,
    plannedFor: null,
    routeName: "",
    companions: "",
    weather: "",
    difficulty: "",
    distanceMiles: null,
    elevationGainFt: null,
    durationMinutes: null,
    notes: "",
    anecdotes: "",
    specialMemories: "",
    privateNotes: "",
    publicNotes: "",
    favoriteMoment: "",
    lessonsLearned: "",
    gearNotes: "",
    audioTranscript: "",
    externalAlbumLinks: [],
    heroPhotoUrl: "",
    isPublished: false,
    showNotesPublicly: true,
    showMediaPublicly: true,
    showStatsPublicly: true,
    showStravaPublicly: true,
    strava: DEFAULT_STRAVA,
    createdAt: "",
    updatedAt: "",
    publishedAt: null,
    peak: null,
    media: [],
  } satisfies PeakRecord;
}

export async function getPublicProfileByUsername(username: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) return null;

  const { data: records } = await supabase
    .from("published_peak_records")
    .select("*")
    .eq("username", username)
    .order("published_at", { ascending: false });

  const recordIds = (records ?? []).map((row) => String(row.peak_record_id));
  const { data: mediaRows } = recordIds.length
    ? await supabase
        .from("published_peak_record_media")
        .select("*")
        .in("peak_record_id", recordIds)
        .order("sort_order", { ascending: true })
    : { data: [] as SupabaseLikeRecord[] };

  const mediaByRecordId = new Map<string, PeakRecordMedia[]>();
  for (const mediaRow of mediaRows ?? []) {
    const media = parseMedia(mediaRow as SupabaseLikeRecord);
    const bucket = mediaByRecordId.get(media.peakRecordId) ?? [];
    bucket.push(media);
    mediaByRecordId.set(media.peakRecordId, bucket);
  }

  const parsedRecords = (records ?? []).map((row) =>
    parsePublishedPeakRecord(
      row,
      mediaByRecordId.get(String(row.peak_record_id)) ?? []
    )
  );

  return {
    profile: {
      id: String(profile.id),
      username: String(profile.username),
      displayName: String(profile.display_name),
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      homeBase: profile.home_base,
      favoriteRegion: profile.favorite_region,
      createdAt: String(profile.created_at),
      updatedAt: String(profile.updated_at),
    } satisfies UserProfile,
    records: parsedRecords,
    stats: buildPublicProfileStats(parsedRecords),
  };
}

export async function getPublishedRecord(username: string, slug: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("published_peak_records")
    .select("*")
    .eq("username", username)
    .eq("slug", slug)
    .single();

  if (!data) return null;

  const { data: mediaRows } = await supabase
    .from("published_peak_record_media")
    .select("*")
    .eq("peak_record_id", data.peak_record_id)
    .order("sort_order", { ascending: true });

  return parsePublishedPeakRecord(
    data,
    (mediaRows ?? []).map((mediaRow: unknown) =>
      parseMedia(mediaRow as SupabaseLikeRecord)
    )
  );
}

export async function syncPublishedRecord(recordId: string, userId: string) {
  const supabase = await createServerClient();
  const { data: recordRow } = await supabase
    .from("peak_records")
    .select("*, peak_record_media(*)")
    .eq("id", recordId)
    .eq("user_id", userId)
    .single();

  if (!recordRow) return;

  const record = parsePeakRecord(
    recordRow,
    Array.isArray(recordRow.peak_record_media)
      ? recordRow.peak_record_media.map((mediaRow: unknown) =>
          parseMedia(mediaRow as SupabaseLikeRecord)
        )
      : []
  );

  if (!record.isPublished) {
    await supabase.from("published_peak_record_media").delete().eq("peak_record_id", recordId);
    await supabase.from("published_peak_records").delete().eq("peak_record_id", recordId);
    return;
  }

  const profile = await getProfileById(userId);
  if (!profile) return;

  await supabase.from("published_peak_records").upsert(
    {
      peak_record_id: record.id,
      user_id: userId,
      username: profile.username,
      user_display_name: profile.displayName,
      user_avatar_url: profile.avatarUrl,
      canonical_peak_id: record.canonicalPeakId,
      slug: record.slug,
      peak_name: record.peakName,
      location_label: record.locationLabel,
      state: record.state,
      country: record.country,
      latitude: record.latitude,
      longitude: record.longitude,
      status: record.status,
      date_climbed: record.dateClimbed,
      route_name: record.routeName,
      weather: record.weather,
      difficulty: record.difficulty,
      distance_miles: record.showStatsPublicly ? record.distanceMiles : null,
      elevation_gain_ft: record.showStatsPublicly ? record.elevationGainFt : null,
      duration_minutes: record.showStatsPublicly ? record.durationMinutes : null,
      public_notes: record.showNotesPublicly ? record.publicNotes : null,
      anecdotes: record.showNotesPublicly ? record.anecdotes : null,
      special_memories: record.showNotesPublicly ? record.specialMemories : null,
      favorite_moment: record.showNotesPublicly ? record.favoriteMoment : null,
      lessons_learned: record.showNotesPublicly ? record.lessonsLearned : null,
      gear_notes: record.showNotesPublicly ? record.gearNotes : null,
      audio_transcript: record.showNotesPublicly ? record.audioTranscript : null,
      external_album_links: record.showMediaPublicly ? record.externalAlbumLinks : [],
      hero_photo_url: record.showMediaPublicly ? record.heroPhotoUrl : null,
      strava_activity_url: record.showStravaPublicly ? record.strava.activityUrl : null,
      strava_activity_title: record.showStravaPublicly ? record.strava.activityTitle : null,
      strava_activity_date: record.showStravaPublicly ? record.strava.activityDate : null,
      strava_distance_miles: record.showStravaPublicly ? record.strava.distanceMiles : null,
      strava_elevation_gain_ft: record.showStravaPublicly ? record.strava.elevationGainFt : null,
      strava_moving_time_minutes: record.showStravaPublicly ? record.strava.movingTimeMinutes : null,
      strava_pace_text: record.showStravaPublicly ? record.strava.paceText : null,
      strava_route_map_image_url: record.showStravaPublicly ? record.strava.routeMapImageUrl : null,
      strava_source: record.showStravaPublicly ? record.strava.source : "manual",
      published_at: record.publishedAt ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "peak_record_id" }
  );

  await supabase.from("published_peak_record_media").delete().eq("peak_record_id", record.id);

  const publicMedia = (record.media ?? []).filter((item) => item.visibility === "public");
  if (record.showMediaPublicly && publicMedia.length > 0) {
    await supabase.from("published_peak_record_media").insert(
      publicMedia.map((item) => ({
        peak_record_id: record.id,
        media_url: item.mediaUrl,
        thumb_url: item.thumbUrl,
        caption: item.caption,
        source_type: item.sourceType,
        is_highlight: item.isHighlight,
        sort_order: item.sortOrder,
      }))
    );
  }
}

export function buildRecordSlug(peakName: string, dateClimbed?: string | null) {
  const base = slugify(peakName);
  if (!dateClimbed) return base;
  return `${base}-${dateClimbed}`;
}
