import { Tajweed } from "tajweed";
import { buildSurahSlug, getSurahNumberFromSlug } from "@/lib/surahSlug";
import type {
  ListSurah,
  SurahDetail,
  TajweedApiResponse,
  LatinApiResponse,
  AyatTajweed,
  SurahPageData,
  AyatDetailPageData,
} from "@/types/surah";

const SURAH_REVALIDATE_SECONDS = 60 * 60 * 24; // 1 Hari (86400 detik)

/**
 * Mengambil daftar seluruh surah secara dinamis dari API.
 */
export async function getSurahList(): Promise<ListSurah[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://kira-recite-quran-api-production.up.railway.app/";
  
  const response = await fetch(`${apiUrl}surahs`, {
    next: { revalidate: SURAH_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil daftar surah: ${response.statusText}`);
  }

  return response.json() as Promise<ListSurah[]>;
}

/**
 * Menyelesaikan dan menyatukan seluruh data yang diperlukan untuk halaman Surah dinamis.
 * Melakukan fetching paralel dan transformasi data (termasuk parsing Tajweed) sepenuhnya di sisi server.
 */
export async function resolveSurahPageData(slug: string): Promise<SurahPageData | null> {
  // 1. Ambil daftar surah untuk mencocokkan slug dan nomor surah
  const surahs = await getSurahList();
  const surahNumber = getSurahNumberFromSlug(slug);

  if (!surahNumber) {
    return null;
  }

  const matchedSurah = surahs.find((s) => s.number === surahNumber);
  if (!matchedSurah) {
    return null;
  }

  // Slug kanonis (canonical) untuk validasi SEO redirect
  const canonicalSlug = buildSurahSlug(matchedSurah.name, matchedSurah.number);

  // 2. Lakukan pemanggilan 3 API secara paralel (Promise.all)
  const [surahResponse, tajweedResponse, latinResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs/${surahNumber}`, {
      next: { revalidate: SURAH_REVALIDATE_SECONDS },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_TAJWEED}${surahNumber}/editions/quran-tajweed`, {
      next: { revalidate: SURAH_REVALIDATE_SECONDS },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_LATIN}api/v2/surat/${surahNumber}`, {
      next: { revalidate: SURAH_REVALIDATE_SECONDS },
    }),
  ]);

  if (!surahResponse.ok || !tajweedResponse.ok || !latinResponse.ok) {
    return null;
  }

  // 3. Baca data JSON secara paralel dan lakukan type casting langsung (tanpa Zod)
  const [surah, tajweedSurahs, latin] = (await Promise.all([
    surahResponse.json() as Promise<SurahDetail>,
    tajweedResponse.json() as Promise<TajweedApiResponse>,
    latinResponse.json() as Promise<LatinApiResponse>,
  ])) satisfies [SurahDetail, TajweedApiResponse, LatinApiResponse];

  // 4. Transformasi Data & Parsing Tajweed (dilakukan sepenuhnya di Server)
  const tajweed = new Tajweed();
  const surahsWithTajweedOnly: AyatTajweed[] = tajweedSurahs.data[0].ayahs.map(
    ({ numberInSurah, text }) => ({
      numberInSurah,
      text: tajweed.parse(text, true),
    })
  );

  return {
    surahs,
    surahNumber,
    canonicalSlug,
    matchedSurah,
    surah,
    surahsWithTajweedOnly,
    latins: latin.data.ayat,
    rawLatin: latin,
  };
}

/**
 * Menyelesaikan seluruh data yang diperlukan untuk halaman detail ayat.
 */
export async function resolveAyatDetailData(
  slug: string,
  ayatNumber: number
): Promise<AyatDetailPageData | null> {
  const surahData = await resolveSurahPageData(slug);
  if (!surahData) {
    return null;
  }

  const {
    surahs,
    surah,
    surahsWithTajweedOnly,
    latins,
    rawLatin,
    canonicalSlug,
    matchedSurah,
  } = surahData;

  if (ayatNumber < 1 || ayatNumber > surah.numberOfAyahs) {
    return null;
  }

  const ayatIndex = ayatNumber - 1;
  const ayat = surah.ayahs[ayatIndex];
  if (!ayat) {
    return null;
  }

  const tajweedText = surahsWithTajweedOnly[ayatIndex]?.text || "";
  const latin = latins[ayatIndex] || { teksLatin: "" };

  const prevAyatNumber = ayatNumber > 1 ? ayatNumber - 1 : null;
  const nextAyatNumber = ayatNumber < surah.numberOfAyahs ? ayatNumber + 1 : null;

  return {
    surahs,
    surah,
    ayat,
    ayatNumber,
    canonicalSlug,
    matchedSurah,
    tajweedText,
    latin,
    rawLatin,
    prevAyatNumber,
    nextAyatNumber,
  };
}

