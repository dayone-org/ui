"use client";
import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function NavigationTopScroller() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
