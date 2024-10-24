interface SurahProps {
  surah: {
    bismillah: {
      arab: string;
      translation: string;
      audio: {
        alafasy: string;
      };
    };
    ayahs: {
      number: {
        inSurah: number;
      };
      arab: string;
      translation: string;
      image: {
        primary: string
      }
    }[];
  };
}

interface LatinProps {
  latins: {
    teksLatin: string;
  }[];
}
const convertToArabicNumber = (num: number): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
}

const Isisurah = ({ surah, latins }: SurahProps & LatinProps) => {
  return (
    <div className="">
      <div className="sm:mx-12 sm:mt-6">
        <h1 className="text-center text-5xl bg-gray-700 py-3.5 px-4 rounded-t">{surah.bismillah.arab}</h1>
        {surah.ayahs.map((ayat, index) => (
          <div key={index + 1} className={`bg-${(index + 1) % 2 === 0 ? 'gray-900' : 'gray-800'} px-4 py-4`}>
            <div className="flex justify-between">
              <h1 className="flex items-center justify-center h-fit w-fit p-3 rounded-full border mr-5">{ayat.number.inSurah}</h1>
              <p className="text-3xl leading-relaxed text-end my-3">{ayat.arab} <span className="px-2 sm:px-3 sm:py-1 items-center mr-4 border rounded-full">{convertToArabicNumber(ayat.number.inSurah)}</span></p>
            </div>
            <p className="text-lg italic text-end my-3">{latins[index]?.teksLatin}</p>
            <p className="text-base text-gray-400">{ayat.translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Isisurah;
