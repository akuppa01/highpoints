import { PageLoadingShell } from "@/components/ui/page-loading";

export default function PublicProfileLoading() {
  return <PageLoadingShell heroClassName="min-h-[280px]" cards={4} />;
}
