import { StarsBackground } from "../ui/stars-background";
import { ShootingStars } from "../ui/shooting-stars";
import HeroCtaButton from "@/components/Homepage/HeroCtaButton";

const Hero = () => {
    return (
        <div className="h-screen bg-neutral-950 rounded-md flex flex-col items-center justify-center relative w-full px-8">
            <div className="relative flex-col md:flex-col z-10 md:text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium flex items-center gap-2 md:gap-8">
                <h1 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 via-cyan-500 to-white flex items-center gap-2 md:gap-8">
                    <span>Kira Recite Quran</span>
                </h1>

                {/* Deskripsi website — ditampilkan untuk SEO & visual */}
                <h2 className="flex items-center justify-center gap-2 text-[11px] md:text-sm text-neutral-400/55 tracking-[0.2em] uppercase font-light -mt-2">
                    <span className="inline-block w-6 md:w-10 h-px bg-cyan-500/35" aria-hidden="true" />
                    <span>Baca Quran Lengkap dengan Tajwid, Tafsir &amp; Terjemahan</span>
                    <span className="inline-block w-6 md:w-10 h-px bg-cyan-500/35" aria-hidden="true" />
                </h2>

                <span className="mt-5 text-2xl md:text-4xl max-sm:hidden">وَعَنِ ابْنِ مَسْعُوْدٍ رَضِيَ اللهُ عَنْهُ قَالَ : قَالَ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللهِ فَلَهُ حَسَنَةٌ وَالحَسَنَةُ بِعَشْرِ أَمْثَالِهَا , لاَ أَقُوْلُ الم حَرْفٌ وَلَكِنْ أَلِفٌ حَرْفٌ وَلاَمٌ حَرْفٌ وَمِيْمٌ حَرْفٌ"

                    رَوَاهُ التِّرْمِذِيُّ وَقَالَ حَدِيْثٌ حَسَنٌ صَحِيْحٌ
                </span>
                <p className="max-md:mt-5 italic ">
                    "Barang siapa yang membaca satu huruf dari kitab Allah, maka baginya satu kebaikan. Satu kebaikan itu dibalas dengan sepuluh kali lipatnya. Aku tidak mengatakan alif laam miim itu satu huruf, tetapi aliif itu satu huruf, laam itu satu huruf, dan miim itu satu huruf."

                </p>
                <p className="text-sm text-cyan-500">
                    (HR. Tirmidzi, no. 2910. Tirmidzi). [HR. Tirmidzi, no. 2910. Syaikh Salim bin 'Ied Al-Hilaly].
                </p>
                <div className="mt-12">
                    <HeroCtaButton />
                </div>
            </div>
            <ShootingStars minSpeed={6} maxSpeed={6} starWidth={40} minDelay={5000} maxDelay={6000} />
            <StarsBackground />
        </div>
    )
}

export default Hero