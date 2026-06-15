import { COMPONENT_REGISTRY } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";

function CategoryHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2
        className="shrink-0 font-semibold"
        style={{
          fontSize: "var(--text-display-xl)",
          color: "var(--black)",
          letterSpacing: "var(--tracking-display)",
          lineHeight: "var(--leading-display)",
        }}
      >
        {children}
      </h2>
      <div className="flex-1" style={{ height: "1px", backgroundColor: "var(--gray-100)" }} />
    </div>
  );
}

const DIVIDER = (
  <div style={{ height: "1px", backgroundColor: "var(--gray-100)" }} />
);

export default function KomponentenPage() {
  return (
    <main className="py-12 lg:py-16">
      <div className="space-y-40">
        {COMPONENT_REGISTRY.map((category) => (
          <div key={category.id}>
            {/* Category heading */}
            <div className="mb-12">
              <CategoryHeading>{category.label}</CategoryHeading>
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
                      color: "var(--gray-400)",
                    }}
                  >
                    {component.description}
                  </p>
                  <ComponentDemo slug={component.slug} />
                </section>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
