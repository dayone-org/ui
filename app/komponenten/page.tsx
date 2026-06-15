import { COMPONENT_REGISTRY } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";

function CategoryHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-semibold"
      style={{
        fontSize: "20px",
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
