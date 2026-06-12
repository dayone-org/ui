import { DocsShell } from "@/components/docs-shell";
import { PLAYGROUND_SECTIONS } from "@/lib/playground-sections";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsShell headerActive="playground" sections={PLAYGROUND_SECTIONS}>
      {children}
    </DocsShell>
  );
}
