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
        <div className="min-h-screen text-white/90">
            <div className="container mx-auto px-4 py-8">
                <Accordion type="single" collapsible className="space-y-4">
                    {surahs.map((surah) => (
                        <Card 
                            key={surah.number} 
                            className="max-w-7xl mx-auto backdrop-blur-md dark:bg-cyan-800/20 border-0 shadow-lg"
                        >
                            <AccordionItem
                                value={surah.number.toString()}
                                className="border border-white/10 rounded-lg overflow-hidden"
                            >
                                <Link
                                    href={`/surah/${surah.number}`}
                                    className=""
                                >
                                    <div className="flex items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-300">
                                        {/* Number Circle */}
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mr-4">
                                            <span className="font-bold">
                                                {surah.number}
                                            </span>
                                        </div>

                                        {/* Surah Info */}
                                        <div className="flex-grow max-md:pl-3">
                                            <div className="max-sm:flex-col flex max-sm:items-start items-center sm:space-x-2">
                                                <h2 className="text-xl font-semibold text-white">
                                                    {surah.name}
                                                </h2>
                                                <span className="text-white/60">
                                                    ({surah.translation})
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                                                <span className="flex items-center">
                                                    <Bookmark className="h-4 w-4 mr-1" />
                                                    {surah.numberOfAyahs} Ayat
                                                </span>
                                                <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs">
                                                    {surah.revelation}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <AccordionTrigger className="hover:no-underline hover:bg-white/5 pr-5">
                                    <div className="flex justify-center w-full">
                                        <h1 className="text-center text-white/90">Deskripsi</h1>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-4 sm:px-6 rounded-lg mt-2 mb-4 md:ml-16">
                                        <p className="text-white/80 leading-relaxed text-base">
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