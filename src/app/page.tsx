'use client';

import React, { useEffect } from 'react';
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

export default function Home() {
  useEffect(() => {
    // 1. Blokir Klik Kanan
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Blokir Shortcuts Inspect Element
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
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
      <Header />
    </main>
  );
}
