import Surahs from "@/components/Homepage/Surahs"
import Navbar from "../components/Navbar/Navbar"

const Home = async () => {
  const responseSurahs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}surahs`)
  const surahs = await responseSurahs.json()
  return (
    <div>
      <div className="fixed -z-10 bg-black/35 w-full h-screen"></div>
      <div className="fixed -z-20">
        <img src="https://res.cloudinary.com/damnmk82e/image/upload/v1730881142/pexels-esan-2085998_atiwr5.jpg" alt="" className="w-screen h-screen" />
      </div>
      <Navbar surahs={surahs} />
      <Surahs surahs={surahs} />
    </div>
  )
}

export default Home