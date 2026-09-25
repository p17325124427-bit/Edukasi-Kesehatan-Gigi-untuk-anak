import React, { useState } from 'react';
import { ArrowRight, User, School, Sparkles } from 'lucide-react';
import { PlayerInfo } from '../../types/game';
import { sound } from '../../utils/audio';
import { IMAGES } from '../../assets/images';

interface IdentityScreenProps {
  onContinue: (info: PlayerInfo) => void;
}

export const IdentityScreen: React.FC<IdentityScreenProps> = ({ onContinue }) => {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('3');
  const [sekolah, setSekolah] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setErrorMsg('Tulis nama panggilanmu dulu ya!');
      sound.playWrong();
      return;
    }
    setErrorMsg('');
    sound.playSuccess();
    setSubmitted(true);
  };

  const handleStartGame = () => {
    sound.playClick();
    onContinue({
      nama: nama.trim(),
      kelas,
      sekolah: sekolah.trim() || 'SD Sahabat Gigi'
    });
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-200">
        
        {/* Floating tooth hero mini avatar */}
        <div className="mx-auto w-20 h-20 rounded-full bg-sky-100 border-4 border-sky-300 overflow-hidden shadow-md -mt-14 mb-4">
          <img
            src={IMAGES.hero}
            alt="Pahlawan Gigi"
            className="w-full h-full object-cover animate-float"
            referrerPolicy="no-referrer"
          />
        </div>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
                Kartu Tanda Pahlawan Gigi
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800">
                Kenalkan Dirimu!
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Isi nama, kelas, dan sekolahmu untuk memulai misi penyelamatan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" /> Nama Panggilan:
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Budi, Siti, Rian..."
                  className="w-full px-4 py-3 rounded-2xl bg-sky-50/70 border-2 border-sky-200 focus:border-sky-500 focus:bg-white focus:outline-hidden text-slate-800 font-medium placeholder-slate-400 transition-all text-base"
                  required
                />
              </div>

              {/* Kelas SD Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Kelas (SD):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['3', '4', '5', '6'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setKelas(k);
                      }}
                      className={`py-2.5 px-3 rounded-2xl font-heading font-bold text-sm transition-all border-2 cursor-pointer ${
                        kelas === k
                          ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-102'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                      }`}
                    >
                      Kelas {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sekolah Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-sky-600" /> Nama Sekolah (Opsional):
                </label>
                <input
                  type="text"
                  maxLength={50}
                  value={sekolah}
                  onChange={(e) => setSekolah(e.target.value)}
                  placeholder="Contoh: SDN 1 Merdeka..."
                  className="w-full px-4 py-3 rounded-2xl bg-sky-50/70 border-2 border-sky-200 focus:border-sky-500 focus:bg-white focus:outline-hidden text-slate-800 font-medium placeholder-slate-400 transition-all text-base"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center animate-shake">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-heading font-bold text-lg shadow-lg hover:shadow-sky-300 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lanjutkan</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </>
        ) : (
          /* Welcome Card After Name Submitted */
          <div className="text-center py-4 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-inner">
              ✨
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                LEVEL 1 / 5 AKAN DIMULAI
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Halo, <span className="text-sky-600">{nama}</span>!
              </h2>
              <p className="font-heading text-base sm:text-lg font-bold text-amber-600 mt-2">
                Yuk selamatkan gigi bersama Pahlawan Gigi!
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Kalahkan monster karies di 5 level misi penyelamatan!
              </p>
            </div>

            <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 text-left text-xs text-sky-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-sky-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Aturan Main:
              </div>
              <p>• Jawab kuis dan tantangan di setiap level dengan teliti.</p>
              <p>• Kumpulkan ⭐ Poin dan raih lencana 🏆 Pahlawan Gigi Sejati!</p>
            </div>

            <button
              onClick={handleStartGame}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-heading font-bold text-lg shadow-lg hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀 Masuk ke Level 1</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
