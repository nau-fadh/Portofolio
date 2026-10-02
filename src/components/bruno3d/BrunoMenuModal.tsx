'use client';

import React, { useState } from 'react';
import { sounds } from './SoundEffects';

interface BrunoMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeleport: (x: number, y: number, z: number) => void;
  onResetCar: () => void;
  onSwitchToClassic: () => void;
}

export const BrunoMenuModal: React.FC<BrunoMenuModalProps> = ({
  isOpen,
  onClose,
  onTeleport,
  onResetCar,
  onSwitchToClassic,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'controls' | 'teleport' | 'settings'>('home');
  const [isMuted, setIsMuted] = useState(sounds.getIsMuted());

  if (!isOpen) return null;

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn select-none font-sans"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#181124] border border-[#3b2d54] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col text-white max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Bruno Simon Style Tab Icons */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#120b1c] border-b border-[#2e2142]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-gray-400">
              NAUFAL 3D PORTFOLIO
            </span>
          </div>

          {/* Tab Navigation Icons + Close Button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all cursor-pointer border ${
                activeTab === 'home'
                  ? 'bg-[#2e2142] text-amber-400 border-amber-400/40 shadow-md'
                  : 'bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10'
              }`}
              title="Home / Overview"
            >
              <i className="fas fa-home"></i>
            </button>

            <button
              onClick={() => setActiveTab('controls')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all cursor-pointer border ${
                activeTab === 'controls'
                  ? 'bg-[#2e2142] text-amber-400 border-amber-400/40 shadow-md'
                  : 'bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10'
              }`}
              title="Game Controls"
            >
              <i className="fas fa-gamepad"></i>
            </button>

            <button
              onClick={() => setActiveTab('teleport')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all cursor-pointer border ${
                activeTab === 'teleport'
                  ? 'bg-[#2e2142] text-amber-400 border-amber-400/40 shadow-md'
                  : 'bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10'
              }`}
              title="Zones Teleport"
            >
              <i className="fas fa-map-location-dot"></i>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all cursor-pointer border ${
                activeTab === 'settings'
                  ? 'bg-[#2e2142] text-amber-400 border-amber-400/40 shadow-md'
                  : 'bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10'
              }`}
              title="Settings & Mode"
            >
              <i className="fas fa-gear"></i>
            </button>

            {/* Red Accent Close Button (Bruno Simon style) */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#6b1e2a] hover:bg-[#852535] border border-[#a83244] text-white flex items-center justify-center text-sm transition-all cursor-pointer shadow-md ml-1"
              title="Close Menu (Esc)"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {/* TAB 1: HOME (Bruno Simon Style) */}
          {activeTab === 'home' && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-serif">
                NAUFAL'S WORLD
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Welcome!
                </p>
                <p>
                  My name is <strong className="text-white">Naufal Fadhlurrohman</strong>, and I'm a{' '}
                  <strong className="text-amber-400 font-semibold">.NET & Fullstack Developer</strong> based in Indonesia.
                </p>
                <p>
                  This is my 3D interactive physics playground. Please drive around to learn more about my skills, featured projects, and career journey.
                </p>
                <p className="text-amber-300/90 font-medium">
                  And don't break anything! (Or crash through the skills block pyramid if you want to have fun!)
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-400/25 cursor-pointer flex items-center gap-2"
                >
                  <span>Mulai Mengemudi</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
                <button
                  onClick={() => setActiveTab('teleport')}
                  className="px-5 py-3 rounded-2xl bg-[#2e2142] hover:bg-[#3b2d54] text-gray-200 font-bold text-xs tracking-wide transition-all border border-white/10 cursor-pointer"
                >
                  Jelajahi Lokasi Zona
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CONTROLS */}
          {activeTab === 'controls' && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                GAME & CAMERA CONTROLS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#241a33] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">Tancap Gas / Maju</span>
                    <span className="text-gray-400 text-[11px]">Drive Forward</span>
                  </div>
                  <kbd className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-xl font-mono font-bold text-sm">
                    W
                  </kbd>
                </div>

                <div className="bg-[#241a33] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">Mundur / Rem</span>
                    <span className="text-gray-400 text-[11px]">Reverse / Slow Down</span>
                  </div>
                  <kbd className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-xl font-mono font-bold text-sm">
                    S
                  </kbd>
                </div>

                <div className="bg-[#241a33] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">Belok Kiri</span>
                    <span className="text-gray-400 text-[11px]">Steer Left</span>
                  </div>
                  <kbd className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-xl font-mono font-bold text-sm">
                    A
                  </kbd>
                </div>

                <div className="bg-[#241a33] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">Belok Kanan</span>
                    <span className="text-gray-400 text-[11px]">Steer Right</span>
                  </div>
                  <kbd className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-xl font-mono font-bold text-sm">
                    D
                  </kbd>
                </div>

                <div className="bg-[#241a33] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">Rem Tangan / Drift</span>
                    <span className="text-gray-400 text-[11px]">Handbrake</span>
                  </div>
                  <kbd className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-xl font-mono font-bold text-xs">
                    SPASI
                  </kbd>
                </div>

                <div className="bg-[#241a33] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">Klakson Mobil</span>
                    <span className="text-gray-400 text-[11px]">Honk Horn</span>
                  </div>
                  <kbd className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-xl font-mono font-bold text-xs">
                    H
                  </kbd>
                </div>
              </div>

              {/* Camera 360 Box */}
              <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  🎥 Kamera 360° Bebas (Tombol Panah Keyboard)
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Gunakan tombol <kbd className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-mono">◀</kbd> dan <kbd className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-mono">▶</kbd> untuk memutar sudut pandang mengelilingi mobil, serta <kbd className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-mono">▲</kbd> dan <kbd className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-mono">▼</kbd> untuk menaikkan/menurunkan elevasi kamera.
                </p>
                <p className="text-[11px] text-gray-400">
                  <em>Anda juga bisa mengklik dan menggeser (drag) mouse di layar untuk memutar kamera secara bebas.</em>
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TELEPORT ZONES */}
          {activeTab === 'teleport' && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                PILIH ZONA TELEPORTASI
              </h2>
              <p className="text-xs text-gray-300">
                Klik salah satu zona di bawah ini untuk meluncurkan mobil Anda langsung ke lokasi tujuan:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    onTeleport(0, 1.2, 0);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-[#241a33] hover:bg-[#34254b] border border-white/10 hover:border-amber-400/40 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <span className="text-2xl">🏠</span>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors block">
                      Welcome Plaza
                    </span>
                    <span className="text-[11px] text-gray-400">Pusat billboard dan marka penunjuk jalan</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onTeleport(23, 1.2, -6);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-[#241a33] hover:bg-[#34254b] border border-white/10 hover:border-cyan-400/40 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <span className="text-2xl">💻</span>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors block">
                      Featured Projects
                    </span>
                    <span className="text-[11px] text-gray-400">Booth pameran interaktif 4 proyek unggulan</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onTeleport(-26, 1.2, 8);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-[#241a33] hover:bg-[#34254b] border border-white/10 hover:border-rose-400/40 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <span className="text-2xl">⚡</span>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors block">
                      Skills Playground
                    </span>
                    <span className="text-[11px] text-gray-400">Piramida 15 balok keahlian yang bisa ditabrak</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onTeleport(0, 1.2, 14);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-[#241a33] hover:bg-[#34254b] border border-white/10 hover:border-blue-400/40 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <span className="text-2xl">🛣️</span>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors block">
                      Career Highway
                    </span>
                    <span className="text-[11px] text-gray-400">Jalan tol riwayat karir dan beasiswa Astra</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onTeleport(-4, 1.2, -18);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-[#241a33] hover:bg-[#34254b] border border-white/10 hover:border-emerald-400/40 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <span className="text-2xl">📬</span>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors block">
                      Contact & Social
                    </span>
                    <span className="text-[11px] text-gray-400">WhatsApp, Email, LinkedIn, dan GitHub</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onTeleport(-28, 1.2, -20);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-[#241a33] hover:bg-[#34254b] border border-white/10 hover:border-purple-400/40 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <span className="text-2xl">🎳</span>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors block">
                      Stunt Ramp & Bowling
                    </span>
                    <span className="text-[11px] text-gray-400">Tanjakan akrobat dan 10 pin bowling fisik</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS & MODE */}
          {activeTab === 'settings' && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                SETTINGS & DISPLAY MODE
              </h2>
              <div className="space-y-3">
                {/* Audio Toggle */}
                <div className="p-4 rounded-2xl bg-[#241a33] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{isMuted ? '🔇' : '🔊'}</span>
                    <div>
                      <span className="text-sm font-bold text-white block">Efek Suara Mesin & Lingkungan</span>
                      <span className="text-[11px] text-gray-400">Web Audio API engine, horn, and hit sound effects</span>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleSound}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isMuted
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {isMuted ? 'Muted (Mati)' : 'Active (Aktif)'}
                  </button>
                </div>

                {/* Reset Car Position */}
                <div className="p-4 rounded-2xl bg-[#241a33] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔄</span>
                    <div>
                      <span className="text-sm font-bold text-white block">Reset Posisi Mobil & Balok</span>
                      <span className="text-[11px] text-gray-400">Kembalikan mobil ke plaza dan bangun ulang balok</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onResetCar();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer"
                  >
                    Reset (R)
                  </button>
                </div>

                {/* Switch to Classic Web Portfolio Mode */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                  <div>
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <i className="fas fa-file-lines text-blue-400"></i>
                      <span>Mode Klasik (Web Resume Tradisional)</span>
                    </span>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Bagi rekruter atau HR yang ingin membaca resume format teks formal secara cepat.
                    </span>
                  </div>
                  <button
                    onClick={onSwitchToClassic}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer whitespace-nowrap"
                  >
                    Beralih ke Web Klasik
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
