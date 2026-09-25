import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

interface LevelProgressBarProps {
  currentLevel: number; // 1 to 5
  totalLevels?: number;
  completedLevels: number[];
}

const LEVEL_NAMES = [
  'Penyebab Karies',
  'Pilih Makanan Sehat',
  'Jago Menyikat Gigi',
  'Waktu & Durasi',
  'Detektif Gigi'
];

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  currentLevel,
  totalLevels = 5,
  completedLevels
}) => {
  const percent = Math.round(((currentLevel - 1) / totalLevels) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3">
      {/* Top Level Title Banner */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-sky-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs">
            LEVEL {currentLevel}/{totalLevels}
          </span>
          <h2 className="font-heading text-sm sm:text-base font-bold text-slate-800">
            {LEVEL_NAMES[currentLevel - 1] || `Level ${currentLevel}`}
          </h2>
        </div>
        <div className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
          Progres: {Math.min(100, Math.round(((completedLevels.length) / totalLevels) * 100))}%
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-3 bg-sky-100 rounded-full overflow-hidden border border-sky-200 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-xs"
          style={{ width: `${Math.max(12, ((currentLevel) / totalLevels) * 100)}%` }}
        ></div>
      </div>

      {/* 5 Step Icons Indicator */}
      <div className="flex justify-between items-center mt-2 px-1">
        {Array.from({ length: totalLevels }).map((_, idx) => {
          const lvlNum = idx + 1;
          const isDone = completedLevels.includes(lvlNum);
          const isCurrent = currentLevel === lvlNum;

          return (
            <div key={lvlNum} className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  isDone
                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-200'
                    : isCurrent
                    ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-200 scale-110'
                    : 'bg-white text-slate-400 border border-slate-200'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : lvlNum}
              </div>
              <span
                className={`text-[10px] sm:text-[11px] mt-1 font-medium hidden sm:inline max-w-[68px] text-center leading-tight truncate ${
                  isCurrent ? 'text-amber-800 font-bold' : isDone ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                Lvl {lvlNum}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
