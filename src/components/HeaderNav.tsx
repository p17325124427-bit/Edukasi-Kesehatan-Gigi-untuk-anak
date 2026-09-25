import React from 'react';
import { Volume2, VolumeX, Shield, Award, RotateCcw, Home } from 'lucide-react';
import { BADGE_TIERS, PlayerInfo } from '../types/game';
import { sound } from '../utils/audio';

interface HeaderNavProps {
  player: PlayerInfo | null;
  score: number;
  lives: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
  onOpenBadges: () => void;
  currentLevelIndex: number; // 0 to 5 (0 = cover/identity, 1-5 = levels)
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  player,
  score,
  lives,
  isMuted,
  onToggleMute,
  onRestart,
  onOpenBadges,
  currentLevelIndex
}) => {
  // Determine highest badge unlocked
  const highestBadge = [...BADGE_TIERS]
    .reverse()
    .find((b) => score >= b.minPoints) || BADGE_TIERS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b-2 border-sky-100 shadow-xs px-3 sm:px-6 py-2.5 sm:py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-sm shadow-sky-300">
            <span className="text-xl">🦷</span>
          </div>
          <div className="hidden xs:block text-left">
            <h1 className="font-heading text-base sm:text-lg font-bold text-sky-900 leading-tight">
              PAHLAWAN GIGI
            </h1>
            <p className="text-[11px] font-medium text-sky-600 truncate max-w-[150px] sm:max-w-none">
              Misi Penyelamat Gigi SD
            </p>
          </div>
        </div>

        {/* HUD: Player, Score, Lives, Badges (only if player is registered) */}
        {player && currentLevelIndex > 0 && (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Player Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="truncate max-w-[110px]">{player.nama}</span>
              <span className="text-sky-400">·</span>
              <span className="text-sky-600">Kelas {player.kelas}</span>
            </div>

            {/* Score Display */}
            <div className="flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-300 shadow-xs text-amber-900 font-bold text-xs sm:text-sm">
              <span className="text-base sm:text-lg animate-bounce">⭐</span>
              <span className="font-mono tracking-tight">{score}</span>
              <span className="text-[10px] text-amber-700 hidden sm:inline uppercase tracking-wide">Poin</span>
            </div>

            {/* Lives */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs">
              {Array.from({ length: 3 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`text-sm transition-all duration-300 ${
                    idx < lives ? 'scale-100 opacity-100' : 'scale-75 opacity-25 grayscale'
                  }`}
                  title={`${lives} Nyawa Tersisa`}
                >
                  ❤️
                </span>
              ))}
            </div>

            {/* Current Badge Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenBadges();
              }}
              title="Lihat Daftar Badge Pahlawan Gigi"
              className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-base">{highestBadge.icon}</span>
              <span className="hidden lg:inline truncate max-w-[100px]">{highestBadge.title}</span>
            </button>
          </div>
        )}

        {/* Quick Actions: Sound Toggle & Home */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            title={isMuted ? 'Nyalakan Suara Game' : 'Matikan Suara'}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-sky-100 active:scale-90 flex items-center justify-center text-slate-600 hover:text-sky-700 transition-colors border border-slate-200 cursor-pointer"
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
          </button>

          {currentLevelIndex > 0 && (
            <button
              onClick={() => {
                sound.playClick();
                onRestart();
              }}
              title="Kembali ke Beranda"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-rose-100 active:scale-90 flex items-center justify-center text-slate-600 hover:text-rose-600 transition-colors border border-slate-200 cursor-pointer"
              aria-label="Kembali ke Menu"
            >
              <Home className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
