import type { ReactNode } from "react";
import { DocsDivider } from "@/components/docs-divider";

export function PlaygroundSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 pb-24 pt-16 first:pt-0 last:pb-16 md:pb-32 md:pt-20"
    >
      <h2
        className="font-semibold"
        style={{
          fontSize: "var(--text-display-3xl)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
          color: "var(--black)",
        }}
      >
        {title}
      </h2>
      <DocsDivider className="mt-6 mb-10 md:mb-12" />
      <div>{children}</div>
    </section>
  );
}
