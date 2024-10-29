import Navbar from "@/components/Navbar/Navbar"
import Isisurah from "@/components/SurahPage/IsiSurah"
import SurahCard from "@/components/SurahPage/SurahCard"



const page = async ({ params }: any) => {
    const numberSurah = params.id
    const responseSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs`)
    const surahs = await responseSurahs.json()
    const responseSurahsId = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs/${numberSurah}`)
    const responseLatin = await fetch(`${process.env.NEXT_PUBLIC_API_LATIN}api/v2/surat/${numberSurah}`)
    const surah = await responseSurahsId.json()
    const rawLatin = await responseLatin.json()
    const latins = rawLatin.data.ayat
    const namaSurahArab = rawLatin.data.nama
    const isSurahPage = true
    return (
        <div>
            <Navbar isSurahPage={isSurahPage} rawLatin={rawLatin} surahs={surahs} />
            <SurahCard surah={surah} namaSurahArab={namaSurahArab} />
            <Isisurah surah={surah} latins={latins} numberSurah={numberSurah} />

        </div>
    )
}

export default page