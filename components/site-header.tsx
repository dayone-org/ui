import Link from "next/link";

type SiteHeaderProps = {
  active?: "home" | "playground";
};

export function SiteHeader({ active = "home" }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--black)",
        borderColor: "var(--gray-500)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--sand-dark)" }}
          >
            DAYONE
          </span>
          <span
            className="hidden h-4 w-px sm:block"
            style={{ backgroundColor: "var(--gray-500)" }}
          />
          <span
            className="hidden text-sm font-semibold sm:block"
            style={{ color: "var(--white)" }}
          >
            UI Foundation
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
            style={{
              color: active === "home" ? "var(--white)" : "var(--sand-dark)",
              backgroundColor:
                active === "home" ? "var(--gray-500)" : "transparent",
            }}
          >
            Start
          </Link>
          <Link
            href="/playground"
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
            style={{
              color:
                active === "playground" ? "var(--white)" : "var(--sand-dark)",
              backgroundColor:
                active === "playground" ? "var(--gray-500)" : "transparent",
            }}
          >
            Komponenten
          </Link>
          <span
            className="ml-2 hidden rounded-md px-2 py-1 text-xs font-medium sm:inline-block"
            style={{
              color: "var(--sand-dark)",
              backgroundColor: "var(--gray-500)",
            }}
          >
            v1.0
          </span>
        </nav>
      </div>
    </header>
  );
}
