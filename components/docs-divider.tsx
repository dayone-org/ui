import { cn } from "@/lib/utils";

export function DocsDivider({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      aria-hidden
      className={cn("h-px w-full", className)}
      style={{ backgroundColor: "var(--gray-100)" }}
    />
  );
}
