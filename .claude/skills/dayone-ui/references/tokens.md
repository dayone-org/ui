# DAYONE UI – Design Tokens

DAYONE UI nutzt ein dreistufiges Token-System. **Du verwendest in Anwendungscode
immer die semantischen oder funktionalen Tokens** (bzw. die Tailwind-Klassen, die
darauf zeigen) – nie die Primitive direkt und nie rohe Hex-Werte. So schaltet
u. a. der Dark Mode automatisch mit.

1. **Primitive** – die rohen Werte (Hex). Nur Referenz, nicht direkt verwenden.
2. **Semantisch** – die Tokens, die du nutzt (`background`, `primary`, `border` …).
3. **Funktional** – feinere Tokens für einzelne Bausteine (Buttons, Inputs).

## Farben – semantische Tokens (Light Mode)

| Token / Klasse | Bedeutung | Light-Wert |
| --- | --- | --- |
| `background` / `foreground` | Seitenhintergrund / Haupttext | `#FFFFFF` / `#1A1A1A` |
| `card` / `card-foreground` | Kartenfläche / -text | `#FFFFFF` / `#1A1A1A` |
| `popover` / `popover-foreground` | Overlay-Fläche / -text | `#FFFFFF` / `#1A1A1A` |
| `primary` / `primary-foreground` | Primäraktion (schwarz) / Text darauf | `#1A1A1A` / `#FFFFFF` |
| `secondary` / `secondary-foreground` | Sekundärfläche (Sand) / Text | `#F7F3EB` / `#1A1A1A` |
| `muted` / `muted-foreground` | Gedämpfte Fläche / Text | `#EDE7DD` / `#666666` |
| `accent` / `accent-foreground` | Akzentfläche / Text | `#F1F1F1` / `#1A1A1A` |
| `destructive` / `-foreground` | Fehler/Löschen / Text | `#FF544C` / `#FFFFFF` |
| `border` / `divider` | Rahmen / Trennlinie | `#F1F1F1` |
| `input` | Eingabe-Rahmen (= border) | `#F1F1F1` |
| `ring` | Focus-Ring | `#1A1A1A` |
| `overlay` | Modal-Abdunklung | `rgb(0 0 0 / 0.10)` |
| `chart-1` … `chart-5` | Diagramm-Reihen | schwarz, sand-dark, sand-medium, blau, rot |
| `sidebar*` | Sidebar-Flächen, -Text, -Border | Sand-/Schwarz-Töne |

Tailwind-Nutzung: `bg-background`, `text-foreground`, `bg-primary`,
`text-primary-foreground`, `text-muted-foreground`, `border-border`,
`bg-destructive` usw.

## Primitive Farbpalette (nur Referenz)

| Gruppe | Tokens |
| --- | --- |
| Grays | `--black #1A1A1A`, `--gray-500 #333`, `--gray-400 #666`, `--gray-300 #999`, `--gray-200 #CCC`, `--gray-100 #F1F1F1`, `--white #FFF` |
| Sand | `--sand-dark #9E9A94`, `--sand-medium #EDE7DD`, `--sand-light #F7F3EB` |
| Red | `--red-dark #CC443D`, `--red-medium #FF544C`, `--red-light #FF8580` |
| Blue | `--blue-dark #0E72C4`, `--blue-highlight #1487DD`, `--blue-light #D6ECFA` |

## Dark Mode

Über die `.dark`-Klasse aktiv. Beispiele: `background → #1A1A1A`,
`foreground → #F7F3EB`, `card → #222222`, `primary → #F7F3EB` (Text
`#1A1A1A`), `border → #333333`. **Wichtig:** Nur semantische Tokens nutzen,
dann schaltet der Dark Mode automatisch. Fest verdrahtete helle Hex-Werte
brechen ihn.

## Typografie

Schrift: **Roobert** (`--font-roobert`, als `font-sans` voreingestellt). Nur
zwei Stärken: Regular (400) und SemiBold (600).

| Skala | Token | Größe |
| --- | --- | --- |
| Display 3xl | `--text-display-3xl` | 48px |
| Display 2xl | `--text-display-2xl` | 40px |
| Display xl | `--text-display-xl` | 32px |
| Display lg | `--text-display-lg` | 28px |
| Display md | `--text-display-md` | 24px |
| Display sm | `--text-display-sm` | 20px |
| Body lg | `--text-body-lg` | 18px |
| Body md | `--text-body-md` | 16px |
| Body sm | `--text-body-sm` | 14px |
| Body xs | `--text-body-xs` | 12px |

Zeilenhöhen: `--leading-display 1.2`, `--leading-body 1.5`, `--leading-tight 1.0`.
Laufweite: `--tracking-display 0`, `--tracking-body-lg 0.36px`,
`--tracking-body-md 0.32px`, `--tracking-caps 2px`.

**Nutzung:** Die `--text-*`-Tokens sind CSS-Variablen, **nicht** als
Tailwind-Utility registriert (`@theme inline` enthält sie nicht). `text-display-md`
als Klasse greift also nicht. Setze sie wie das Projekt selbst per `style`:

```tsx
<h2 style={{ fontSize: "var(--text-display-md)", lineHeight: "var(--leading-display)" }}>…</h2>
<p style={{ fontSize: "var(--text-body-sm)" }}>…</p>
```

Für unkritische Standardgrößen sind die normalen Tailwind-Klassen (`text-sm`,
`text-base`, `text-lg`) ok.

## Statusfarben

DAYONE UI hat **kein Grün-/Erfolgs-Token und kein Warn-Gelb**. Status wird über
`Badge`-Varianten abgebildet, nicht über eigene Farben:

| Bedeutung | Badge-Variante |
| --- | --- |
| aktiv / erfolgreich / hervorgehoben | `default` |
| neutral / inaktiv / ausstehend | `secondary` oder `outline` |
| Fehler / kritisch / löschen | `destructive` |

Erfinde kein Erfolgs-Grün. Wenn eine zusätzliche Status-Semantik wirklich fehlt,
im Übergabe-Text vermerken (Issue-Kandidat unter `dayone-org/ui`).

## Abstände (Spacing-Skala)

4px-Basis. Nutze diese Schritte (entspricht den Tailwind-Standardklassen
`p-2`, `gap-4`, `mt-6` …), keine krummen Pixelwerte.

| Token | Wert | Token | Wert |
| --- | --- | --- | --- |
| `--space-1` | 4px | `--space-8` | 32px |
| `--space-2` | 8px | `--space-10` | 40px |
| `--space-3` | 12px | `--space-12` | 48px |
| `--space-4` | 16px | `--space-16` | 64px |
| `--space-5` | 20px | `--space-20` | 80px |
| `--space-6` | 24px | `--space-24` | 96px |

## Radius

Basis `--radius: 0.25rem`. Tokens: `rounded-sm` (×0.6), `rounded-md` (×0.8),
`rounded-lg` (×1.0), `rounded-xl` (×1.4), `rounded-2xl` (×1.8), bis `rounded-4xl`.

## Controls (funktionale Tokens)

Checkbox, Radio und Toggle/Switch sind über die `@layer components`-Regeln in
`globals.css` fest gestaltet: 20px Größe, 2px Rahmen in `--sand-dark`,
Focus-Ring über `--ring`, Disabled bei 30% Opazität. **Nicht überschreiben** –
Komponenten unverändert übernehmen. Buttons/Inputs haben eigene funktionale
Tokens (`--button-primary`, `--input-bg`, `--input-border-focus` …); auch diese
kommen mit den Komponenten und müssen nicht angefasst werden.
