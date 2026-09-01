export interface RawLatinProps {
    data: {
        nomor: number;
        namaLatin: string;
        // Bisa null di surah terakhir.
        suratSelanjutnya: {
            nomor: number;
            namaLatin: string;
        } | null;
        // Bisa null di surah pertama.
        suratSebelumnya: {
            nomor: number;
            namaLatin: string;
        } | null;
    };
}

export interface ListSurah {
    number: number
    name: string
    translation: string
    numberOfAyahs?: number
    revelation?: 'Makkiyah' | 'Madaniyah'
    description?: string
    audio?: string
}


export interface SurahCardProps {
    surah: {
        number: number;
        name: string;
        translation: string;
        revelation: 'Makkiyah' | 'Madaniyah';
        numberOfAyahs: number;
        description: string;
    };
}

export interface SurahProps {
    surah: {
        bismillah: {
            arab: string;
            translation: string;
            audio: {
                alafasy: string;
            };
        };
        name: string;
        ayahs: {
            number: {
                inSurah: number;
            };
            arab: string;
            translation: string;
            image: {
                primary: string
            };
            tafsir: {
                kemenag: {
                    long: string
                }
            };
            audio: {
                alafasy: string
            };
        }[];
    };
}

export interface LatinProps {
    latins: {
        teksLatin: string;
    }[];
}

export interface NumberSurahProps {
    numberSurah: string;
}

export type TajweedProps = {
    surahsWithTajweedOnly: {
      numberInSurah: number;
      text: string;
    }[];
  };

