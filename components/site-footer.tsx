import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t px-6 py-10 lg:px-8"
      style={{
        backgroundColor: "var(--black)",
        borderColor: "var(--gray-500)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--sand-dark)" }}
          >
            Growing Forward
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--gray-300)" }}>
            DAYONE UI Foundation — Interne Designsystem-Referenz
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/playground"
            className="font-medium transition-colors hover:underline"
            style={{ color: "var(--white)" }}
          >
            Komponenten
          </Link>
          <a
            href="https://www.dayone.de"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:underline"
            style={{ color: "var(--sand-dark)" }}
          >
            dayone.de
          </a>
          <span style={{ color: "var(--gray-500)" }}>
            © {new Date().getFullYear()} DAYONE
          </span>
        </div>
      </div>
    </footer>
  );
}
