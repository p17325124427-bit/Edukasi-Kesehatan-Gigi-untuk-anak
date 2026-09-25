export interface PlayerInfo {
  nama: string;
  kelas: string;
  sekolah: string;
}

export type GameScreen =
  | 'cover'
  | 'identity'
  | 'level-1'
  | 'level-2'
  | 'level-3'
  | 'level-4'
  | 'level-5'
  | 'celebration';

export interface BadgeInfo {
  id: string;
  minPoints: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
}

export const BADGE_TIERS: BadgeInfo[] = [
  {
    id: 'badge-pemula',
    minPoints: 10,
    title: 'Pemula Pahlawan Gigi',
    subtitle: 'Langkah pertama melawan monster karies!',
    icon: '🥉',
    color: 'text-amber-700',
    bgGradient: 'from-amber-100 to-amber-200 border-amber-300'
  },
  {
    id: 'badge-teman',
    minPoints: 30,
    title: 'Teman Gigi Sehat',
    subtitle: 'Tahu cara merawat gigi tetap bersih!',
    icon: '🥈',
    color: 'text-slate-700',
    bgGradient: 'from-slate-100 to-sky-200 border-sky-300'
  },
  {
    id: 'badge-penjaga',
    minPoints: 50,
    title: 'Penjaga Gigi',
    subtitle: 'Pelindung enamel yang tangguh!',
    icon: '🛡️',
    color: 'text-emerald-700',
    bgGradient: 'from-emerald-100 to-teal-200 border-emerald-300'
  },
  {
    id: 'badge-super',
    minPoints: 70,
    title: 'Super Pahlawan Gigi',
    subtitle: 'Kekuatan sikat gigi tingkat tinggi!',
    icon: '⚡',
    color: 'text-indigo-700',
    bgGradient: 'from-indigo-100 to-purple-200 border-purple-300'
  },
  {
    id: 'badge-sejati',
    minPoints: 90,
    title: '🏆 PAHLAWAN GIGI SEJATI 🏆',
    subtitle: 'Juara penyelamat gigi dari karies!',
    icon: '👑',
    color: 'text-amber-600',
    bgGradient: 'from-amber-200 via-yellow-200 to-amber-300 border-amber-400'
  }
];
