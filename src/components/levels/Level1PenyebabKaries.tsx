import React, { useState } from 'react';
import { ArrowRight, RotateCcw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarBurst } from '../../utils/confetti';
import { IMAGES } from '../../assets/images';

interface Level1Props {
  onSuccess: (pointsAwarded: number) => void;
  onDeductLife: () => void;
}

interface ChoiceItem {
  id: string;
  label: string;
  emoji: string;
  isCorrect: boolean;
  desc: string;
}

const CHOICES: ChoiceItem[] = [
  {
    id: 'permen',
    label: 'Permen dan makanan manis',
    emoji: '🍭',
    isCorrect: true,
    desc: 'Mengandung banyak gula yang diubah kuman menjadi asam perusak gigi.'
  },
  {
    id: 'wortel',
    label: 'Wortel segar',
    emoji: '🥕',
    isCorrect: false,
    desc: 'Wortel renyah membantu membersihkan gigi dan kaya vitamin A.'
  },
  {
    id: 'brokoli',
    label: 'Brokoli hijau',
    emoji: '🥦',
    isCorrect: false,
    desc: 'Sayuran kaya serat dan kalsium yang menyehatkan gigi.'
  },
  {
    id: 'ikan',
    label: 'Ikan bergizi',
    emoji: '🐟',
    isCorrect: false,
    desc: 'Ikan mengandung protein dan fosfor untuk memperkuat enamel gigi.'
  }
];

export const Level1PenyebabKaries: React.FC<Level1Props> = ({ onSuccess, onDeductLife }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [hasScored, setHasScored] = useState(false);

  const handleSelect = (item: ChoiceItem) => {
    setSelectedId(item.id);
    if (item.isCorrect) {
      sound.playSuccess();
      fireStarBurst();
      setStatus('correct');
      if (!hasScored) {
        setHasScored(true);
      }
    } else {
      sound.playWrong();
      setStatus('wrong');
      onDeductLife();
    }
  };

  const handleRetry = () => {
    sound.playClick();
    setSelectedId(null);
    setStatus('idle');
  };

  const handleProceed = () => {
    sound.playClick();
    onSuccess(hasScored ? 10 : 0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      {/* Question Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-200">
        
        {/* Level Header with cute characters badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-sky-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-xs">
              🍭
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Misi Deteksi Bahaya
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-800">
                Kenali Penyebab Gigi Berlubang
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={IMAGES.monster}
              alt="Monster Karies"
              className="w-10 h-10 rounded-full border-2 border-pink-300 object-cover animate-wiggle"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Monster Karies Mengintai!
            </span>
          </div>
        </div>

        {/* Big Question Prompt */}
        <div className="bg-sky-50 rounded-2xl p-4 sm:p-5 border-2 border-sky-200 text-center mb-6">
          <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-sky-950">
            “Manakah yang dapat menyebabkan gigi berlubang jika terlalu sering dikonsumsi?”
          </p>
          <p className="text-xs sm:text-sm text-sky-700 mt-1">
            Pilihlah salah satu makanan di bawah ini! 👇
          </p>
        </div>

        {/* 4 Choices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
          {CHOICES.map((choice) => {
            const isSelected = selectedId === choice.id;
            let cardStyle =
              'bg-white border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50/50';

            if (isSelected) {
              if (choice.isCorrect) {
                cardStyle = 'bg-emerald-50 border-4 border-emerald-500 shadow-md ring-4 ring-emerald-200';
              } else {
                cardStyle = 'bg-rose-50 border-4 border-rose-500 shadow-md ring-4 ring-rose-200';
              }
            }

            return (
              <button
                key={choice.id}
                onClick={() => handleSelect(choice)}
                disabled={status === 'correct'}
                className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 flex items-center gap-4 cursor-pointer active:scale-98 ${cardStyle}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                  {choice.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-slate-800">
                    {choice.label}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {choice.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        {status === 'correct' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 mb-6 flex flex-col sm:flex-row items-center gap-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-200 flex items-center justify-center text-2xl shrink-0">
              ⭐
            </div>
            <div className="text-center sm:text-left flex-1">
              <h4 className="font-heading font-bold text-base sm:text-lg text-emerald-800 flex items-center justify-center sm:justify-start gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Hebat! Jawabanmu Benar! (+10 Poin)
              </h4>
              <p className="text-xs sm:text-sm text-emerald-700 mt-1">
                Makanan dan minuman manis yang terlalu sering dikonsumsi dapat meningkatkan risiko gigi berlubang karena gula menjadi makanan empuk bagi bakteri karies!
              </p>
            </div>
          </div>
        )}

        {status === 'wrong' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-900 mb-6 flex flex-col sm:flex-row items-center gap-4 animate-shake">
            <div className="w-14 h-14 rounded-full bg-rose-200 flex items-center justify-center text-2xl shrink-0">
              🤔
            </div>
            <div className="text-center sm:text-left flex-1">
              <h4 className="font-heading font-bold text-base sm:text-lg text-rose-800 flex items-center justify-center sm:justify-start gap-1.5">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                Coba lagi!
              </h4>
              <p className="text-xs sm:text-sm text-rose-700 mt-1">
                Perhatikan makanan yang mengandung banyak gula dan mudah menempel di sela-sela gigi ya.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons: Coba Lagi / Lanjut ➜ */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          {status === 'wrong' ? (
            <button
              onClick={handleRetry}
              className="px-6 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-heading font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>
          ) : (
            <div className="text-xs text-slate-400">
              Pilih satu jawaban terbaik untuk melanjutkan.
            </div>
          )}

          {status === 'correct' && (
            <button
              onClick={handleProceed}
              className="ml-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-bold text-base shadow-lg hover:shadow-emerald-200 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Lanjut ke Level 2</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {status === 'wrong' && (
            <button
              onClick={handleProceed}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline cursor-pointer"
            >
              Lewati & Lanjut ➜
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
