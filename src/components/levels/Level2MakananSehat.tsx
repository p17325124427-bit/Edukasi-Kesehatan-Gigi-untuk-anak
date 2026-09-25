import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarBurst } from '../../utils/confetti';

interface Level2Props {
  onSuccess: (pointsAwarded: number) => void;
  onAddScore: (points: number) => void;
}

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: 'good' | 'limit';
  tip: string;
}

const FOOD_ITEMS: FoodItem[] = [
  { id: 'susu', name: 'Susu Segar', emoji: '🥛', category: 'good', tip: 'Kaya kalsium & vitamin D untuk kuatkan tulang dan enamel gigi!' },
  { id: 'keju', name: 'Keju Lezat', emoji: '🧀', category: 'good', tip: 'Membantu menetralkan asam di mulut dan memberi kalsium.' },
  { id: 'wortel', name: 'Wortel Renyah', emoji: '🥕', category: 'good', tip: 'Mengunyah wortel renyah merangsang air liur pembersih gigi alami.' },
  { id: 'apel', name: 'Apel Segar', emoji: '🍎', category: 'good', tip: 'Serat alaminya membantu membersihkan plak dan menyegarkan mulut.' },
  { id: 'ikan', name: 'Ikan Bergizi', emoji: '🐟', category: 'good', tip: 'Mengandung protein dan mineral fosfor untuk melindungi gigi.' },
  { id: 'brokoli', name: 'Brokoli Hijau', emoji: '🥦', category: 'good', tip: 'Sayuran kaya serat dan nutrisi pelindung gusi sehat.' },
  { id: 'permen', name: 'Permen Manis', emoji: '🍭', category: 'limit', tip: 'Gula lengket mudah menempel di sela gigi dan mengundang karies!' },
  { id: 'cokelat', name: 'Cokelat Manis', emoji: '🍫', category: 'limit', tip: 'Mengandung gula tinggi, batasi dan segera berkumur setelah makan.' },
  { id: 'minuman', name: 'Minuman Manis', emoji: '🥤', category: 'limit', tip: 'Soda dan sirup asam manis dapat mengikis lapisan pelindung gigi.' },
  { id: 'donat', name: 'Donat Bergula', emoji: '🍩', category: 'limit', tip: 'Tepung dan gula halus menempel lama pada gigi jika tidak disikat.' }
];

export const Level2MakananSehat: React.FC<Level2Props> = ({ onSuccess, onAddScore }) => {
  const [unplaced, setUnplaced] = useState<FoodItem[]>(FOOD_ITEMS);
  const [goodBasket, setGoodBasket] = useState<FoodItem[]>([]);
  const [limitBasket, setLimitBasket] = useState<FoodItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [lastFeedback, setLastFeedback] = useState<{ message: string; isGood: boolean } | null>(null);
  const [draggedItem, setDraggedItem] = useState<FoodItem | null>(null);

  // Sorting logic
  const handleSortItem = (item: FoodItem, targetCategory: 'good' | 'limit') => {
    if (item.category === targetCategory) {
      sound.playSuccess();
      fireStarBurst();
      onAddScore(10);

      // Move item to appropriate basket
      if (targetCategory === 'good') {
        setGoodBasket((prev) => [...prev, item]);
      } else {
        setLimitBasket((prev) => [...prev, item]);
      }
      setUnplaced((prev) => prev.filter((f) => f.id !== item.id));
      setSelectedItem(null);
      setLastFeedback({
        message: `Benar! ${item.name}: ${item.tip}`,
        isGood: true
      });
    } else {
      sound.playWrong();
      setLastFeedback({
        message: `Kurang tepat! ${item.name} sebaiknya dimasukkan ke kategori yang lain ya. Coba lagi!`,
        isGood: false
      });
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, item: FoodItem) => {
    e.dataTransfer.setData('text/plain', item.id);
    setDraggedItem(item);
  };

  const handleDrop = (e: React.DragEvent, targetCategory: 'good' | 'limit') => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const item = FOOD_ITEMS.find((f) => f.id === itemId) || draggedItem;
    if (item && unplaced.some((f) => f.id === item.id)) {
      handleSortItem(item, targetCategory);
    }
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const isCompleted = unplaced.length === 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-sky-200">
        
        {/* Header Title */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Misi Pemilahan Makanan
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
            Bantu Pahlawan Gigi Memilih Makanan!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
            Tarik (drag) makanan atau <span className="font-bold text-sky-600">ketuk makanan lalu ketuk kotaknya</span> untuk memasukkannya ke kelompok yang benar. Setiap jawaban benar = +10 Poin!
          </p>
        </div>

        {/* Live Feedback Banner */}
        {lastFeedback && (
          <div
            className={`p-3 rounded-2xl mb-4 text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all ${
              lastFeedback.isGood
                ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-2 border-amber-300'
            }`}
          >
            <span className="text-lg">{lastFeedback.isGood ? '🌟' : '💡'}</span>
            <p className="flex-1">{lastFeedback.message}</p>
          </div>
        )}

        {/* Unplaced Items Pool */}
        {unplaced.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-sky-50/80 border-2 border-sky-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wide">
                Piring Makanan ({unplaced.length} tersisa):
              </span>
              {selectedItem && (
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full animate-pulse">
                  Terpilih: {selectedItem.name} (Ketuk kotak di bawah!)
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {unplaced.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onClick={() => {
                      sound.playClick();
                      setSelectedItem(isSelected ? null : item);
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl bg-white border-2 text-center cursor-pointer transition-all select-none shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 ${
                      isSelected
                        ? 'border-amber-400 ring-4 ring-amber-200 bg-amber-50/60 scale-105'
                        : 'border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl mb-1">{item.emoji}</div>
                    <div className="font-heading text-xs font-bold text-slate-800 truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Tarik / Ketuk</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2 Target Baskets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          {/* Basket 1: Makanan Baik untuk Gigi */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'good')}
            onClick={() => {
              if (selectedItem) {
                handleSortItem(selectedItem, 'good');
              }
            }}
            className={`relative rounded-3xl p-4 sm:p-5 border-4 transition-all min-h-[220px] flex flex-col ${
              selectedItem
                ? 'border-emerald-400 bg-emerald-50/60 cursor-pointer hover:bg-emerald-100/50 shadow-md'
                : 'border-emerald-300 bg-emerald-50/40'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-200 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🦷</span>
                <h3 className="font-heading text-sm sm:text-base font-bold text-emerald-900">
                  MAKANAN BAIK UNTUK GIGI
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-xs">
                {goodBasket.length}/6
              </span>
            </div>

            {selectedItem && (
              <div className="p-2 mb-2 rounded-xl bg-emerald-200 text-emerald-900 text-center text-xs font-bold animate-pulse">
                👉 Ketuk di sini untuk memasukkan {selectedItem.name}!
              </div>
            )}

            {goodBasket.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-emerald-600/70 text-xs text-center border-2 border-dashed border-emerald-300 rounded-2xl p-4">
                <ShieldCheck className="w-8 h-8 mb-1" />
                <span>Tarik makanan sehat ke sini (Susu, Buah, Sayur, dsb)</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 flex-1 content-start">
                {goodBasket.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl bg-white border border-emerald-200 shadow-xs text-center animate-fadeIn"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="text-[11px] font-bold text-emerald-900 truncate mt-0.5">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basket 2: Makanan yang Perlu Dibatasi */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'limit')}
            onClick={() => {
              if (selectedItem) {
                handleSortItem(selectedItem, 'limit');
              }
            }}
            className={`relative rounded-3xl p-4 sm:p-5 border-4 transition-all min-h-[220px] flex flex-col ${
              selectedItem
                ? 'border-amber-400 bg-amber-50/60 cursor-pointer hover:bg-amber-100/50 shadow-md'
                : 'border-amber-300 bg-amber-50/40'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-amber-200 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="font-heading text-sm sm:text-base font-bold text-amber-900">
                  MAKANAN PERLU DIBATASI
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-xs">
                {limitBasket.length}/4
              </span>
            </div>

            {selectedItem && (
              <div className="p-2 mb-2 rounded-xl bg-amber-200 text-amber-900 text-center text-xs font-bold animate-pulse">
                👉 Ketuk di sini untuk memasukkan {selectedItem.name}!
              </div>
            )}

            {limitBasket.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-amber-600/70 text-xs text-center border-2 border-dashed border-amber-300 rounded-2xl p-4">
                <AlertTriangle className="w-8 h-8 mb-1" />
                <span>Tarik makanan manis & lengket ke sini</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1 content-start">
                {limitBasket.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl bg-white border border-amber-200 shadow-xs text-center animate-fadeIn"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="text-[11px] font-bold text-amber-900 truncate mt-0.5">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Completion Banner */}
        {isCompleted && (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-400 text-center my-4 animate-fadeIn">
            <span className="text-3xl">🎉</span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-emerald-950 mt-1">
              Luar Biasa! Semua Makanan Berhasil Dipilah!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1">
              Kamu berhasil mengumpulkan 100 Poin dari membedakan makanan sehat dan manis!
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onSuccess(0); // Points were already added live per item!
              }}
              className="mt-4 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-base shadow-lg hover:shadow-emerald-200 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Level 3</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
