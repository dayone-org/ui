import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import { KomponentenSidebarDesktop, KomponentenSidebarMobile } from "@/components/komponenten-sidebar";
import { DOCS_PAGE_PADDING, DOCS_MAIN_COLUMN } from "@/lib/docs-layout";

export function KomponentenShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <SiteHeader active="komponenten" />
      <KomponentenSidebarMobile />
      <div className={`flex flex-1 ${DOCS_PAGE_PADDING}`}>
        <KomponentenSidebarDesktop />
        <div className={DOCS_MAIN_COLUMN}>{children}</div>
      </div>
      <div
        className={`pointer-events-none absolute bottom-8 ${DOCS_PAGE_PADDING} right-0 left-0 flex justify-end`}
      >
        <SiteStamp />
      </div>
    </div>
  );
}
