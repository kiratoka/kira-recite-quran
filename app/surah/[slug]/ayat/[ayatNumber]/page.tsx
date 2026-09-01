import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import SurahCard from "@/components/SurahPage/SurahCard";
import AyatDetailNav from "@/components/AyatDetailPage/AyatDetailNav";
import AyatDetailView from "@/components/AyatDetailPage/AyatDetailView";
import { getSurahList, resolveAyatDetailData } from "@/services/surahService";
import { buildSurahSlug } from "@/lib/surahSlug";

// Mengambil Base URL absolut dari environment variable untuk standardisasi SEO
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://kirarecitequran.netlify.app"
).replace(/\/$/, "");

type AyatPageProps = {
  params: Promise<{
    slug: string;
    ayatNumber: string;
  }>;
};

// Next.js segment config: ISR Revalidate selama 1 hari (86400 detik)
export const revalidate = 86400;
export const dynamicParams = true;

/**
 * Pre-render halaman detail ayat utama saat build (SSG), 
 * sementara ayat lainnya di-generate on-demand dan di-cache via ISR.
 */
export const generateStaticParams = async () => {
  try {
    const surahs = await getSurahList();
    // Pre-render surah pilihan (seperti Al-Fatihah, Juz 30 pendek) saat build
    const prioritySurahNumbers = [1, 108, 112, 113, 114];
    const targetSurahs = surahs.filter((s) => prioritySurahNumbers.includes(s.number));
    
    const params: { slug: string; ayatNumber: string }[] = [];
    
    for (const surah of targetSurahs) {
      const slug = buildSurahSlug(surah.name, surah.number);
      const totalAyahs = surah.numberOfAyahs || 0;
      for (let i = 1; i <= totalAyahs; i++) {
        params.push({
          slug,
          ayatNumber: i.toString(),
        });
      }
    }
    
    return params;
  } catch (error) {
    console.error("Gagal melakukan generateStaticParams detail ayat:", error);
    return [];
  }
};

/**
 * Membuat Metadata dinamis untuk optimalisasi SEO Crawler (Google, Social Media, dll).
 */
export const generateMetadata = async ({ params }: AyatPageProps): Promise<Metadata> => {
  const { slug, ayatNumber } = await params;
  const parsedAyatNumber = parseInt(ayatNumber, 10);
  
  if (isNaN(parsedAyatNumber)) {
    return {
      title: "Ayat tidak ditemukan | Kira Recite Quran",
      description: "Halaman ayat yang kamu cari tidak tersedia.",
      robots: { index: false, follow: false },
    };
  }

  const data = await resolveAyatDetailData(slug, parsedAyatNumber);

  if (!data) {
    return {
      title: "Ayat tidak ditemukan | Kira Recite Quran",
      description: "Halaman ayat yang kamu cari tidak tersedia.",
      robots: { index: false, follow: false },
    };
  }

  const { matchedSurah, canonicalSlug } = data;
  const canonicalUrl = `${BASE_URL}/surah/${canonicalSlug}/ayat/${parsedAyatNumber}`;
  const title = `Surah ${matchedSurah.name} Ayat ${parsedAyatNumber} (${matchedSurah.translation}) | Kira Recite Quran`;
  const description = `Baca Surah ${matchedSurah.name} ayat ke-${parsedAyatNumber} lengkap dengan tajwid berwarna, terjemahan bahasa Indonesia, tafsir resmi Kemenag, dan audio murottal.`;

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
 * Komponen utama halaman detail per ayat (Server Component).
 */
const AyatDetailPage = async ({ params }: AyatPageProps) => {
  const { slug, ayatNumber } = await params;
  const parsedAyatNumber = parseInt(ayatNumber, 10);

  if (isNaN(parsedAyatNumber)) {
    notFound();
  }

  const data = await resolveAyatDetailData(slug, parsedAyatNumber);

  // Jika data tidak valid atau ayat tidak ditemukan, arahkan ke 404
  if (!data) {
    notFound();
  }

  const {
    surahs,
    surah,
    ayat,
    canonicalSlug,
    matchedSurah,
    tajweedText,
    latin,
    rawLatin,
    prevAyatNumber,
    nextAyatNumber,
  } = data;

  // Lakukan redirect ke slug kanonis jika pengguna memasukkan slug yang kurang rapi / salah ketik
  if (slug !== canonicalSlug) {
    redirect(`/surah/${canonicalSlug}/ayat/${parsedAyatNumber}`);
  }

  const namaSurahArab = rawLatin.data.nama;
  const canonicalUrl = `${BASE_URL}/surah/${canonicalSlug}/ayat/${parsedAyatNumber}`;

  // Struktur Data JSON-LD Komprehensif (schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Surah ${matchedSurah.name} Ayat ${parsedAyatNumber} (${matchedSurah.translation}) - Al-Quran | Kira Recite Quran`,
    description: `Bacaan Surah ${matchedSurah.name} ayat ke-${parsedAyatNumber} lengkap dengan tajwid berwarna, transliterasi latin, terjemahan bahasa Indonesia, tafsir Kemenag, dan audio murottal.`,
    inLanguage: "id-ID",
    image: [`${BASE_URL}/icon.png`],
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
      "@id": canonicalUrl,
    },
    articleSection: "Al-Quran",
    keywords: `surah ${matchedSurah.name.toLowerCase()} ayat ${parsedAyatNumber}, baca quran ayat ${parsedAyatNumber}, tafsir surah ${matchedSurah.name.toLowerCase()} ayat ${parsedAyatNumber}, murottal ayat ${parsedAyatNumber}`,
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Menyuntikkan struktur data JSON-LD untuk mempermudah indexing mesin pencari */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar isSurahPage={true} rawLatin={rawLatin} surahs={surahs} />
      <SurahCard surah={surah} namaSurahArab={namaSurahArab} />
      <AyatDetailNav
        canonicalSlug={canonicalSlug}
        surahName={surah.name}
        ayatNumber={parsedAyatNumber}
        totalAyahs={surah.numberOfAyahs}
        prevAyatNumber={prevAyatNumber}
        nextAyatNumber={nextAyatNumber}
      />
      <AyatDetailView
        ayat={ayat}
        tajweedText={tajweedText}
        latin={latin}
        surahName={surah.name}
      />
    </div>
  );
};

export default AyatDetailPage;
