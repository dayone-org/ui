---
name: dayone-ui
description: >-
  DAYONE UI ist die interne Komponentenbibliothek für DAYONE Anwendungen –
  shadcn/ui-Komponenten mit DAYONE Design Tokens und Roobert-Typografie. Nutze
  diesen Skill immer, wenn du eine interne Anwendung, ein Tool, ein Dashboard,
  ein Formular, eine Admin-/Settings-Seite oder einzelne UI-Bausteine im
  DAYONE-Look baust – oder bestehende Oberflächen angleichst ("auf unseren
  Standard/Look bringen", "an unser Design System anpassen", rohe Farben durch
  unsere Tokens ersetzen). Das gilt auch, wenn "DAYONE UI" nicht fällt, sondern
  nur "unser Look", "unser Standard" oder "unser Design System" gemeint ist. Er
  deckt Installation (shadcn-Registry), die fertigen Bausteine und ihre
  Einsatzbereiche, die Regeln für Farben, Typografie, Abstände und Controls
  (Bausteine nutzen statt frei zu stylen) und die Prüf-Checkliste ab. NICHT für
  öffentliche Marketing-/Kampagnen-Websites, reine Backend-/Logik-/Performance-
  Aufgaben ohne UI oder Projekte mit fremdem Design System bzw. plain shadcn
  ohne DAYONE-Theme.
---

# DAYONE UI

DAYONE UI ist die interne Komponentenbibliothek für DAYONE Anwendungen. Sie
basiert auf shadcn/ui, ist aber mit DAYONE Design Tokens, der Roobert-Schrift
und festen Regeln für Farben, Abstände und Controls vorkonfiguriert. Das Ziel:
interne Tools sehen ohne zusätzliche Designarbeit nach DAYONE aus.

Der Kerngedanke dieses Skills: **Du baust nicht von Null und stylst nicht frei.
Du installierst die Bibliothek, setzt deine Oberfläche aus den vorhandenen
Bausteinen zusammen und prüfst am Ende gegen die Referenz.** Freies Styling –
eigene Hex-Farben, eigene Button-Designs, beliebige Pixel-Abstände – ist genau
das, was DAYONE UI vermeiden soll, weil die Anwendung dann aus dem Look fällt
und schwer wartbar wird.

## Wann diesen Skill nutzen

Nutze ihn, sobald sichtbare Oberfläche für eine interne DAYONE Anwendung
entsteht oder angepasst wird: ein neues Tool, ein Dashboard, ein Formular, ein
Admin-Bereich, eine Detail- oder Listenansicht. Auch wenn jemand „mach das im
DAYONE-Look" oder „bring das auf unseren Standard" sagt, ohne die Bibliothek
beim Namen zu nennen, ist das der richtige Skill.

Nicht relevant ist er für reine Logik-, Backend-, Daten- oder
Infrastruktur-Aufgaben ohne UI, und für öffentliche Marketing-Websites mit
eigenem Markenauftritt (DAYONE UI ist für *interne* Anwendungen gedacht).

## Installation

DAYONE UI wird über die shadcn-Registry installiert. Das Vorgehen hängt davon
ab, ob shadcn im Projekt schon eingerichtet ist.

**Neues Projekt / shadcn noch nicht eingerichtet** – zuerst mit den DAYONE
Vorgaben (Basis Radix, Preset Nova) initialisieren, dann alles installieren:

```bash
npx shadcn@latest init --base radix --preset nova
npx shadcn@latest add dayone-org/ui/all
```

`add dayone-org/ui/all` installiert alle Komponenten, `lib/utils.ts`,
`hooks/use-mobile.ts`, die `globals.css` mit den DAYONE Tokens und die
Roobert-Fontdateien.

**Bestehendes Projekt, in dem shadcn schon läuft** – einzelne Komponenten
gezielt nachinstallieren:

```bash
npx shadcn@latest add dayone-org/ui/button
npx shadcn@latest add dayone-org/ui/input
npx shadcn@latest add dayone-org/ui/dialog
```

Prüfe vor dem Bauen kurz, ob `app/globals.css` (oder das CSS-Pendant des
Projekts) die DAYONE Tokens und die Roobert-`@font-face`-Definitionen enthält.
Wenn nicht, ist die Bibliothek noch nicht vollständig installiert – dann zuerst
`add dayone-org/ui/all` ausführen, sonst greifen die Styles nicht.

> Hinweis Next.js: Dieses Setup nutzt eine aktuelle Next.js-Version mit
> möglichen Breaking Changes. Wenn du Routing-, Config- oder App-Router-Code
> schreibst, orientiere dich an der projektinternen Doku unter
> `node_modules/next/dist/docs/`, nicht an älteren Konventionen.

## Vorhandene Bausteine nutzen

Bevor du irgendetwas selbst baust, prüfe, ob es den Baustein schon gibt – das
ist fast immer der Fall. Die Komponenten liegen nach Installation unter
`components/ui/` und werden so importiert:

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Speichern</Button>
<Button variant="outline">Abbrechen</Button>
```

Komponenten werden über `variant`- und `size`-Props gesteuert, nicht über eigene
Klassen. Beispiel Button-Varianten: `default` (primär, schwarz), `outline`,
`secondary`, `ghost`, `destructive`, `link`.

Den vollständigen, nach Einsatzbereich sortierten Katalog aller verfügbaren
Bausteine (Formulare, Navigation, Overlays, Feedback, Datendarstellung, Layout
usw.) findest du in **[references/komponenten.md](references/komponenten.md)**.
Lies diese Datei, wenn du nicht sicher bist, welcher Baustein für ein Element
zuständig ist – sie verhindert, dass du etwas nachbaust, das es schon gibt.

## Regeln: nicht frei stylen

DAYONE UI arbeitet mit einem dreistufigen Token-System (Primitive → Semantisch →
Funktional). Du verwendest **immer die semantischen Tokens bzw. die
Tailwind-Klassen, die darauf zeigen** – nie rohe Hex-Werte oder eigene Skalen.
Die vollständigen Token-Tabellen (inkl. Dark Mode) stehen in
**[references/tokens.md](references/tokens.md)**.

**Farben.** Nutze semantische Klassen wie `bg-background`, `text-foreground`,
`bg-primary`, `text-muted-foreground`, `border-border`, `bg-destructive`. Schreib
nie `bg-[#1A1A1A]` oder `text-red-500`. Greife auch **nicht zu den primitiven
Tokens** (`var(--gray-400)`, `var(--blue-dark)`, `--sand-medium` …) – die sind
nur die rohe Palette hinter den semantischen Tokens und schalten z. B. im Dark
Mode nicht mit. Wenn dir eine Farbe „fehlt", suchst du zuerst das passende
semantische Token – meist gibt es eins (z. B. `secondary`, `accent`, `muted`
für Flächen, `destructive` für Fehler).

**Status- und Statusfarben.** DAYONE UI hat bewusst **kein Grün-/Erfolgs-Token
und kein Warn-Gelb**. Erfinde dafür keine eigenen Farben. Stelle Status stattdessen
über die `Badge`-Komponente und ihre Varianten dar: `default` (hervorgehoben,
z. B. aktiv/erfolgreich), `secondary` oder `outline` (neutral, z. B. inaktiv/
ausstehend) und `destructive` (Fehler/kritisch). Brauchst du wirklich eine
zusätzliche Status-Semantik (z. B. echtes „Erfolg-Grün"), erfinde sie nicht still,
sondern weise im Übergabe-Text darauf hin (Kandidat für ein Issue unter
`dayone-org/ui`).

**Typografie.** Schrift ist Roobert (über `--font-roobert` / die `font-sans`-
Vorgabe). Verwende die Typo-Skala-Tokens (`--text-display-*`, `--text-body-*`)
statt beliebiger `text-[17px]`-Werte. Wichtig: Diese Tokens sind **CSS-Variablen,
keine Tailwind-Utility-Klassen** – `className="text-display-md"` greift nicht.
Setze die Größe so, wie es das Projekt selbst tut (z. B. in `doc-prose.tsx`):
`style={{ fontSize: "var(--text-display-md)", lineHeight: "var(--leading-display)" }}`.
Für Standard-Textgrößen reichen die normalen Tailwind-Klassen (`text-sm`,
`text-base`). Es gibt nur zwei Schriftstärken: Regular (400) und SemiBold (600).

**Abstände.** Nutze die Spacing-Skala (`--space-1` = 4px bis `--space-24` = 96px,
d. h. die Tailwind-Standardschritte `p-2`, `gap-4`, `mt-6` …). Keine krummen
Pixelwerte wie `mt-[13px]`.

**Controls** (Checkbox, Radio, Toggle/Switch, Inputs) bringen ihr DAYONE-
Verhalten – Größe, Rahmen, Focus-Ring, Disabled-Zustand – bereits mit. Übernimm
die Komponenten unverändert und überschreibe nicht ihre Größe, Border oder
Ringe; sonst brichst du den einheitlichen Look.

**Radius & Dark Mode.** Border-Radius kommt aus `--radius` (Tokens `rounded-sm`
… `rounded-4xl`). Dark Mode ist über die `.dark`-Tokens vorgesehen – fest
verdrahtete helle Farben brechen ihn, semantische Tokens schalten automatisch
mit.

Wenn du wirklich einen Baustein oder eine Variante brauchst, die es nicht gibt,
baue ihn im Stil der vorhandenen Komponenten (gleiche Tokens, `cva`-Varianten,
`cn`-Helper aus `@/lib/utils`) – und weise im Übergabe-Text darauf hin, damit es
geprüft werden kann.

## Checkliste vor der Übergabe

Geh diese Punkte durch, bevor du eine Oberfläche als fertig meldest:

- [ ] **Bausteine statt Eigenbau:** Jedes UI-Element nutzt eine vorhandene
      DAYONE-Komponente. Nichts wurde nachgebaut, das es schon gibt
      (gegen [references/komponenten.md](references/komponenten.md) geprüft).
- [ ] **Keine rohen Farben:** Keine Hex-Werte, keine `text-red-500`-artigen
      Tailwind-Standardfarben und keine primitiven Tokens (`var(--gray-*)`,
      `var(--blue-*)` …) – nur semantische Tokens/Klassen.
- [ ] **Status über Badge-Varianten:** Kein erfundenes Erfolgs-Grün/Warn-Gelb;
      Status über `default`/`secondary`/`outline`/`destructive`.
- [ ] **Typografie:** Roobert aktiv, Typo-Skala über `style`/`var(--text-*)`
      genutzt (nicht als nicht-existente `text-display-*`-Klasse), nur
      Regular/SemiBold.
- [ ] **Abstände:** Werte aus der Spacing-Skala, keine krummen Pixel.
- [ ] **Controls unverändert:** Checkbox/Radio/Toggle/Inputs nicht in Größe,
      Rahmen oder Focus-Ring überschrieben.
- [ ] **Dark Mode:** Keine fest verdrahteten hellen Farben, die den Dark Mode
      brechen.
- [ ] **Optischer Abgleich:** Das Ergebnis sieht aus wie die Referenz. Gleich
      die Komponenten gegen die Playground-/Komponenten-Referenz ab und das
      Gesamtlayout gegen die Beispiel-Anwendung (`/komponenten`,
      `/playground`, `/anwendung/pdc-hub` der DAYONE UI Site, lokal oder unter
      https://dayone-ui.vercel.app).

Wenn etwas fehlt oder eine Komponente anders aussieht als erwartet, weise im
Übergabe-Text darauf hin (statt es still frei zu stylen) – das gehört in ein
GitHub-Issue unter `dayone-org/ui`.
