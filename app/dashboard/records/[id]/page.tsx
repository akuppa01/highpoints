import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PeakRecordForm } from "@/components/dashboard/peak-record-form";
import { getRecordForEdit, requireProfile } from "@/lib/data/records";

export const dynamic = "force-dynamic";

export default async function EditRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await requireProfile();
  const { id } = await params;
  const record = await getRecordForEdit(id);

  if (!record) notFound();

  return (
    <div className="pt-14 min-h-screen">
      <div className="container-wide py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
          {record.isPublished && (
            <Link href={`/u/${profile.username}/climbs/${record.slug}`} className="btn-secondary">
              View public page
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
        <PeakRecordForm record={record} mode="edit" />
      </div>
    </div>
  );
}
