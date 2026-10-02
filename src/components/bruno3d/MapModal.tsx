'use client';

import React from 'react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  carPos: { x: number; z: number };
  onTeleport: (x: number, y: number, z: number) => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  carPos,
  onTeleport,
}) => {
  if (!isOpen) return null;

  // World bounds: roughly -70 to +70 (140x140 area)
  // Map dimensions: 600x600 px
  const mapSize = 540;
  const worldSize = 140;

  const toMapCoord = (x: number, z: number) => {
    const normX = (x + worldSize / 2) / worldSize;
    const normZ = (z + worldSize / 2) / worldSize;
    return {
      left: `${normX * 100}%`,
      top: `${normZ * 100}%`,
    };
  };

  const currentCarCoord = toMapCoord(carPos.x, carPos.z);

  const locations = [
    { name: 'Welcome Plaza', icon: '🏠', x: 0, y: 1.2, z: 0, desc: 'Central Plaza & 3D Name' },
    { name: 'Featured Projects', icon: '💻', x: 23, y: 1.2, z: -6, desc: 'Interactive 3D Booths' },
    { name: 'Skills Playground', icon: '⚡', x: -26, y: 1.2, z: 8, desc: '15 Crashable Cubes' },
    { name: 'Career Highway', icon: '🛣️', x: 0, y: 1.2, z: 14, desc: 'Overhead Milestones' },
    { name: 'Contact Station', icon: '📬', x: -4, y: 1.2, z: -18, desc: 'Mailbox & Socials' },
    { name: 'Stunt Ramp & Pins', icon: '🎳', x: -28, y: 1.2, z: -20, desc: 'Ramp Jump & Bowling' },
    { name: 'Racing Circuit', icon: '🏎️', x: 26, y: 1.2, z: 24, desc: 'Sirkuit Balap & 3D Leaderboard' },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn select-none font-sans"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#1b1226] border border-[#3f2b57] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col text-white max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#120b1c] border-b border-[#2e2142]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <div>
              <h3 className="text-xs font-black tracking-widest uppercase text-white font-serif">
                WORLD ISLAND MINIMAP (BRUNO SIMON STYLE)
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                Klik ikon lokasi pada peta untuk teleportasi instan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#6b1e2a] hover:bg-[#852535] border border-[#a83244] text-white flex items-center justify-center text-sm transition-all cursor-pointer shadow-md"
            title="Tutup Peta"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Map Canvas Illustration Body (Image 2 style) */}
        <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-[#150f22] overflow-y-auto">
          <div
            className="relative w-full aspect-square max-w-[500px] rounded-3xl overflow-hidden border-2 border-[#432d63] shadow-inner"
            style={{
              background: 'radial-gradient(circle, #2d1d47 0%, #150e26 100%)',
            }}
          >
            {/* SVG Illustration of Island, River, and Racetrack */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Sandy Island Coastline */}
              <path
                d="M 12 18 Q 30 8, 55 12 T 88 20 Q 94 48, 88 78 T 60 90 Q 30 92, 14 80 T 8 45 Z"
                fill="#d97706"
                fillOpacity="0.25"
                stroke="#d97706"
                strokeWidth="1.5"
              />

              {/* Island Ground Grass Area */}
              <path
                d="M 16 22 Q 32 14, 52 16 T 84 24 Q 90 48, 84 74 T 58 86 Q 32 88, 18 76 T 12 45 Z"
                fill="#365314"
                fillOpacity="0.4"
              />

              {/* Flowing Blue River (Sungai Mengalir) */}
              <path
                d="M 14 36 Q 32 40, 42 50 T 56 68 Q 65 78, 88 84"
                stroke="#0284c7"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 14 36 Q 32 40, 42 50 T 56 68 Q 65 78, 88 84"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                fill="none"
              />

              {/* Wooden Bridge Indicator */}
              <rect x="36" y="44" width="7" height="3" fill="#b45309" stroke="#78350f" strokeWidth="0.8" rx="0.5" />

              {/* Racetrack (Sirkuit Balap Sirkular dengan Curbs Merah Putih) */}
              <path
                d="M 60 55 L 82 55 Q 88 55, 88 65 L 88 80 Q 88 88, 80 88 L 62 88 Q 55 88, 55 80 L 55 65 Q 55 55, 60 55 Z"
                stroke="#1e293b"
                strokeWidth="6"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Checkered curbs */}
              <path
                d="M 60 55 L 82 55 Q 88 55, 88 65 L 88 80 Q 88 88, 80 88 L 62 88 Q 55 88, 55 80 L 55 65 Q 55 55, 60 55 Z"
                stroke="#ef4444"
                strokeWidth="6"
                strokeDasharray="2 2"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Center asphalt track */}
              <path
                d="M 60 55 L 82 55 Q 88 55, 88 65 L 88 80 Q 88 88, 80 88 L 62 88 Q 55 88, 55 80 L 55 65 Q 55 55, 60 55 Z"
                stroke="#334155"
                strokeWidth="4"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Finish Line Gantry */}
              <line x1="68" y1="52" x2="68" y2="58" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="1 1" />
            </svg>

            {/* Interactive Location Teleport Pins (Diamond Markers like Image 2) */}
            {locations.map((loc, idx) => {
              const coord = toMapCoord(loc.x, loc.z);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onTeleport(loc.x, loc.y, loc.z);
                    onClose();
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                  style={{ left: coord.left, top: coord.top }}
                  title={`${loc.name} - ${loc.desc}`}
                >
                  {/* Glowing Diamond Marker */}
                  <div className="relative flex items-center justify-center">
                    <span className="w-6 h-6 rotate-45 bg-[#fef08a] border-2 border-white shadow-[0_0_15px_rgba(254,240,138,0.8)] group-hover:scale-125 transition-transform flex items-center justify-center text-[10px]">
                      <span className="-rotate-45 block leading-none">{loc.icon}</span>
                    </span>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-1.5 hidden group-hover:flex flex-col items-center whitespace-nowrap bg-black/90 px-2.5 py-1 rounded-lg border border-white/20 text-[10px] font-bold shadow-xl pointer-events-none">
                      <span className="text-amber-300">{loc.name}</span>
                      <span className="text-[9px] text-gray-400 font-normal">{loc.desc}</span>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Current Car Real-time Position Marker (Image 2 style) */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: currentCarCoord.left, top: currentCarCoord.top }}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-7 h-7 rounded-full bg-cyan-400/40 animate-ping absolute"></span>
                <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 border-2 border-white shadow-[0_0_12px_rgba(251,191,36,0.9)] flex items-center justify-center text-[10px]">
                  🏎️
                </span>
              </div>
            </div>
          </div>

          {/* Quick Legend Bar */}
          <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-3 text-[11px] font-mono text-gray-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Lokasi Mobil Anda</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-yellow-200"></span>
              <span>Pin Zona (Klik untuk Teleport)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-red-500"></span>
              <span>Sirkuit Balap</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-sky-400"></span>
              <span>Sungai Mengalir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
