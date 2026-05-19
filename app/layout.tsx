import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "Summit — Peaks, Hikes, and Highpoints Tracker",
    template: "%s | Summit",
  },
  description:
    "Track canonical state highpoints, personal climbs, and shareable mountain memories in one premium trail journal.",
  keywords: ["highpointing", "hiking", "state highpoints", "mountains", "peak bagging", "climbing journal"],
  authors: [{ name: "Summit" }],
  openGraph: {
    title: "Summit — Peaks, Hikes, and Highpoints Tracker",
    description: "Track the peaks that define your journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Summit — Peaks, Hikes, and Highpoints Tracker",
    description: "Track the peaks that define your journey.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base font-sans text-text-primary min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
