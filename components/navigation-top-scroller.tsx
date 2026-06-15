"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function NavigationTopScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
