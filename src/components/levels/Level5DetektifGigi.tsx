import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Search, Award } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarBurst } from '../../utils/confetti';

interface Level5Props {
  onSuccess: (pointsAwarded: number) => void;
  onAddScore: (points: number) => void;
  onDeductLife: () => void;
}

interface Question {
  id: number;
  scenario: string;
  question: string;
  badge: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    badge: 'Kasus 1: Sarapan Pagi',
    scenario: 'Raka baru saja menghabiskan sarapan nasi goreng dan telur mata sapi yang lezat.',
    question: 'Raka baru selesai sarapan. Apa yang sebaiknya dilakukan?',
    options: [
      { key: 'A', text: 'Langsung makan permen', isCorrect: false },
      { key: 'B', text: 'Menjaga kebersihan gigi dan mulut', isCorrect: true },
      { key: 'C', text: 'Tidak perlu melakukan apa-apa', isCorrect: false }
    ],
    explanation: 'Setelah makan pagi, bersihkan gigi atau berkumur agar sisa makanan tidak diubah oleh bakteri karies menjadi zat asam perusak enamel!'
  },
  {
    id: 2,
    badge: 'Kasus 2: Gigi Terasa Ngilu',
    scenario: 'Dina merasakan giginya ngilu saat minum air dingin dan melihat ada titik hitam kecil di gerahamnya.',
    question: 'Gigi terasa sakit dan ada lubang. Apa yang sebaiknya dilakukan?',
    options: [
      { key: 'A', text: 'Membiarkannya', isCorrect: false },
      { key: 'B', text: 'Mengurangi makan saja', isCorrect: false },
      { key: 'C', text: 'Memeriksakan gigi ke dokter gigi', isCorrect: true }
    ],
    explanation: 'Dokter gigi adalah sahabat terbaik kita! Dokter gigi akan memeriksa dan menambal lubang dengan lembut dan nyaman agar gigi tidak semakin sakit.'
  },
  {
    id: 3,
    badge: 'Kasus 3: Perawatan Berkala',
    scenario: 'Walaupun gigi kita terasa sehat dan tidak sakit, perawatan rutin tetap harus dijaga.',
    question: 'Apakah pemeriksaan gigi secara rutin penting?',
    options: [
      { key: 'A', text: 'Ya, sangat penting minimal 6 bulan sekali', isCorrect: true },
      { key: 'B', text: 'Tidak, cukup kalau sakit saja', isCorrect: false }
    ],
    explanation: 'Pemeriksaan rutin setiap 6 bulan sekali sangat penting untuk mencegah timbulnya karang gigi dan mendeteksi karies sejak dini!'
  }
];

export const Level5DetektifGigi: React.FC<Level5Props> = ({ onSuccess, onAddScore, onDeductLife }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = QUESTIONS[currentIdx];
  const isAnswered = answeredMap[currentQ.id] !== undefined;

  const handleSelectOption = (key: string, isCorrect: boolean) => {
    if (isAnswered) return;

    setSelectedKey(key);
    setShowExplanation(true);
    setAnsweredMap((prev) => ({ ...prev, [currentQ.id]: isCorrect }));

    if (isCorrect) {
      sound.playSuccess();
      fireStarBurst();
      onAddScore(10);
    } else {
      sound.playWrong();
      onDeductLife();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedKey(null);
      setShowExplanation(false);
    } else {
      // Completed all questions in Level 5
      onSuccess(0);
    }
  };

  const allCompleted = Object.keys(answeredMap).length === QUESTIONS.length;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-xl border-4 border-sky-200">
        
        {/* Detective Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-2xl shadow-xs">
              🔍
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Misi Detektif Gigi Sehat
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-800">
                Kasus {currentIdx + 1} dari {QUESTIONS.length}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIdx
                    ? 'bg-sky-500 scale-125'
                    : answeredMap[QUESTIONS[i].id] !== undefined
                    ? 'bg-emerald-400'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scenario Box */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 mb-4">
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">
            {currentQ.badge}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 italic">
            "{currentQ.scenario}"
          </p>
        </div>

        {/* Big Question */}
        <div className="bg-sky-50 rounded-2xl p-4 sm:p-5 border-2 border-sky-200 mb-6 text-center">
          <h2 className="font-heading text-base sm:text-xl font-bold text-sky-950">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            let btnStyle = 'bg-white border-2 border-slate-200 hover:border-sky-400';

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200';
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 opacity-50';
              }
            }

            return (
              <button
                key={opt.key}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.key, opt.isCorrect)}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-3.5 cursor-pointer active:scale-98 ${btnStyle}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-heading font-bold text-sm shrink-0 ${
                    isAnswered && opt.isCorrect
                      ? 'bg-emerald-500 text-white'
                      : isAnswered && isSelected && !opt.isCorrect
                      ? 'bg-rose-500 text-white'
                      : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {opt.key}
                </div>
                <div className="flex-1 font-heading text-sm sm:text-base font-bold text-slate-800">
                  {opt.text}
                </div>
                {isAnswered && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !opt.isCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {showExplanation && (
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm mb-6 animate-fadeIn">
            <div className="font-heading font-bold text-amber-900 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Penjelasan Detektif Gigi:</span>
            </div>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Question / Finish Game Button */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-bold text-base shadow-lg hover:shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{currentIdx < QUESTIONS.length - 1 ? 'Kasus Selanjutnya' : '🎉 Selesaikan Misi!'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
