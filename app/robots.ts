import type { MetadataRoute } from "next";

/**
 * Fungsi robots() mengembalikan konfigurasi robots.txt dinamis.
 * Next.js secara otomatis mendeteksi file ini di folder `app/` dan
 * menyediakannya di endpoint `/robots.txt`.
 */
export default function robots(): MetadataRoute.Robots {
  // Mengambil Base URL dari environment variable dengan aman.
  // Menghapus slash akhir (trailing slash) jika ada agar format URL Sitemap konsisten.
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 
    "https://kirarecitequran.netlify.app"
  ).replace(/\/$/, "");

  return {
    rules: [
      {
        // ATURAN UTAMA: MENGIZINKAN SEMUA BOT (SEARCH ENGINE & AI CHATBOTS)
        // Menggunakan '*' agar semua bot—baik Google/Bing maupun chatbot AI (seperti ChatGPT,
        // Gemini, Claude)—bisa merayap dan mengindeks website Anda. Ini memungkinkan website Anda
        // dikenal, dirangkum, dan direferensikan/dijadikan sumber referensi oleh AI chatbot.
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",     // Folder internal Next.js build
          "/api/",       // Folder endpoint API lokal jika ada
          "/private/",   // Rute rahasia atau admin jika ada di masa depan
        ],
      },
    ],
    // Mendaftarkan Sitemap Anda secara dinamis agar semua bot bisa menemukan daftar surah Anda yang ada di `/sitemap.xml`
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
