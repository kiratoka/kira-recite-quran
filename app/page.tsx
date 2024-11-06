import Surahs from "@/components/Homepage/Surahs"
import Navbar from "../components/Navbar/Navbar"

const Home = async () => {
  const responseSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs`)
  const surahs = await responseSurahs.json()
  return (
    <div>
      <Navbar surahs={surahs} />
      <Surahs surahs={surahs} />
    </div>
  )
}

export default Home