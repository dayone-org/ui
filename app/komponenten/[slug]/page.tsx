import { notFound } from "next/navigation";
import { ALL_COMPONENTS } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";

export function generateStaticParams() {
  return ALL_COMPONENTS.map((comp) => ({ slug: comp.slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = ALL_COMPONENTS.find((c) => c.slug === slug);

  if (!component) notFound();

  return (
    <main className="py-12 lg:py-16">
      <p
        className="mb-2 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--gray-300)" }}
      >
        {component.categoryLabel}
      </p>

      <h1
        className="font-semibold"
        style={{
          fontSize: "var(--text-display-3xl)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
          color: "var(--black)",
        }}
      >
        {component.name}
      </h1>

      <p
        className="mt-3 mb-10"
        style={{
          fontSize: "var(--text-body-md)",
          lineHeight: "var(--leading-body)",
          color: "var(--gray-400)",
        }}
      >
        {component.description}
      </p>

      <div
        className="w-fit max-w-full overflow-hidden rounded-[2.5rem] p-10"
        style={{
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 4px 28px rgba(0,0,0,0.05), 0 1px 6px rgba(0,0,0,0.03)",
        }}
      >
        <ComponentDemo slug={slug} />
      </div>
    </main>
  );
}
