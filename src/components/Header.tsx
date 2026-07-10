'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 78;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-2xl transition-all duration-300 ${
        scrolled ? 'scrolled bg-[#1a1a2e]/95 border-opacity-20' : ''
      }`}
    >
      <div className="w-full bg-[#1a1a2e] bg-opacity-80 backdrop-blur-xl rounded-2xl border border-white border-opacity-5 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-2">
        {/* Brand Indicator */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center font-black text-sm tracking-tighter gradient-text hover:scale-105 transition-transform flex-shrink-0"
        >
          NF
        </a>

        {/* Desktop Links */}
        <nav className="hidden sm:flex items-center bg-gray-950 bg-opacity-40 rounded-xl p-1 border border-white border-opacity-5 overflow-x-auto select-none">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="nav-dock-link">
            {t('nav_home')}
          </a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="nav-dock-link">
            {t('nav_skills')}
          </a>
          <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="nav-dock-link">
            {t('nav_projects')}
          </a>
          <a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="nav-dock-link">
            {t('nav_experience')}
          </a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="nav-dock-link">
            {t('nav_contact')}
          </a>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="language-toggle flex">
            <button
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'active' : ''}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={language === 'id' ? 'active' : ''}
            >
              ID
            </button>
          </div>

          {/* Small Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden text-gray-400 hover:text-white p-2.5 transition-colors"
          >
            <i className="fas fa-bars text-sm"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="absolute bottom-full left-0 w-full pb-3">
          <div className="bg-[#1a1a2e] bg-opacity-95 backdrop-blur-lg rounded-2xl border border-white border-opacity-5 p-4 shadow-2xl flex flex-col space-y-2">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="nav-dock-link px-3 py-2 block text-center">
              {t('nav_home')}
            </a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="nav-dock-link px-3 py-2 block text-center">
              {t('nav_skills')}
            </a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="nav-dock-link px-3 py-2 block text-center">
              {t('nav_projects')}
            </a>
            <a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="nav-dock-link px-3 py-2 block text-center">
              {t('nav_experience')}
            </a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="nav-dock-link px-3 py-2 block text-center">
              {t('nav_contact')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
