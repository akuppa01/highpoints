"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export function FormSubmitButton({
  idleLabel,
  pendingLabel,
  className,
  fullWidth = false,
}: {
  idleLabel: string;
  pendingLabel: string;
  className?: string;
  fullWidth?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "btn-primary justify-center disabled:cursor-wait disabled:opacity-80",
        fullWidth && "w-full",
        className
      )}
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}
