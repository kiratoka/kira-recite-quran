"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { StarsBackground } from "../ui/stars-background";

const Hero = () => {
    const handleButtonClick = () => {
        const listSurahElement = document.getElementById("listSurah");
        if (listSurahElement) {
            listSurahElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="h-screen rounded-md flex flex-col items-center justify-center relative w-full px-8">
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
                <span className="text-sm text-gray-400">
                    (HR. Tirmidzi, no. 2910. Tirmidzi). [HR. Tirmidzi, no. 2910. Syaikh Salim bin ‘Ied Al-Hilaly].
                </span>
                <div className="mt-12">
                    <Button variant="outline" className="text-xl py-8" onClick={handleButtonClick}>
                        Mulai baca Quran Sekarang
                        <ArrowRight className="w-full" />
                    </Button>
                </div>
            </div>
            <StarsBackground />
        </div>
    )
}

export default Hero