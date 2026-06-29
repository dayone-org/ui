import { DocsShell } from "@/components/docs-shell";
import { SETUP_SECTIONS } from "@/lib/setup-sections";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsShell headerActive="setup" sections={SETUP_SECTIONS}>
      {children}
    </DocsShell>
  );
}
