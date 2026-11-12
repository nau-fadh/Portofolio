'use client';

import React, { useEffect } from 'react';
import { Player } from '@remotion/player';
import {
  PROJECT_SCENE_DURATION,
  ProjectShowreelComposition,
  SHOWREEL_PROJECTS,
} from './ProjectShowreelComposition';
import { IntroTheme } from './remotionTheme';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectShowreelModalProps {
  isOpen: boolean;
  selectedIndex: number | null;
  onSelectIndex: (idx: number | null) => void;
  onClose: () => void;
}

export const ProjectShowreelModal: React.FC<ProjectShowreelModalProps> = ({
  isOpen,
  selectedIndex,
  onSelectIndex,
  onClose,
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTheme: IntroTheme = theme || 'dark';
  const currentLang: 'id' | 'en' = language === 'id' ? 'id' : 'en';
  const isSingle = typeof selectedIndex === 'number';
  const durationInFrames = isSingle
    ? PROJECT_SCENE_DURATION
    : PROJECT_SCENE_DURATION * SHOWREEL_PROJECTS.length;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Remotion Project Showreel"
    >
      <div
        className="w-full max-w-5xl rounded-2xl overflow-hidden border border-cyan-500/25 bg-[#12182b] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Project Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0d1221]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#4cc9f0]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
              REMOTION // PROJECT SHOWREEL
            </span>
          </div>

          {/* Quick Scene Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectIndex(null)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                selectedIndex === null
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {currentLang === 'id' ? 'Semua (4)' : 'All (4)'}
            </button>
            {SHOWREEL_PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                0{idx + 1}. {p.title[currentLang].split(' ')[0]}
              </button>
            ))}

            <button
              type="button"
              onClick={onClose}
              className="ml-2 w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Remotion Showreel"
            >
              <i className="fas fa-times text-xs" />
            </button>
          </div>
        </div>

        {/* Remotion Player */}
        <div className="w-full bg-black">
          <Player
            key={`${selectedIndex ?? 'all'}-${currentTheme}-${currentLang}`}
            component={ProjectShowreelComposition}
            inputProps={{
              theme: currentTheme,
              language: currentLang,
              projectIndex: selectedIndex,
            }}
            durationInFrames={durationInFrames}
            fps={30}
            compositionWidth={1280}
            compositionHeight={720}
            autoPlay
            loop
            controls
            initiallyMuted
            acknowledgeRemotionLicense
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
            }}
          />
        </div>
      </div>
    </div>
  );
};
