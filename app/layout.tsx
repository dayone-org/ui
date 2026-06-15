import type { Metadata } from "next";
import localFont from "next/font/local";
import { NavigationTopScroller } from "@/components/navigation-top-scroller";
import "./globals.css";

const roobert = localFont({
  src: [
    {
      path: "../public/fonts/Roobert-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Roobert-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dayone-ui.vercel.app"),
  title: "DAYONE UI Foundation",
  description:
    "Interne UI-Grundlage und Designsystem-Referenz für DAYONE Tools",
  icons: {
    icon: [{ url: "/dayone-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/dayone-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${roobert.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NavigationTopScroller />
        {children}
      </body>
    </html>
  );
}