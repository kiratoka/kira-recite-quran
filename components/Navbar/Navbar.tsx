import Link from "next/link"
import { ModeToggle } from "./DarkModeToggle"
import SearchBar from "./SearchBar"


const Navbar = () => {
  return (
    <div className="sticky top-0 bg-gray-900 z-30">
      <div className="flex px-5 md:px-12 py-6 justify-between">
        <Link href={"/"} className="text-4xl font-bold hover:text-cyan-500"><span className="text-cyan-500">Kira</span> Recite Quran</Link>
        <SearchBar />
      </div>
    </div>
  )
}

export default Navbar