import type { Metadata } from "next";
import { Inter, Playfair_Display, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { RouteTransitionProvider } from "@/components/ui/route-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
});

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
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${sourceCodePro.variable} bg-base font-sans text-text-primary min-h-screen flex flex-col antialiased`}
      >
        <RouteTransitionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </RouteTransitionProvider>
      </body>
    </html>
  );
}
