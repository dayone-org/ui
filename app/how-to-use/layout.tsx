import { DocsShell } from "@/components/docs-shell";
import { HOW_TO_SECTIONS } from "@/lib/how-to-sections";

export default function HowToUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsShell headerActive="how-to" sections={HOW_TO_SECTIONS}>
      {children}
    </DocsShell>
  );
}
