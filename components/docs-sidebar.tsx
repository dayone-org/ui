"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  PLAYGROUND_SECTIONS,
  type PlaygroundSectionId,
} from "@/lib/playground-sections";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function NavLinks({
  activeId,
  onNavigate,
}: {
  activeId: PlaygroundSectionId;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {PLAYGROUND_SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              onClick={onNavigate}
              className="block rounded-md px-3 py-2 text-sm transition-colors"
              style={{
                color: isActive ? "var(--black)" : "var(--gray-400)",
                backgroundColor: isActive ? "var(--sand-medium)" : "transparent",
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

export function DocsSidebarMobile() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<PlaygroundSectionId>(
    PLAYGROUND_SECTIONS[0].id
  );

  useEffect(() => {
    const ids = PLAYGROUND_SECTIONS.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id as PlaygroundSectionId | undefined;
        if (id && ids.includes(id)) {
          setActiveId(id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="sticky top-16 z-40 flex items-center gap-3 border-b px-4 py-3 lg:hidden"
      style={{
        backgroundColor: "var(--sand-light)",
        borderColor: "var(--gray-200)",
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
              activeId={activeId}
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </SheetContent>
      </Sheet>
      <p className="text-sm truncate" style={{ color: "var(--gray-400)" }}>
        {PLAYGROUND_SECTIONS.find((s) => s.id === activeId)?.label}
      </p>
    </div>
  );
}

export function DocsSidebarDesktop() {
  const [activeId, setActiveId] = useState<PlaygroundSectionId>(
    PLAYGROUND_SECTIONS[0].id
  );

  useEffect(() => {
    const ids = PLAYGROUND_SECTIONS.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id as PlaygroundSectionId | undefined;
        if (id && ids.includes(id)) {
          setActiveId(id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="hidden lg:block w-56 shrink-0"
      style={{ borderRight: "1px solid var(--gray-200)" }}
    >
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-8 pl-6 pr-4">
        <p
          className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--gray-300)" }}
        >
          Inhalt
        </p>
        <NavLinks activeId={activeId} />
      </div>
    </aside>
  );
}
