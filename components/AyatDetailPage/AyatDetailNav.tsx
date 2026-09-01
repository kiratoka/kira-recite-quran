import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface AyatDetailNavProps {
  canonicalSlug: string;
  surahName: string;
  ayatNumber: number;
  totalAyahs: number;
  prevAyatNumber: number | null;
  nextAyatNumber: number | null;
}

export const AyatDetailNav = ({
  canonicalSlug,
  surahName,
  ayatNumber,
  totalAyahs,
  prevAyatNumber,
  nextAyatNumber,
}: AyatDetailNavProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 pt-4 pb-1">
      {/* Tombol kembali ke halaman surah */}
      <div className="mb-3">
        <Link
          href={`/surah/${canonicalSlug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 text-sm"
          title={`Kembali ke Surah ${surahName}`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke {surahName}</span>
        </Link>
      </div>

      {/* Navigasi prev/next ayat */}
      <div className="flex items-center justify-between py-2">
        {/* Tombol Ayat Sebelumnya */}
        {prevAyatNumber ? (
          <Link
            href={`/surah/${canonicalSlug}/ayat/${prevAyatNumber}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all duration-300 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-400 text-sm font-medium"
            title={`Pindah ke Ayat ${prevAyatNumber}`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </Link>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-800 text-gray-700 text-sm cursor-not-allowed opacity-40">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </div>
        )}

        {/* Indikator posisi */}
        <span className="text-sm text-gray-400">
          Ayat <span className="text-cyan-400 font-semibold">{ayatNumber}</span> dari {totalAyahs}
        </span>

        {/* Tombol Ayat Selanjutnya */}
        {nextAyatNumber ? (
          <Link
            href={`/surah/${canonicalSlug}/ayat/${nextAyatNumber}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all duration-300 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-400 text-sm font-medium"
            title={`Pindah ke Ayat ${nextAyatNumber}`}
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-800 text-gray-700 text-sm cursor-not-allowed opacity-40">
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
    </div>
  );
};

export default AyatDetailNav;

