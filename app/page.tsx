import type { Metadata } from "next";
import Surahs from "@/components/Homepage/Surahs";
import Navbar from "../components/Navbar/Navbar";
import Hero from "@/components/Homepage/Hero";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 
  "https://kira-recite-quran-api.netlify.app"
).replace(/\/$/, "");

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

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