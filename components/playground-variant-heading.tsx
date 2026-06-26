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
        "mb-4 text-xs font-medium",
        className
      )}
      style={{
        lineHeight: "var(--leading-body)",
        color: "var(--gray-300)",
      }}
    >
      {children}
    </p>
  );
}
