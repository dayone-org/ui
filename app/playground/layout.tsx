import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  DocsSidebarDesktop,
  DocsSidebarMobile,
} from "@/components/docs-sidebar";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--sand-light)" }}
    >
      <SiteHeader active="playground" />
      <DocsSidebarMobile />
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <DocsSidebarDesktop />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
}
