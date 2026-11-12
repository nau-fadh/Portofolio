'use client';

import React from 'react';
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

export default function Home() {
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
      <ChatWidget />
      <Header />
    </main>
  );
}
