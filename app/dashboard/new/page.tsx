import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PeakRecordForm } from "@/components/dashboard/peak-record-form";
import { createEmptyRecord, requireProfile } from "@/lib/data/records";

export const dynamic = "force-dynamic";

export default async function NewRecordPage() {
  await requireProfile();
  const record = createEmptyRecord();

  return (
    <div className="pt-14 min-h-screen">
      <div className="container-wide py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>
        <PeakRecordForm record={record} mode="create" />
      </div>
    </div>
  );
}
