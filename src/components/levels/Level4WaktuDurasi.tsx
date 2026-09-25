import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check, Sparkles, ArrowRight, Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarBurst } from '../../utils/confetti';

interface Level4Props {
  onSuccess: (pointsAwarded: number) => void;
  onAddScore: (points: number) => void;
}

export const Level4WaktuDurasi: React.FC<Level4Props> = ({ onSuccess, onAddScore }) => {
  // Sub-task 1: Select both morning and night
  const [selectedMorning, setSelectedMorning] = useState(false);
  const [selectedNight, setSelectedNight] = useState(false);
  const [hasScoredTask1, setHasScoredTask1] = useState(false);

  // Sub-task 2: Duration question
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [hasScoredTask2, setHasScoredTask2] = useState(false);

  // Timer Simulation State (2 minutes = 120s)
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);

  // Check task 1 completion
  useEffect(() => {
    if (selectedMorning && selectedNight && !hasScoredTask1) {
      sound.playSuccess();
      fireStarBurst();
      setHasScoredTask1(true);
      onAddScore(10);
    }
  }, [selectedMorning, selectedNight, hasScoredTask1, onAddScore]);

  // Check task 2 duration
  const handleSelectDuration = (val: string) => {
    setSelectedDuration(val);
    if (val === '2 menit') {
      sound.playSuccess();
      fireStarBurst();
      if (!hasScoredTask2) {
        setHasScoredTask2(true);
        onAddScore(10);
      }
    } else {
      sound.playWrong();
    }
  };

  // Timer simulation countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            sound.playVictory();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const toggleTimer = () => {
    sound.playClick();
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    sound.playClick();
    setTimerRunning(false);
    setTimerSeconds(120);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isLevelCompleted = hasScoredTask1 && hasScoredTask2;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-xl border-4 border-sky-200">
        
        {/* Level Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Misi Waktu & Durasi
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
            Kapan & Berapa Lama Harus Menyikat Gigi?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Ketahui ritme terbaik melindungi gigimu setiap hari dari kuman karies!
          </p>
        </div>

        {/* Pertanyaan 1: Waktu Menyikat Gigi */}
        <div className="p-5 rounded-2xl bg-sky-50/70 border-2 border-sky-200 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900">
              Kapan waktu yang tepat untuk menyikat gigi?
            </h3>
          </div>
          <p className="text-xs text-sky-700 mb-4 ml-8">
            (Petunjuk: Ada 2 waktu penting. Pilih keduanya ya!)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Pilihan 1: Setelah Sarapan */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedMorning(!selectedMorning);
              }}
              className={`p-4 rounded-2xl border-3 flex items-center gap-3.5 transition-all cursor-pointer text-left ${
                selectedMorning
                  ? 'bg-amber-50 border-amber-400 ring-4 ring-amber-100 shadow-md scale-102'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Sun className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="font-heading text-base font-bold text-slate-800">
                  ☀️ Setelah sarapan
                </div>
                <div className="text-xs text-slate-500">
                  Bersihkan sisa makanan sarapan pagi
                </div>
              </div>
              {selectedMorning && <Check className="w-6 h-6 text-amber-600 shrink-0" />}
            </button>

            {/* Pilihan 2: Sebelum Tidur */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedNight(!selectedNight);
              }}
              className={`p-4 rounded-2xl border-3 flex items-center gap-3.5 transition-all cursor-pointer text-left ${
                selectedNight
                  ? 'bg-indigo-50 border-indigo-400 ring-4 ring-indigo-100 shadow-md scale-102'
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Moon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="font-heading text-base font-bold text-slate-800">
                  🌙 Sebelum tidur
                </div>
                <div className="text-xs text-slate-500">
                  Lindungi gigi dari kuman sepanjang malam
                </div>
              </div>
              {selectedNight && <Check className="w-6 h-6 text-indigo-600 shrink-0" />}
            </button>
          </div>

          {hasScoredTask1 && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <span className="text-base">🌟</span>
              <span>
                Tepat sekali! Sikat gigi minimal 2 kali sehari: pagi setelah sarapan dan malam sebelum tidur (+10 Poin).
              </span>
            </div>
          )}
        </div>

        {/* Pertanyaan 2: Berapa lama sebaiknya menyikat gigi? */}
        <div className="p-5 rounded-2xl bg-sky-50/70 border-2 border-sky-200 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900">
              Berapa lama sebaiknya menyikat gigi?
            </h3>
          </div>
          <p className="text-xs text-sky-700 mb-4 ml-8">
            Pilihlah durasi yang direkomendasikan dokter gigi:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {['30 detik', '1 menit', '2 menit', '10 menit'].map((duration) => {
              const isSelected = selectedDuration === duration;
              const isCorrect = duration === '2 menit';

              let style = 'bg-white border-2 border-slate-200 hover:border-sky-300 text-slate-700';
              if (isSelected) {
                if (isCorrect) {
                  style = 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-105';
                } else {
                  style = 'bg-rose-100 border-rose-400 text-rose-800';
                }
              }

              return (
                <button
                  key={duration}
                  onClick={() => handleSelectDuration(duration)}
                  className={`py-3 px-3 rounded-2xl font-heading font-bold text-sm sm:text-base text-center transition-all cursor-pointer active:scale-95 ${style}`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1 opacity-80" />
                  <span>{duration}</span>
                </button>
              );
            })}
          </div>

          {selectedDuration === '2 menit' && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <span className="text-base">⭐</span>
              <span>
                Hebat! 2 menit (120 detik) adalah waktu yang pas agar semua sudut gigi bersih tuntas tanpa merusak gusi (+10 Poin).
              </span>
            </div>
          )}

          {selectedDuration && selectedDuration !== '2 menit' && (
            <div className="mt-3 p-3 rounded-xl bg-rose-100/70 border border-rose-300 text-rose-900 text-xs font-semibold flex items-center gap-2 animate-shake">
              <span className="text-base">🤔</span>
              <span>
                Kurang tepat! Kalau terlalu cepat kotoran belum hilang, kalau terlalu lama gusi bisa lecet. Coba pilih lagi!
              </span>
            </div>
          )}
        </div>

        {/* Lucu: 2-Minute Timer Simulation */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-100 via-indigo-50 to-blue-100 border-2 border-sky-300 text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl animate-spin">⏱️</span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-slate-800">
              Timer Sikat Gigi 2 Menit Pahlawan
            </h4>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Kamu bisa gunakan timer ini saat menyikat gigi di rumah lho!
          </p>

          {/* Big Digital Display & Mascot */}
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="text-4xl animate-bounce">🦷</div>
            <div className="px-6 py-2.5 rounded-2xl bg-white border-2 border-sky-300 shadow-md font-mono text-3xl sm:text-4xl font-black text-sky-800 tracking-wider">
              {formatTimer(timerSeconds)}
            </div>
            <div className="text-4xl animate-float">🪥</div>
          </div>

          {/* Progress Bar of Timer */}
          <div className="w-full max-w-xs mx-auto h-2.5 bg-sky-200 rounded-full overflow-hidden my-3">
            <div
              className="h-full bg-sky-500 transition-all duration-300 rounded-full"
              style={{ width: `${((120 - timerSeconds) / 120) * 100}%` }}
            ></div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={toggleTimer}
              className={`px-5 py-2 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                timerRunning
                  ? 'bg-amber-400 hover:bg-amber-500 text-amber-950'
                  : 'bg-sky-500 hover:bg-sky-600 text-white'
              }`}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{timerRunning ? 'Jeda' : timerSeconds === 120 ? 'Mulai Timer' : 'Lanjut'}</span>
            </button>
            <button
              onClick={resetTimer}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 font-bold text-xs sm:text-sm flex items-center gap-1 border border-slate-200 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Level Proceed Button */}
        <div className="pt-3 border-t border-slate-100 text-right">
          {isLevelCompleted ? (
            <button
              onClick={() => {
                sound.playClick();
                onSuccess(0); // Score was added live on answers
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-bold text-base shadow-lg hover:shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Level 5 (Detektif Gigi)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <p className="text-xs text-slate-400 text-center">
              Selesaikan kedua pertanyaan di atas untuk lanjut ke Level 5!
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
