import { ModeToggle } from "./DarkModeToggle"
import SearchBar from "./SearchBar"


const Navbar = () => {
  return (
    <div className="sticky top-0">
      <div className="flex px-12 py-6 justify-between">
        <h1 className="text-4xl font-bold"><span className="text-cyan-500">Kira</span> Recite Quran</h1>
        <SearchBar />
      </div>
    </div>
  )
}

export default Navbar