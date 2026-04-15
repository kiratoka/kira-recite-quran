import IsiSurahClient from "@/components/SurahPage/IsiSurah";
import { LatinProps, NumberSurahProps, SurahProps, TajweedProps } from "@/lib/types";

const IsiSurahServer = (props: SurahProps & LatinProps & NumberSurahProps & TajweedProps) => {
  const { surah } = props;

  // Fragment ini diproduksi di server agar teks penting untuk SEO
  // muncul di HTML awal, bukan menunggu hydration client.
  const bismillahSeoContent = (
    <>
      <h1 className="text-center text-5xl py-6 arabic-text ">
        {surah.bismillah.arab}
      </h1>
      <p className="text-center text-lg font-serif italic text-gray-300">
        Bismillāhir-raḥmānir-raḥīm(i).
      </p>
      <p className="text-center text-gray-400">
        {surah.bismillah.translation}
      </p>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </>
  );

  return <IsiSurahClient {...props} bismillahSeoContent={bismillahSeoContent} />;
};

export default IsiSurahServer;
