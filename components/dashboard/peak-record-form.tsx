import Image from "next/image";
import { deleteMediaAction, savePeakRecordAction } from "@/app/dashboard/actions";
import { getPeakOptions } from "@/lib/data/records";
import { RECORD_STATUS_OPTIONS } from "@/lib/records-ui";
import { statusAccent } from "@/lib/utils";
import type { PeakRecord } from "@/types";

function Checkbox({
  name,
  label,
  defaultChecked,
  description,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
  description: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 rounded border-border bg-transparent text-summit focus:ring-summit"
      />
      <span>
        <span className="block text-sm text-text-primary">{label}</span>
        <span className="mt-1 block text-xs text-text-muted">{description}</span>
      </span>
    </label>
  );
}

function Input({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-border-light focus:outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-border-light focus:outline-none"
      />
    </label>
  );
}

export function PeakRecordForm({
  record,
  mode,
}: {
  record: PeakRecord;
  mode: "create" | "edit";
}) {
  const peakOptions = getPeakOptions();
  const isCreate = mode === "create";

  return (
    <form action={savePeakRecordAction} className="space-y-8">
      <input type="hidden" name="record_id" value={record.id} />
      <input type="hidden" name="slug" value={record.slug} />
      <input type="hidden" name="mode" value={mode} />

      <section className="card-base space-y-6 p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-label mb-2 block">Peak record</span>
            <h2 className="font-display text-3xl tracking-tight text-text-primary">
              {isCreate ? "Log a climb in under a minute" : "Refine the climb story"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
              Start with the essentials, save quickly, and only open the richer memory fields when you actually want them.
            </p>
          </div>
          <span className={`tag ${statusAccent(record.status)}`}>
            {RECORD_STATUS_OPTIONS.find((option) => option.value === record.status)?.label}
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Canonical peak</span>
            <select
              name="canonical_peak_id"
              defaultValue={record.canonicalPeakId ?? ""}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text-primary focus:border-border-light focus:outline-none"
            >
              <option value="">Custom peak / hike</option>
              {peakOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-card text-text-primary">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Status</span>
            <select
              name="status"
              defaultValue={record.status}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text-primary focus:border-border-light focus:outline-none"
            >
              {RECORD_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-card text-text-primary">
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Input label="Peak name" name="peak_name" defaultValue={record.peakName} placeholder="Mount Whitney" />
          <Input label="Location label" name="location_label" defaultValue={record.locationLabel} placeholder="California, United States" />
          <Input label="State / region" name="state" defaultValue={record.state} placeholder="California" />
          <Input label="Country" name="country" defaultValue={record.country} placeholder="United States" />
          <Input label="Date climbed" name="date_climbed" defaultValue={record.dateClimbed} type="date" />
          <Input label="Planned for" name="planned_for" defaultValue={record.plannedFor} type="date" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr,1fr]">
          <div className="rounded-2xl border border-border bg-card/70 p-4">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Fast stats</p>
            <p className="mt-2 text-sm text-text-secondary">
              Leave these blank and Summit can borrow canonical route defaults for known highpoints.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Input label="Distance (mi)" name="distance_miles" defaultValue={record.distanceMiles} type="number" />
              <Input label="Elevation gain (ft)" name="elevation_gain_ft" defaultValue={record.elevationGainFt} type="number" />
              <Input label="Duration (minutes)" name="duration_minutes" defaultValue={record.durationMinutes} type="number" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/70 p-4 space-y-4">
            <Checkbox
              name="use_canonical_defaults"
              label="Use canonical route defaults"
              defaultChecked={isCreate}
              description="For known state highpoints, auto-fill route name, distance, gain, and time when you leave them blank."
            />
            <button type="submit" className="btn-primary w-full justify-center">
              {isCreate ? "Save quick log" : "Save basics"}
            </button>
          </div>
        </div>
      </section>

      <details className="group card-base p-6 md:p-7">
        <summary className="flex list-none cursor-pointer items-center justify-between gap-4">
          <div>
            <span className="text-label mb-2 block">Advanced details</span>
            <h3 className="font-display text-2xl tracking-tight text-text-primary">
              Story, route, media, and public sharing controls
            </h3>
          </div>
          <span className="rounded-full border border-border px-3 py-1.5 text-xs font-mono text-text-muted group-open:text-text-primary">
            Expand
          </span>
        </summary>

        <div className="mt-6 space-y-8">
          <section className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Route name" name="route_name" defaultValue={record.routeName} placeholder="Mount Whitney Trail" />
              <Input label="Companions" name="companions" defaultValue={record.companions} placeholder="Alex, Sam, trail dog included" />
              <Input label="Weather" name="weather" defaultValue={record.weather} placeholder="Cold sunrise, calm summit" />
              <label className="block space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Difficulty</span>
                <select
                  name="difficulty"
                  defaultValue={record.difficulty ?? ""}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-text-primary focus:border-border-light focus:outline-none"
                >
                  <option value="">Not set</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                  <option value="technical">Technical</option>
                </select>
              </label>
              <Input label="Hero photo URL" name="hero_photo_url" defaultValue={record.heroPhotoUrl} placeholder="Optional cover image" />
              <Input label="Latitude" name="latitude" defaultValue={record.latitude} type="number" />
              <Input label="Longitude" name="longitude" defaultValue={record.longitude} type="number" />
            </div>

            <TextArea label="Private field notes" name="notes" defaultValue={record.notes} placeholder="What happened on the mountain?" rows={5} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextArea label="Public notes" name="public_notes" defaultValue={record.publicNotes} placeholder="What should appear on the public page?" />
              <TextArea label="Private notes" name="private_notes" defaultValue={record.privateNotes} placeholder="Personal reflections that never publish." />
              <TextArea label="Anecdotes" name="anecdotes" defaultValue={record.anecdotes} placeholder="Little story fragments and moments." />
              <TextArea label="Special memories" name="special_memories" defaultValue={record.specialMemories} placeholder="The emotional center of the day." />
              <TextArea label="Favorite moment" name="favorite_moment" defaultValue={record.favoriteMoment} placeholder="That one moment you'd frame forever." />
              <TextArea label="Lessons learned" name="lessons_learned" defaultValue={record.lessonsLearned} placeholder="Gear, pacing, weather, headspace." />
              <TextArea label="Gear notes" name="gear_notes" defaultValue={record.gearNotes} placeholder="What worked, what failed, what to bring next time." />
              <TextArea label="Audio transcript" name="audio_transcript" defaultValue={record.audioTranscript} placeholder="Optional voice memo transcript or spoken recap." />
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <span className="text-label mb-2 block">Media</span>
              <h3 className="font-display text-2xl tracking-tight text-text-primary">Photos, albums, and graceful fallbacks</h3>
            </div>

            <label className="block space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Upload photos</span>
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="w-full rounded-xl border border-dashed border-border bg-card px-4 py-4 text-sm text-text-secondary"
              />
              <p className="text-xs text-text-muted">
                If Supabase Storage is configured, uploads become part of the climb record. Otherwise the form still supports external links and cover imagery.
              </p>
            </label>

            <TextArea
              label="External album links"
              name="external_album_links"
              defaultValue={record.externalAlbumLinks.join("\n")}
              placeholder="One iCloud / Google Photos / gallery link per line"
              rows={4}
            />

            {record.media && record.media.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Existing media</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {record.media.map((media) => (
                    <div key={media.id} className="card-base overflow-hidden">
                      <div className="relative h-40 w-full">
                        <Image
                          src={media.mediaUrl}
                          alt={media.caption || record.peakName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                      <div className="space-y-3 p-4">
                        <p className="text-sm text-text-secondary">{media.caption || "Photo"}</p>
                        <form action={deleteMediaAction}>
                          <input type="hidden" name="media_id" value={media.id} />
                          <input type="hidden" name="record_id" value={record.id} />
                          <button type="submit" className="text-xs font-mono text-rose-200 transition-colors hover:text-rose-100">
                            Remove media
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <section className="space-y-6">
            <div>
              <span className="text-label mb-2 block">Strava</span>
              <h3 className="font-display text-2xl tracking-tight text-text-primary">Phase-one link paste, metadata, and future OAuth hooks</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Strava activity URL" name="strava_activity_url" defaultValue={record.strava.activityUrl} placeholder="https://www.strava.com/activities/..." />
              <Input label="Activity title" name="strava_activity_title" defaultValue={record.strava.activityTitle} placeholder="Whitney sunrise push" />
              <Input label="Activity date" name="strava_activity_date" defaultValue={record.strava.activityDate} type="date" />
              <Input label="Source" name="strava_source" defaultValue={record.strava.source} placeholder="manual" />
              <Input label="Distance (mi)" name="strava_distance_miles" defaultValue={record.strava.distanceMiles} type="number" />
              <Input label="Elevation gain (ft)" name="strava_elevation_gain_ft" defaultValue={record.strava.elevationGainFt} type="number" />
              <Input label="Moving time (minutes)" name="strava_moving_time_minutes" defaultValue={record.strava.movingTimeMinutes} type="number" />
              <Input label="Pace text" name="strava_pace_text" defaultValue={record.strava.paceText} placeholder="22:15/mi" />
              <Input label="Route map image URL" name="strava_route_map_image_url" defaultValue={record.strava.routeMapImageUrl} placeholder="Optional static thumbnail URL" />
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <span className="text-label mb-2 block">Publish controls</span>
              <h3 className="font-display text-2xl tracking-tight text-text-primary">Draft privately. Publish deliberately.</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Checkbox
                name="is_published"
                label="Publish this climb"
                defaultChecked={record.isPublished}
                description="Creates or updates the public page at /u/[username]/climbs/[slug]."
              />
              <Checkbox
                name="show_notes_publicly"
                label="Show notes publicly"
                defaultChecked={record.showNotesPublicly}
                description="Controls public notes, memories, anecdotes, lessons, and gear notes."
              />
              <Checkbox
                name="show_media_publicly"
                label="Show media publicly"
                defaultChecked={record.showMediaPublicly}
                description="Controls uploaded photos, cover image, and external album links."
              />
              <Checkbox
                name="show_stats_publicly"
                label="Show stats publicly"
                defaultChecked={record.showStatsPublicly}
                description="Controls distance, elevation gain, and duration on public pages and profile totals."
              />
              <Checkbox
                name="show_strava_publicly"
                label="Show Strava publicly"
                defaultChecked={record.showStravaPublicly}
                description="Controls the Strava summary card until OAuth enrichment is added."
              />
            </div>

            <button type="submit" className="btn-primary">
              {isCreate ? "Save full record" : "Save and update public page"}
            </button>
          </section>
        </div>
      </details>
    </form>
  );
}
