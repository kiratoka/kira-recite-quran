import { useState, useEffect, useRef } from 'react';
import { ListSurah } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { X, Search } from 'lucide-react'; // Import ikon X dan Search dari lucide-react
import Fuse from 'fuse.js';

const SearchBar = ({ surahs }: { surahs: ListSurah[] }) => {
    const [query, setQuery] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filteredSurah, setFilteredSurah] = useState<ListSurah[]>([]);
    const searchRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fuse = new Fuse(surahs, {
        keys: ['name', 'translation'], // field yang akan dicari
        threshold: 0.3, // tingkat kecocokan (0 = match sempurna, 1 = match longgar)
        ignoreLocation: true,
        minMatchCharLength: 2,
        shouldSort: true,
        includeScore: true
    });

    const handleSearch = (value: string) => {
        setQuery(value);
        
        if (!value.trim()) {
            setFilteredSurah([]);
            return;
        }

        // Lakukan pencarian dengan Fuse
        const results = fuse.search(value);
        // Convert hasil ke format yang diinginkan
        const filteredResults = results.map(result => result.item);
        
        setFilteredSurah(filteredResults);
        setIsOpen(true);
    };
    const handleSurahClick = (number: number) => {
        router.push(`/surah/${number}`);
        setIsOpen(false);
        setQuery('');
    };

    const clearSearch = () => {
        setQuery('');
        setIsOpen(false);
        setFilteredSurah([]);
    };

    return (
        <div ref={searchRef} className="relative">
            <div className="inline-flex items-center relative w-full">
                <label htmlFor="Search" className="sr-only"> Search for... </label>

                <input
                    type="text"
                    id="Search"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Cari surah"
                    className="w-full rounded-md px-3 border-gray-200 py-2.5 pr-10 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />

                {/* Tombol "X" untuk menghapus input */}
                {query !== '' && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            <X size={18} aria-label="Clear search" />
                        </button>
                    </span>
                )}
                
                {query === '' && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Search
                            className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            size={18}
                            aria-label="Search icon"
                        />
                    </span>
                )}
            </div>

            {/* Dropdown suggestions */}
            {isOpen && filteredSurah.length > 0 && query !== '' && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border dark:bg-gray-800 dark:border-gray-700">
                    <ul className="py-1 overflow-auto max-h-64">
                        {filteredSurah.map((surah) => (
                            <li
                                key={surah.number}
                                onClick={() => handleSurahClick(surah.number)}
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    <span className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-cyan-600 rounded-full text-green-800 dark:text-green-100 text-sm font-medium">
                                        {surah.number}
                                    </span>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {surah.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {surah.translation}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchBar;
