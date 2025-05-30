"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ReactNode, useState } from "react";
import { tajweedInfo } from "@/lib/tajweedInfo";

const allowedTajweedDescriptions = [
  "Idgham - With Ghunnah",
  "Idgham - Without Ghunnah",
  "Idgham - Mutajanisayn",
  "Idgham Shafawi - With Meem",
  "Ghunnah: 2 Vowels",
  "Ikhafa'",
  "Qalaqah",
  "Ikhafa' Shafawi - With Meem",
  "Iqlab",
];

type TajweedWordProps = {
  type: string;
  description: string;
  className?: string;
  children: React.ReactNode;
};

export const TajweedWord = ({ type, description, className = "", children }: TajweedWordProps) => {
  const [open, setOpen] = useState(false);

  if (!allowedTajweedDescriptions.includes(description)) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          onClick={() => setOpen(!open)}
          className={`cursor-pointer ${className}`}
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="text-sm bg-gray-800 border border-cyan-500">
        <p className="font-semibold">Hukum Tajwid:</p>
        {tajweedInfo[description]?.title && <p className="mt-1">{tajweedInfo[description].title}</p>}
        {tajweedInfo[description]?.description && (
          <p className="mt-1 whitespace-pre-line arabic-text">{tajweedInfo[description].description}</p>
        )}
       {tajweedInfo[description]?.contoh && (
          <div 
            className="mt-1 arabic-text text-lg"
            dangerouslySetInnerHTML={{ __html: tajweedInfo[description].contoh }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};