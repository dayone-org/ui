import type { DocsSection } from "@/lib/docs-section";

export const SETUP_SECTIONS = [
  { id: "intro", label: "Setup" },
  { id: "installation", label: "Installation" },
  { id: "skill", label: "Skill" },
  { id: "feedback", label: "Feedback" },
  { id: "changelog", label: "Changelog" },
] as const satisfies readonly DocsSection[];

export type SetupSectionId = (typeof SETUP_SECTIONS)[number]["id"];
