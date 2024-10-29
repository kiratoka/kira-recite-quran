export interface RawLatinProps {
    data: {
        nomor: number;
        namaLatin: string;
        suratSelanjutnya: {
            nomor: number;
            namaLatin: string;
        };
        suratSebelumnya: {
            nomor: number;
            namaLatin: string;
        };
    };
}

export interface ListSurah {
    number: number
    name: string
    translation: string
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
    numberSurah: number;
}
