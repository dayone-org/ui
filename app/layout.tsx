import type { Metadata } from "next";
import localFont from "next/font/local";
import { NavigationTopScroller } from "@/components/navigation-top-scroller";
import { Toaster } from "@/components/ui/sonner";
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
  variable: "--font-roobert",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dayone-ui.vercel.app"),
  title: "DAYONE UI",
  description:
    "Interne Komponentenbibliothek und Designsystem-Referenz für DAYONE Anwendungen",
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: "if('scrollRestoration'in history)history.scrollRestoration='manual'" }} />
      </head>
      <body className="min-h-full flex flex-col">
        <NavigationTopScroller />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
