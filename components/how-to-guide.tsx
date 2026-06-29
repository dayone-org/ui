import { HowToSection } from "@/components/how-to-section";
import {
  DocCallout,
  DocCode,
  DocH3,
  DocLead,
  DocLink,
  DocMuted,
  DocOl,
  DocP,
  DocPre,
  DocStack,
  DocUl,
} from "@/components/doc-prose";

export function HowToGuide() {
  return (
    <>
      <HowToSection id="overview" title="Überblick">
        <DocStack>
          <DocLead>
            Bei DAYONE entstehen zunehmend interne Tools — gebaut von
            Designer:innen, mit Unterstützung von KI. Das Problem: Farben,
            Abstände und Komponenten werden jedes Mal neu definiert, das
            Ergebnis sieht selten von Anfang an nach DAYONE aus.
          </DocLead>
          <DocP>
            Das hier ist die gemeinsame Basis. Alles was ihr braucht um direkt
            on-brand zu starten: CSS-Tokens, fertige Komponenten, gebaut auf{" "}
            <DocLink href="https://ui.shadcn.com/">shadcn/ui</DocLink>. Einfach
            reinkopieren und loslegen — egal ob ihr selbst baut oder einen
            Agenten loslasst.
          </DocP>
          <DocP>Von Anfang an nach DAYONE Gusto.</DocP>
          <DocP>Viel Spaß beim bauen!!</DocP>
        </DocStack>
      </HowToSection>

      <HowToSection id="quickstart" title="Schnellstart">
        <DocStack>
          <DocH3>Mit KI-Tools arbeiten</DocH3>
          <DocP>
            Links im Prompt mitgeben — Playground für Optik, diese Seite für
            Regeln und Code:
          </DocP>
          <DocUl>
            <li>
              <DocLink href="https://dayone-ui.vercel.app/playground">
                /playground
              </DocLink>
            </li>
            <li>
              <DocLink href="https://dayone-ui.vercel.app/how-to-use">
                /how-to-use
              </DocLink>
            </li>
          </DocUl>
          <DocMuted>
            Im Klartext: DAYONE-Tokens aus <DocCode>globals.css</DocCode>,
            Buttons über <DocCode>dayone-btn</DocCode>, keine freien Hex-Werte.
          </DocMuted>
          <DocH3>Referenz öffnen</DocH3>
          <DocP>Online reicht meist — lokal nur bei Entwicklung:</DocP>
          <DocOl>
            <li>
              Repository klonen oder öffnen (Ordner{" "}
              <DocCode>dayone-ui</DocCode>)
            </li>
            <li>
              Im Terminal: <DocCode>npm install</DocCode>
            </li>
            <li>
              Entwicklungsserver starten: <DocCode>npm run dev</DocCode>
            </li>
            <li>
              Im Browser:{" "}
              <DocLink href="http://localhost:3000">
                localhost:3000
              </DocLink>{" "}
              (Start) und{" "}
              <DocLink href="http://localhost:3000/playground">
                /playground
              </DocLink>{" "}
              (alle Komponenten)
            </li>
          </DocOl>
          <DocH3>Live-Version</DocH3>
          <DocP>
            Die aktuelle Version liegt auf Vercel:{" "}
            <DocLink href="https://dayone-ui.vercel.app">
              dayone-ui.vercel.app
            </DocLink>
            . Dort sieht das Team immer den gleichen Stand wie nach einem
            Deploy.
          </DocP>
          <DocH3>Production-Build prüfen</DocH3>
          <DocPre>{`npm run build
npm run start`}</DocPre>
          <DocMuted>
            Vor einem Deploy lokal bauen — so siehst du Fehler früh, nicht erst
            online.
          </DocMuted>
        </DocStack>
      </HowToSection>

      <HowToSection id="project-setup" title="Projekt einrichten">
        <DocStack>
          <DocP>
            Für ein neues internes Tool brauchst du im Kern drei Dinge aus
            dieser Foundation: Schrift, Tokens und die Komponenten-Dateien, die
            du wirklich verwendest.
          </DocP>
          <DocH3>Schritt 1 — Schrift (Roobert)</DocH3>
          <DocOl>
            <li>
              Ordner <DocCode>public/fonts/</DocCode> mit{" "}
              <DocCode>Roobert-Regular.otf</DocCode> und{" "}
              <DocCode>Roobert-SemiBold.otf</DocCode> ins Zielprojekt kopieren
            </li>
            <li>
              In <DocCode>app/layout.tsx</DocCode> die Schrift wie in unserem
              Projekt mit <DocCode>next/font/local</DocCode> einbinden
              (Variable <DocCode>--font-sans</DocCode>)
            </li>
          </DocOl>
          <DocH3>Schritt 2 — Design Tokens</DocH3>
          <DocP>
            Kopiere den Token-Block aus <DocCode>app/globals.css</DocCode> —
            mindestens die Abschnitte Primitive, Semantisch, Funktional,
            Typography und Spacing. Importiere die Datei im Root-Layout:
          </DocP>
          <DocPre>{`import "./globals.css";`}</DocPre>
          <DocH3>Schritt 3 — Komponenten übernehmen</DocH3>
          <DocUl>
            <li>
              <strong>Buttons / Links:</strong> nur CSS-Klassen (
              <DocCode>dayone-btn</DocCode> …) — siehe Abschnitt Komponenten
            </li>
            <li>
              <strong>Formulare:</strong> shadcn <DocCode>Field</DocCode>,{" "}
              <DocCode>Input</DocCode> und <DocCode>Textarea</DocCode> aus{" "}
              <DocCode>components/ui/</DocCode>
            </li>
            <li>
              <strong>Checkbox, Radio, Switch:</strong> shadcn-Komponenten aus{" "}
              <DocCode>components/ui/</DocCode> — Styling kommt über unsere
              globalen Regeln für <DocCode>data-slot</DocCode>
            </li>
            <li>
              <strong>Alles andere:</strong> nur die <DocCode>ui/</DocCode>
              -Komponenten kopieren, die du brauchst (Dialog, Tabs, …)
            </li>
          </DocUl>
          <DocCallout>
            Lieber weniger kopieren als zu viel: Nimm nur Dateien, die du im
            Feature wirklich einsetzt. Der Playground zeigt, welche Bausteine es
            gibt.
          </DocCallout>
          <DocH3>Schritt 4 — Abhängigkeiten</DocH3>
          <DocP>
            Unser Stack: Next.js, React, Tailwind CSS v4, shadcn/ui (Radix).
            Wenn du Komponenten aus <DocCode>components/ui/</DocCode> nutzt,
            installiere die gleichen Pakete wie in unserer{" "}
            <DocCode>package.json</DocCode> (mindestens{" "}
            <DocCode>class-variance-authority</DocCode>,{" "}
            <DocCode>clsx</DocCode>, <DocCode>tailwind-merge</DocCode>,{" "}
            <DocCode>lucide-react</DocCode>).
          </DocP>
        </DocStack>
      </HowToSection>

      <HowToSection id="tokens" title="Design Tokens">
        <DocStack>
          <DocLead>
            Tokens sind benannte Design-Werte. Statt überall{" "}
            <DocCode>#1A1A1A</DocCode> zu schreiben, nutzt du{" "}
            <DocCode>var(--black)</DocCode> — eine Änderung wirkt dann
            überall.
          </DocLead>
          <DocH3>Drei Ebenen</DocH3>
          <DocOl>
            <li>
              <strong>Primitive</strong> — Rohfarben:{" "}
              <DocCode>--black</DocCode>, <DocCode>--gray-400</DocCode>,{" "}
              <DocCode>--sand-light</DocCode>, <DocCode>--red-medium</DocCode> …
            </li>
            <li>
              <strong>Semantisch</strong> — Bedeutung im UI:{" "}
              <DocCode>--background</DocCode>, <DocCode>--foreground</DocCode>,{" "}
              <DocCode>--border</DocCode>, <DocCode>--destructive</DocCode> …
            </li>
            <li>
              <strong>Funktional</strong> — konkrete Rolle:{" "}
              <DocCode>--button-primary</DocCode>,{" "}
              <DocCode>--input-bg</DocCode>, <DocCode>--input-label</DocCode> …
            </li>
          </DocOl>
          <DocH3>Farben im Code</DocH3>
          <DocPre>{`<p style={{ color: "var(--black)" }}>Text</p>
<div style={{ backgroundColor: "var(--sand-light)" }} />`}</DocPre>
          <DocP>
            In Tailwind kannst du die Tokens über <DocCode>@theme</DocCode>{" "}
            oder inline <DocCode>style</DocCode> nutzen. Für DAYONE-spezifische
            Flächen nimm die funktionalen Input-/Button-Tokens, nicht willkürliche
            Grautöne.
          </DocP>
          <DocH3>Abstände</DocH3>
          <DocP>
            Spacing-Tokens heißen <DocCode>--space-1</DocCode> (4px) bis{" "}
            <DocCode>--space-24</DocCode> (96px). Buttons und Felder referenzieren
            sie intern — bei eigenen Layouts ebenfalls diese Skala verwenden.
          </DocP>
          <DocMuted>
            Alle Farbwerte findest du unter{" "}
            <DocLink href="/playground#colors">Komponenten → Colors</DocLink>.
          </DocMuted>
        </DocStack>
      </HowToSection>

      <HowToSection id="typography" title="Typografie">
        <DocStack>
          <DocP>
            Unsere Hausschrift ist <strong>Roobert</strong>. Sie ist bereits im
            Projekt eingebunden; du musst keine Google Fonts o. Ä. laden.
          </DocP>
          <DocH3>Display vs. Body</DocH3>
          <DocUl>
            <li>
              <strong>Display</strong> (<DocCode>--text-display-*</DocCode>) —
              Überschriften, große Titel. Line-height:{" "}
              <DocCode>--leading-display</DocCode> (1.2)
            </li>
            <li>
              <strong>Body</strong> (<DocCode>--text-body-*</DocCode>) —
              Fließtext, Labels, UI-Text. Line-height:{" "}
              <DocCode>--leading-body</DocCode> (1.5)
            </li>
          </DocUl>
          <DocH3>Beispiel: Seitentitel</DocH3>
          <DocPre>{`<h1
  style={{
    fontSize: "var(--text-display-3xl)",
    lineHeight: "var(--leading-display)",
    letterSpacing: "var(--tracking-display)",
    fontWeight: 600,
    color: "var(--black)",
  }}
>
  Mein Tool
</h1>`}</DocPre>
          <DocH3>Beispiel: Fließtext</DocH3>
          <DocPre>{`<p
  style={{
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--leading-body)",
    color: "var(--black)",
  }}
>
  Beschreibung …
</p>`}</DocPre>
          <DocMuted>
            Die komplette Skala mit Pixel- und Rem-Angaben steht unter{" "}
            <DocLink href="/playground#typography">
              Komponenten → Typography
            </DocLink>
            .
          </DocMuted>
        </DocStack>
      </HowToSection>

      <HowToSection id="components" title="Komponenten">
        <DocStack>
          <DocLead>
            Es gibt zwei Arten von Bausteinen: DAYONE-eigene (CSS + wenige
            React-Helfer) und shadcn/ui-Primitives für komplexere UI.
          </DocLead>

          <DocH3>Buttons & Links</DocH3>
          <DocP>
            Buttons sind normale <DocCode>button</DocCode>- oder{" "}
            <DocCode>a</DocCode>-Elemente mit Klassen. Pflicht-Klassen:
          </DocP>
          <DocUl>
            <li>
              <DocCode>dayone-btn</DocCode> — Basis
            </li>
            <li>
              <DocCode>dayone-btn--primary</DocCode> oder{" "}
              <DocCode>dayone-btn--secondary</DocCode> /{" "}
              <DocCode>dayone-btn--link</DocCode>
            </li>
            <li>
              <DocCode>dayone-btn--interactive</DocCode> — Hover/Focus/Disabled
            </li>
            <li>
              Größe: <DocCode>dayone-btn--md</DocCode>,{" "}
              <DocCode>dayone-btn--lg</DocCode>,{" "}
              <DocCode>dayone-btn--mobile</DocCode> (volle Breite 375px)
            </li>
          </DocUl>
          <DocPre>{`<Link
  href="/ziel"
  className="dayone-btn dayone-btn--primary dayone-btn--interactive dayone-btn--md"
>
  <span className="dayone-btn__inner">
    <span className="dayone-btn__label">Weiter</span>
    <span className="dayone-btn__arrow" aria-hidden>&#8594;</span>
  </span>
</Link>`}</DocPre>
          <DocMuted>
            Der Pfeil ist das DAYONE-Zeichen (Unicode →), keine Icon-Font.
            Varianten und Zustände:{" "}
            <DocLink href="/playground#buttons">Komponenten → Buttons</DocLink>.
          </DocMuted>

          <DocH3>Formularfelder</DocH3>
          <DocP>
            Nutze <DocCode>Field</DocCode>, <DocCode>FieldLabel</DocCode>,{" "}
            <DocCode>Input</DocCode> und bei Bedarf{" "}
            <DocCode>FieldDescription</DocCode>:
          </DocP>
          <DocPre>{`<Field>
  <FieldLabel htmlFor="email">E-Mail</FieldLabel>
  <Input id="email" type="email" placeholder="name@firma.de" />
  <FieldDescription>Wir antworten innerhalb von 24h.</FieldDescription>
</Field>`}</DocPre>
          <DocP>
            Labels, Helper-Text, Fokus- und Fehlerzustände kommen aus den
            shadcn-Primitives und den DAYONE Semantic-Tokens.
          </DocP>

          <DocH3>Auswahl-Elemente (Checkbox, Radio, Switch)</DocH3>
          <DocP>
            Importiere die shadcn-Komponenten (
            <DocCode>Checkbox</DocCode>, <DocCode>RadioGroup</DocCode>,{" "}
            <DocCode>Switch</DocCode>). Das DAYONE-Styling greift automatisch
            über <DocCode>globals.css</DocCode> (Selektor{" "}
            <DocCode>data-slot</DocCode>). Beispiele:{" "}
            <DocLink href="/playground#selection-controls">
              Selection Controls
            </DocLink>
            .
          </DocP>

          <DocH3>Dialoge, Tabs, Tabellen & mehr</DocH3>
          <DocP>
            Für alles Weitere: Komponente aus <DocCode>components/ui/</DocCode>{" "}
            importieren und wie in der shadcn-Dokumentation verwenden. Farben
            und Radius kommen aus den semantischen Tokens. Im Playground findest
            du unter Navigation, Overlays, Feedback usw. Live-Beispiele.
          </DocP>
          <DocCallout>
            <strong>Regel:</strong> Wenn es im Playground eine DAYONE-Variante
            gibt (Button, Input, Checkbox …), nimm die. Generische shadcn-Buttons
            nur, wenn es im Design keine DAYONE-Entsprechung gibt.
          </DocCallout>
        </DocStack>
      </HowToSection>

      <HowToSection id="patterns" title="Empfehlungen">
        <DocStack>
          <DocH3>Do — so arbeiten wir gut zusammen</DocH3>
          <DocUl>
            <li>Farben und Schriftgrößen immer über Tokens, nicht hardcoded</li>
            <li>
              Vor dem Merge: Playground öffnen und prüfen, ob dein UI zu den
              Referenz-Komponenten passt
            </li>
            <li>
              Neue UI-Muster erst im Playground dokumentieren, dann im Feature
              nutzen
            </li>
            <li>
              Abstände aus der <DocCode>--space-*</DocCode>-Skala (4, 8, 12, 16
              …)
            </li>
            <li>
              Barrierefreiheit: Labels an Inputs, <DocCode>aria-hidden</DocCode>{" "}
              nur für dekorative Pfeile
            </li>
          </DocUl>
          <DocH3>Don&apos;t — typische Fehler</DocH3>
          <DocUl>
            <li>Eigene Button-Styles neben <DocCode>dayone-btn</DocCode></li>
            <li>Inputs ohne <DocCode>FieldLabel</DocCode> oder Beschreibung</li>
            <li>Zufällige Grautöne außerhalb der Token-Palette</li>
            <li>
              shadcn-Komponenten kopieren und Tokens entfernen — dann driftet
              das UI vom Rest weg
            </li>
          </DocUl>
          <DocH3>Neue Komponente vorschlagen</DocH3>
          <DocP>
            Fehlt etwas im Playground, das mehrfach gebraucht wird? Kurz
            beschreiben: Use Case, Figma-Link (falls vorhanden), ob es ein
            DAYONE-eigenes Pattern oder ein shadcn-Wrapper sein soll. Dann
            bauen wir es zentral ein — alle profitieren.
          </DocP>
        </DocStack>
      </HowToSection>

      <HowToSection id="workflow" title="Arbeitsweise">
        <DocStack>
          <DocH3>Neues UI bauen (Mensch oder Agent)</DocH3>
          <DocOl>
            <li>
              Im{" "}
              <DocLink href="/playground">Playground</DocLink> prüfen, ob
              Komponente und Variante schon existieren
            </li>
            <li>
              Tokens und Code-Snippets von hier oder aus{" "}
              <DocCode>globals.css</DocCode> übernehmen — nicht schätzen
            </li>
            <li>
              Ergebnis im Browser mit dem Playground vergleichen; bei Abweichung
              zuerst Tokens/Klassen prüfen, nicht „optisch nachziehen“
            </li>
            <li>
              Figma nur für Details oder neue Muster — die Referenz ist die
              Quelle für implementierten Code
            </li>
          </DocOl>
          <DocH3>Wenn sich etwas am Design ändert</DocH3>
          <DocP>
            Aktualisierte Tokens oder Komponenten aus der Referenz erneut ins
            eigene Tool kopieren (oder den Agenten mit der neuen Playground-URL
            arbeiten lassen). So bleibt alles mit dem zentralen Stand synchron.
          </DocP>
        </DocStack>
      </HowToSection>

      <HowToSection id="help" title="Hilfe & Kontakt">
        <DocStack>
          <DocP>
            Etwas unklar oder sieht im Browser anders aus als im Playground?
            In dieser Reihenfolge vorgehen:
          </DocP>
          <DocOl>
            <li>
              Hard-Refresh im Browser (<DocCode>Cmd+Shift+R</DocCode> /{" "}
              <DocCode>Ctrl+Shift+R</DocCode>)
            </li>
            <li>
              Prüfen, ob <DocCode>globals.css</DocCode> im Layout importiert ist
            </li>
            <li>
              Vergleichen mit der Live-Version auf{" "}
              <DocLink href="https://dayone-ui.vercel.app/playground">
                dayone-ui.vercel.app/playground
              </DocLink>
            </li>
            <li>
              Screenshot + kurze Beschreibung an die Person, die das UI-Repo
              betreut
            </li>
          </DocOl>
          <DocCallout>
            Die Referenz ist zum <strong>Übernehmen und Verlinken</strong> gedacht
            — in eigenen Projekten Tokens und Komponenten kopieren oder den
            Agenten auf die Live-URLs verweisen.
          </DocCallout>
          <DocP>
            Nützliche Links:{" "}
            <DocLink href="/playground">Komponenten</DocLink>
            {" · "}
            <DocLink href="/">Start</DocLink>
            {" · "}
            <DocLink href="https://www.dayone.de">dayone.de</DocLink>
          </DocP>
        </DocStack>
      </HowToSection>
    </>
  );
}
