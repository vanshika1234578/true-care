import type { Metadata } from "next";
import { Inter, Manrope, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Used only on pages with Bengali content (e.g. /bd/knee-replacement-india) via the
// "font-bengali" utility class — does not change the default font on any other page.
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrueCare — Your Trusted Partner for Medical Treatment in India",
    template: "%s | TrueCare",
  },
  description:
    "TrueCare helps international patients find trusted hospitals, experienced doctors, transparent pricing, and complete treatment support in India.",
  keywords: [
    "medical tourism India",
    "medical treatment India",
    "international patients India",
    "medical travel",
  ],
  openGraph: {
    title: "TrueCare — Making Medical Travel Effortless",
    description:
      "Trusted hospitals, experienced doctors, and complete support for international patients seeking treatment in India.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} ${notoSansBengali.variable} font-body`}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
