"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu } from "lucide-react";
import { COMPONENT_REGISTRY, ALL_COMPONENTS } from "@/lib/component-registry";
import { DOCS_PAGE_PADDING, DOCS_SIDEBAR_INSET } from "@/lib/docs-layout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SCROLL_IDS = ALL_COMPONENTS.map((c) => c.slug);

/**
 * Tracks which component is active based on scroll position.
 * Debounced: state only updates 120ms after scrolling pauses,
 * preventing rapid React re-renders that cause sidebar jitter.
 */
function useScrollActiveSlug(ids: string[], enabled: boolean) {
  const [activeId, setActiveId] = useState("");
  const visibleRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    // Pick the last visible section (= lowest one that crossed the top threshold).
    // rootMargin top offset is -35% so an element becomes "intersecting" once
    // its top edge has scrolled past 35% down from the viewport top.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRef.current.add(entry.target.id);
          } else {
            visibleRef.current.delete(entry.target.id);
          }
        }
        // Active = the last id (in DOM order) that is currently visible
        const active = ids.findLast((id) => visibleRef.current.has(id)) ?? "";
        setActiveId(active);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, enabled]);

  return activeId;
}

/**
 * Scrolls the main page so the target element is centered in the viewport.
 * Uses manual calculation to ignore CSS scroll-margin offsets.
 */
function scrollToCenter(slug: string) {
  const el = document.getElementById(slug);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const elementTop = rect.top + window.scrollY;
  const elementHeight = rect.height;
  const viewportHeight = window.innerHeight;

  // Center the element; for elements taller than the viewport, align top
  const targetScroll =
    elementHeight >= viewportHeight
      ? elementTop - 80 // sticky header offset
      : elementTop - (viewportHeight - elementHeight) / 2;

  window.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
}

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="px-3 pb-6">
      <div
        className="flex items-center gap-2 pb-1.5"
        style={{ borderBottom: "1px solid var(--gray-100)" }}
      >
        <Search className="size-3 shrink-0" style={{ color: "var(--gray-200)" }} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && onChange("")}
          className="flex-1 bg-transparent text-xs outline-none"
          style={{ color: "var(--black)" }}
        />
      </div>
    </div>
  );
}

type NavProps = {
  activeSlug: string;
  search: string;
  onNavigate?: () => void;
};

function SidebarNav({ activeSlug, search, onNavigate }: NavProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // Scroll sidebar so active item is centered — only when it's in a fade zone
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const active = list.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return;

    // The scrollable container is the nav element (overflow-y-scroll)
    const scrollEl = list.closest<HTMLElement>("[data-sidebar-scroll]");
    if (!scrollEl) return;

    const scrollRect = scrollEl.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const fadeZone = 80; // matches the 5rem mask gradient

    const topVisible = activeRect.top >= scrollRect.top + fadeZone;
    const bottomVisible = activeRect.bottom <= scrollRect.bottom - fadeZone;

    if (!topVisible || !bottomVisible) {
      // Calculate precise center position within the scroll container
      const offsetTop =
        activeRect.top - scrollRect.top + scrollEl.scrollTop;
      const targetTop =
        offsetTop - scrollEl.clientHeight / 2 + active.clientHeight / 2;

      scrollEl.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }
  }, [activeSlug]);

  const lc = search.toLowerCase();
  const filtered = search
    ? COMPONENT_REGISTRY.map((cat) => ({
        ...cat,
        components: cat.components.filter((c) =>
          c.name.toLowerCase().includes(lc)
        ),
      })).filter((cat) => cat.components.length > 0)
    : COMPONENT_REGISTRY;

  function handleClick(slug: string) {
    scrollToCenter(slug);
    onNavigate?.();
  }

  return (
    <ul ref={listRef} className="space-y-5">
      {filtered.map((category) => (
        <li key={category.id}>
          <p
            className="mb-1.5 px-3 text-sm font-medium"
            style={{ color: "var(--gray-300)" }}
          >
            {category.label}
          </p>
          <ul className="space-y-0">
            {category.components.map((component) => {
              const isActive = activeSlug === component.slug;
              return (
                <li key={component.slug} className="relative">
                  <button
                    type="button"
                    data-active={isActive ? "true" : undefined}
                    onClick={() => handleClick(component.slug)}
                    className="block w-fit rounded-md py-1 pl-4 pr-3 text-xs"
                    style={{
                      color: "var(--black)",
                      fontWeight: isActive ? 600 : 400,
                      transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                      transformOrigin: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "scale(1.06)";
                      el.style.fontWeight = "600";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "scale(1)";
                      el.style.fontWeight = isActive ? "600" : "400";
                    }}
                  >
                    {component.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function KomponentenSidebarDesktop() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const isMain = pathname === "/komponenten";
  const activeSlug = useScrollActiveSlug(SCROLL_IDS, isMain);

  return (
    <aside className="hidden w-52 shrink-0 lg:flex xl:w-60 sticky top-16 h-[calc(100vh-4rem)] self-start">
      <div className={`flex h-full w-full flex-col justify-start pt-16 ${DOCS_SIDEBAR_INSET}`}>
        <SearchBox value={search} onChange={setSearch} />
        {/* data-sidebar-scroll marks the scrollable container for SidebarNav */}
        <nav
          data-sidebar-scroll
          className="overflow-y-scroll pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maxHeight: "560px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 5rem, black calc(100% - 5rem), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 5rem, black calc(100% - 5rem), transparent 100%)",
          }}
        >
          <div className="py-16">
            <SidebarNav activeSlug={activeSlug} search={search} />
          </div>
        </nav>
      </div>
    </aside>
  );
}

export function KomponentenSidebarMobile() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const isMain = pathname === "/komponenten";
  const activeSlug = useScrollActiveSlug(SCROLL_IDS, isMain && open);

  const activeComp = ALL_COMPONENTS.find((c) => c.slug === activeSlug);

  return (
    <div
      className={`sticky top-16 z-40 flex items-center gap-3 border-b py-3 lg:hidden ${DOCS_PAGE_PADDING}`}
      style={{ backgroundColor: "var(--white)", borderColor: "var(--gray-100)" }}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Menu className="size-4" />
            Komponenten
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle style={{ color: "var(--black)" }}>Alle Komponenten</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <SearchBox value={search} onChange={setSearch} />
          </div>
          <nav
            data-sidebar-scroll
            className="h-[calc(100vh-10rem)] overflow-y-auto [scrollbar-width:none]"
          >
            <div className="pb-8">
              <SidebarNav
                activeSlug={activeSlug}
                search={search}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      {activeComp && (
        <p className="truncate text-sm" style={{ color: "var(--gray-400)" }}>
          {activeComp.name}
        </p>
      )}
    </div>
  );
}
