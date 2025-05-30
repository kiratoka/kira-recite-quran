"use client"
import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ScrollText, 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  X,
  Repeat,
  Repeat1,
  Volume2
} from "lucide-react";
import { LatinProps, NumberSurahProps, SurahProps, TajweedProps } from '@/lib/types';
import { parseTajweedToReact } from '@/lib/parseTajweedToReact';

// Memoized components untuk mencegah re-render yang tidak perlu
const PlayButton = memo(({ 
  onClick, 
  isPlaying, 
  isLoading, 
  isActive, 
  disabled = false 
}: {
  onClick: () => void;
  isPlaying: boolean;
  isLoading: boolean;
  isActive: boolean;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full border transition-all duration-300 ${
      isActive
        ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
        : 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-400'
    }`}
    disabled={disabled || isLoading}
  >
    {isActive && isPlaying ? (
      <Pause className="h-5 w-5" />
    ) : (
      <Play className="h-5 w-5" />
    )}
  </button>
));

const AyatNumber = memo(({ number, isActive }: { number: number; isActive: boolean }) => (
  <div className={`flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 ${
    isActive
      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
      : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
  }`}>
    {number}
  </div>
));

// Fungsi untuk mengkonversi angka ke angka Arab - dimemoize untuk performa
const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const convertToArabicNumber = (num: number): string => {
  return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
};

// Memoized ayat component
const AyatComponent = memo(({ 
  ayat, 
  index, 
  latin, 
  tajweedText, 
  isPlaying, 
  isActive, 
  isLoading, 
  onPlayAudio 
}: {
  ayat: any;
  index: number;
  latin: any;
  tajweedText: string;
  isPlaying: boolean;
  isActive: boolean;
  isLoading: boolean;
  onPlayAudio: (audioUrl: string, index: number) => void;
}) => {
  const handlePlayClick = useCallback(() => {
    onPlayAudio(ayat.audio.alafasy, index);
  }, [ayat.audio.alafasy, index, onPlayAudio]);

  const arabicNumberMemo = useMemo(() => 
    convertToArabicNumber(ayat.number.inSurah), 
    [ayat.number.inSurah]
  );

  const parsedTajweed = useMemo(() => 
    parseTajweedToReact(tajweedText), 
    [tajweedText]
  );

  return (
    <AccordionItem
      value={(index + 1).toString()}
      className={`sm:border-b max-w-6xl mx-auto border-gray-800 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500/5 to-cyan-400/5 border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
          : ''
      }`}
    >
      <div className="sm:p-4 space-y-4">
        <div className="flex items-start justify-between gap-y-4">
          <div className="flex flex-col items-center gap-3">
            <AyatNumber number={ayat.number.inSurah} isActive={isActive} />
            <PlayButton
              onClick={handlePlayClick}
              isPlaying={isPlaying}
              isLoading={isLoading}
              isActive={isActive}
            />
          </div>
          <div className="flex-1">
            <p id={`ayat-${index.toString()}`} className="text-3xl sm:text-4xl md:text-[2.5rem] leading-loose sm:leading-[5rem] mt-3 mb-4 px-3 text-right" dir="rtl">
              <span className="arabic-text">
                {parsedTajweed}
              </span>
              <span className="mx-3 px-3 py-1 text-2xl border bg-cyan-500/10 text-cyan-400 border-cyan-500/20 rounded-full">
                {arabicNumberMemo}
              </span>
            </p>
          </div>
        </div>
        <p className="text-lg italic text-gray-400 text-start mb-2">
          {latin?.teksLatin}
        </p>
        <p className="text-gray-300 text-base sm:text-lg">
          {ayat.translation}
        </p>
        <AccordionTrigger className="py-2 px-4 w-full flex items-center gap-2 text-cyan-600 text-lg hover:text-cyan-300 transition-colors">
          <ScrollText className="h-4 w-4" />
          <span>Tafsir</span>
        </AccordionTrigger>

        <AccordionContent className="pt-4 px-4 text-base text-gray-400 border-t border-gray-800">
          {ayat.tafsir.kemenag.long}
        </AccordionContent>
      </div>
    </AccordionItem>
  );
});

// Audio control bar sebagai komponen terpisah untuk optimasi
const AudioControlBar = memo(({ 
  showAudioControl,
  surahName,
  playingIndex,
  isLoading,
  isPlaying,
  repeatMode,
  volume,
  surahAyahsLength,
  onPlayPause,
  onStop,
  onNext,
  onPrevious,
  onClose,
  onToggleRepeat,
  onVolumeChange
}: {
  showAudioControl: boolean;
  surahName: string;
  playingIndex: number | null;
  isLoading: boolean;
  isPlaying: boolean;
  repeatMode: 'none' | 'one' | 'all';
  volume: number;
  surahAyahsLength: number;
  onPlayPause: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onToggleRepeat: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const getRepeatIcon = useCallback(() => {
    switch (repeatMode) {
      case 'one':
        return <Repeat1 className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'all':
        return <Repeat className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />;
      default:
        return <Repeat className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  }, [repeatMode]);

  const toggleVolumeControl = useCallback(() => {
    setShowVolumeControl(!showVolumeControl);
  }, [showVolumeControl]);

  // Handle touch events untuk mobile responsiveness
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  if (!showAudioControl) return null;

  return (
    <>
      {/* Backdrop untuk mobile */}
      {showVolumeControl && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={() => setShowVolumeControl(false)}
        />
      )}
      
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/98 backdrop-blur-sm border-t border-cyan-500/20 shadow-2xl shadow-cyan-500/5 z-50">
        {/* Mobile Layout */}
        <div className="sm:hidden px-3 py-3">
          {/* Top Row - Info dan Close */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-medium text-cyan-300 truncate">
                {surahName}
              </h3>
              <p className="text-xs text-gray-400">
                {playingIndex === -1 ? 'Bismillah' : `Ayat ${playingIndex !== null ? playingIndex + 1 : ''}`}
                {isLoading && ' • Loading...'}
              </p>
            </div>
            
            <button
              onClick={onClose}
              onTouchStart={handleTouchStart}
              className="p-2 rounded-full bg-gray-700/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Control Row */}
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={onToggleRepeat}
              onTouchStart={handleTouchStart}
              className={`p-3 rounded-full transition-all duration-200 active:scale-95 ${
                repeatMode !== 'none'
                  ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
              }`}
              title={`Repeat: ${repeatMode}`}
            >
              {getRepeatIcon()}
            </button>

            <button
              onClick={onPrevious}
              onTouchStart={handleTouchStart}
              className="p-3 rounded-full bg-gray-700/50 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              disabled={playingIndex === 0 && repeatMode !== 'all'}
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              onClick={onPlayPause}
              onTouchStart={handleTouchStart}
              className="p-4 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50 active:scale-95"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>

            <button
              onClick={onStop}
              onTouchStart={handleTouchStart}
              className="p-3 rounded-full bg-gray-700/50 text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 active:scale-95"
            >
              <Square className="h-5 w-5" />
            </button>

            <button
              onClick={onNext}
              onTouchStart={handleTouchStart}
              className="p-3 rounded-full bg-gray-700/50 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              disabled={playingIndex === surahAyahsLength - 1 && repeatMode !== 'all'}
            >
              <SkipForward className="h-5 w-5" />
            </button>

            <button
              onClick={toggleVolumeControl}
              onTouchStart={handleTouchStart}
              className={`p-3 rounded-full transition-all duration-200 active:scale-95 ${
                showVolumeControl
                  ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
              }`}
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>

          {/* Volume Control Popup untuk Mobile */}
          {showVolumeControl && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20 shadow-xl">
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs text-cyan-300 font-medium">Volume</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">0</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={onVolumeChange}
                    className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                    }}
                  />
                  <span className="text-xs text-gray-400">100</span>
                </div>
                <p className="text-xs text-gray-400">{Math.round(volume * 100)}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-cyan-300 truncate">
                {surahName}
              </h3>
              <p className="text-xs text-gray-400">
                {playingIndex === -1 ? 'Bismillah' : `Ayat ${playingIndex !== null ? playingIndex + 1 : ''}`}
                {isLoading && ' • Loading...'}
              </p>
            </div>

            <div className="flex items-center gap-2 mx-4">
              <button
                onClick={onToggleRepeat}
                className={`p-2 rounded-full transition-all duration-200 ${
                  repeatMode !== 'none'
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 shadow-lg shadow-cyan-500/20'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                }`}
                title={`Repeat: ${repeatMode}`}
              >
                {getRepeatIcon()}
              </button>

              <button
                onClick={onPrevious}
                className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={playingIndex === 0 && repeatMode !== 'all'}
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={onPlayPause}
                className="p-3 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>

              <button
                onClick={onStop}
                className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
              >
                <Square className="h-5 w-5" />
              </button>

              <button
                onClick={onNext}
                className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={playingIndex === surahAyahsLength - 1 && repeatMode !== 'all'}
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={onVolumeChange}
                  className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                  }}
                />
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-700/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

const Isisurah = ({ surah, latins, numberSurah, surahsWithTajweedOnly }: SurahProps & LatinProps & NumberSurahProps & TajweedProps) => {
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudioControl, setShowAudioControl] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

  // Memoize computed values
  const shouldShowBismillah = useMemo(() => 
    parseInt(numberSurah) !== 1 && parseInt(numberSurah) !== 9, 
    [numberSurah]
  );

  // Audio event handlers dengan optimasi
  useEffect(() => {
    if (!playingAudio) return;

    const handleLoadedMetadata = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }

      if (repeatMode === 'one') {
        playingAudio.currentTime = 0;
        playingAudio.play();
      } else {
        handleNext();
      }
    };

    const handleError = () => {
      setIsLoading(false);
      console.error('Error loading audio');
    };

    playingAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
    playingAudio.addEventListener('play', handlePlay);
    playingAudio.addEventListener('pause', handlePause);
    playingAudio.addEventListener('ended', handleEnded);
    playingAudio.addEventListener('error', handleError);

    return () => {
      playingAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      playingAudio.removeEventListener('play', handlePlay);
      playingAudio.removeEventListener('pause', handlePause);
      playingAudio.removeEventListener('ended', handleEnded);
      playingAudio.removeEventListener('error', handleError);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playingAudio, repeatMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scrollToAyat = useCallback((index: number) => {
    const ayatElement = document.getElementById(`ayat-${index.toString()}`);
    if (ayatElement) {
      ayatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handlePlayAudio = useCallback((audioUrl: string, index: number) => {
    if (playingAudio) {
      playingAudio.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    }

    setIsLoading(true);
    const audio = new Audio(audioUrl);
    audio.volume = volume;
    audio.preload = 'auto';
    
    setPlayingAudio(audio);
    setPlayingIndex(index);
    setShowAudioControl(true);
    audioRef.current = audio;

    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
      setIsLoading(false);
    });
  }, [playingAudio, volume]);

  const handlePlayPause = useCallback(() => {
    if (playingAudio) {
      if (isPlaying) {
        playingAudio.pause();
      } else {
        playingAudio.play();
      }
    }
  }, [playingAudio, isPlaying]);

  const handleStop = useCallback(() => {
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
  }, [playingAudio]);

  const handleNext = useCallback(() => {
    if (playingIndex === null) return;

    const totalAyahs = surah.ayahs.length;
    let nextIndex = playingIndex + 1;
    
    if (nextIndex >= totalAyahs) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        handleCloseAudioControl();
        return;
      }
    }
    
    setIsPlaying(true);
    scrollToAyat(nextIndex);
    
    const nextAyat = surah.ayahs[nextIndex];
    if (nextAyat) {
      handlePlayAudio(nextAyat.audio.alafasy, nextIndex);
    }
  }, [playingIndex, surah.ayahs, repeatMode, handlePlayAudio, scrollToAyat]);

  const handlePrevious = useCallback(() => {
    if (playingIndex === null) return;

    let prevIndex = playingIndex - 1;
    
    if (prevIndex < 0) {
      if (repeatMode !== 'all') return;
      prevIndex = 0;
    }
    
    scrollToAyat(prevIndex);
    
    const prevAyat = surah.ayahs[prevIndex];
    if (prevAyat) {
      handlePlayAudio(prevAyat.audio.alafasy, prevIndex);
    }
  }, [playingIndex, surah.ayahs, repeatMode, handlePlayAudio, scrollToAyat]);

  const handleCloseAudioControl = useCallback(() => {
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    setPlayingIndex(null);
    setIsPlaying(false);
    setShowAudioControl(false);
    setIsLoading(false);
  }, [playingAudio]);

  const toggleRepeatMode = useCallback(() => {
    const modes: ('none' | 'one' | 'all')[] = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  }, [repeatMode]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (playingAudio) {
      playingAudio.volume = newVolume;
    }
  }, [playingAudio]);

  const handleBismillahPlay = useCallback(() => {
    handlePlayAudio(surah.bismillah.audio.alafasy, -1);
  }, [surah.bismillah.audio.alafasy, handlePlayAudio]);

  return (
    <div className="w-full mx-auto bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl">
      <div className='py-6 px-3'>
        {shouldShowBismillah && (
          <div className="mb-8 space-y-4">
            <div className="flex max-sm:flex-col-reverse justify-center items-center gap-4">
              <button
                onClick={handleBismillahPlay}
                className="p-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 transition-all duration-200"
              >
                {playingIndex === -1 && isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <h1 className="text-center text-5xl py-6 arabic-text ">
                {surah.bismillah.arab}
              </h1>
            </div>
            <p className="text-center text-lg font-serif italic text-gray-300">
              Bismillāhir-raḥmānir-raḥīm(i).
            </p>
            <p className="text-center text-gray-400">
              {surah.bismillah.translation}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
        )}

        <Accordion type="single" collapsible className="space-y-4">
          {surah.ayahs.map((ayat, index) => (
            <AyatComponent
              key={index}
              ayat={ayat}
              index={index}
              latin={latins[index]}
              tajweedText={surahsWithTajweedOnly[index]?.text || ''}
              isPlaying={isPlaying}
              isActive={playingIndex === index}
              isLoading={isLoading}
              onPlayAudio={handlePlayAudio}
            />
          ))}
        </Accordion>
      </div>

      <AudioControlBar
        showAudioControl={showAudioControl}
        surahName={surah.name}
        playingIndex={playingIndex}
        isLoading={isLoading}
        isPlaying={isPlaying}
        repeatMode={repeatMode}
        volume={volume}
        surahAyahsLength={surah.ayahs.length}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onClose={handleCloseAudioControl}
        onToggleRepeat={toggleRepeatMode}
        onVolumeChange={handleVolumeChange}
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #22d3ee;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(34, 211, 238, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:active {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(34, 211, 238, 0.6);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #22d3ee;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(34, 211, 238, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:active {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(34, 211, 238, 0.6);
        }

        /* Mobile touch improvements */
        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            height: 20px;
            width: 20px;
          }
          
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Isisurah;