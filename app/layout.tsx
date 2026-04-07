import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

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

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Summit — US State Highpoints Tracker",
    template: "%s | Summit",
  },
  description:
    "Track and showcase the tallest peak climbed in each US state. A personal journey to the roof of every state.",
  keywords: ["highpointing", "hiking", "state highpoints", "mountains", "peak bagging"],
  authors: [{ name: "Summit" }],
  openGraph: {
    title: "Summit — US State Highpoints Tracker",
    description: "Track the roof of every state.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Summit — US State Highpoints Tracker",
    description: "Track the roof of every state.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}
    >
      <body className="bg-base font-sans text-text-primary min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
