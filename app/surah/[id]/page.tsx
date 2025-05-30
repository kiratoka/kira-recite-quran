import Navbar from "@/components/Navbar/Navbar"
import Isisurah from "@/components/SurahPage/IsiSurah"
import SurahCard from "@/components/SurahPage/SurahCard"
import { Tajweed } from 'tajweed';

type AyatTajweed = {
    numberInSurah: number;
    text: string;
};

const page = async ({ params }: any) => {
    const numberSurah = params.id
    const responseSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs`)
    const surahs = await responseSurahs.json()
    const responseSurahsId = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs/${numberSurah}`)
    const responseTajweedSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_TAJWEED}${numberSurah}/editions/quran-tajweed`)
    const responseLatin = await fetch(`${process.env.NEXT_PUBLIC_API_LATIN}api/v2/surat/${numberSurah}`)
    const surah = await responseSurahsId.json()
    const rawLatin = await responseLatin.json()
    const tajweedSurahs = await responseTajweedSurahs.json()

    const tajweed = new Tajweed();
    const surahsWithTajweedOnly: AyatTajweed[] = tajweedSurahs.data[0].ayahs.map(
        ({ numberInSurah, text }: AyatTajweed) => ({
            numberInSurah,
            text: tajweed.parse(text, true),
        })
    );
    const latins = rawLatin.data.ayat
    const namaSurahArab = rawLatin.data.nama
    const isSurahPage = true
    return (
        <div className="bg-slate-950">
            <Navbar isSurahPage={isSurahPage} rawLatin={rawLatin} surahs={surahs} />
            <SurahCard surah={surah} namaSurahArab={namaSurahArab} />
            <Isisurah surahsWithTajweedOnly={surahsWithTajweedOnly} surah={surah} latins={latins} numberSurah={numberSurah} />

        </div>
    )
}

export default page