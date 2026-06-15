import { SiteHeader } from "@/components/site-header";

export default function AnwendungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader active="anwendung" />
      {children}
    </>
  );
}
