"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  DOCS_PAGE_PADDING,
  DOCS_SIDEBAR_ASIDE,
  DOCS_SIDEBAR_INSET,
} from "@/lib/docs-layout";
import type { DocsSection } from "@/lib/docs-section";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function NavLinks({
  sections,
  activeId,
  onNavigate,
}: {
  sections: readonly DocsSection[];
  activeId: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              onClick={onNavigate}
              className="block rounded-md px-3 py-1.5 text-sm transition-colors"
              style={{
                color: isActive ? "var(--black)" : "var(--gray-400)",
                backgroundColor: isActive ? "var(--gray-100)" : "transparent",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {section.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function useActiveSection(sections: readonly DocsSection[]) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id && ids.includes(id)) {
          setActiveId(id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return activeId;
}

export function DocsSidebarMobile({
  sections,
}: {
  sections: readonly DocsSection[];
}) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(sections);

  return (
    <div
      className={`sticky top-16 z-40 flex items-center gap-3 border-b py-3 lg:hidden ${DOCS_PAGE_PADDING}`}
      style={{
        backgroundColor: "var(--white)",
        borderColor: "var(--gray-100)",
      }}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Menu className="size-4" />
            Sektionen
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle style={{ color: "var(--black)" }}>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-6">
            <NavLinks
              sections={sections}
              activeId={activeId}
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </SheetContent>
      </Sheet>
      <p className="truncate text-sm" style={{ color: "var(--gray-400)" }}>
        {sections.find((s) => s.id === activeId)?.label}
      </p>
    </div>
  );
}

export function DocsSidebarDesktop({
  sections,
}: {
  sections: readonly DocsSection[];
}) {
  const activeId = useActiveSection(sections);

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] self-start ${DOCS_SIDEBAR_ASIDE}`}
    >
      <div className={`flex h-full w-full items-center pr-2 ${DOCS_SIDEBAR_INSET}`}>
        <nav className="w-full">
          <NavLinks sections={sections} activeId={activeId} />
        </nav>
      </div>
    </aside>
  );
}
