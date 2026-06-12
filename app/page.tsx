import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import {
  DOCS_PAGE_PADDING,
  DOCS_SIDEBAR_WIDTH,
} from "@/lib/docs-layout";

function HeroArrow() {
  return (
    <span className="dayone-btn__arrow" aria-hidden>
      &#8594;
    </span>
  );
}

/** Home hero — further left than docs content column. */
const HOME_MAIN_COLUMN = "min-w-0 flex-1 pl-4 lg:pl-10 xl:pl-14";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <SiteHeader active="home" />

      <main
        className={`flex flex-1 flex-col justify-start pt-[4.5rem] pb-20 lg:pt-28 lg:pb-28 ${DOCS_PAGE_PADDING}`}
      >
        <div className="flex w-full">
          <div className={`hidden shrink-0 lg:block ${DOCS_SIDEBAR_WIDTH}`} aria-hidden />
          <div className={`${HOME_MAIN_COLUMN} max-w-3xl`}>
            <p
              className="mb-6 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--gray-400)" }}
            >
              DAYONE UI Foundation
            </p>

            <h1
              className="font-semibold"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 4.75rem)",
                lineHeight: 1.05,
                color: "var(--black)",
                letterSpacing: "var(--tracking-display)",
              }}
            >
              Designsystem
            </h1>

            <p
              className="mt-8 max-w-2xl"
              style={{
                fontSize: "var(--text-body-lg)",
                lineHeight: "var(--leading-body)",
                color: "var(--black)",
              }}
            >
              Komponenten, Tokens und Standards — damit alles was wir bauen von
              Anfang an nach DAYONE aussieht. Egal ob du selbst baust oder einen
              Agenten loslässt.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <Link
                href="/playground"
                className="dayone-btn dayone-btn--primary dayone-btn--interactive dayone-btn--md"
              >
                <span className="dayone-btn__inner">
                  <span className="dayone-btn__label">Komponenten</span>
                  <HeroArrow />
                </span>
              </Link>

              <Link
                href="/how-to-use"
                className="inline-flex items-center gap-2 text-sm font-normal transition-opacity hover:opacity-70"
                style={{ color: "var(--black)" }}
              >
                How to use
                <span aria-hidden className="text-base leading-none">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div
        className={`pointer-events-none absolute bottom-8 ${DOCS_PAGE_PADDING} right-0 left-0 flex justify-end`}
      >
        <SiteStamp />
      </div>
    </div>
  );
}
