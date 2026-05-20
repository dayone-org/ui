import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--sand-light)" }}
    >
      <SiteHeader active="home" />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--sand-dark)" }}
          >
            Intern · Designsystem
          </p>
          <h1
            className="max-w-3xl font-semibold"
            style={{
              fontSize: "var(--text-display-2xl)",
              lineHeight: "var(--leading-display)",
              color: "var(--black)",
            }}
          >
            Die gemeinsame UI-Grundlage für DAYONE Tools
          </h1>
          <p
            className="mt-6 max-w-2xl"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--leading-body)",
              letterSpacing: "var(--tracking-body-lg)",
              color: "var(--gray-400)",
            }}
          >
            Primitive Komponenten, Tokens und Typografie — damit Product
            Designer:innen mit agentischen Tools konsistent und on-brand bauen
            können.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-md px-7 py-4 text-base font-semibold transition-colors"
              style={{
                backgroundColor: "var(--black)",
                color: "var(--white)",
              }}
            >
              Komponenten ansehen
              <span aria-hidden>→</span>
            </Link>
            <a
              href="https://www.dayone.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-2 px-7 py-4 text-base font-semibold transition-colors"
              style={{
                backgroundColor: "var(--white)",
                color: "var(--black)",
                borderColor: "var(--white)",
              }}
            >
              dayone.de
            </a>
          </div>
        </section>

        <section
          className="border-t px-6 py-16 lg:px-8"
          style={{
            borderColor: "var(--gray-200)",
            backgroundColor: "var(--white)",
          }}
        >
          <div className="mx-auto max-w-7xl">
            <h2
              className="mb-10 font-semibold"
              style={{
                fontSize: "var(--text-display-md)",
                lineHeight: "var(--leading-display)",
                color: "var(--black)",
              }}
            >
              Was du hier findest
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Design Tokens",
                  description:
                    "Farben, Typografie und Spacing — drei Ebenen von Primitives bis zu funktionalen Tokens.",
                },
                {
                  title: "UI-Komponenten",
                  description:
                    "Alle shadcn-Primitives mit DAYONE-Styling: Buttons, Inputs, Dialoge und mehr.",
                },
                {
                  title: "Visuelle Referenz",
                  description:
                    "Eine Playground-Seite zum Teilen im Team — als Basis für interne React/Next.js Tools.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg p-8"
                  style={{
                    backgroundColor: "var(--sand-light)",
                    border: "1px solid var(--gray-100)",
                  }}
                >
                  <h3
                    className="mb-3 font-semibold"
                    style={{
                      fontSize: "var(--text-display-sm)",
                      color: "var(--black)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-body-md)",
                      lineHeight: "var(--leading-body)",
                      color: "var(--gray-400)",
                    }}
                  >
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div
            className="rounded-lg p-10 lg:p-14"
            style={{ backgroundColor: "var(--black)" }}
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--sand-dark)" }}
            >
              Für das Team
            </p>
            <h2
              className="max-w-xl font-semibold"
              style={{
                fontSize: "var(--text-display-lg)",
                lineHeight: "var(--leading-display)",
                color: "var(--white)",
              }}
            >
              Gebaut für Designer:innen, die selbst Software entwickeln
            </h2>
            <p
              className="mt-4 max-w-2xl"
              style={{
                fontSize: "var(--text-body-md)",
                lineHeight: "var(--leading-body)",
                color: "var(--gray-300)",
              }}
            >
              Nutze die Komponenten und Tokens als Ausgangspunkt für interne
              Tools — konsistent mit dem DAYONE Look & Feel, inspiriert von{" "}
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--white)" }}
              >
                shadcn/ui
              </a>
              , aber mit unserem Designsystem.
            </p>
            <Link
              href="/playground"
              className="mt-8 inline-flex items-center gap-2 font-semibold transition-colors hover:underline"
              style={{ color: "var(--white)" }}
            >
              Zum Playground
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
