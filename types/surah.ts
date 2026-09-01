/**
 * Definisikan semua tipe data (interfaces) murni TypeScript untuk entitas Surah.
 * Tidak ada pustaka eksternal atau validasi skema runtime di sini.
 */

export interface ListSurah {
  number: number;
  name: string;
  translation: string;
  numberOfAyahs?: number;
  revelation?: "Makkiyah" | "Madaniyah";
  description?: string;
  audio?: string;
}

export interface AyatDetail {
  number: {
    inSurah: number;
  };
  arab: string;
  translation: string;
  image: {
    primary: string;
  };
  tafsir: {
    kemenag: {
      long: string;
    };
  };
  audio: {
    alafasy: string;
  };
}

export interface SurahDetail {
  number: number;
  name: string;
  translation: string;
  revelation: "Makkiyah" | "Madaniyah";
  numberOfAyahs: number;
  description: string;
  bismillah: {
    arab: string;
    translation: string;
    audio: {
      alafasy: string;
    };
  };
  ayahs: AyatDetail[];
}

export interface AyatTajweed {
  numberInSurah: number;
  text: string;
}

export interface TajweedApiResponse {
  data: Array<{
    ayahs: AyatTajweed[];
  }>;
}

export interface LatinApiResponse {
  data: {
    nama: string;
    namaLatin: string;
    nomor: number;
    ayat: Array<{
      teksLatin: string;
    }>;
    suratSelanjutnya: {
      nomor: number;
      namaLatin: string;
    } | null;
    suratSebelumnya: {
      nomor: number;
      namaLatin: string;
    } | null;
  };
}

/**
 * Kontrak data final yang dihasilkan oleh service layer untuk dikonsumsi halaman SurahPage.
 */
export interface SurahPageData {
  surahs: ListSurah[];
  surahNumber: number;
  canonicalSlug: string;
  matchedSurah: ListSurah;
  surah: SurahDetail;
  surahsWithTajweedOnly: AyatTajweed[];
  latins: Array<{ teksLatin: string }>;
  rawLatin: LatinApiResponse;
}

/**
 * Kontrak data final untuk halaman detail ayat (AyatDetailPage).
 */
export interface AyatDetailPageData {
  surahs: ListSurah[];
  surah: SurahDetail;
  ayat: AyatDetail;
  ayatNumber: number;
  canonicalSlug: string;
  matchedSurah: ListSurah;
  tajweedText: string;
  latin: { teksLatin: string };
  rawLatin: LatinApiResponse;
  prevAyatNumber: number | null;
  nextAyatNumber: number | null;
}

