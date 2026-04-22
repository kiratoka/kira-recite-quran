import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Pakai env kalau ada, fallback ke localhost biar aman saat development.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  // Default metadata untuk seluruh halaman.
  title: {
    default: "Kira Recite Quran - Baca Quran Lengkap dengan Tajwid, Tafsir, dan Terjemahan.",
    template: "",
  },
  description: "Website untuk baca Quran lengkap dengan tajwid, tafsir, dan terjemahan.",
  metadataBase: new URL(siteUrl),
  icons: "/icon.png",
  openGraph: {
    type: "website",
    siteName: "Kira Recite Quran - Baca Quran Lengkap dengan Tajwid, Tafsir, dan Terjemahan.",
    locale: "id_ID",
  },
  // Verifikasi kepemilikan situs untuk Google Search Console (SEO).
  verification: {
    google: "tWmVuRCNTrZoqouW25y10e6stIsVzAZVdKayg3m4IW0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning dipakai karena class tema (dark/light)
    // di-set oleh next-themes saat client hydrate.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
