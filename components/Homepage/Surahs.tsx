import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Surah {
    number: number;
    name: string;
    numberOfAyahs: number;
    translation: string;
    revelation: string;
    description: string;
}

type SurahsProps = {
    surahs: Surah[];
};

const Surahs = ({ surahs }: SurahsProps) => {
    return (
        <div className="min-h-screen bg-slate-950 text-white pt-14" id="listSurah">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}

                {/* Surah List */}
                <Accordion type="single" collapsible className="space-y-4">
                    {surahs.map((surah) => (
                        <Card key={surah.number} className='max-w-7xl mx-auto'>
                            <AccordionItem
                                value={surah.number.toString()}
                                className="border-none bg-gray-900"
                            >

                                <Link
                                    href={`/surah/${surah.number}`}
                                    className=""
                                    scroll={true}
                                >
                                    <div className="flex items-center p-4 hover:bg-gray-600/50 rounded-lg transition-all duration-300">
                                        {/* Number Circle */}
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mr-4">
                                            <span className="font-bold">
                                                {surah.number}
                                            </span>
                                        </div>

                                        {/* Surah Info */}
                                        <div className="flex-grow max-md:pl-3">
                                            <div className="max-sm:flex-col flex max-sm:items-start items-center sm:space-x-2">
                                                <h2 className="text-xl font-semibold">
                                                    {surah.name}
                                                </h2>
                                                <span className="text-gray-400">
                                                    ({surah.translation})
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                                <span className="flex items-center">
                                                    <Bookmark className="h-4 w-4 mr-1" />
                                                    {surah.numberOfAyahs} Ayat
                                                </span>
                                                <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                                                    {surah.revelation}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <AccordionTrigger className="hover:no-underline hover:bg-gray-600 pr-5">
                                    <div className="flex justify-center w-full">
                                        <h1 className="text-center">Deksripsi</h1>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className=" px-4 sm:px-6 rounded-lg mt-2 mb-4 md:ml-16">
                                        <p className="text-gray-300 leading-relaxed text-base">
                                            {surah.description}
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Card>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Surahs;