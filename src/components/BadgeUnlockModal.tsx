import React from 'react';
import { X, Award, Sparkles, Check } from 'lucide-react';
import { BADGE_TIERS, BadgeInfo } from '../types/game';
import { sound } from '../utils/audio';

interface BadgeUnlockModalProps {
  badge: BadgeInfo | null;
  onClose: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl border-4 border-amber-300 transform scale-100 animate-pulse-subtle">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration sparkles */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-300 flex items-center justify-center text-5xl shadow-lg border-4 border-white mb-3">
          <span className="animate-bounce">{badge.icon}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Badge Baru Terbuka!
        </div>

        <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">
          {badge.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 px-2">
          {badge.subtitle}
        </p>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-semibold mb-5">
          ⭐ Dicapai pada skor minimal {badge.minPoints} Poin!
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-heading font-bold text-base shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          🎉 Kereeen, Lanjutkan!
        </button>
      </div>
    </div>
  );
};

interface AllBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore: number;
}

export const AllBadgesModal: React.FC<AllBadgesModalProps> = ({
  isOpen,
  onClose,
  currentScore
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border-2 border-sky-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-800">
                Koleksi Badge Pahlawan
              </h3>
              <p className="text-xs text-slate-500">Skor Kamu Saat Ini: {currentScore} Poin</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {BADGE_TIERS.map((tier) => {
            const isUnlocked = currentScore >= tier.minPoints;
            return (
              <div
                key={tier.id}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                  isUnlocked
                    ? `bg-gradient-to-r ${tier.bgGradient} shadow-xs`
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked ? 'bg-white shadow-xs' : 'bg-slate-200 grayscale'
                  }`}
                >
                  {tier.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-heading text-sm font-bold text-slate-900 truncate">
                      {tier.title}
                    </h4>
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        <Check className="w-3 h-3" /> Terbuka
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full shrink-0">
                        {tier.minPoints} Poin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                    {tier.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="mt-5 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-all cursor-pointer"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
