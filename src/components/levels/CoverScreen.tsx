import React from 'react';
import { Sparkles, Shield, Heart, Zap, Award } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { sound } from '../../utils/audio';

interface CoverScreenProps {
  onStart: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Playful Floating Background Elements */}
      <div className="absolute top-10 left-8 text-3xl animate-bounce opacity-70 select-none">✨</div>
      <div className="absolute top-24 right-10 text-4xl animate-pulse opacity-70 select-none">⭐</div>
      <div className="absolute bottom-16 left-12 text-3xl animate-float opacity-60 select-none">🦷</div>
      <div className="absolute bottom-20 right-14 text-3xl animate-wiggle opacity-60 select-none">🪥</div>

      {/* Decorative Pastel Clouds */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-16 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Hero Card Container */}
      <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl sm:rounded-[36px] p-6 sm:p-10 shadow-xl border-4 border-sky-200 text-center z-10 transition-all">
        
        {/* Top Superhero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-bold text-xs sm:text-sm tracking-wide shadow-sm mb-4 animate-pulse-subtle">
          <Sparkles className="w-4 h-4" />
          <span>GAME EDUKASI KESEHATAN GIGI INTERAKTIF SD (KELAS 3–6)</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Big Game Title */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 tracking-tight leading-tight mb-2 drop-shadow-xs">
          PETUALANGAN PAHLAWAN GIGI
        </h1>

        {/* Subtitle */}
        <p className="font-heading text-lg sm:text-2xl font-bold text-amber-600 mb-6 drop-shadow-2xs">
          🌟 Selamatkan Gigi dari Monster Karies! 🌟
        </p>

        {/* Characters Presentation Section (Pahlawan Gigi vs Monster Karies) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-6 max-w-2xl mx-auto items-center">
          
          {/* Pahlawan Gigi Card */}
          <div className="group relative bg-gradient-to-b from-sky-50 to-blue-100 rounded-3xl p-4 sm:p-5 border-2 border-sky-300 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-sky-500 text-white text-xs font-bold shadow-xs">
              🛡️ Sang Pahlawan
            </div>
            <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-white shadow-inner mb-3 border-2 border-sky-200">
              <img
                src={IMAGES.hero}
                alt="Pahlawan Gigi Superhero"
                className="w-full h-full object-cover animate-float"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-2 text-xl">✨</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-sky-900">
              Pahlawan Gigi
            </h3>
            <p className="text-xs text-sky-700 font-medium">
              Gigi bersih, kuat, & bersinar dengan kekuatan sikat gigi!
            </p>
          </div>

          {/* Monster Karies Card */}
          <div className="group relative bg-gradient-to-b from-pink-50 to-purple-100 rounded-3xl p-4 sm:p-5 border-2 border-pink-300 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-pink-500 text-white text-xs font-bold shadow-xs">
              👾 Si Pembuat Lubang
            </div>
            <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-white shadow-inner mb-3 border-2 border-pink-200">
              <img
                src={IMAGES.monster}
                alt="Monster Karies Lucu"
                className="w-full h-full object-cover animate-wiggle"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-2 text-xl">🍭</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-purple-900">
              Monster Karies
            </h3>
            <p className="text-xs text-purple-700 font-medium">
              Suka makanan manis & malas sikat gigi! Ayo kalahkan!
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-100 text-sky-800 text-xs font-semibold">
            <span>🎮 5 Level Seru</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-semibold">
            <span>⭐ Kumpulkan Poin & Badge</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <span>🏆 Dapatkan Sertifikat</span>
          </div>
        </div>

        {/* Prompt Question */}
        <p className="font-heading text-base sm:text-xl font-bold text-slate-700 mb-5">
          Apakah kamu siap menjadi <span className="text-blue-600 underline decoration-amber-400 decoration-wavy">Pahlawan Gigi</span>?
        </p>

        {/* Big Start Button */}
        <button
          onClick={() => {
            sound.playClick();
            onStart();
          }}
          className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-heading font-extrabold text-xl sm:text-2xl shadow-xl hover:shadow-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white cursor-pointer"
        >
          <span className="text-2xl sm:text-3xl animate-bounce">🚀</span>
          <span>MULAI PETUALANGAN</span>
        </button>

        <p className="text-xs text-slate-500 mt-4">
          💡 Klik tombol besar di atas untuk memulai petualangan edukasimu!
        </p>
      </div>
    </div>
  );
};
