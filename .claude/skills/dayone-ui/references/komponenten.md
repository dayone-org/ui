# DAYONE UI – Komponenten-Katalog

Alle Bausteine, die `npx shadcn@latest add dayone-org/ui/all` installiert,
nach Einsatzbereich sortiert. Import-Pfad immer `@/components/ui/<datei>`.
Prüfe diese Liste, bevor du ein Element selbst baust – fast jeder Standardfall
ist abgedeckt.

## Inhalt

- [Grundlagen](#grundlagen)
- [Grundelemente](#grundelemente)
- [Formulare](#formulare)
- [Navigation](#navigation)
- [Overlays](#overlays)
- [Feedback](#feedback)
- [Datendarstellung](#datendarstellung)
- [Layout](#layout)

## Grundlagen

| Baustein | Einsatzbereich |
| --- | --- |
| Colors | DAYONE Farbpalette und Design-Tokens (siehe `tokens.md`) |
| Typography | Typografische Skalierung und Schriftstile (Roobert) |
| Logo | Markensymbol, Wortmarke und Kombinationsvarianten |

## Grundelemente

| Baustein | Datei | Einsatzbereich |
| --- | --- | --- |
| Badge | `badge` | Kleines Label für Status oder Kategorien |
| Button | `button` | Primäre und sekundäre Aktionen (`variant`: default, outline, secondary, ghost, destructive, link) |
| Button Group | `button-group` | Mehrere Buttons als zusammengehörige Gruppe |
| Empty | `empty` | Leer-Zustand für Listen und Datenbereiche |
| Loading | `skeleton` / `spinner` | Ladezustände – Skeleton-Platzhalter und Spinner |
| Separator | `separator` | Horizontale Trennlinie zwischen Inhaltsbereichen |

## Formulare

| Baustein | Datei | Einsatzbereich |
| --- | --- | --- |
| Field | `field` | Label, Eingabe und Beschreibungstext als Einheit |
| Input | `input` | Einzeiliges Texteingabefeld |
| Textarea | `textarea` | Mehrzeiliges Texteingabefeld |
| Select | `select` | Auswahlmenü mit Such- und Scroll-Funktion |
| Native Select | `native-select` | Natives Auswahlmenü |
| Combobox | `combobox` | Kombination aus Eingabe und Dropdown-Suche |
| Input Group | `input-group` | Eingabefeld mit Prefix oder Suffix |
| Search Bar | `search-bar` | Minimales Suchfeld mit Unterstrich – Sidebar, Filter, Tabellen |
| Checkbox | `checkbox` | Mehrfachauswahl-Kontrollkästchen (DAYONE-Control) |
| Radio Group | `radio-group` | Einzelauswahl aus einer Gruppe (DAYONE-Control) |
| Toggle / Switch | `switch` | Ein/Aus-Zustände (DAYONE-Control) |
| Toggle Group | `toggle-group` / `toggle` | Gruppe von Umschalt-Buttons |
| Slider | `slider` | Schieberegler für numerische Wertauswahl |
| Input OTP | `input-otp` | Einmalcode-Eingabe mit einzelnen Feldern |
| Label | `label` | Beschriftung für Formularelemente |

## Navigation

| Baustein | Datei | Einsatzbereich |
| --- | --- | --- |
| Tabs | `tabs` | Reiter-Navigation für Inhaltsbereiche |
| Breadcrumb | `breadcrumb` | Pfadanzeige zur aktuellen Seitenposition |
| Pagination | `pagination` | Seitennavigation für Listenansichten |
| Dropdown Menu | `dropdown-menu` | Aufklappmenü für Aktionen und Optionen |
| Navigation Menu | `navigation-menu` | Mehrstufiges Navigationsmenü mit Untermenüs |
| Menubar | `menubar` | Menüleiste mit mehreren Menüs |
| Context Menu | `context-menu` | Rechtsklick-Kontextmenü |
| Sidebar | `sidebar` | App-Seitenleiste mit Navigation |
| Command | `command` | Befehls-/Suchpalette (⌘K) |

## Overlays

| Baustein | Datei | Einsatzbereich |
| --- | --- | --- |
| Dialog | `dialog` | Modales Dialogfenster für Bestätigungen |
| Alert Dialog | `alert-dialog` | Bestätigungsdialog für kritische Aktionen |
| Drawer | `drawer` | Von unten einfahrender Overlay-Bereich |
| Sheet | `sheet` | Seitenpanel, das von einem Rand einschiebt |
| Popover | `popover` | Positioniertes Overlay für zusätzliche Inhalte |
| Hover Card | `hover-card` | Vorschaukarte, die bei Hover erscheint |
| Tooltip | `tooltip` | Kurzinfo-Blase bei Hover über ein Element |

## Feedback

| Baustein | Datei | Einsatzbereich |
| --- | --- | --- |
| Alert | `alert` | Hinweis- oder Fehlerbox für Systemzustände |
| Progress | `progress` | Fortschrittsbalken für laufende Prozesse |
| Toast | `sonner` | Toast-Benachrichtigungen am Bildschirmrand |

## Datendarstellung

| Baustein | Datei | Einsatzbereich |
| --- | --- | --- |
| Table | `table` | Tabellarische Darstellung strukturierter Daten |
| Chart | `chart` | Datenvisualisierung mit verschiedenen Charttypen |
| Calendar | `calendar` | Datumsauswahl im Monatsraster |
| Carousel | `carousel` | Horizontaler Bildlauf für mehrere Karten |
| Accordion | `accordion` | Auf- und zuklappbare Inhaltsbereiche |
| Collapsible | `collapsible` | Ein-/Ausblenden beliebiger Inhalte per Klick |
| Avatar | `avatar` | Profilbild oder Initialen-Platzhalter |
| Scroll Area | `scroll-area` | Bereich mit eigenem Scroll-Verhalten |
| Aspect Ratio | `aspect-ratio` | Seitenverhältnis für Medien festlegen |

## Layout

| Baustein | Datei | Einsatzbereich |
| --- | --- | --- |
| Card | `card` | Karten-Container für gruppierte Inhalte |
| Item | `item` | Listen-/Zeilen-Element |
| Resizable | `resizable` | Verstellbare Panel-Bereiche |
| Kbd | `kbd` | Tastenkürzel-Darstellung |

## Weitere Helfer

`direction` (RTL/LTR), `aspect-ratio` und `scroll-area` sind Hilfskomponenten
für Layout-Feinheiten. Im Zweifel die DAYONE UI Site unter `/komponenten`
ansehen – dort ist jeder Baustein mit Live-Beispiel dokumentiert.
