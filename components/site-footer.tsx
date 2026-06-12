import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="mt-auto px-8 py-8"
      style={{ backgroundColor: "var(--black)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm" style={{ color: "var(--sand-dark)" }}>
          DAYONE UI Foundation — Intern
        </p>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/playground"
            className="transition-opacity hover:opacity-70"
            style={{ color: "var(--gray-300)" }}
          >
            Komponenten
          </Link>
          <a
            href="https://www.dayone.de"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{ color: "var(--gray-300)" }}
          >
            dayone.de
          </a>
        </div>
      </div>
    </footer>
  );
}
