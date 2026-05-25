import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Isisurah from "@/components/SurahPage/IsiSurahServer";
import SurahCard from "@/components/SurahPage/SurahCard";
import { getSurahList, resolveSurahPageData } from "@/services/surahService";
import { buildSurahSlug } from "@/lib/surahSlug";

// Mengambil Base URL absolut dari environment variable untuk standardisasi SEO
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 
  "https://kira-recite-quran-api.netlify.app"
).replace(/\/$/, "");

type SurahPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Next.js segment config: ISR Revalidate selama 1 hari (86400 detik)
export const revalidate = 86400;

/**
 * Pre-render seluruh halaman surah statis saat proses build (SSG) demi performa kilat.
 */
export const generateStaticParams = async () => {
  try {
    const surahs = await getSurahList();
    return surahs.map((surah) => ({
      slug: buildSurahSlug(surah.name, surah.number),
    }));
  } catch (error) {
    console.error("Gagal melakukan generateStaticParams:", error);
    return [];
  }
};

/**
 * Membuat Metadata dinamis untuk optimalisasi SEO Crawler (Google, Social Media, dll).
 * Memanfaatkan caching terpadu dari Service Layer untuk efisiensi ekstra (no double fetch).
 */
export const generateMetadata = async ({ params }: SurahPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const data = await resolveSurahPageData(slug);

  if (!data) {
    return {
      title: "Surah tidak ditemukan | Kira Recite Quran",
      description: "Halaman surah yang kamu cari tidak tersedia.",
      robots: { index: false, follow: false },
    };
  }

  const { matchedSurah, canonicalSlug } = data;
  const canonicalUrl = `${BASE_URL}/surah/${canonicalSlug}`;
  const title = `${matchedSurah.name} (${matchedSurah.translation}) - Surah ${matchedSurah.number} | Kira Recite Quran`;
  const description = `Baca Surah ${matchedSurah.name} lengkap dengan tajwid berwarna, terjemahan bahasa Indonesia, dan tafsir resmi Kemenag.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "Kira Recite Quran",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

/**
 * Komponen utama halaman Surah (Stateless UI Component).
 * Hanya menerima data bersih yang sudah divalidasi oleh Zod dan memetakan UI.
 */
const SurahPage = async ({ params }: SurahPageProps) => {
  const { slug } = await params;
  const data = await resolveSurahPageData(slug);

  // Jika data tidak valid atau surah tidak ditemukan, arahkan ke halaman 404
  if (!data) {
    notFound();
  }

  const {
    surahs,
    surahNumber,
    canonicalSlug,
    matchedSurah,
    surah,
    surahsWithTajweedOnly,
    latins,
    rawLatin,
  } = data;

  // Lakukan redirect ke slug kanonis jika pengguna memasukkan slug yang kurang rapi / salah ketik
  if (slug !== canonicalSlug) {
    redirect(`/surah/${canonicalSlug}`);
  }

  const numberSurah = surahNumber.toString();
  const namaSurahArab = rawLatin.data.nama;

  // Struktur Data JSON-LD Komprehensif Tingkat Enterprise (schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${matchedSurah.name} (${matchedSurah.translation}) - Surah ${matchedSurah.number} | Kira Recite Quran`,
    description: `Bacaan Surah ${matchedSurah.name} lengkap dengan tajwid berwarna, terjemahan bahasa Indonesia, dan tafsir Kementerian Agama.`,
    inLanguage: "id-ID",
    image: [
      `${BASE_URL}/icon.png`
    ],
    datePublished: "2026-05-25T00:00:00+07:00",
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Kira Recite Quran",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Kira Recite Quran",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/surah/${canonicalSlug}`,
    },
    articleSection: "Al-Quran",
    keywords: `surah ${matchedSurah.name.toLowerCase()}, baca quran, tajwid quran, tafsir surah ${matchedSurah.name.toLowerCase()}`,
  };

  return (
    <div className="bg-slate-950">
      {/* Menyuntikkan struktur data JSON-LD untuk mempermudah Google indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar isSurahPage={true} rawLatin={rawLatin} surahs={surahs} />
      <SurahCard surah={surah} namaSurahArab={namaSurahArab} />
      <Isisurah
        surahsWithTajweedOnly={surahsWithTajweedOnly}
        surah={surah}
        latins={latins}
        numberSurah={numberSurah}
      />
    </div>
  );
};

export default SurahPage;
