"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";

type ContextType = {
  hoveredSlug: string;
  setHoveredSlug: (slug: string) => void;
};

const KomponentenContext = createContext<ContextType>({
  hoveredSlug: "",
  setHoveredSlug: () => {},
});

export function KomponentenProvider({ children }: { children: ReactNode }) {
  const [hoveredSlug, setHoveredSlugState] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setHoveredSlug = useCallback((slug: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (slug) {
      // Show immediately on enter
      setHoveredSlugState(slug);
    } else {
      // Small delay on leave to prevent flickering between adjacent sections
      timerRef.current = setTimeout(() => setHoveredSlugState(""), 80);
    }
  }, []);

  return (
    <KomponentenContext.Provider value={{ hoveredSlug, setHoveredSlug }}>
      {children}
    </KomponentenContext.Provider>
  );
}

export const useKomponenten = () => useContext(KomponentenContext);
