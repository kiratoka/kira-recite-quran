import Navbar from "@/components/Navbar/Navbar"
import SurahCard from "@/components/SurahPage/SurahCard"


const page = async ({ params }: any) => {
    const numberSurah = params.id
    const responseSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs/${numberSurah}`)
    const surah = await responseSurahs.json()
    return (
        <div>
            <Navbar />
            <SurahCard surah={surah}/>
            
        </div>
    )
}

export default page