import React, { useState } from 'react';
import { GameScreen, PlayerInfo, BadgeInfo, BADGE_TIERS } from './types/game';
import { sound } from './utils/audio';
import { HeaderNav } from './components/HeaderNav';
import { LevelProgressBar } from './components/LevelProgressBar';
import { BadgeUnlockModal, AllBadgesModal } from './components/BadgeUnlockModal';
import { CoverScreen } from './components/levels/CoverScreen';
import { IdentityScreen } from './components/levels/IdentityScreen';
import { Level1PenyebabKaries } from './components/levels/Level1PenyebabKaries';
import { Level2MakananSehat } from './components/levels/Level2MakananSehat';
import { Level3SikatGigi } from './components/levels/Level3SikatGigi';
import { Level4WaktuDurasi } from './components/levels/Level4WaktuDurasi';
import { Level5DetektifGigi } from './components/levels/Level5DetektifGigi';
import { VictoryScreen } from './components/levels/VictoryScreen';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('cover');
  const [player, setPlayer] = useState<PlayerInfo | null>(null);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState<number>(17); // 1 (Lvl1) + 10 (Lvl2) + 1 (Lvl3) + 2 (Lvl4) + 3 (Lvl5)
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [unlockedBadge, setUnlockedBadge] = useState<BadgeInfo | null>(null);
  const [allBadgesOpen, setAllBadgesOpen] = useState<boolean>(false);
  const [shownBadgeIds, setShownBadgeIds] = useState<string[]>([]);

  // Check and trigger badge popup on score increases
  const checkNewBadges = (newScore: number) => {
    const newlyUnlocked = BADGE_TIERS.find(
      (b) => newScore >= b.minPoints && !shownBadgeIds.includes(b.id)
    );

    if (newlyUnlocked) {
      setShownBadgeIds((prev) => [...prev, newlyUnlocked.id]);
      setUnlockedBadge(newlyUnlocked);
      sound.playBadge();
    }
  };

  const addScore = (points: number) => {
    setScore((prev) => {
      const updated = prev + points;
      checkNewBadges(updated);
      return updated;
    });
    setCorrectAnswersCount((prev) => prev + 1);
  };

  const deductLife = () => {
    setLives((prev) => {
      if (prev <= 1) {
        // Friendly restorative heart so children never get locked out of learning
        return 1;
      }
      return prev - 1;
    });
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleStartFromCover = () => {
    setScreen('identity');
  };

  const handleRegisterPlayer = (info: PlayerInfo) => {
    setPlayer(info);
    setScreen('level-1');
  };

  // Level progression
  const handleCompleteLevel1 = (pointsAwarded: number) => {
    if (pointsAwarded > 0) {
      addScore(pointsAwarded);
    }
    setCompletedLevels((prev) => (prev.includes(1) ? prev : [...prev, 1]));
    setScreen('level-2');
  };

  const handleCompleteLevel2 = (pointsAwarded: number) => {
    if (pointsAwarded > 0) {
      addScore(pointsAwarded);
    }
    setCompletedLevels((prev) => (prev.includes(2) ? prev : [...prev, 2]));
    setScreen('level-3');
  };

  const handleCompleteLevel3 = (pointsAwarded: number) => {
    if (pointsAwarded > 0) {
      addScore(pointsAwarded);
    }
    setCompletedLevels((prev) => (prev.includes(3) ? prev : [...prev, 3]));
    setScreen('level-4');
  };

  const handleCompleteLevel4 = (pointsAwarded: number) => {
    if (pointsAwarded > 0) {
      addScore(pointsAwarded);
    }
    setCompletedLevels((prev) => (prev.includes(4) ? prev : [...prev, 4]));
    setScreen('level-5');
  };

  const handleCompleteLevel5 = (pointsAwarded: number) => {
    if (pointsAwarded > 0) {
      addScore(pointsAwarded);
    }
    setCompletedLevels((prev) => (prev.includes(5) ? prev : [...prev, 5]));
    setScreen('celebration');
  };

  const handlePlayAgain = () => {
    setScore(0);
    setLives(3);
    setCompletedLevels([]);
    setCorrectAnswersCount(0);
    setShownBadgeIds([]);
    setScreen('level-1');
  };

  const handleGoHome = () => {
    setScore(0);
    setLives(3);
    setCompletedLevels([]);
    setCorrectAnswersCount(0);
    setShownBadgeIds([]);
    setPlayer(null);
    setScreen('cover');
  };

  const getCurrentLevelNumber = (): number => {
    switch (screen) {
      case 'level-1':
        return 1;
      case 'level-2':
        return 2;
      case 'level-3':
        return 3;
      case 'level-4':
        return 4;
      case 'level-5':
        return 5;
      default:
        return 0;
    }
  };

  const currentLevelNum = getCurrentLevelNumber();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-blue-50 to-indigo-50 text-slate-800 antialiased selection:bg-amber-300">
      {/* Top HUD */}
      <HeaderNav
        player={player}
        score={score}
        lives={lives}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onRestart={handleGoHome}
        onOpenBadges={() => setAllBadgesOpen(true)}
        currentLevelIndex={currentLevelNum}
      />

      {/* Level Progress Indicator (shown when playing levels 1-5) */}
      {currentLevelNum > 0 && (
        <LevelProgressBar
          currentLevel={currentLevelNum}
          completedLevels={completedLevels}
        />
      )}

      {/* Screen Router */}
      <main className="flex-1 flex flex-col justify-center">
        {screen === 'cover' && (
          <CoverScreen onStart={handleStartFromCover} />
        )}

        {screen === 'identity' && (
          <IdentityScreen onContinue={handleRegisterPlayer} />
        )}

        {screen === 'level-1' && (
          <Level1PenyebabKaries
            onSuccess={handleCompleteLevel1}
            onDeductLife={deductLife}
          />
        )}

        {screen === 'level-2' && (
          <Level2MakananSehat
            onSuccess={handleCompleteLevel2}
            onAddScore={addScore}
          />
        )}

        {screen === 'level-3' && (
          <Level3SikatGigi
            onSuccess={handleCompleteLevel3}
          />
        )}

        {screen === 'level-4' && (
          <Level4WaktuDurasi
            onSuccess={handleCompleteLevel4}
            onAddScore={addScore}
          />
        )}

        {screen === 'level-5' && (
          <Level5DetektifGigi
            onSuccess={handleCompleteLevel5}
            onAddScore={addScore}
            onDeductLife={deductLife}
          />
        )}

        {screen === 'celebration' && player && (
          <VictoryScreen
            player={player}
            score={score}
            correctAnswersCount={correctAnswersCount}
            totalQuestionsCount={totalQuestionsCount}
            completedLevelsCount={completedLevels.length}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Badge Unlocked Popup */}
      <BadgeUnlockModal
        badge={unlockedBadge}
        onClose={() => setUnlockedBadge(null)}
      />

      {/* Full Badge Shelf Modal */}
      <AllBadgesModal
        isOpen={allBadgesOpen}
        onClose={() => setAllBadgesOpen(false)}
        currentScore={score}
      />
    </div>
  );
}
