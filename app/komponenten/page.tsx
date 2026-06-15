import { COMPONENT_REGISTRY } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";
import { ScrollToTop } from "@/components/scroll-to-top";

function CategoryHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-semibold uppercase tracking-[0.14em]"
      style={{
        fontSize: "10px",
        color: "var(--gray-300)",
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
      <div className="space-y-28">
        {COMPONENT_REGISTRY.map((category) => (
          <div key={category.id}>
            {/* Category label + opening line */}
            <div className="flex items-center gap-4 mb-10">
              <CategoryHeading>{category.label}</CategoryHeading>
              <div className="flex-1" style={{ height: "1px", backgroundColor: "var(--gray-100)" }} />
            </div>

            {/* Each component — py-16 gives breathing room, divider between */}
            {category.components.map((component, idx) => (
              <div key={component.slug}>
                {idx > 0 && DIVIDER}
                <section id={component.slug} className="scroll-mt-28 py-16">
                  <h3
                    className="mb-1.5 font-semibold"
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
                      color: "var(--gray-300)",
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
            <div style={{ height: "1px", backgroundColor: "var(--gray-100)" }} />
          </div>
        ))}
      </div>
    </main>
  );
}
