import type { MetadataRoute } from "next";
import { buildSurahSlug } from "@/lib/surahSlug";
import type { ListSurah } from "@/lib/types";

// Menentukan Base URL dari environment variable.
// Mendukung NEXT_PUBLIC_BASE_URL sesuai permintaan, NEXT_PUBLIC_SITE_URL yang sudah ada di .env,
// dan fallback default yang aman.
const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || 
  process.env.NEXT_PUBLIC_SITE_URL || 
  "https://kirarecitequran.vercel.app"
).replace(/\/$/, ""); // Menghapus trailing slash jika ada agar URL rapi

/**
 * Mengambil daftar surah secara dinamis dari API.
 * Menggunakan cache revalidasi Next.js (ISR) selama 1 hari (86400 detik).
 */
async function fetchDynamicSurahs(): Promise<ListSurah[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://kira-recite-quran-api.vercel.app/";
    const res = await fetch(`${apiUrl}surahs`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Gagal mengambil data surah: ${res.statusText}`);
    }

    return res.json() as Promise<ListSurah[]>;
  } catch (error) {
    console.error("Error fetching surahs for sitemap:", error);
    // Mengembalikan array kosong jika API down agar sitemap statis utama tetap berfungsi
    return [];
  }
}

/**
 * Fungsi generateSitemap yang mengembalikan array objek berisi url,
 * lastModified, changeFrequency, dan priority.
 */
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Definisikan rute statis (misal: Homepage)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. Ambil data dinamis (Daftar Surah)
  const surahs = await fetchDynamicSurahs();

  // 3. Ubah daftar surah menjadi rute dinamis sitemap
  const surahRoutes: MetadataRoute.Sitemap = surahs.map((surah) => {
    const slug = buildSurahSlug(surah.name, surah.number);
    const surahUrl = `${BASE_URL}/surah/${slug}`;

    return {
      url: surahUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  // Gabungkan semua rute statis dan dinamis
  return [...staticRoutes, ...surahRoutes];
}

// Next.js App Router mewajibkan export default untuk sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap();
}
