import { ArrowLeft } from "lucide-react";
import { PeakRecordForm } from "@/components/dashboard/peak-record-form";
import { IntentLink } from "@/components/ui/intent-link";
import { createEmptyRecord, requireProfile } from "@/lib/data/records";

export const dynamic = "force-dynamic";

export default async function NewRecordPage() {
  await requireProfile();
  const record = createEmptyRecord();

  return (
    <div className="pt-14 min-h-screen">
      <div className="container-wide py-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <IntentLink
            href="/dashboard"
            pendingHint
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </IntentLink>
        </div>

        <PeakRecordForm record={record} mode="create" />
      </div>
    </div>
  );
}
