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
          <Header onSwitchTo3D={() => setViewMode('3d')} />
        </main>
      )}
    </>
  );
}
