'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AstraSphereCanvas from './AstraSphereCanvas';
import IDCard from './IDCard';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = language === 'id'
      ? "/assets/CV ATS NAUFAL FADHLURROHMAN V.IND.pdf"
      : "/assets/CV ATS NAUFAL FADHLURROHMAN  V.ENG.pdf";
    link.download = `CV_NAUFAL_FADHLURROHMAN_(${language === 'id' ? 'Indonesia' : 'English'}).pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 78;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden bg-[#080809] text-white flex flex-col justify-between select-none"
    >
      {/* 1. 3D COSMIC-NEURAL SPHERE (ASTRA) CANVAS BACKGROUND */}
      <AstraSphereCanvas />

      {/* Radial Dark Vignette Overlay for Crisp Readability */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(8, 8, 9, 0.25) 0%, rgba(8, 8, 9, 0.85) 75%, #080809 100%)'
        }}
      />

      {/* 2. TOP EDITORIAL BREADCRUMB BAR (Above-the-Fold Header) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-wider text-neutral-400">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-neutral-500 uppercase">Index</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-200 font-semibold uppercase tracking-widest">Naufal Fadhlurrohman</span>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => setShowIdCardModal(!showIdCardModal)}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 hover:text-white transition-all text-[11px] text-neutral-300 cursor-pointer backdrop-blur-md"
            title="Inspect 3D ID Badge"
          >
            <i className="fas fa-id-badge text-cyan-400"></i>
            <span>{showIdCardModal ? 'Close ID Card' : '3D ID Badge'}</span>
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer backdrop-blur-md hover:scale-105"
          >
            {language === 'id' ? 'Kontak / Hire ↗' : 'Connect / Hire ↗'}
          </button>
        </div>
      </div>

      {/* 3. CENTERPIECE EDITORIAL HERO CONTENT */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center my-auto flex flex-col items-center justify-center space-y-5 sm:space-y-6">
        
        {/* Monospaced Top Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
            {language === 'id' ? 'PROFIL REKAYASA • ARSITEKTUR .NET & FULLSTACK' : 'ENGINEERING PROFILE • .NET & FULLSTACK ARCHITECTURE'}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight font-sans leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 drop-shadow-[0_10px_35px_rgba(255,255,255,0.12)]">
          Naufal Fadhlurrohman
        </h1>

        {/* Crisp Editorial Sub-headline */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400 font-sans font-normal tracking-wide">
          {language === 'id'
            ? 'Software Consultant & Spesialis .NET berfokus merancang ekosistem enterprise terdistribusi, arsitektur RESTful API berkinerja tinggi, dan integrasi web modern.'
            : 'Software Consultant & .NET Specialist engineering resilient enterprise systems, high-throughput APIs, and modern computational web architectures.'}
        </p>

        {/* Dual Button Group (OpenAI Style) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => handleScrollTo('projects')}
            className="px-6 sm:px-7 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wide transition-all hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {language === 'id' ? 'Jelajahi Projek & Sistem' : 'Explore Works & Systems'}
          </button>
          
          <button
            onClick={handleDownloadResume}
            className="px-6 sm:px-7 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/25 text-white font-medium text-xs sm:text-sm tracking-wide transition-all backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2 cursor-pointer"
          >
            <span>{language === 'id' ? 'Unduh Resume (CV)' : 'Get Resume (CV)'}</span>
            <span className="text-neutral-400 font-mono text-sm">→</span>
          </button>
        </div>
      </div>

      {/* 4. KEY SPECS TICKER (Bottom of the Viewport) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-8 sm:pb-10 border-t border-white/[0.06] pt-5 sm:pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 font-mono text-[10px] sm:text-xs text-neutral-400">
          
          <div className="flex items-center space-x-3">
            <span className="text-cyan-400 font-bold">01 /</span>
            <span className="uppercase tracking-widest text-neutral-300">Enterprise .NET 8/9 & C#</span>
          </div>

          <div className="flex items-center space-x-3 md:justify-center">
            <span className="text-cyan-400 font-bold">02 /</span>
            <span className="uppercase tracking-widest text-neutral-300">High-Throughput APIs & SQL</span>
          </div>

          <div className="flex items-center space-x-3 md:justify-end">
            <span className="text-cyan-400 font-bold">03 /</span>
            <span className="uppercase tracking-widest text-neutral-300">Agilis Solutions & Astratech</span>
          </div>

        </div>
      </div>

      {/* Optional Modal: Interactive 3D ID Badge */}
      {showIdCardModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-fadeIn"
          onClick={() => setShowIdCardModal(false)}
        >
          <div 
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                PHYSICAL ARTIFACT INSPECTOR
              </span>
              <p className="text-[11px] text-neutral-400">Drag or click the ID Card to interact in 3D</p>
            </div>
            
            <IDCard />

            <button
              onClick={() => setShowIdCardModal(false)}
              className="mt-6 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-neutral-300 font-mono uppercase tracking-wider transition-all"
            >
              Close Inspector [ESC]
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
