import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DOCS_PAGE_PADDING } from "@/lib/docs-layout";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <SiteHeader active="home" />

      <main className="flex flex-1 flex-col items-center justify-center text-center px-8 py-24">

        <Badge variant="outline" className="mb-6 rounded-full text-xs" style={{ color: "var(--gray-400)" }}>
          DAYONE UI Foundation
        </Badge>

        <h1
          className="max-w-3xl font-semibold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1.08,
            color: "var(--black)",
            letterSpacing: "-0.03em",
          }}
        >
          Baue schneller mit den richtigen Komponenten
        </h1>

        <p
          className="mt-6 max-w-xl text-base leading-relaxed"
          style={{ color: "var(--gray-400)" }}
        >
          Zugängliche und anpassbare Komponenten für deine DAYONE-Projekte.
          Open Source. Open Code.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/komponenten">
              Komponenten <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/how-to-use">How to use</Link>
          </Button>
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
