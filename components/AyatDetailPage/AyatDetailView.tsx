"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Play, RotateCcw, ScrollText } from "lucide-react";
import { parseTajweedToReact } from "@/lib/parseTajweedToReact";
import type { AyatDetail } from "@/types/surah";

interface AyatDetailViewProps {
  ayat: AyatDetail;
  tajweedText: string;
  latin: { teksLatin: string };
  surahName: string;
}

const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const convertToArabicNumber = (num: number): string => {
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumbers[parseInt(digit, 10)])
    .join("");
};

export const AyatDetailView = ({
  ayat,
  tajweedText,
  latin,
}: AyatDetailViewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const arabicNumberMemo = useMemo(
    () => convertToArabicNumber(ayat.number.inSurah),
    [ayat.number.inSurah]
  );

  const parsedTajweed = useMemo(
    () => parseTajweedToReact(tajweedText),
    [tajweedText]
  );

  // Inisialisasi Audio dan cleanup event listener
  useEffect(() => {
    const audio = new Audio(ayat.audio.alafasy);
    audio.preload = "none";
    audioRef.current = audio;

    const handleLoadedMetadata = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [ayat.audio.alafasy]);

  const handleToggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      // Ulangi dari awal (behavior sama dengan PlayButton di IsiSurah)
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.error(err));
    } else {
      setIsLoading(true);
      audioRef.current
        .play()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsLoading(false);
        });
    }
  }, [isPlaying]);

  return (
    <div className="w-full mx-auto">
      <div className="py-6 px-3">
        {/* Baris utama: tombol kontrol kiri + teks arab kanan
            Persis sama dengan layout AyatComponent di IsiSurah.tsx */}
        <div className="sm:border-b max-w-5xl mx-auto border-gray-800 overflow-hidden transition-all duration-300">
          <div className="sm:p-4 space-y-4">
            <div className="flex items-start justify-between gap-y-4">
              {/* Kolom kiri: nomor + play — identik dengan AyatNumber + PlayButton */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full border bg-cyan-500/10 border-cyan-500/20 text-cyan-400">
                  {ayat.number.inSurah}
                </div>
                <button
                  onClick={handleToggleAudio}
                  disabled={isLoading}
                  className={`p-3 rounded-full border transition-all duration-300 disabled:opacity-50 ${
                    isPlaying
                      ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                      : 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-400'
                  }`}
                  title={isPlaying ? "Ulangi Audio" : "Putar Audio Murottal"}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <RotateCcw className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Teks arab — identik dengan layout di AyatComponent */}
              <div className="flex-1">
                <p
                  className="text-3xl sm:text-4xl md:text-[2.5rem] leading-loose sm:leading-[5rem] mt-3 mb-4 px-3 text-right"
                  dir="rtl"
                >
                  <span className="arabic-text">{parsedTajweed}</span>
                  <span className="mx-3 px-3 py-1 text-2xl border bg-cyan-500/10 text-cyan-400 border-cyan-500/20 rounded-full">
                    {arabicNumberMemo}
                  </span>
                </p>
              </div>
            </div>

            {/* Latin — identik dengan IsiSurah */}
            <p className="text-lg italic text-gray-400 text-start mb-2">
              {latin?.teksLatin}
            </p>

            {/* Terjemahan — identik dengan IsiSurah */}
            <p className="text-gray-300 text-base sm:text-lg">
              {ayat.translation}
            </p>

            {/* Tafsir — langsung terbuka, tanpa accordion
                Style header mengikuti AccordionTrigger di IsiSurah */}
            <div className="py-2 px-4 flex items-center gap-2 text-cyan-600 text-lg">
              <ScrollText className="h-4 w-4" />
              <span>Tafsir</span>
            </div>
            <div className="pt-4 px-4 text-base md:text-lg text-gray-400 border-t border-gray-800 pb-4">
              {ayat.tafsir.kemenag.long}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AyatDetailView;
