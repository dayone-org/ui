import type { ReactNode } from "react";

const bodyStyle = {
  fontSize: "var(--text-body-md)",
  lineHeight: "var(--leading-body)",
  color: "var(--black)",
} as const;

const mutedStyle = {
  fontSize: "var(--text-body-sm)",
  lineHeight: "var(--leading-body)",
  color: "var(--gray-400)",
} as const;

export function DocLead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-2xl" style={bodyStyle}>
      {children}
    </p>
  );
}

export function DocP({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-2xl" style={bodyStyle}>
      {children}
    </p>
  );
}

export function DocMuted({ children }: { children: ReactNode }) {
  return <p style={mutedStyle}>{children}</p>;
}

export function DocH3({ children }: { children: ReactNode }) {
  return (
    <h3
      className="mt-10 mb-4 font-semibold first:mt-0"
      style={{
        fontSize: "var(--text-display-sm)",
        lineHeight: "var(--leading-display)",
        color: "var(--black)",
      }}
    >
      {children}
    </h3>
  );
}

export function DocOl({ children }: { children: ReactNode }) {
  return (
    <ol
      className="max-w-2xl list-decimal space-y-3 pl-6"
      style={bodyStyle}
    >
      {children}
    </ol>
  );
}

export function DocUl({ children }: { children: ReactNode }) {
  return (
    <ul
      className="max-w-2xl list-disc space-y-2 pl-6"
      style={bodyStyle}
    >
      {children}
    </ul>
  );
}

export function DocCode({ children }: { children: ReactNode }) {
  return (
    <code
      className="rounded px-1.5 py-0.5 font-mono text-[0.9em]"
      style={{
        backgroundColor: "var(--gray-100)",
        color: "var(--black)",
      }}
    >
      {children}
    </code>
  );
}

export function DocPre({ children }: { children: ReactNode }) {
  return (
    <pre
      className="max-w-2xl overflow-x-auto rounded-md p-4 font-mono text-sm leading-relaxed"
      style={{
        backgroundColor: "var(--sand-light)",
        color: "var(--black)",
        border: "1px solid var(--gray-100)",
      }}
    >
      {children}
    </pre>
  );
}

export function DocLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="underline underline-offset-2 transition-opacity hover:opacity-70"
      style={{ color: "var(--black)" }}
    >
      {children}
    </a>
  );
}

export function DocCallout({ children }: { children: ReactNode }) {
  return (
    <div
      className="max-w-2xl rounded-md border-l-4 px-4 py-3"
      style={{
        borderColor: "var(--black)",
        backgroundColor: "var(--sand-light)",
        fontSize: "var(--text-body-sm)",
        lineHeight: "var(--leading-body)",
        color: "var(--black)",
      }}
    >
      {children}
    </div>
  );
}

export function DocStack({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}
