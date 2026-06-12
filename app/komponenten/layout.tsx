import { KomponentenShell } from "@/components/komponenten-shell";

export default function KomponentenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KomponentenShell>{children}</KomponentenShell>;
}
