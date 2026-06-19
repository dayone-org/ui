"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DOCS_PAGE_PADDING,
  DOCS_SIDEBAR_INSET,
  DOCS_SIDEBAR_WIDTH,
} from "@/lib/docs-layout";

type SiteHeaderProps = {
  active?: "home" | "playground" | "how-to" | "komponenten" | "anwendung";
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
    <Link href="/" className={`inline-flex shrink-0 items-center ${className ?? ""}`}>
      <Image
        src="/dayone-logo.svg"
        alt="DAYONE"
        width={110}
        height={20}
        priority
        className="h-5 w-auto"
      />
    </Link>
  );
}

function AnwendungDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={`${navLinkClass} flex items-center gap-1`}
        style={navLinkStyle(active)}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Anwendung
        <ChevronDown
          className="size-3 transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>

      {/* invisible hover bridge so mouse can travel from button to panel */}
      {open && <div className="absolute left-0 right-0 top-full h-3" onMouseEnter={cancelClose} />}

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-3 min-w-36 rounded-xl py-1.5 shadow-lg nav-dropdown"
          style={{
            backgroundColor: "var(--white)",
            border: "1px solid var(--gray-100)",
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <Link
            href="/anwendung/pdc-hub"
            className="block px-4 py-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--black)", fontWeight: 500 }}
            onClick={() => setOpen(false)}
          >
            PDC Hub
          </Link>
        </div>
      )}
    </div>
  );
}

export function SiteHeader({ active = "home" }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className={DOCS_PAGE_PADDING}>
        <div className="flex h-16 items-center justify-between gap-6">
          <div className={`flex shrink-0 items-center ${DOCS_SIDEBAR_WIDTH} ${DOCS_SIDEBAR_INSET}`}>
            <DayoneMark />
          </div>

          <nav className="hidden items-center gap-10 sm:flex">
            <Link
              href="/komponenten"
              className={navLinkClass}
              style={navLinkStyle(active === "komponenten")}
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
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
            <AnwendungDropdown active={active === "anwendung"} />
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
            href="/komponenten"
            onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}
            className={navLinkClass}
            style={navLinkStyle(active === "komponenten")}
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
          <Link
            href="/anwendung/pdc-hub"
            onClick={() => setMobileOpen(false)}
            className={navLinkClass}
            style={navLinkStyle(active === "anwendung")}
          >
            PDC Hub
          </Link>
        </nav>
      )}
    </header>
  );
}
