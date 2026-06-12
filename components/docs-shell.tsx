import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import {
  DocsSidebarDesktop,
  DocsSidebarMobile,
} from "@/components/docs-sidebar";
import type { DocsSection } from "@/lib/docs-section";
import { DOCS_MAIN_COLUMN, DOCS_PAGE_PADDING } from "@/lib/docs-layout";

type DocsShellProps = {
  headerActive: "playground" | "how-to" | "komponenten";
  sections: readonly DocsSection[];
  children: ReactNode;
};

export function DocsShell({ headerActive, sections, children }: DocsShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <SiteHeader active={headerActive} />
      <DocsSidebarMobile sections={sections} />
      <div className={`flex flex-1 ${DOCS_PAGE_PADDING}`}>
        <DocsSidebarDesktop sections={sections} />
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
