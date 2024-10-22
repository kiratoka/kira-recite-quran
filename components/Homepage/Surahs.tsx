import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface Surah {
    number: number;
    name: string;
    numberOfAyahs: number;
    translation: string;
    revelation: string;
    description: string;
}

type SurahsProps = {
    surahs: Surah[]; // Mendefinisikan tipe untuk prop 'surahs'
};

const Surahs = ({ surahs }: SurahsProps) => {
    return (
        <div className="px-4 md:px-12">
            <div className="">Home</div>
            <h1 className="mb-2">Nama nama Surah</h1>
            <Accordion type="single" collapsible>
                {surahs.map((surah) => (
                    <AccordionItem key={surah.number} value={surah.number.toString()} className="my-3 py-2 bg-gray-700 px-4 rounded-sm hover:border-2 border-cyan-600 hover:shadow-md hover:shadow-cyan-400">
                        <AccordionTrigger>
                            <Link href={`/surah/${surah.number}`} className="flex hover:text-cyan-500 cursor-pointer">
                                <h1 className="text-2xl">{surah.number}.</h1>
                                <div className="mx-1">
                                    <h1 className="text-start text-2xl">{surah.name} ({surah.translation})</h1>
                                    <h1 className="text-start text-xl">{surah.numberOfAyahs} Ayat | {surah.revelation}</h1>
                                </div>
                            </Link>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="mx-4 text-gray-300">
                                {surah.description}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default Surahs;
