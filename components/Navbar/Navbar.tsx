"use client"
import Link from "next/link";
import SearchBar from "./SearchBar";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ListSurah, RawLatinProps } from "@/lib/types";



const Navbar = ({ isSurahPage, rawLatin, surahs }: { isSurahPage?: boolean; rawLatin?: RawLatinProps; surahs: ListSurah[] }) => {
  // Ini untuk membuka tutup komponen navigasi surah next dan prev pada mobile
  const [isOpen, setIsOpen] = useState(true);

  const namaSurah = rawLatin?.data.namaLatin;
  const noSurah = rawLatin?.data.nomor;
  const noSurahPrev = rawLatin?.data.suratSebelumnya.nomor;
  const noSurahNext = rawLatin?.data.suratSelanjutnya.nomor;
  const namaSurahPrev = rawLatin?.data.suratSebelumnya.namaLatin;
  const namaSurahNext = rawLatin?.data.suratSelanjutnya.namaLatin;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-30">
      {/* Main Navbar */}
      <nav className="backdrop-blur-lg bg-background/80">
        <div className="container mx-auto">
          <div className="flex items-center h-16 px-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold transition-colors hover:text-cyan-500 mr-3"
            >
              <span className="text-cyan-500">Kira</span>
              <span className="hidden sm:inline">Recite Quran</span>
            </Link>

            {/* Desktop Navigation - Centered */}
            {isSurahPage && (
              <div className="hidden md:flex flex-1 justify-center">
                <div className="flex items-center rounded-full bg-secondary">
                  {noSurahPrev ? (
                    <Link
                      href={`/surah/${noSurahPrev}`}
                      className="flex items-center px-4 py-2 transition-colors hover:text-cyan-500"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline">{noSurahPrev}. {namaSurahPrev}</span>
                    </Link>
                  ) : (
                    <span className="px-4 py-2 text-muted-foreground">-</span>
                  )}

                  <span className="px-4 py-2 font-medium border-x bg-secondary/50">
                    {namaSurah}
                  </span>

                  {noSurahNext ? (
                    <Link
                      href={`/surah/${noSurahNext}`}
                      className="flex items-center px-4 py-2 transition-colors hover:text-cyan-500"
                    >
                      <span className="hidden md:inline">{noSurahNext}. {namaSurahNext}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  ) : (
                    <span className="px-4 py-2 text-muted-foreground">-</span>
                  )}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="flex items-center ml-auto space-x-4">
              <SearchBar surahs={surahs} />
              {isSurahPage && (
                <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 hover:bg-secondary rounded-md"
                >
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Collapsible Navigation */}
      {isSurahPage && isOpen && (
        <div className="md:hidden backdrop-blur-lg bg-background/80 px-4 animate-in slide-in-from-top">
          <div className="flex py-2 justify-between items-center space-x-4">
            <div className="flex-1">
              {noSurahPrev && (
                <Link
                  href={`/surah/${noSurahPrev}`}
                  className="flex max-sm:text-xs items-center py-2 transition-colors hover:text-cyan-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {noSurahPrev}. {namaSurahPrev}
                </Link>
              )}
            </div>

            <div className="text-center max-sm:text-sm">
              {namaSurah}
            </div>

            <div className="flex-1 text-right">
              {noSurahNext && (
                <Link
                  href={`/surah/${noSurahNext}`}
                  className="flex max-sm:text-xs items-center justify-end py-2 transition-colors hover:text-cyan-500"
                >
                  {noSurahNext}. {namaSurahNext}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;