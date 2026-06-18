import type { Metadata } from "next";
import { Passion_One, Fredoka, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── Google Fonts ── */
const passionOne = Passion_One({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-passion-one",
  display: "swap",
});

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: {
    default: "Salon za pse Spoki | Novi Banovci",
    template: "%s | Salon za pse Spoki",
  },
  description:
    "Profesionalna nega, kupanje i šišanje svih rasa pasa u Novim Banovcima. Poklonite svom ljubimcu vrhunski tretman u salonu Spoki. Zakažite termin online!",
  keywords: ["grooming", "pet salon", "nega pasa", "frizerski salon za pse", "Novi Banovci"],
  openGraph: {
    title: "Salon za pse Spoki | Novi Banovci",
    description: "Premium nega za vaše ljubimce",
    type: "website",
    locale: "sr_RS",
  },
};

/* ── Root Layout ── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${passionOne.variable} ${fredoka.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        {/* Global header with navigation — shows on every page */}
        <Header />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Global footer — shows on every page */}
        <Footer />
      </body>
    </html>
  );
}
