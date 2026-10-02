'use client';

import React from 'react';

interface ControlsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlsGuideModal: React.FC<ControlsGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0f172a] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1e293b]/70 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <div>
              <h3 className="text-sm font-black text-white tracking-wider uppercase">
                Buku Panduan Kontrol & Kamera (Manual Book)
              </h3>
              <p className="text-[11px] text-gray-400 font-mono">
                Portofolio 3D Interaktif Naufal Fadhlurrohman
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Tutup Panduan"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
          {/* Section 1: Driving Controls */}
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
              <i className="fas fa-car-side"></i>
              <span>1. Kontrol Mengemudi Mobil Mainan</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs">Maju / Tancap Gas</span>
                <kbd className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-lg font-mono font-bold text-xs">
                  W
                </kbd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs">Mundur / Rem</span>
                <kbd className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-lg font-mono font-bold text-xs">
                  S
                </kbd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs">Belok Kiri</span>
                <kbd className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-lg font-mono font-bold text-xs">
                  A
                </kbd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs">Belok Kanan</span>
                <kbd className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-lg font-mono font-bold text-xs">
                  D
                </kbd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs">Rem Tangan / Drift</span>
                <kbd className="px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded-lg font-mono font-bold text-xs">
                  SPASI
                </kbd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs">Klakson Mobil</span>
                <kbd className="px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded-lg font-mono font-bold text-xs">
                  H
                </kbd>
              </div>
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs">Reset Mobil & Balok Ke Tempat Semula</span>
                <kbd className="px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded-lg font-mono font-bold text-xs">
                  R
                </kbd>
              </div>
            </div>
          </div>

          {/* Section 2: Camera Orbit Controls */}
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
              <i className="fas fa-video"></i>
              <span>2. Kontrol Sudut Kamera (360° View)</span>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
              <p className="text-xs text-cyan-200 leading-relaxed">
                Gunakan <strong>Tombol Panah Keyboard</strong> untuk menggeser dan memutar sudut pandang kamera mengelilingi mobil:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <kbd className="px-2 py-1 bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 rounded font-mono font-bold">
                    ◀ Panah Kiri
                  </kbd>
                  <span>Putar Kamera ke Kiri</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <kbd className="px-2 py-1 bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 rounded font-mono font-bold">
                    ▶ Panah Kanan
                  </kbd>
                  <span>Putar Kamera ke Kanan</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <kbd className="px-2 py-1 bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 rounded font-mono font-bold">
                    ▲ Panah Atas
                  </kbd>
                  <span>Sudut Atas (Top-down)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <kbd className="px-2 py-1 bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 rounded font-mono font-bold">
                    ▼ Panah Bawah
                  </kbd>
                  <span>Sudut Bawah (Low angle)</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 pt-1">
                💡 <em>Tip: Anda juga bisa mengklik dan menggeser (drag) kursor mouse di layar untuk memutar kamera secara bebas.</em>
              </p>
            </div>
          </div>

          {/* Section 3: Exploration & Projects */}
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <i className="fas fa-compass"></i>
              <span>3. Eksplorasi Proyek & Zona</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Kemudikan mobil mendekati booth pameran proyek di <strong>Zona Projects</strong>, lalu tekan{' '}
              <kbd className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded font-mono font-bold">
                ENTER
              </kbd>{' '}
              atau klik tombol notifikasi yang muncul untuk membuka detail lengkap dan repository GitHub.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#1e293b]/50 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-gray-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
          >
            Siap Mengemudi! 🏎️
          </button>
        </div>
      </div>
    </div>
  );
};
