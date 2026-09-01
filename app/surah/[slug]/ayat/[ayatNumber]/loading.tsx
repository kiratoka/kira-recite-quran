export default function Loading() {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Navbar Skeleton */}
      <div className="sticky top-0 z-20 w-full backdrop-blur-lg bg-background/80 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 animate-pulse" />
              <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="h-10 w-48 bg-gray-800 rounded-full animate-pulse hidden md:block" />
            <div className="h-9 w-24 bg-gray-800 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Surah Card Skeleton */}
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="relative shadow-xl px-4 py-8 rounded-xl border border-gray-800 bg-gray-900/40 animate-pulse space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="h-7 w-48 bg-gray-800 rounded" />
              <div className="h-4 w-32 bg-gray-850 rounded" />
            </div>
            <div className="h-9 w-12 bg-gray-800 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="h-4 w-20 bg-gray-800 rounded" />
            <div className="h-4 w-20 bg-gray-800 rounded ml-auto" />
          </div>
          <div className="h-8 w-full bg-gray-800/60 rounded mt-4" />
        </div>
      </div>

      {/* Navigasi Ayat Skeleton */}
      <div className="w-full max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between bg-gray-900/80 border border-cyan-500/10 rounded-2xl p-4 animate-pulse">
          <div className="h-10 w-28 sm:w-36 bg-gray-800 rounded-xl" />
          <div className="flex flex-col items-center space-y-1">
            <div className="h-3 w-20 bg-gray-800 rounded" />
            <div className="h-5 w-28 bg-gray-750 rounded" />
          </div>
          <div className="h-10 w-28 sm:w-36 bg-gray-800 rounded-xl" />
        </div>
      </div>

      {/* Konten Ayat Detail Skeleton */}
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-gray-900/30 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 space-y-6 animate-pulse">
          {/* Header Action & Arabic Skeleton */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500/20" />
              <div className="h-11 w-11 rounded-full bg-gray-800" />
            </div>
            <div className="flex-1 space-y-4 pt-2">
              <div className="h-12 w-3/4 bg-gray-800 rounded ml-auto" />
              <div className="h-12 w-full bg-gray-800 rounded ml-auto" />
            </div>
          </div>

          {/* Transliterasi Latin Skeleton */}
          <div className="space-y-2 pt-4">
            <div className="h-5 w-5/6 bg-gray-800/80 rounded" />
            <div className="h-5 w-2/3 bg-gray-800/80 rounded" />
          </div>

          {/* Terjemahan Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-4 w-24 bg-cyan-500/20 rounded" />
            <div className="h-5 w-full bg-gray-800 rounded" />
            <div className="h-5 w-4/5 bg-gray-800 rounded" />
          </div>

          {/* Divider Skeleton */}
          <div className="h-px bg-gray-800 my-6" />

          {/* Tafsir Skeleton */}
          <div className="space-y-3 pt-2">
            <div className="h-6 w-36 bg-cyan-500/20 rounded" />
            <div className="bg-gray-950/60 rounded-xl p-6 border border-gray-800/80 space-y-3">
              <div className="h-4 w-full bg-gray-800/70 rounded" />
              <div className="h-4 w-full bg-gray-800/70 rounded" />
              <div className="h-4 w-11/12 bg-gray-800/70 rounded" />
              <div className="h-4 w-4/5 bg-gray-800/70 rounded" />
              <div className="h-4 w-full bg-gray-800/70 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
