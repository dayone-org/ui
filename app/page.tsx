import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { DOCS_PAGE_PADDING, DOCS_SIDEBAR_WIDTH } from "@/lib/docs-layout";

function HeroArrow() {
  return (
    <span className="dayone-btn__arrow" aria-hidden>
      &#8594;
    </span>
  );
}

function ComponentShowcase() {
  return (
    <div className="hidden xl:flex flex-col gap-3 w-72 shrink-0 select-none pointer-events-none">

      {/* Buttons card */}
      <div
        className="rounded-2xl p-5"
        style={{ border: "1px solid var(--gray-100)", backgroundColor: "var(--white)" }}
      >
        <p className="text-xs font-medium mb-4" style={{ color: "var(--gray-300)" }}>
          Buttons
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="dayone-btn dayone-btn--primary dayone-btn--static dayone-btn--sm">
            <span className="dayone-btn__inner">
              <span className="dayone-btn__label">Button</span>
              <span className="dayone-btn__arrow" aria-hidden>→</span>
            </span>
          </button>
          <button className="dayone-btn dayone-btn--secondary dayone-btn--static dayone-btn--sm">
            <span className="dayone-btn__inner">
              <span className="dayone-btn__label">Button</span>
            </span>
          </button>
          <button className="dayone-btn dayone-btn--arrow dayone-btn--static">
            <span className="dayone-btn__inner">
              <span className="dayone-btn__label">Arrow</span>
              <span className="dayone-btn__arrow" aria-hidden>→</span>
            </span>
          </button>
        </div>
      </div>

      {/* Badges + Avatars card */}
      <div
        className="rounded-2xl p-5"
        style={{ border: "1px solid var(--gray-100)", backgroundColor: "var(--white)" }}
      >
        <p className="text-xs font-medium mb-4" style={{ color: "var(--gray-300)" }}>
          Badges & Avatare
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
          <AvatarGroup className="ml-3">
            {["VY", "BN", "FX", "LI"].map((init) => (
              <Avatar key={init} size="sm">
                <AvatarFallback
                  className="text-[10px] font-semibold"
                  style={{ backgroundColor: "#F0EDEA", color: "#1A1A1A" }}
                >
                  {init}
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      </div>

      {/* Progress / Stats card */}
      <div
        className="rounded-2xl p-5"
        style={{ border: "1px solid var(--gray-100)", backgroundColor: "var(--white)" }}
      >
        <p className="text-xs font-medium mb-4" style={{ color: "var(--gray-300)" }}>
          Progress
        </p>
        <div className="space-y-3">
          {[
            { label: "Design Tokens", value: 92 },
            { label: "Komponenten", value: 78 },
            { label: "Dokumentation", value: 60 },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: "var(--gray-400)" }}>{label}</span>
                <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--black)" }}>{value}%</span>
              </div>
              <Progress value={value} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Table preview card */}
      <div
        className="rounded-2xl p-5"
        style={{ border: "1px solid var(--gray-100)", backgroundColor: "var(--white)" }}
      >
        <p className="text-xs font-medium mb-4" style={{ color: "var(--gray-300)" }}>
          Table
        </p>
        <div className="space-y-2">
          {[
            { name: "Button", status: "Stabil", badge: "default" },
            { name: "Badge", status: "Stabil", badge: "default" },
            { name: "Drawer", status: "Beta", badge: "outline" },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-md px-2 py-1.5"
              style={{ backgroundColor: "var(--gray-50, #F9F9F9)" }}
            >
              <span className="text-xs font-medium" style={{ color: "var(--black)" }}>
                {row.name}
              </span>
              <Badge variant={row.badge as "default" | "outline"} className="text-[10px]">
                {row.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const HOME_MAIN_COLUMN = "min-w-0 flex-1 pl-4 lg:pl-10 xl:pl-14";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <SiteHeader active="home" />

      <main
        className={`flex flex-1 items-center pt-16 pb-20 lg:pt-0 lg:pb-0 ${DOCS_PAGE_PADDING}`}
      >
        <div className="flex w-full items-center gap-16 xl:gap-24">
          {/* Sidebar spacer */}
          <div className={`hidden shrink-0 lg:block ${DOCS_SIDEBAR_WIDTH}`} aria-hidden />

          {/* Hero text */}
          <div className={`${HOME_MAIN_COLUMN} max-w-xl`}>
            <p
              className="mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--gray-300)" }}
            >
              DAYONE UI Foundation
            </p>

            <h1
              className="font-semibold"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
                lineHeight: 1.05,
                color: "var(--black)",
                letterSpacing: "-0.02em",
              }}
            >
              Das Design&shy;system für DAYONE
            </h1>

            <p
              className="mt-6 text-base leading-relaxed"
              style={{ color: "var(--gray-400)" }}
            >
              Komponenten, Tokens und Standards — damit alles was wir bauen von
              Anfang an nach DAYONE aussieht.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/komponenten"
                className="dayone-btn dayone-btn--primary dayone-btn--interactive dayone-btn--md"
              >
                <span className="dayone-btn__inner">
                  <span className="dayone-btn__label">Komponenten</span>
                  <HeroArrow />
                </span>
              </Link>

              <Link
                href="/how-to-use"
                className="dayone-btn dayone-btn--arrow dayone-btn--interactive"
              >
                <span className="dayone-btn__inner">
                  <span className="dayone-btn__label">How to use</span>
                  <span className="dayone-btn__arrow" aria-hidden>→</span>
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="mt-14 flex gap-8 pt-8"
              style={{ borderTop: "1px solid var(--gray-100)" }}
            >
              {[
                { value: "50+", label: "Komponenten" },
                { value: "100%", label: "TypeScript" },
                { value: "Roobert", label: "Typeface" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-xl font-semibold" style={{ color: "var(--black)" }}>
                    {value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--gray-400)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Component preview showcase */}
          <ComponentShowcase />
        </div>
      </main>

      <div
        className={`pointer-events-none absolute bottom-8 ${DOCS_PAGE_PADDING} right-0 left-0 flex justify-end`}
      >
        <SiteStamp />
      </div>
    </div>
  );
}
