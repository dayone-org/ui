"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  DOCS_PAGE_PADDING,
  DOCS_SIDEBAR_INSET,
  DOCS_SIDEBAR_WIDTH,
} from "@/lib/docs-layout";

type SiteHeaderProps = {
  active?: "home" | "playground" | "how-to" | "komponenten";
};

const navLinkClass = "text-sm font-normal transition-opacity hover:opacity-70";

function navLinkStyle(isActive: boolean) {
  return {
    color: isActive ? "var(--black)" : "var(--gray-400)",
    fontWeight: isActive ? 600 : 400,
  } as const;
}

function DayoneMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-2.5 ${className ?? ""}`}
    >
      <Image
        src="/dayone-icon.svg"
        alt=""
        width={28}
        height={28}
        priority
        className="size-7 shrink-0"
        aria-hidden
      />
      <span
        className="text-sm font-semibold uppercase tracking-[0.08em]"
        style={{ color: "var(--black)" }}
      >
        DAYONE
      </span>
    </Link>
  );
}

export function SiteHeader({ active = "home" }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md"
    >
      <div className={DOCS_PAGE_PADDING}>
        <div className="flex h-16 items-center justify-between gap-6">
          <div
            className={`flex shrink-0 items-center ${DOCS_SIDEBAR_WIDTH} ${DOCS_SIDEBAR_INSET}`}
          >
            <DayoneMark />
          </div>

          <nav className="hidden items-center gap-10 sm:flex">
            <Link
              href="/komponenten"
              className={navLinkClass}
              style={navLinkStyle(active === "komponenten")}
              onClick={() => window.scrollTo(0, 0)}
            >
              Komponenten
            </Link>
            <Link
              href="/how-to-use"
              className={navLinkClass}
              style={navLinkStyle(active === "how-to")}
            >
              How to use
            </Link>
          </nav>

          <button
            type="button"
            className="sm:hidden"
            style={{ color: "var(--black)" }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className={`flex flex-col gap-4 border-t py-6 sm:hidden ${DOCS_PAGE_PADDING}`}
          style={{ borderColor: "var(--gray-100)" }}
        >
          <Link
            href="/playground"
            onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}
            className={navLinkClass}
            style={navLinkStyle(active === "playground")}
          >
            Komponenten
          </Link>
          <Link
            href="/how-to-use"
            onClick={() => setMobileOpen(false)}
            className={navLinkClass}
            style={navLinkStyle(active === "how-to")}
          >
            How to use
          </Link>
        </nav>
      )}
    </header>
  );
}
