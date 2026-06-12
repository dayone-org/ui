import type { DocsSection } from "@/lib/docs-section";

export const KOMPONENTEN_SECTIONS = [
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs-forms", label: "Inputs & Forms" },
  { id: "selection-controls", label: "Selection Controls" },
  { id: "navigation", label: "Navigation" },
  { id: "overlays", label: "Overlays" },
  { id: "feedback", label: "Feedback" },
  { id: "data-display", label: "Data Display" },
  { id: "layout", label: "Layout" },
  { id: "misc", label: "Misc" },
] as const satisfies readonly DocsSection[];

export type KomponentenSectionId = (typeof KOMPONENTEN_SECTIONS)[number]["id"];
