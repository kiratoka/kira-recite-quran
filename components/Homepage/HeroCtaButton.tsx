"use client";

import { ArrowRight } from "lucide-react";

const HeroCtaButton = () => {
  const handleButtonClick = () => {
    // Scroll ke daftar surah supaya interaksi tetap sama seperti sebelumnya.
    const listSurahElement = document.getElementById("listSurah");
    if (listSurahElement) {
      listSurahElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button className="flex flex-row items-center justify-center bg-cyan-950 text-cyan-400 border border-cyan-400 border-b-4 font-medium overflow-hidden relative px-4 py-4 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group" onClick={handleButtonClick}>
      <span className="bg-cyan-400 shadow-cyan-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
      <span className="text-xl max-md:text-base font-semibold">
        Mulai baca Quran Sekarang
      </span>
      <ArrowRight className="ml-4" />
    </button>
  );
};

export default HeroCtaButton;
