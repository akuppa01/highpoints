"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

function ActionButton({
  value,
  label,
  pendingLabel,
  tone = "secondary",
}: {
  value: string;
  label: string;
  pendingLabel: string;
  tone?: "secondary" | "primary" | "danger";
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="submit_intent"
      value={value}
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm transition-colors disabled:cursor-wait disabled:opacity-80",
        tone === "primary" && "bg-summit text-white hover:bg-summit-light",
        tone === "secondary" &&
          "border border-border-light bg-card text-text-secondary hover:text-text-primary hover:bg-white/5",
        tone === "danger" &&
          "border border-rose-400/25 bg-rose-400/10 text-rose-100 hover:bg-rose-400/20"
      )}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export function RecordActionBar({
  isPublished,
  mode,
}: {
  isPublished: boolean;
  mode: "create" | "edit";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-muted">
            Record actions
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Save privately, keep a draft, or publish a public story when it feels ready.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionButton
            value="save_local"
            label={mode === "create" ? "Save locally" : "Save changes"}
            pendingLabel="Saving..."
          />
          <ActionButton
            value="save_draft"
            label="Save as draft"
            pendingLabel="Saving draft..."
          />
          <ActionButton
            value={isPublished ? "update_public" : "publish_now"}
            label={isPublished ? "Update public page" : "Publish now"}
            pendingLabel={isPublished ? "Updating..." : "Publishing..."}
            tone="primary"
          />
        </div>
      </div>
    </div>
  );
}
