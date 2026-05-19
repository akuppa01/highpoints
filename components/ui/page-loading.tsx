import { cn } from "@/lib/utils";
import { SummitLoader } from "@/components/ui/route-transition";

export function PageLoadingShell({
  heroClassName,
  cards = 3,
}: {
  heroClassName?: string;
  cards?: number;
}) {
  return (
    <div className="pt-14 min-h-screen">
      <div className="container-wide py-8 md:py-10 space-y-6 md:space-y-8">
        <div className="flex justify-center">
          <SummitLoader label="Loading this view" compact />
        </div>
        <div className={cn("loading-shell min-h-[220px] md:min-h-[260px]", heroClassName)} />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: cards }).map((_, index) => (
            <div key={index} className="loading-shell h-28 md:h-32" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="loading-shell h-72 lg:col-span-2" />
          <div className="space-y-4">
            <div className="loading-shell h-40" />
            <div className="loading-shell h-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
