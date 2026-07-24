'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
        scrolled ? 'scrolled bg-card-bg/95 border-opacity-20' : ''
      }`}
    >
      <div className="w-full bg-card-bg bg-opacity-80 backdrop-blur-xl rounded-2xl border border-white border-opacity-5 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between gap-2 transition-colors duration-300">
        {/* Brand Indicator */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center font-black text-sm tracking-tighter gradient-text hover:scale-105 transition-transform flex-shrink-0 border border-white/5"
        >
          NF
        </a>

        {/* Desktop Links */}
        <nav className="hidden sm:flex items-center bg-bg bg-opacity-40 rounded-xl p-1 border border-white border-opacity-5 overflow-x-auto select-none transition-colors duration-300">
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
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl bg-bg bg-opacity-40 hover:bg-opacity-80 border border-white border-opacity-5 flex items-center justify-center text-gray-400 hover:text-primary transition-all cursor-pointer text-xs"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun text-yellow-400' : 'fa-moon text-blue-500'}`}></i>
          </button>

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
            className="sm:hidden text-gray-400 hover:text-primary p-2.5 transition-colors"
          >
            <i className="fas fa-bars text-sm"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="absolute bottom-full left-0 w-full pb-3">
          <div className="bg-card-bg bg-opacity-95 backdrop-blur-lg rounded-2xl border border-white border-opacity-5 p-4 shadow-2xl flex flex-col space-y-2 transition-colors duration-300">
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
