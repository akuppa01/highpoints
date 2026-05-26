import type { Metadata } from "next";
import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { RouteTransitionProvider } from "@/components/ui/route-transition";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Highpoints — Peaks, Hikes, and Highpoints Tracker",
    template: "%s | Highpoints",
  },
  description:
    "Track canonical state highpoints, personal climbs, and shareable mountain memories in one premium trail journal.",
  keywords: ["highpointing", "hiking", "state highpoints", "mountains", "peak bagging", "climbing journal"],
  authors: [{ name: "Highpoints" }],
  openGraph: {
    title: "Highpoints — Peaks, Hikes, and Highpoints Tracker",
    description: "Track the peaks that define your journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Highpoints — Peaks, Hikes, and Highpoints Tracker",
    description: "Track the peaks that define your journey.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="bg-base font-sans text-text-primary min-h-screen flex flex-col antialiased">
        <RouteTransitionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </RouteTransitionProvider>
      </body>
    </html>
  );
}
