import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE ESSUMAN'S — Kwabena & Kristine",
  description:
    "A premium digital wedding experience celebrating the marriage of Kwabena and Kristine Essuman. Our Story. Our Memories. Our Forever.",
  openGraph: {
    title: "THE ESSUMAN'S",
    description: "Our Story. Our Memories. Our Forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  );
}
