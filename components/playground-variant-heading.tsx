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
        "mb-6 font-semibold uppercase tracking-wider",
        className
      )}
      style={{
        fontSize: "var(--text-body-sm)",
        lineHeight: "var(--leading-body)",
        color: "var(--gray-500)",
      }}
    >
      {children}
    </p>
  );
}
