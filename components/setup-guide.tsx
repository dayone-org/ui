import { SetupSection } from "@/components/setup-section";
import {
  DocH3,
  DocLead,
  DocLink,
  DocP,
  DocPre,
  DocStack,
  DocUl,
} from "@/components/doc-prose";

export function SetupGuide() {
  return (
    <>
      <SetupSection id="intro" title="Setup">
        <DocStack>
          <DocLead>
            DAYONE UI hilft Product Designer:innen und Buildern, interne
            Anwendungen schneller im DAYONE Look umzusetzen.
          </DocLead>
          <DocP>
            Statt Farben, Buttons und Formulare jedes Mal neu zu bauen, kannst
            du die DAYONE Bausteine direkt in dein Projekt holen. Die{" "}
            <DocLink href="/komponenten">Komponenten</DocLink> zeigen, was
            verfügbar ist. Die{" "}
            <DocLink href="/anwendung/pdc-hub">Anwendung</DocLink> zeigt, wie
            sich daraus eine typische interne Anwendung zusammensetzt.
          </DocP>
        </DocStack>
      </SetupSection>

      <SetupSection id="installation" title="Installation">
        <DocStack>
          <DocH3>Wenn du selbst im Code arbeitest</DocH3>
          <DocP>
            Starte mit shadcn und installiere danach DAYONE UI. Wenn shadcn in
            deinem Projekt schon eingerichtet ist, überspringe den ersten Befehl.
          </DocP>
          <DocPre>{`# Nur ausführen, wenn shadcn noch nicht eingerichtet ist
npx shadcn@latest init

npx shadcn@latest add dayone-org/ui/all`}</DocPre>

          <DocH3>Einzelne Komponenten</DocH3>
          <DocP>
            Für kleinere Anpassungen kannst du auch nur einzelne Bausteine
            installieren:
          </DocP>
          <DocPre>{`npx shadcn@latest add dayone-org/ui/button
npx shadcn@latest add dayone-org/ui/input
npx shadcn@latest add dayone-org/ui/dialog`}</DocPre>

          <DocH3>Wenn ein Agent für dich baut</DocH3>
          <DocP>
            Du kannst die Installation auch direkt in deinen Prompt aufnehmen.
            Das ist meist der einfachste Weg, wenn Codex, Cursor oder ein
            anderer Agent die Anwendung für dich anlegt.
          </DocP>
          <DocPre>{`Baue eine interne DAYONE Anwendung in diesem Projekt.

Falls shadcn noch nicht eingerichtet ist, führe zuerst aus:
npx shadcn@latest init

Installiere danach DAYONE UI:
npx shadcn@latest add dayone-org/ui/all

Nutze die vorhandenen DAYONE Komponenten und Styles.`}</DocPre>

          <DocH3>Bestehende Anwendung angleichen</DocH3>
          <DocPre>{`Passe diese Anwendung an DAYONE UI an.

Nutze die installierten DAYONE Komponenten und Styles.
Ersetze eigene Farben und Sonder-Buttons, wo es sinnvoll ist.
Lass Logik, Datenverhalten und bestehende Abläufe unverändert.`}</DocPre>
        </DocStack>
      </SetupSection>

      <SetupSection id="skill" title="Skill">
        <DocStack>
          <DocLead>
            TODO: Einen DAYONE UI Skill schreiben, den Agenten automatisch laden
            können.
          </DocLead>
          <DocP>
            Der Skill soll Agenten knapp erklären, wie DAYONE Anwendungen
            gebaut werden: installieren, vorhandene Bausteine nutzen, nicht frei
            stylen und am Ende gegen Komponenten und Anwendung prüfen.
          </DocP>
          <DocH3>Vorgeschlagener Umfang</DocH3>
          <DocUl>
            <li>Wann DAYONE UI genutzt werden soll</li>
            <li>Installation für neue und bestehende Projekte</li>
            <li>Überblick über verfügbare Bausteine und ihre Einsatzbereiche</li>
            <li>Regeln für Farben, Typografie, Abstände und Controls</li>
            <li>Kurze Checkliste vor der Übergabe</li>
          </DocUl>
          <DocP>
            Sobald der Skill existiert, bekommt dieser Abschnitt den direkten
            Installations- oder Ladehinweis.
          </DocP>
        </DocStack>
      </SetupSection>

      <SetupSection id="changelog" title="Changelog">
        <DocStack>
          <div className="max-w-2xl">
            <div className="mb-3 flex items-baseline justify-between gap-6">
              <h3
                className="font-semibold"
                style={{
                  fontSize: "var(--text-display-sm)",
                  lineHeight: "var(--leading-display)",
                  color: "var(--black)",
                }}
              >
                Version 1
              </h3>
              <p
                className="shrink-0"
                style={{
                  fontSize: "var(--text-body-sm)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--gray-400)",
                }}
              >
                2026-06-29
              </p>
            </div>
            <DocP>
              Erste Setup-Seite mit Installation für CLI und Agenten, Skill-TODO
              und Einstieg für interne DAYONE Anwendungen.
            </DocP>
          </div>
        </DocStack>
      </SetupSection>
    </>
  );
}
