'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioBarProps {
    audioUrl: string;
    surahName: string;
    currentAyatIndex: number;
    totalAyat: number;
    onChangeAyat: (newIndex: number) => void;
    onClose: () => void;
}

export default function AudioBar({
    audioUrl,
    surahName,
    currentAyatIndex,
    totalAyat,
    onChangeAyat,
    onClose,
}: AudioBarProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
        } else {
            audioRef.current.src = audioUrl;
        }

        const audio = audioRef.current;

        const onLoadedMetadata = () => setDuration(audio.duration);
        const onTimeUpdate = () => setProgress(audio.currentTime);
        const onEnded = () => {
            setIsPlaying(false);
            if (currentAyatIndex + 1 < totalAyat) {
                onChangeAyat(currentAyatIndex + 1);
            }
        };

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);
        audio.play();
        setIsPlaying(true);

        return () => {
            audio.pause();
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
        };
    }, [audioUrl]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setProgress(value);
        }
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
    };

    const handleNext = () => {
        if (currentAyatIndex + 1 < totalAyat) {
            onChangeAyat(currentAyatIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentAyatIndex > 0) {
            onChangeAyat(currentAyatIndex - 1);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div>
                    <div className="font-bold text-cyan-400">{surahName}</div>
                    <div>Ayat {currentAyatIndex + 1}</div>
                </div>
                <div className="flex items-center gap-3 text-lg">
                    <button onClick={handlePrev}>⏮️</button>
                    <button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
                    <button onClick={handleStop}>⏹️</button>
                    <button onClick={handleNext}>⏭️</button>
                </div>
            </div>

            <div className="w-full sm:w-1/2">
                <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={progress}
                    onChange={handleSeek}
                    className="w-full accent-cyan-500"
                />
            </div>

            <button onClick={onClose} className="text-red-400 text-xl ml-2">
                ✖️
            </button>
        </div>
    );
}
