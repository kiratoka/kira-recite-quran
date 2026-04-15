import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { Tajweed } from "tajweed";
import Navbar from "@/components/Navbar/Navbar";
import Isisurah from "@/components/SurahPage/IsiSurahServer";
import SurahCard from "@/components/SurahPage/SurahCard";
import { buildSurahSlug, getSurahNumberFromSlug } from "@/lib/surahSlug";
import { ListSurah } from "@/lib/types";

type AyatTajweed = {
  numberInSurah: number;
  text: string;
};

type SurahDetail = {
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
  ayahs: Array<{
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
  }>;
};

type LatinApiResponse = {
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
    };
    suratSebelumnya: {
      nomor: number;
      namaLatin: string;
    };
  };
};

type TajweedApiResponse = {
  data: Array<{
    ayahs: AyatTajweed[];
  }>;
};

type SurahPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SURAH_REVALIDATE_SECONDS = 60 * 60 * 24;

const getSurahList = async (): Promise<ListSurah[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs`, {
    next: { revalidate: SURAH_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil daftar surah");
  }

  return response.json() as Promise<ListSurah[]>;
};

const resolveSlug = async (slug: string) => {
  const surahs = await getSurahList();
  const surahNumber = getSurahNumberFromSlug(slug);

  if (!surahNumber) {
    return null;
  }

  const matchedSurah = surahs.find((surah) => surah.number === surahNumber);

  if (!matchedSurah) {
    return null;
  }

  // Ini slug canonical yang jadi patokan SEO.
  const canonicalSlug = buildSurahSlug(matchedSurah.name, matchedSurah.number);
  return { surahs, surahNumber, canonicalSlug, matchedSurah };
};

// Harus literal supaya segment config kebaca valid waktu build.
export const revalidate = 86400;

export const generateStaticParams = async () => {
  const surahs = await getSurahList();

  // Pre-render semua halaman surah biar cepat diakses (SSG).
  return surahs.map((surah) => ({
    slug: buildSurahSlug(surah.name, surah.number),
  }));
};

export const generateMetadata = async ({ params }: SurahPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);

  if (!resolved) {
    return {
      title: "Surah tidak ditemukan | Kira Recite Quran",
      description: "Halaman surah yang kamu cari tidak tersedia.",
      robots: { index: false, follow: false },
    };
  }

  const { matchedSurah, canonicalSlug } = resolved;
  const canonicalUrl = `/surah/${canonicalSlug}`;
  const title = `${matchedSurah.name} (${matchedSurah.translation}) - Surah ${matchedSurah.number} | Kira Recite Quran`;
  const description = `Baca Surah ${matchedSurah.name} lengkap dengan tajwid, terjemahan, dan tafsir.).`;

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

const SurahPage = async ({ params }: SurahPageProps) => {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);

  if (!resolved) {
    notFound();
  }

  const { surahs, surahNumber, canonicalSlug, matchedSurah } = resolved;

  // Redirect ke slug canonical kalau user akses slug yang salah/kurang rapi.
  if (slug !== canonicalSlug) {
    redirect(`/surah/${canonicalSlug}`);
  }

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
    notFound();
  }

  const [surah, tajweedSurahs, rawLatin] = (await Promise.all([
    surahResponse.json() as Promise<SurahDetail>,
    tajweedResponse.json() as Promise<TajweedApiResponse>,
    latinResponse.json() as Promise<LatinApiResponse>,
  ])) satisfies [SurahDetail, TajweedApiResponse, LatinApiResponse];

  const tajweed = new Tajweed();

  // Parse tajwid sekali di server supaya client lebih ringan.
  const surahsWithTajweedOnly: AyatTajweed[] = tajweedSurahs.data[0].ayahs.map(
    ({ numberInSurah, text }) => ({
      numberInSurah,
      text: tajweed.parse(text, true),
    }),
  );

  const latins = rawLatin.data.ayat;
  const namaSurahArab = rawLatin.data.nama;
  const isSurahPage = true;
  const numberSurah = surahNumber.toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${matchedSurah.name} - Surah ${matchedSurah.number}`,
    description: `Bacaan Surah ${matchedSurah.name} dengan tajwid, tafsir, dan terjemahan.`,
    inLanguage: "id-ID",
    author: {
      "@type": "Organization",
      name: "Kira Recite Quran",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/surah/${canonicalSlug}`,
    },
  };

  return (
    <div className="bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar isSurahPage={isSurahPage} rawLatin={rawLatin} surahs={surahs} />
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

