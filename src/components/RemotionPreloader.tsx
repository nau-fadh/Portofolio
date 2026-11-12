'use client';

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import {
  IntroTheme,
  PortfolioIntroComposition,
} from './remotion/PortfolioIntroComposition';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const FPS = 30;
const DURATION_IN_FRAMES = 115; // ~3.83s

const BACKDROP_COLORS: Record<IntroTheme, string> = {
  dark: '#1a1a2e',
  light: '#f3f4f6',
  ocean: '#0a192f',
};

const emptySubscribe = () => () => {};

export const RemotionPreloader: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const playerRef = useRef<PlayerRef | null>(null);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const completedRef = useRef(false);

  const finishPreloader = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);

    setTimeout(() => {
      setIsDone(true);
    }, 550);
  }, []);

  useEffect(() => {
    // Prevent background scrolling while intro plays
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Safety fallback timer in case browser pauses rAF in a background tab
    const safetyTimer = setTimeout(() => {
      finishPreloader();
    }, (DURATION_IN_FRAMES / FPS) * 1000 + 800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        finishPreloader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [finishPreloader]);

  // Unlock body scroll as soon as exit animation begins
  useEffect(() => {
    if (isExiting) {
      document.body.style.overflow = '';
    }
  }, [isExiting]);

  // Attach Remotion Player ended listener once mounted on client
  useEffect(() => {
    if (!isClient) return;
    const player = playerRef.current;
    if (!player) return;

    const onEnded = () => {
      finishPreloader();
    };

    player.addEventListener('ended', onEnded);
    return () => {
      player.removeEventListener('ended', onEnded);
    };
  }, [isClient, finishPreloader]);

  if (isDone) return null;

  const currentTheme: IntroTheme = theme || 'dark';
  const currentLang: 'id' | 'en' = language === 'id' ? 'id' : 'en';
  const backdropColor = BACKDROP_COLORS[currentTheme] || BACKDROP_COLORS.dark;

  return (
    <div
      aria-label="Portfolio Loading Intro"
      role="status"
      style={{ backgroundColor: backdropColor }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting
          ? 'opacity-0 -translate-y-3 scale-[1.02] pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      {/* Remotion Composition Player Stage */}
      <div className="w-full max-w-6xl px-2 sm:px-6 flex items-center justify-center">
        {isClient && (
          <Player
            ref={playerRef}
            component={PortfolioIntroComposition}
            inputProps={{
              theme: currentTheme,
              language: currentLang,
            }}
            durationInFrames={DURATION_IN_FRAMES}
            fps={FPS}
            compositionWidth={1280}
            compositionHeight={720}
            autoPlay
            loop={false}
            controls={false}
            clickToPlay={false}
            doubleClickToFullscreen={false}
            spaceKeyToPlayOrPause={false}
            moveToBeginningWhenEnded={false}
            initiallyMuted
            acknowledgeRemotionLicense
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: 'transparent',
            }}
          />
        )}
      </div>

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={finishPreloader}
        className={`fixed bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer border backdrop-blur-md ${
          currentTheme === 'light'
            ? 'bg-white/80 hover:bg-white text-gray-800 border-gray-300 shadow-md'
            : 'bg-white/10 hover:bg-white/20 text-white/90 border-white/15 shadow-lg'
        }`}
      >
        <span>{currentLang === 'id' ? 'Lewati' : 'Skip Intro'}</span>
        <i className="fas fa-forward text-[10px] opacity-80" />
      </button>
    </div>
  );
};

export default RemotionPreloader;
