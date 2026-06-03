import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Fonts ──────────────────────────────────────────────────
   Cormorant Garamond: editorial, luxurious display serif
   DM Sans: clean, legible, modern body copy
──────────────────────────────────────────────────────────── */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ─── SEO Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://voltaheritage.art"),
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
    "Volta Heritage",
    "VHDE",
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
    images: [
      {
        url: "/images/volta_dance_hero.png",
        width: 1200,
        height: 630,
        alt: "Volta Heritage Dance Ensemble performing traditional Ewe dance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volta Heritage Dance Ensemble",
    description:
      "We Perform, to Educate. Ewe cultural traditions through dance, drumming & education.",
    images: ["/images/volta_dance_hero.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* ─── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Google Fonts for faster FOUT resolution */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#1C1208" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#FAF7F2"
        />
      </head>
      <body className="antialiased selection:bg-[var(--color-heritage-gold)] selection:text-white">
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--color-heritage-gold)] focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}