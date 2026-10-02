'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import CanvasBackground from '../components/CanvasBackground';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import ApiSimulator from '../components/ApiSimulator';
import TextReveal from '../components/TextReveal';
import DinoGame from '../components/DinoGame';
import Contact from '../components/Contact';
import ChatWidget from '../components/ChatWidget';

// Dynamic import with SSR disabled for Three.js canvas to ensure clean browser-only rendering
const WorldCanvas = dynamic(
  () => import('../components/bruno3d/WorldCanvas').then((mod) => mod.WorldCanvas),
  { ssr: false }
);

export default function Home() {
  const [viewMode, setViewMode] = useState<'3d' | 'classic'>('3d');

  return (
    <>
      {viewMode === '3d' ? (
        <div className="relative w-screen h-screen overflow-hidden">
          <WorldCanvas onSwitchToClassic={() => setViewMode('classic')} />
          {/* Floating AI Assistant Chat Bubble also accessible in 3D World */}
          <ChatWidget />
        </div>
      ) : (
        <main className="min-h-screen relative">
          {/* Top Banner to switch back to 3D Bruno Simon mode */}
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] animate-bounce">
            <button
              onClick={() => setViewMode('3d')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-gray-950 font-black text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-2.5 cursor-pointer border border-white/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>🏎️</span>
              <span>KEMBALI KE 3D WORLD (BRUNO SIMON)</span>
              <i className="fas fa-play text-[10px]"></i>
            </button>
          </div>

          <CanvasBackground />
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <ApiSimulator />
          <TextReveal />
          <DinoGame />
          <Contact />
          <ChatWidget />
          <Header />
        </main>
      )}
    </>
  );
}
