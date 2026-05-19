import Image from "next/image";
import { deleteMediaAction, savePeakRecordAction } from "@/app/dashboard/actions";
import { RecordActionBar } from "@/components/dashboard/record-action-bar";
import { FormSubmitButton } from "@/components/ui/form-submit-button";
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

      <RecordActionBar isPublished={record.isPublished} mode={mode} />

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
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Quick climb summary</p>
            <p className="mt-2 text-sm text-text-secondary">
              Add your own mileage, gain, and time if you know them. If this is one of the built-in highpoints,
              you can also tell Summit to use the standard route defaults for you.
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
              label="Use Summit defaults for route + stats"
              defaultChecked={isCreate}
              description="For canonical state highpoints, Summit will replace route name, distance, elevation gain, and time with the standard climb defaults when you save."
            />
            <p className="rounded-xl border border-dashed border-border px-3 py-3 text-xs leading-relaxed text-text-muted">
              Best for fast logging. If you already entered your own numbers and check this box, the Summit defaults will win.
            </p>
            <div className="space-y-2">
              <FormSubmitButton
                idleLabel={isCreate ? "Save quick log" : "Save basics to journal"}
                pendingLabel={isCreate ? "Saving quick log..." : "Saving basics..."}
                fullWidth
              />
              <p className="text-[11px] text-text-muted">
                Quick save keeps the current publish state. Use the action bar above to force draft or publish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <details className="group card-base p-6 md:p-7">
        <summary className="flex list-none cursor-pointer items-center justify-between gap-4">
          <div>
            <span className="text-label mb-2 block">Advanced details</span>
            <h3 className="font-display text-2xl tracking-tight text-text-primary">
              Add the story people will actually care about
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
              Keep this part lightweight: a short story, a few standout photos, and only the extra details that make the climb memorable.
            </p>
          </div>
          <span className="rounded-full border border-border px-3 py-1.5 text-xs font-mono text-text-muted group-open:text-text-primary">
            Expand
          </span>
        </summary>

        <div className="mt-6 space-y-8">
          <section className="space-y-6">
            <div>
              <span className="text-label mb-2 block">Story</span>
              <h3 className="font-display text-2xl tracking-tight text-text-primary">A short, honest climb recap</h3>
            </div>
            <TextArea label="Public story" name="public_notes" defaultValue={record.publicNotes} placeholder="What stood out about this climb? Keep it simple and human." rows={5} />
            <div className="grid gap-5 md:grid-cols-2">
              <TextArea label="Favorite moment" name="favorite_moment" defaultValue={record.favoriteMoment} placeholder="The one moment you’d tell a friend about first." rows={3} />
              <TextArea label="Lessons learned" name="lessons_learned" defaultValue={record.lessonsLearned} placeholder="Anything you'd do differently next time?" rows={3} />
              <Input label="Companions" name="companions" defaultValue={record.companions} placeholder="Who was with you?" />
              <Input label="Weather" name="weather" defaultValue={record.weather} placeholder="What were the conditions like?" />
            </div>
            <TextArea label="Private notes" name="private_notes" defaultValue={record.privateNotes} placeholder="Anything just for you?" rows={3} />
          </section>

          <section className="space-y-6">
            <div>
              <span className="text-label mb-2 block">Media</span>
              <h3 className="font-display text-2xl tracking-tight text-text-primary">Top photos first</h3>
            </div>

            <label className="block space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">Upload up to 5 photos</span>
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="w-full rounded-xl border border-dashed border-border bg-card px-4 py-4 text-sm text-text-secondary"
              />
              <p className="text-xs text-text-muted">
                Use your best 1 to 5 images here for the main story carousel. Broader albums can live below as external links.
              </p>
            </label>

            <TextArea
              label="External album links"
              name="external_album_links"
              defaultValue={record.externalAlbumLinks.join("\n")}
              placeholder="One iCloud / Google Photos / gallery link per line"
              rows={3}
            />
            <p className="text-xs leading-relaxed text-text-muted">
              Summit currently shows these as elegant album cards and outbound links. Full authenticated album importing is future-ready, but not automatic yet.
            </p>

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
              <span className="text-label mb-2 block">Activity link</span>
              <h3 className="font-display text-2xl tracking-tight text-text-primary">Connect Strava if you want the receipts</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Strava activity URL" name="strava_activity_url" defaultValue={record.strava.activityUrl} placeholder="https://www.strava.com/activities/..." />
              <Input label="Activity title" name="strava_activity_title" defaultValue={record.strava.activityTitle} placeholder="Whitney sunrise push" />
              <Input label="Activity date" name="strava_activity_date" defaultValue={record.strava.activityDate} type="date" />
              <Input label="Moving time (minutes)" name="strava_moving_time_minutes" defaultValue={record.strava.movingTimeMinutes} type="number" />
              <Input label="Pace text" name="strava_pace_text" defaultValue={record.strava.paceText} placeholder="22:15/mi" />
            </div>
          </section>

          <details className="rounded-2xl border border-border bg-card/50 p-5">
            <summary className="cursor-pointer list-none text-sm font-medium text-text-primary">
              More fields
            </summary>
            <div className="mt-5 space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <Input label="Route name" name="route_name" defaultValue={record.routeName} placeholder="Mount Whitney Trail" />
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
                <TextArea label="Private field notes" name="notes" defaultValue={record.notes} placeholder="Detailed notes from the day." rows={4} />
                <TextArea label="Gear notes" name="gear_notes" defaultValue={record.gearNotes} placeholder="What worked, what failed, what to bring next time." rows={4} />
                <TextArea label="Anecdotes" name="anecdotes" defaultValue={record.anecdotes} placeholder="Little fragments worth remembering." rows={4} />
                <TextArea label="Special memories" name="special_memories" defaultValue={record.specialMemories} placeholder="The deeper emotional center of the day." rows={4} />
                <TextArea label="Audio transcript" name="audio_transcript" defaultValue={record.audioTranscript} placeholder="Optional voice memo transcript." rows={4} />
                <Input label="Hero photo URL" name="hero_photo_url" defaultValue={record.heroPhotoUrl} placeholder="Optional cover image" />
                <Input label="Latitude" name="latitude" defaultValue={record.latitude} type="number" />
                <Input label="Longitude" name="longitude" defaultValue={record.longitude} type="number" />
                <Input label="Strava distance (mi)" name="strava_distance_miles" defaultValue={record.strava.distanceMiles} type="number" />
                <Input label="Strava elevation gain (ft)" name="strava_elevation_gain_ft" defaultValue={record.strava.elevationGainFt} type="number" />
                <Input label="Source" name="strava_source" defaultValue={record.strava.source} placeholder="manual" />
                <Input label="Route map image URL" name="strava_route_map_image_url" defaultValue={record.strava.routeMapImageUrl} placeholder="Optional static thumbnail URL" />
              </div>
            </div>
          </details>

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

            <FormSubmitButton
              idleLabel={isCreate ? "Save full record" : "Save and update public page"}
              pendingLabel={isCreate ? "Saving record..." : "Updating story..."}
            />
          </section>
        </div>
      </details>
    </form>
  );
}
