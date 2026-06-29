import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAYONE UI install test",
  description: "Local shadcn registry install smoke test for DAYONE UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
