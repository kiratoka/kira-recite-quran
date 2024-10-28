"use client"
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, Play, Pause } from "lucide-react";

interface SurahProps {
  surah: {
    bismillah: {
      arab: string;
      translation: string;
      audio: {
        alafasy: string;
      };
    };
    ayahs: {
      number: {
        inSurah: number;
      };
      arab: string;
      translation: string;
      image: {
        primary: string
      };
      tafsir: {
        kemenag: {
          long: string
        }
      };
      audio: {
        alafasy: string
      };
    }[];
  };
}

interface LatinProps {
  latins: {
    teksLatin: string;
  }[];
}

interface NumberSurahProps {
  numberSurah: number;
}

const convertToArabicNumber = (num: number): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
};

const Isisurah = ({ surah, latins, numberSurah }: SurahProps & LatinProps & NumberSurahProps) => {
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlayAudio = (audioUrl: string, index: number) => {
    if (playingAudio) {
      playingAudio.pause();
      if (playingIndex === index) {
        setPlayingAudio(null);
        setPlayingIndex(null);
        return;
      }
    }

    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => {
      setPlayingAudio(null);
      setPlayingIndex(null);
    };
    setPlayingAudio(audio);
    setPlayingIndex(index);
  };



  return (
    <Card className="w-full mx-auto bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl">
      <div className='py-6 px-3'>
        {numberSurah > 1 && (
          <div className="mb-8 space-y-4">
            <div className="flex max-sm:flex-col-reverse justify-center items-center gap-4">
              <button
                onClick={() => handlePlayAudio(surah.bismillah.audio.alafasy, -1)}
                className="p-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 transition-all duration-200"
              >
                {playingIndex === -1 ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <h1 className="text-center text-5xl py-6 text-cyan-400">
                {surah.bismillah.arab}
              </h1>
            </div>
            <p className="text-center text-lg font-serif italic text-gray-300">
              Bismillāhir-raḥmānir-raḥīm(i).
            </p>
            <p className="text-center text-gray-400">
              {surah.bismillah.translation}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
        )}

        <Accordion type="single" collapsible className="space-y-4">
          {surah.ayahs.map((ayat, index) => (
            <AccordionItem
              key={index}
              value={(index + 1).toString()}
              className="sm:border-b max-w-6xl mx-auto border-gray-800 overflow-hidden transition-all duration-200 hover:border-cyan-500/50"
            >
              <div className="sm:p-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      {ayat.number.inSurah}
                    </div>
                    <button
                      onClick={() => handlePlayAudio(ayat.audio.alafasy, index)}
                      className="p-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 transition-all duration-200"
                    >
                      {playingIndex === index ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl sm:text-4xl md:text-5xl leading-relaxed text-end mb-4 px-3 arabic-text">
                      {ayat.arab}
                      <span className="mx-3 px-3 py-1 text-2xl border bg-cyan-500/10 text-cyan-400 border-cyan-500/20 rounded-full">
                        {convertToArabicNumber(ayat.number.inSurah)}
                      </span>
                    </p>
                  
                  </div>
                </div>
                <p className="text-lg italic text-gray-400 text-start mb-2">
                  {latins[index]?.teksLatin}
                </p>
                <p className="text-gray-300 text-base sm:text-lg">
                  {ayat.translation}
                </p>
                <AccordionTrigger className="py-2 px-4 w-full flex items-center gap-2 text-cyan-600 text-lg hover:text-cyan-300 transition-colors">
                  <ScrollText className="h-4 w-4" />
                  <span>Tafsir</span>
                </AccordionTrigger>

                <AccordionContent className="pt-4 px-4 text-base text-gray-400 border-t border-gray-800">
                  {ayat.tafsir.kemenag.long}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  );
};

export default Isisurah;