import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Meteors } from '../ui/meteors';
import { SurahCardProps } from '@/lib/types';
import { StarsBackground } from '../ui/stars-background';




const SurahCard = ({ surah, namaSurahArab }: SurahCardProps & { namaSurahArab: string }) => {
    return (
        <div className='relative bg-slate-950'>
            <StarsBackground />
            <div className="w-full relative max-w-2xl mx-auto">
                {/* Gradient background */}
                {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" /> */}

                {/* Card content */}
                <div className="relative shadow-xl px-4 py-8 h-full overflow-hidden sm:rounded-md flex flex-col">
                    <div className="flex justify-between items-start mb-4 z-10">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">
                                {surah.name} ( {namaSurahArab} )
                            </h3>
                            <p className="text-sm text-slate-500">
                                {surah.translation}
                            </p>
                        </div>
                        <div>
                            <span className="inline-block px-3 py-1 text-lg font-semibold text-gray-300 bg-gray-800/50 rounded-full border border-gray-500">
                                {surah.number}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 z-10">
                        <div className="text-sm">
                            <span className="font-medium text-gray-300">{surah.revelation}</span>
                        </div>
                        <div className="text-sm text-right">
                            <span className="block text-slate-500">Ayat</span>
                            <span className="font-medium text-gray-300">{surah.numberOfAyahs}</span>
                        </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="description" className="border-slate-700">
                            <AccordionTrigger className="text-sm font-medium text-gray-300 hover:text-white">
                                Deskripsi
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-slate-500">
                                {surah.description}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Meteor effect */}
                    <Meteors number={20} />
                </div>
            </div>
        </div>

    );
};

export default SurahCard;