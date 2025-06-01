"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { StarsBackground } from "../ui/stars-background";
import { ShootingStars } from "../ui/shooting-stars";

const Hero = () => {
    const handleButtonClick = () => {
        const listSurahElement = document.getElementById("listSurah");
        if (listSurahElement) {
            listSurahElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="h-screen bg-neutral-950 rounded-md flex flex-col items-center justify-center relative w-full px-8">
            <div className="relative flex-col md:flex-col z-10 md:text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium flex items-center gap-2 md:gap-8">
                <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 via-cyan-500 to-white flex items-center gap-2 md:gap-8">
                    <span>Kira Recite Quran</span>
                </h2>
                <span className="mt-5 text-2xl md:text-4xl max-sm:hidden">وَعَنِ ابْنِ مَسْعُوْدٍ رَضِيَ اللهُ عَنْهُ قَالَ : قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ “مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللهِ فَلَهُ حَسَنَةٌ وَالحَسَنَةُ بِعَشْرِ أَمْثَالِهَا , لاَ أَقُوْلُ الم حَرْفٌ وَلَكِنْ أَلِفٌ حَرْفٌ وَلاَمٌ حَرْفٌ وَمِيْمٌ حَرْفٌ”

                    رَوَاهُ التِّرْمِذِيُّ وَقَالَ حَدِيْثٌ حَسَنٌ صَحِيْحٌ
                </span>
                <span className="max-md:mt-5 italic ">
                    “Barang siapa yang membaca satu huruf dari kitab Allah, maka baginya satu kebaikan. Satu kebaikan itu dibalas dengan sepuluh kali lipatnya. Aku tidak mengatakan alif laam miim itu satu huruf, tetapi aliif itu satu huruf, laam itu satu huruf, dan miim itu satu huruf.”

                </span>
                <span className="text-sm text-cyan-500">
                    (HR. Tirmidzi, no. 2910. Tirmidzi). [HR. Tirmidzi, no. 2910. Syaikh Salim bin ‘Ied Al-Hilaly].
                </span>
                <div className="mt-12">
                    <button className="flex flex-row items-center justify-center bg-cyan-950 text-cyan-400 border border-cyan-400 border-b-4 font-medium overflow-hidden relative px-4 py-4 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group" onClick={handleButtonClick}>
                        <span className="bg-cyan-400 shadow-cyan-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        <span className="text-xl max-md:text-base font-semibold">
                            Mulai baca Quran Sekarang
                        </span>
                        <ArrowRight className="ml-4" />
                    </button>
                </div>
            </div>
            <ShootingStars minSpeed={6} maxSpeed={6} starWidth={40} minDelay={5000} maxDelay={6000}/>
            <StarsBackground />
        </div>
    )
}

export default Hero