import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Volta Heritage Dance Ensemble | We Perform, to Educate",
    template: "%s | Volta Heritage Dance Ensemble",
  },
  description:
    "The Volta Heritage Dance Ensemble (VHDE) preserves and promotes the rich cultural traditions of the Ewe people through traditional dance, drumming, and education. Based in Ho, Volta Region, Ghana.",
  keywords: [
    "Ewe dance",
    "Volta Region culture",
    "traditional dance Ghana",
    "cultural heritage",
    "Agbadza",
    "Borborbor",
    "Ewe drumming",
    "Ho Ghana",
    "African dance ensemble",
    "Hogbetsotso",
  ],
  authors: [{ name: "Volta Heritage Dance Ensemble" }],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://voltaheritage.art",
    siteName: "Volta Heritage Dance Ensemble",
    title: "Volta Heritage Dance Ensemble | We Perform, to Educate",
    description:
      "Preserving and promoting Ewe cultural traditions through traditional dance, drumming and education. Based in Ho, Volta Region, Ghana.",
    images: [{ url: "/images/volta_dance_hero.png", width: 1200, height: 630, alt: "Volta Heritage Dance Ensemble" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volta Heritage Dance Ensemble",
    description: "We Perform, to Educate. Ewe cultural traditions through dance, drumming & education.",
    images: ["/images/volta_dance_hero.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
