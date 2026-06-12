export type PlaygroundAnchor =
  | "typography"
  | "colors"
  | "buttons"
  | "inputs-forms"
  | "selection-controls"
  | "navigation"
  | "overlays"
  | "feedback"
  | "data-display"
  | "layout"
  | "misc";

export type ComponentEntry = {
  slug: string;
  name: string;
  description: string;
  playgroundAnchor: PlaygroundAnchor;
  /** 1 = half width (default), 2 = full width */
  span?: 1 | 2;
};

export type ComponentCategory = {
  id: string;
  label: string;
  components: ComponentEntry[];
};

export const ALL_COMPONENTS: Array<ComponentEntry & { categoryLabel: string; categoryId: string }> = [];

export const COMPONENT_REGISTRY: ComponentCategory[] = [
  {
    id: "grundelemente",
    label: "Grundelemente",
    components: [
      // Alphabetically sorted
      { slug: "badge", name: "Badge", description: "Kleines Label für Status oder Kategorien", playgroundAnchor: "feedback" },
      { slug: "button", name: "Button", description: "Primäre und sekundäre Aktionsschaltflächen", playgroundAnchor: "buttons" },
      { slug: "button-group", name: "Button Group", description: "Mehrere Buttons als zusammengehörige Gruppe", playgroundAnchor: "buttons" },
      { slug: "colors", name: "Colors", description: "DAYONE Farbpalette und Design-Tokens", playgroundAnchor: "colors" },
      { slug: "empty", name: "Empty", description: "Leer-Zustand für Listen und Datenbereiche", playgroundAnchor: "feedback" },
      { slug: "item", name: "Item", description: "Universeller Listen- oder Menüeintrag", playgroundAnchor: "misc" },
      { slug: "label", name: "Label", description: "Zugängliches Beschriftungselement für Felder", playgroundAnchor: "inputs-forms" },
      { slug: "loading", name: "Loading", description: "Ladezustände — Skeleton-Platzhalter und Spinner", playgroundAnchor: "feedback" },
      { slug: "separator", name: "Separator", description: "Horizontale Trennlinie zwischen Inhaltsbereichen", playgroundAnchor: "misc" },
      { slug: "typography", name: "Typography", description: "Typografische Skalierung und Schriftstile", playgroundAnchor: "typography" },
    ],
  },
  {
    id: "formulare",
    label: "Formulare",
    components: [
      // Pair: both text inputs
      { slug: "input", name: "Input", description: "Einzeiliges Texteingabefeld", playgroundAnchor: "inputs-forms" },
      { slug: "textarea", name: "Textarea", description: "Mehrzeiliges Texteingabefeld", playgroundAnchor: "inputs-forms" },
      // Pair: both dropdown selects
      { slug: "select", name: "Select", description: "Auswahlmenü mit Such- und Scroll-Funktion", playgroundAnchor: "inputs-forms" },
      { slug: "native-select", name: "Native Select", description: "Natives Browser-Auswahlelement", playgroundAnchor: "inputs-forms" },
      // Pair: both enhanced input combos
      { slug: "combobox", name: "Combobox", description: "Kombination aus Eingabe und Dropdown-Suche", playgroundAnchor: "inputs-forms" },
      { slug: "input-group", name: "Input Group", description: "Eingabefeld mit Prefix oder Suffix", playgroundAnchor: "inputs-forms" },
      // Full-width: multi-state showcase needs width
      { slug: "checkbox", name: "Checkbox", description: "Mehrfachauswahl-Kontrollkästchen", playgroundAnchor: "selection-controls", span: 2 },
      { slug: "radio-group", name: "Radio Group", description: "Einzelauswahl aus einer Gruppe von Optionen", playgroundAnchor: "selection-controls", span: 2 },
      // Toggle (previously "Switch")
      { slug: "switch", name: "Toggle", description: "Toggle-Schalter für Ein/Aus-Zustände", playgroundAnchor: "selection-controls", span: 2 },
      // Pair: both numeric/code inputs
      { slug: "slider", name: "Slider", description: "Schieberegler für numerische Wertauswahl", playgroundAnchor: "misc" },
      { slug: "input-otp", name: "Input OTP", description: "Einmalcode-Eingabe mit einzelnen Feldern", playgroundAnchor: "inputs-forms" },
      // Full-width: field has label + input + description
      { slug: "field", name: "Field", description: "Label-Feld-Kombination mit Helfertext", playgroundAnchor: "inputs-forms", span: 2 },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    components: [
      // Full-width: tab panels need space
      { slug: "tabs", name: "Tabs", description: "Reiter-Navigation für Inhaltsbereiche", playgroundAnchor: "navigation", span: 2 },
      // Pair: both linear/sequential navigation
      { slug: "breadcrumb", name: "Breadcrumb", description: "Pfadanzeige zur aktuellen Seitenposition", playgroundAnchor: "navigation" },
      { slug: "pagination", name: "Pagination", description: "Seitennavigation für Listenansichten", playgroundAnchor: "navigation" },
      // Dropdown menu
      { slug: "dropdown-menu", name: "Dropdown Menu", description: "Aufklappmenü für Aktionen und Optionen", playgroundAnchor: "navigation" },
      // Full-width: complex nav patterns
      { slug: "navigation-menu", name: "Navigation Menu", description: "Mehrstufiges Navigationsmenü mit Untermenüs", playgroundAnchor: "navigation", span: 2 },
      { slug: "menubar", name: "Menubar", description: "Horizontale Menüleiste im Desktop-Stil", playgroundAnchor: "navigation", span: 2 },
      { slug: "sidebar", name: "Sidebar", description: "Kollabierbare Seitenleiste für App-Navigation", playgroundAnchor: "navigation", span: 2 },
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    components: [
      // Pair: both modal dialogs (confirm flows)
      { slug: "dialog", name: "Dialog", description: "Modales Dialogfenster für Bestätigungen", playgroundAnchor: "overlays" },
      { slug: "alert-dialog", name: "Alert Dialog", description: "Bestätigungsdialog für kritische Aktionen", playgroundAnchor: "overlays" },
      // Pair: both slide-in panels
      { slug: "drawer", name: "Drawer", description: "Von unten einfahrender Overlay-Bereich", playgroundAnchor: "overlays" },
      { slug: "sheet", name: "Sheet", description: "Seitenpanel das von einem Rand einschiebt", playgroundAnchor: "overlays" },
      // Pair: both positioned floating content
      { slug: "popover", name: "Popover", description: "Positioniertes Overlay für zusätzliche Inhalte", playgroundAnchor: "overlays" },
      { slug: "hover-card", name: "Hover Card", description: "Vorschaukarte die bei Hover erscheint", playgroundAnchor: "overlays" },
      // Full-width: command palette is wide
      { slug: "command", name: "Command", description: "Befehlspalette mit Suchfunktion", playgroundAnchor: "overlays", span: 2 },
      // Single: small utility
      { slug: "tooltip", name: "Tooltip", description: "Kurzinfo-Blase bei Hover über ein Element", playgroundAnchor: "overlays" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    components: [
      // Full-width: alert needs width for context
      { slug: "alert", name: "Alert", description: "Hinweis- oder Fehlerbox für Systemzustände", playgroundAnchor: "feedback", span: 2 },
      // Pair: both progress/status indicators
      { slug: "progress", name: "Progress", description: "Fortschrittsbalken für laufende Prozesse", playgroundAnchor: "feedback" },
      { slug: "sonner", name: "Sonner", description: "Toast-Benachrichtigungen am Bildschirmrand", playgroundAnchor: "feedback" },
    ],
  },
  {
    id: "datendarstellung",
    label: "Datendarstellung",
    components: [
      // Full-width: wide data structures
      { slug: "table", name: "Table", description: "Tabellarische Darstellung strukturierter Daten", playgroundAnchor: "data-display", span: 2 },
      // Pair: both data visualizations
      { slug: "chart", name: "Chart", description: "Datenvisualisierung mit verschiedenen Charttypen", playgroundAnchor: "data-display" },
      { slug: "calendar", name: "Calendar", description: "Datumsauswahl im Monatsraster", playgroundAnchor: "data-display" },
      // Full-width: carousel scroll needs space
      { slug: "carousel", name: "Carousel", description: "Horizontaler Bildlauf für mehrere Karten", playgroundAnchor: "data-display", span: 2 },
      // Pair: both expand/collapse patterns
      { slug: "accordion", name: "Accordion", description: "Auf- und zuklappbare Inhaltsbereiche", playgroundAnchor: "layout" },
      { slug: "collapsible", name: "Collapsible", description: "Ein-/Ausblenden beliebiger Inhalte per Klick", playgroundAnchor: "layout" },
      // Single: standalone avatar
      { slug: "avatar", name: "Avatar", description: "Profilbild oder Initialen-Platzhalter", playgroundAnchor: "misc" },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    components: [
      { slug: "card", name: "Card", description: "Inhaltskarte mit Header, Body und Footer", playgroundAnchor: "layout" },
    ],
  },
];

// Populated after COMPONENT_REGISTRY is defined
COMPONENT_REGISTRY.forEach((cat) => {
  cat.components.forEach((comp) => {
    ALL_COMPONENTS.push({ ...comp, categoryLabel: cat.label, categoryId: cat.id });
  });
});
