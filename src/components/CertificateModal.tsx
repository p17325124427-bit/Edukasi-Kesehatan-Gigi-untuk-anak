import React from 'react';
import { X, Printer, Award, ShieldCheck } from 'lucide-react';
import { PlayerInfo, BadgeInfo } from '../types/game';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  player: PlayerInfo;
  score: number;
  highestBadge: BadgeInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  player,
  score,
  highestBadge,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 my-auto text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-amber-400 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50/50 via-white to-sky-50/40 text-center relative overflow-hidden">
          
          {/* Watermark Logo Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 pointer-events-none select-none">
            🦷
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-amber-600" /> Sertifikat Penghargaan Resmi
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-amber-950 uppercase tracking-tight">
            PAHLAWAN GIGI SEJATI
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            Diberikan sebagai apresiasi keberhasilan menyelamatkan gigi dari Monster Karies
          </p>

          <div className="my-6 py-2 border-y-2 border-dashed border-amber-200">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Diberikan Kepada:
            </p>
            <h3 className="font-heading text-3xl sm:text-4xl font-black text-sky-700 my-1">
              {player.nama}
            </h3>
            <p className="text-sm font-bold text-slate-700">
              Kelas {player.kelas} SD · {player.sekolah}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-6">
            Telah menyelesaikan seluruh tantangan 5 Level Petualangan Pahlawan Gigi dengan perolehan skor <span className="font-black text-amber-700">{score} Poin</span> dan berhak menyandang gelar kehormatan:
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-amber-200 border-2 border-amber-400 shadow-xs mb-6">
            <span className="text-2xl">{highestBadge.icon}</span>
            <span className="font-heading font-extrabold text-base sm:text-lg text-amber-950">
              {highestBadge.title}
            </span>
          </div>

          {/* Footer Signatures */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs">
            <div>
              <p className="text-slate-400">Tanggal Penyelesaian:</p>
              <p className="font-bold text-slate-700">{currentDate}</p>
            </div>
            <div>
              <p className="text-slate-400">Tim Pahlawan Gigi:</p>
              <p className="font-bold text-sky-700 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Sahabat Gigi Sehat SD
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-between gap-3 mt-5">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
