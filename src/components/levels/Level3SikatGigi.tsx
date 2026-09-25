import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Check, Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarBurst } from '../../utils/confetti';

interface Level3Props {
  onSuccess: (pointsAwarded: number) => void;
}

interface StepItem {
  id: number;
  text: string;
  icon: string;
  correctIndex: number;
}

const INITIAL_STEPS: StepItem[] = [
  { id: 1, text: 'Sikat bagian luar gigi', icon: '🪥', correctIndex: 0 },
  { id: 2, text: 'Sikat bagian dalam gigi', icon: '✨', correctIndex: 1 },
  { id: 3, text: 'Sikat permukaan untuk mengunyah', icon: '🦷', correctIndex: 2 },
  { id: 4, text: 'Sikat gigi bagian atas dan bawah dengan gerakan yang benar', icon: '🔄', correctIndex: 3 },
  { id: 5, text: 'Bersihkan lidah', icon: '👅', correctIndex: 4 },
  { id: 6, text: 'Berkumur secukupnya', icon: '💧', correctIndex: 5 }
];

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure not accidentally already ordered
  if (arr.every((item, idx) => (item as unknown as StepItem).correctIndex === idx)) {
    return [arr[1], arr[0], ...arr.slice(2)];
  }
  return arr;
}

export const Level3SikatGigi: React.FC<Level3Props> = ({ onSuccess }) => {
  const [steps, setSteps] = useState<StepItem[]>(() => shuffleArray(INITIAL_STEPS));
  const [isVerified, setIsVerified] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [bubbleCount, setBubbleCount] = useState(5);
  const [brushingActive, setBrushingActive] = useState(true);

  // Move step up or down
  const handleMove = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;

    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setSteps(newSteps);
    setFeedback(null);
  };

  // Drag and drop support
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (isNaN(dragIndex) || dragIndex === dropIndex) return;

    sound.playClick();
    const newSteps = [...steps];
    const draggedItem = newSteps[dragIndex];
    newSteps.splice(dragIndex, 1);
    newSteps.splice(dropIndex, 0, draggedItem);
    setSteps(newSteps);
    setFeedback(null);
  };

  const checkOrder = () => {
    const isCorrect = steps.every((step, index) => step.correctIndex === index);
    if (isCorrect) {
      sound.playSuccess();
      fireStarBurst();
      setIsVerified(true);
      setFeedback('Hebat! Kamu sudah tahu langkah menjaga gigi tetap bersih!');
    } else {
      sound.playWrong();
      setFeedback('Urutan belum pas nih! Coba periksa lagi dari sikat bagian luar hingga berkumur.');
    }
  };

  const handleAddBubble = () => {
    sound.playScrub();
    setBubbleCount((c) => (c < 12 ? c + 1 : c));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-xl border-4 border-sky-200">
        
        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Misi Urutan Sikat Gigi
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
            Jago Menyikat Gigi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            “Susun langkah menyikat gigi dengan urutan yang tepat!”
            <br />
            <span className="text-sky-600 font-medium">Gunakan tombol ⬆️ / ⬇️ atau tarik kartu untuk mengurutkan langkah 1 sampai 6.</span>
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-2.5 mb-6">
          {steps.map((step, idx) => {
            const isCorrectSlot = isVerified && step.correctIndex === idx;

            return (
              <div
                key={step.id}
                draggable={!isVerified}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, idx)}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                  isVerified
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-white border-sky-200 hover:border-sky-400 shadow-xs'
                }`}
              >
                {/* Step Number Badge */}
                <div className="w-8 h-8 rounded-full bg-sky-500 text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {idx + 1}
                </div>

                <div className="text-2xl shrink-0">{step.icon}</div>

                {/* Step Text */}
                <div className="flex-1 font-heading text-sm sm:text-base font-bold text-slate-800">
                  {step.text}
                </div>

                {/* Reorder Buttons (Up / Down) */}
                {!isVerified && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      title="Geser Naik"
                      className="w-8 h-8 rounded-xl bg-sky-100 hover:bg-sky-200 disabled:opacity-30 disabled:hover:bg-sky-100 text-sky-800 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === steps.length - 1}
                      title="Geser Turun"
                      className="w-8 h-8 rounded-xl bg-sky-100 hover:bg-sky-200 disabled:opacity-30 disabled:hover:bg-sky-100 text-sky-800 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {isVerified && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback message */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold mb-6 flex items-center gap-3 ${
              isVerified
                ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-400'
                : 'bg-amber-50 text-amber-900 border-2 border-amber-300'
            }`}
          >
            <span className="text-2xl">{isVerified ? '🌟' : '🤔'}</span>
            <p className="flex-1">{feedback}</p>
          </div>
        )}

        {/* Brushing Animation Showcase (When Verified!) */}
        {isVerified && (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-300 text-center mb-6 animate-fadeIn">
            <h4 className="font-heading font-bold text-sky-950 text-base mb-1">
              🪥 Simulasi Sikat Gigi Bergerak
            </h4>
            <p className="text-xs text-sky-700 mb-4">
              Ketuk gigi untuk menambahkan busa pembersih gigi!
            </p>

            <div
              onClick={handleAddBubble}
              className="relative mx-auto w-44 h-44 rounded-3xl bg-white border-4 border-sky-200 shadow-md flex items-center justify-center cursor-pointer select-none group"
              title="Ketuk gigi!"
            >
              {/* Tooth */}
              <span className="text-7xl group-hover:scale-105 transition-transform">
                🦷
              </span>

              {/* Animated Toothbrush */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-5xl animate-float translate-x-4 -translate-y-4">
                  🪥
                </span>
              </div>

              {/* Sparkling Clean Stars */}
              <span className="absolute top-2 right-3 text-xl animate-sparkle">✨</span>
              <span className="absolute bottom-3 left-4 text-lg animate-sparkle">✨</span>

              {/* Foam bubbles */}
              {Array.from({ length: bubbleCount }).map((_, i) => (
                <span
                  key={i}
                  className="absolute text-sm animate-pulse opacity-90"
                  style={{
                    top: `${15 + (i * 14) % 70}%`,
                    left: `${15 + (i * 22) % 70}%`
                  }}
                >
                  🫧
                </span>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 mt-2">
              (Gigi bersih berkilau, kuman karies pergi menjauh!)
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {!isVerified ? (
            <button
              onClick={checkOrder}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-heading font-bold text-base shadow-lg hover:shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-5 h-5" />
              <span>Periksa Urutan Langkah</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onSuccess(10);
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-bold text-base shadow-lg hover:shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Level 4 (+10 Poin)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
