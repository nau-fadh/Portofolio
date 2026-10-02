'use client';

import React from 'react';

interface StartOverlayProps {
  onStart: () => void;
}

export const StartOverlay: React.FC<StartOverlayProps> = ({ onStart }) => {
  return (
    <div
      onClick={onStart}
      className="fixed inset-0 z-40 flex items-center justify-center cursor-pointer select-none bg-transparent transition-opacity duration-700 animate-fadeIn"
      title="Klik di mana saja untuk mulai bermain"
    >
      {/* Floating Prompt near the illuminated car circle (Image 1 style) */}
      <div className="absolute top-[42%] right-[10%] sm:right-[20%] transform -translate-y-1/2 flex flex-col items-center space-y-2 pointer-events-auto text-white group hover:scale-105 transition-transform">
        {/* Curled hand-drawn arrow pointing to the car on the left */}
        <div className="flex items-center gap-2">
          <span className="text-3xl sm:text-4xl transform -rotate-12 animate-pulse text-amber-300">
            ⤹
          </span>
          <span className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-serif">
            CLICK TO START
          </span>
        </div>

        {/* Audio speaker indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-200 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-lg">
          <span className="text-base text-amber-300">🔊</span>
          <span className="tracking-wider">SOUND ON</span>
        </div>
      </div>
    </div>
  );
};
