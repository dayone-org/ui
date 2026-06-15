import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PlaygroundVariantHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 font-medium uppercase tracking-[0.12em]",
        className
      )}
      style={{
        fontSize: "10px",
        lineHeight: "var(--leading-body)",
        color: "var(--gray-400)",
      }}
    >
      {children}
    </p>
  );
}
