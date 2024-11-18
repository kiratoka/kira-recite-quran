import Surahs from "@/components/Homepage/Surahs"
import Navbar from "../components/Navbar/Navbar"
import Hero from "@/components/Homepage/Hero"

const Home = async () => {
  const responseSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs`)
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