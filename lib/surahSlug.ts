import { ListSurah } from "@/lib/types";

// Helper ini buat "menjinakkan" nama surah jadi slug yang SEO-friendly.
// Contoh: "Al-Fātiḥah" -> "al-fatihah".
export const normalizeSurahName = (name: string): string => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Format slug final yang dipakai route.
// Contoh: "Al-Fatihah", 1 -> "al-fatihah-1".
export const buildSurahSlug = (name: string, number: number): string => {
  return `${normalizeSurahName(name)}-${number}`;
};

// Ambil nomor surah dari slug.
// Contoh: "al-fatihah-1" -> 1.
export const getSurahNumberFromSlug = (slug: string): number | null => {
  const match = slug.match(/-(\d+)$/);

  if (!match) {
    return null;
  }

  const parsed = Number.parseInt(match[1], 10);
  return Number.isNaN(parsed) ? null : parsed;
};

// Biar gampang generate href route dari data surah.
export const getSurahHref = (surah: Pick<ListSurah, "name" | "number">): string => {
  return `/surah/${buildSurahSlug(surah.name, surah.number)}`;
};

