'use client';

import React, { useState } from 'react';
import { Project3DData } from './WorldData';
import { sounds } from './SoundEffects';

interface HUDOverlayProps {
  speed: number;
  currentZone: string;
  nearestProject: Project3DData | null;
  onOpenProject: (proj: Project3DData) => void;
  onTeleport: (x: number, y: number, z: number) => void;
  onResetCar: () => void;
  onSwitchToClassic: () => void;
  onOpenControlsModal: () => void;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  speed,
  currentZone,
  nearestProject,
  onOpenProject,
  onTeleport,
  onResetCar,
  onSwitchToClassic,
  onOpenControlsModal,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleHonk = () => {
    sounds.playHorn();
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-3 sm:p-5 select-none font-sans">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER BAR: Status, Teleport Navigator, and Actions */}
      {/* ------------------------------------------------------------- */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full pointer-events-auto">
        {/* Brand & 3D Indicator */}
        <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-gray-950 font-black text-xs shadow-md">
            🏎️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-white uppercase">
                NAUFAL 3D WORLD
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono">
              Physics Playground • Bruno Simon Style
            </p>
          </div>
        </div>

        {/* Teleport Quick Navigation Bar */}
        <nav className="flex items-center overflow-x-auto max-w-full gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl">
          <button
            onClick={() => onTeleport(0, 1.2, 0)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Teleport to Plaza"
          >
            <span>🏠</span>
            <span className="hidden sm:inline">Plaza</span>
          </button>
          <button
            onClick={() => onTeleport(23, 1.2, -6)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Teleport to Projects"
          >
            <span>💻</span>
            <span>Projects</span>
          </button>
          <button
            onClick={() => onTeleport(-26, 1.2, 8)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Teleport to Skills"
          >
            <span>⚡</span>
            <span>Skills</span>
          </button>
          <button
            onClick={() => onTeleport(0, 1.2, 14)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Teleport to Career Highway"
          >
            <span>🛣️</span>
            <span>Career</span>
          </button>
          <button
            onClick={() => onTeleport(-4, 1.2, -18)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Teleport to Contact"
          >
            <span>📬</span>
            <span>Contact</span>
          </button>
          <button
            onClick={() => onTeleport(-28, 1.2, -20)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Teleport to Stunt Ramp & Bowling Pins"
          >
            <span>🎳</span>
            <span className="hidden sm:inline">Ramp</span>
          </button>
        </nav>

        {/* Global Controls & Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Manual Book / Controls Guide Button */}
          <button
            onClick={onOpenControlsModal}
            className="px-3.5 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-white flex items-center gap-1.5 font-bold text-xs transition-all cursor-pointer shadow-lg"
            title="Buku Panduan Kontrol & Kamera (Manual Book)"
          >
            <span>📖</span>
            <span className="hidden sm:inline">Panduan Kontrol</span>
          </button>

          {/* Horn button */}
          <button
            onClick={handleHonk}
            className="w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 hover:text-amber-300 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            title="Honk Car Horn (H)"
          >
            <i className="fas fa-bullhorn text-xs"></i>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleSound}
            className="w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            <i className={`fas ${isMuted ? 'fa-volume-mute text-red-400' : 'fa-volume-up text-cyan-400'} text-xs`}></i>
          </button>

          {/* Reset Car Position */}
          <button
            onClick={onResetCar}
            className="w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            title="Reset Car & Objects (R)"
          >
            <i className="fas fa-rotate-left text-xs"></i>
          </button>

          {/* Switch to Classic View Toggle */}
          <button
            onClick={onSwitchToClassic}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer transition-all border border-white/10"
            title="Tampilan Resume Web Tradisional"
          >
            <i className="fas fa-file-lines text-xs"></i>
            <span className="hidden sm:inline">Mode Klasik</span>
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* CENTER FLOATING TOAST: Project Interaction Prompt */}
      {/* ------------------------------------------------------------- */}
      {nearestProject && (
        <div className="self-center pointer-events-auto animate-bounce mb-8">
          <button
            onClick={() => onOpenProject(nearestProject)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-black text-sm tracking-wide shadow-[0_0_35px_rgba(6,182,212,0.5)] flex items-center gap-3 border border-white/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span>KLIK / TEKAN ENTER: BUKA {nearestProject.title.toUpperCase()}</span>
            <i className="fas fa-arrow-up-right-from-square text-xs"></i>
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM FOOTER: Speedometer & Controls Guide Banner */}
      {/* ------------------------------------------------------------- */}
      <footer className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 w-full">
        {/* Speedometer & Active Zone Card */}
        <div className="bg-black/70 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-5 pointer-events-auto">
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block font-bold">
              SPEEDOMETER
            </span>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                {Math.round(speed * 3.6)}
              </span>
              <span className="text-[10px] font-bold text-gray-400">KM/H</span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10"></div>

          <div>
            <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block font-bold">
              CURRENT LOCATION
            </span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              {currentZone}
            </span>
          </div>
        </div>

        {/* Clean Controls Guide Bar */}
        <div className="bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg text-[11px] font-mono text-gray-300 flex flex-wrap items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">MENGEMUDI:</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">W</kbd><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">A</kbd><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">S</kbd><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">D</kbd></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">KAMERA 360°:</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">◀</kbd><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">▲</kbd><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">▼</kbd><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">▶</kbd></span>
          </div>
          <span>•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">SPASI</kbd> Rem</span>
          <span>•</span>
          <button
            onClick={onOpenControlsModal}
            className="text-amber-400 hover:text-amber-300 underline cursor-pointer font-bold ml-1"
          >
            Buka Buku Manual 📖
          </button>
        </div>
      </footer>
    </div>
  );
};
