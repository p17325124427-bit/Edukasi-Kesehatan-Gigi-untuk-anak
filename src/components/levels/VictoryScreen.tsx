import React, { useEffect, useState } from 'react';
import { RotateCcw, Home, Award, Sparkles, CheckCircle2, ShieldCheck, Heart, FileText } from 'lucide-react';
import { PlayerInfo, BadgeInfo, BADGE_TIERS } from '../../types/game';
import { sound } from '../../utils/audio';
import { fireVictoryConfetti } from '../../utils/confetti';
import { IMAGES } from '../../assets/images';
import { CertificateModal } from '../CertificateModal';

interface VictoryScreenProps {
  player: PlayerInfo;
  score: number;
  correctAnswersCount: number;
  totalQuestionsCount: number;
  completedLevelsCount: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  player,
  score,
  correctAnswersCount,
  totalQuestionsCount,
  completedLevelsCount,
  onPlayAgain,
  onGoHome
}) => {
  const [showCertificate, setShowCertificate] = useState(false);

  // Highest badge calculation
  const highestBadge: BadgeInfo =
    [...BADGE_TIERS].reverse().find((b) => score >= b.minPoints) || BADGE_TIERS[BADGE_TIERS.length - 1];

  const accuracyPercent = Math.min(
    100,
    Math.round((correctAnswersCount / Math.max(1, totalQuestionsCount)) * 100)
  );

  const meetsTarget = accuracyPercent >= 80;

  useEffect(() => {
    sound.playVictory();
    fireVictoryConfetti();
    const timer = setTimeout(() => {
      fireVictoryConfetti();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-8 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-[36px] p-6 sm:p-10 shadow-2xl border-4 border-amber-300 text-center">
        
        {/* Top Trophy Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-md mb-4 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>MISI PENYELAMATAN BERHASIL 100%</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Big Celebration Headline */}
        <h1 className="font-heading text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-sky-600 to-indigo-600 tracking-tight mb-2">
          🎉 SELAMAT, {player.nama.toUpperCase()}! 🎉
        </h1>
        <p className="font-heading text-lg sm:text-2xl font-bold text-slate-800 mb-6">
          Kamu berhasil menjadi <span className="text-amber-600 underline decoration-sky-400">PAHLAWAN GIGI!</span>
        </p>

        {/* Hero Celebration Graphic & Badge Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-6 max-w-2xl mx-auto">
          {/* Victory Character Image */}
          <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden bg-gradient-to-tr from-amber-100 to-yellow-200 p-2 shadow-lg border-4 border-white">
            <img
              src={IMAGES.victory}
              alt="Pahlawan Gigi Merayakan Kemenangan"
              className="w-full h-full object-cover rounded-2xl animate-float"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-3 right-3 text-3xl">🏆</span>
          </div>

          {/* Earned Badge Showcase Card */}
          <div className="bg-gradient-to-b from-amber-50 to-yellow-100 rounded-3xl p-5 border-2 border-amber-300 text-center shadow-md">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              Lencana Tertinggi Diperoleh:
            </span>
            <div className="text-5xl sm:text-6xl my-2 animate-bounce">
              {highestBadge.icon}
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-amber-950">
              {highestBadge.title}
            </h3>
            <p className="text-xs text-amber-800 mt-1 font-medium">
              {highestBadge.subtitle}
            </p>

            <button
              onClick={() => {
                sound.playClick();
                setShowCertificate(true);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-heading font-bold text-xs border border-amber-300 shadow-xs flex items-center justify-center gap-1.5 mx-auto transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Lihat & Cetak Sertifikat</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto my-6">
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="text-2xl">⭐</span>
            <div className="font-heading text-xl sm:text-2xl font-bold text-sky-900 mt-1">
              {score}
            </div>
            <div className="text-[11px] font-semibold text-sky-700">Total Skor</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-2xl">🎯</span>
            <div className="font-heading text-xl sm:text-2xl font-bold text-emerald-900 mt-1">
              {correctAnswersCount}
            </div>
            <div className="text-[11px] font-semibold text-emerald-700">Jawaban Benar</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200">
            <span className="text-2xl">🎮</span>
            <div className="font-heading text-xl sm:text-2xl font-bold text-indigo-900 mt-1">
              5 / 5
            </div>
            <div className="text-[11px] font-semibold text-indigo-700">Level Selesai</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-2xl">📊</span>
            <div className="font-heading text-xl sm:text-2xl font-bold text-amber-900 mt-1">
              {accuracyPercent}%
            </div>
            <div className="text-[11px] font-semibold text-amber-700">Ketepatan Jawaban</div>
          </div>
        </div>

        {/* Indikator Keberhasilan Edukasi */}
        <div
          className={`p-4 rounded-2xl max-w-2xl mx-auto mb-6 text-xs sm:text-sm font-semibold flex items-center gap-3 text-left ${
            meetsTarget
              ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-950'
              : 'bg-sky-50 border-2 border-sky-300 text-sky-950'
          }`}
        >
          <div className="text-2xl">🌟</div>
          <div>
            <div className="font-heading font-bold text-sm">
              Indikator Keberhasilan Belajar:
            </div>
            <p className="mt-0.5">
              “Setelah bermain, anak mampu menjawab minimal 80% pertanyaan dengan benar.”
              {meetsTarget && (
                <span className="block font-bold text-emerald-700 mt-0.5">
                  ✅ TARGET TERCAPAI! Kamu memahami dengan sangat baik cara menjaga kesehatan gigimu!
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Pesan Edukasi Utama */}
        <div className="p-6 rounded-3xl bg-sky-50/90 border-2 border-sky-200 max-w-2xl mx-auto text-left mb-8 shadow-xs">
          <h3 className="font-heading text-base sm:text-lg font-bold text-sky-950 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            Ingat Pesan Pahlawan Gigi Setiap Hari:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            <li className="flex items-center gap-2">
              <span className="text-base">🦷</span>
              <span><strong>Menyikat gigi 2 kali sehari</strong> (setelah sarapan pagi & malam sebelum tidur)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">⏱️</span>
              <span><strong>Selama sekitar 2 menit</strong> agar semua sudut gigi bersih maksimal</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">🥗</span>
              <span><strong>Memilih makanan yang baik</strong> (buah, sayur, susu) & kurangi makanan manis</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">💧</span>
              <span><strong>Banyak minum air putih</strong> untuk membilas kotoran di mulut</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">👩⚕️</span>
              <span><strong>Memeriksakan gigi secara rutin</strong> ke dokter gigi setiap 6 bulan sekali</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-bold text-base shadow-lg hover:shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Lagi</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-heading font-bold text-base border-2 border-slate-200 shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-5 h-5 text-sky-600" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        player={player}
        score={score}
        highestBadge={highestBadge}
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
    </div>
  );
};
