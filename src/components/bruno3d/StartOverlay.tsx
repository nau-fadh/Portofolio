'use client';

import React from 'react';

interface StartOverlayProps {
  onStart: () => void;
}

export const StartOverlay: React.FC<StartOverlayProps> = ({ onStart }) => {
  return (
    <div
      onClick={onStart}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center cursor-pointer select-none bg-black/25 backdrop-blur-[2px] transition-opacity duration-700 animate-fadeIn"
      title="Klik di mana saja untuk mulai bermain"
    >
      {/* Hand-drawn style floating prompt next to car */}
      <div className="relative flex flex-col items-center text-center space-y-3 pointer-events-auto transform -translate-y-6 sm:-translate-y-12">
        {/* Curled animated arrow pointing down to car */}
        <div className="text-white text-3xl sm:text-4xl animate-bounce">
          ⤹
        </div>

        {/* Handwritten / Stylized Title */}
        <div className="bg-[#120b1c]/80 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(251,191,36,0.25)] flex flex-col items-center space-y-2 hover:scale-105 transition-transform">
          <span className="text-2xl sm:text-4xl font-black tracking-widest text-white uppercase font-serif drop-shadow-md">
            CLICK TO START
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
            <span className="text-base">🔊</span>
            <span className="tracking-wide">SOUND ON • PRESS ANY KEY OR CLICK</span>
          </div>
        </div>

        {/* Small subtitle indicator */}
        <span className="text-[11px] font-mono text-gray-300 bg-black/60 px-3 py-1 rounded-full border border-white/10">
          Naufal Fadhlurrohman • 3D Driving Portfolio
        </span>
      </div>
    </div>
  );
};
