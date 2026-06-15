import { COMPONENT_REGISTRY } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";
import { ScrollToTop } from "@/components/scroll-to-top";

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

const DIVIDER = (
  <div style={{ height: "1px", backgroundColor: "var(--gray-100)" }} />
);

export default function KomponentenPage() {
  return (
    <main className="py-12 lg:py-16">
      <ScrollToTop />
      <div className="space-y-40">
        {COMPONENT_REGISTRY.map((category) => (
          <div key={category.id}>
            {/* Category heading + opening line */}
            <CategoryHeading>{category.label}</CategoryHeading>
            <div className="mt-8">{DIVIDER}</div>

            {/* Each component — py-20 gives breathing room, divider between */}
            {category.components.map((component, idx) => (
              <div key={component.slug}>
                {idx > 0 && DIVIDER}
                <section id={component.slug} className="scroll-mt-28 py-20">
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "var(--text-body-lg)",
                      color: "var(--black)",
                    }}
                  >
                    {component.name}
                  </h3>
                  <p
                    className="mb-10"
                    style={{
                      fontSize: "var(--text-body-sm)",
                      lineHeight: "var(--leading-body)",
                      color: "var(--gray-400)",
                    }}
                  >
                    {component.description}
                  </p>
                  {/* No wrapper box — content aligns with heading */}
                  <ComponentDemo slug={component.slug} />
                </section>
              </div>
            ))}

            {/* Closing line after last component */}
            {DIVIDER}
          </div>
        ))}
      </div>
    </main>
  );
}
