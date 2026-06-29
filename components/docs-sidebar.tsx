"use client";

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

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const elementTop = rect.top + window.scrollY;
  const elementHeight = rect.height;
  const viewportHeight = window.innerHeight;

  const targetScroll =
    elementHeight >= viewportHeight
      ? elementTop - 80
      : elementTop - (viewportHeight - elementHeight) / 2;

  window.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

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
            <button
              type="button"
              onClick={() => {
                scrollToSection(section.id);
                onNavigate?.();
              }}
              className="block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors"
              style={{
                color: isActive ? "var(--foreground)" : "var(--gray-400)",
                backgroundColor: isActive ? "var(--secondary)" : "transparent",
                fontWeight: isActive ? 600 : 400,
                border: "none",
                cursor: "pointer",
              }}
            >
              {section.label}
            </button>
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

    function updateActiveSection() {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= maxScroll - 120) {
        setActiveId(ids[ids.length - 1] ?? "");
        return;
      }

      const activationLine = window.innerHeight * 0.35;
      const active =
        elements
          .filter((el) => el.getBoundingClientRect().top <= activationLine)
          .at(-1)?.id ?? ids[0] ?? "";

      setActiveId(active);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
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
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
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
            <SheetTitle style={{ color: "var(--foreground)" }}>Navigation</SheetTitle>
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
