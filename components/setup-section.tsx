import type { ReactNode } from "react";

export function SetupSection({
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
      <div className="flex items-center gap-4 mb-12">
        <h2
          className="shrink-0 font-semibold"
          style={{
            fontSize: "var(--text-display-xl)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
            color: "var(--foreground)",
          }}
        >
          {title}
        </h2>
        <div
          className="flex-1"
          style={{ height: "1px", backgroundColor: "var(--border)" }}
        />
      </div>
      <div>{children}</div>
    </section>
  );
}
