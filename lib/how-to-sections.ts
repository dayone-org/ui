import type { DocsSection } from "@/lib/docs-section";

export const HOW_TO_SECTIONS = [
  { id: "overview", label: "Überblick" },
  { id: "quickstart", label: "Schnellstart" },
  { id: "project-setup", label: "Projekt einrichten" },
  { id: "tokens", label: "Design Tokens" },
  { id: "typography", label: "Typografie" },
  { id: "components", label: "Komponenten" },
  { id: "patterns", label: "Empfehlungen" },
  { id: "workflow", label: "Arbeitsweise" },
  { id: "help", label: "Hilfe & Kontakt" },
] as const satisfies readonly DocsSection[];

export type HowToSectionId = (typeof HOW_TO_SECTIONS)[number]["id"];
