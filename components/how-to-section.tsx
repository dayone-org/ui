import type { ReactNode } from "react";
import { DocsDivider } from "@/components/docs-divider";

export function HowToSection({
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
      className="scroll-mt-28 pb-12 pt-10 first:pt-0 last:pb-8 md:pb-16 md:pt-12"
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
      <DocsDivider className="mt-6 mb-8 md:mb-10" />
      <div className="mt-0">{children}</div>
    </section>
  );
}
