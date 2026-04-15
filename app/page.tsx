import Surahs from "@/components/Homepage/Surahs"
import Navbar from "../components/Navbar/Navbar"
import Hero from "@/components/Homepage/Hero"

// Next.js minta segment config `revalidate` berupa nilai statis/literal.
export const revalidate = 86400;

const Home = async () => {
  // Revalidate 1 hari karena daftar surah statis.
  const responseSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs`, {
    next: { revalidate }
  })
  const surahs = await responseSurahs.json()
  return (
    <div>
      <Navbar surahs={surahs} />
      <Hero />
      <Surahs surahs={surahs} />
    </div>
  )
}

export default Home