'use client';

import React from 'react';
import { Project3DData } from './WorldData';

interface HUDOverlayProps {
  speed: number;
  currentZone: string;
  nearestProject: Project3DData | null;
  onOpenProject: (proj: Project3DData) => void;
  onOpenMenu: () => void;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  speed,
  currentZone,
  nearestProject,
  onOpenProject,
  onOpenMenu,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-4 sm:p-6 select-none font-sans">
      {/* ------------------------------------------------------------- */}
      {/* TOP BAR: Minimal Branding + Single Corner Menu Button (Image 4) */}
      {/* ------------------------------------------------------------- */}
      <header className="flex items-center justify-between w-full pointer-events-auto">
        {/* Brand & Status */}
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

        {/* Bruno Simon Signature Corner Menu Button (Image 4) */}
        <button
          onClick={onOpenMenu}
          className="w-12 h-12 rounded-2xl bg-[#5c1b2c]/90 hover:bg-[#732338] border border-[#a83244]/60 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 group"
          title="Buka Menu Portofolio (Home, Controls, Teleport, Settings)"
          aria-label="Open Bruno Simon Menu"
        >
          <span className="w-5 h-[2px] bg-white rounded-full group-hover:bg-amber-300 transition-colors"></span>
          <span className="w-5 h-[2px] bg-white rounded-full group-hover:bg-amber-300 transition-colors"></span>
          <span className="w-5 h-[2px] bg-white rounded-full group-hover:bg-amber-300 transition-colors"></span>
        </button>
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
      {/* BOTTOM FOOTER: Speedometer & Clean Controls Guide (No Manual Book Link) */}
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

        {/* Clean Controls Hint Bar */}
        <div className="bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg text-[11px] font-mono text-gray-300 flex flex-wrap items-center gap-2.5 pointer-events-auto">
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
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">H</kbd> Klakson</span>
        </div>
      </footer>
    </div>
  );
};
