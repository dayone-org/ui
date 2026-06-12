"use client";

import { COMPONENT_REGISTRY } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";
import { DocsDivider } from "@/components/docs-divider";
import { PLAYGROUND_SHOWCASE } from "@/lib/playground-layout";

function CategoryHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-semibold"
      style={{
        fontSize: "var(--text-display-3xl)",
        lineHeight: "var(--leading-display)",
        letterSpacing: "var(--tracking-display)",
        color: "var(--black)",
      }}
    >
      {children}
    </h2>
  );
}

function ComponentSection({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  return (
    <section id={slug} className="scroll-mt-28">
      <h3
        className="mb-1.5 font-semibold"
        style={{
          fontSize: "var(--text-body-lg)",
          color: "var(--black)",
        }}
      >
        {name}
      </h3>
      <p
        className="mb-5"
        style={{
          fontSize: "var(--text-body-sm)",
          lineHeight: "var(--leading-body)",
          color: "var(--gray-400)",
        }}
      >
        {description}
      </p>
      <div className={PLAYGROUND_SHOWCASE}>
        <ComponentDemo slug={slug} />
      </div>
    </section>
  );
}

export default function KomponentenPage() {
  return (
    <main className="py-12 lg:py-16">
      <div className="space-y-32">
        {COMPONENT_REGISTRY.map((category) => (
          <div key={category.id}>
            <CategoryHeading>{category.label}</CategoryHeading>
            <DocsDivider className="mt-6 mb-12" />
            <div className="space-y-14">
              {category.components.map((component) => (
                <ComponentSection
                  key={component.slug}
                  slug={component.slug}
                  name={component.name}
                  description={component.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
