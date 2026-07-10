'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import IDCard from './IDCard';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    // Mencocokkan nama file aktual di folder public/assets
    link.href = language === 'id'
      ? "/assets/CV ATS NAUFAL FADHLURROHMAN V.IND.pdf"
      : "/assets/CV ATS NAUFAL FADHLURROHMAN  V.ENG.pdf";
    link.download = `CV_NAUFAL_FADHLURROHMAN_(${language === 'id' ? 'Indonesia' : 'English'}).pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 78,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-opacity-30">
      <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-between py-12">
        
        {/* TOP ROW: Brutalist Corner Tags */}
        <div className="flex justify-between items-center w-full uppercase tracking-widest text-xs font-bold opacity-60">
          <span>{t('hero_top_left')}</span>
          <span>2026</span>
        </div>

        {/* MIDDLE ROW: Big Typography & Layered Center Photo */}
        <div className="relative w-full flex justify-center items-center my-auto flex-grow h-[450px] md:h-[550px]">
          {/* Giant Background Text */}
          <h1 className="giant-bg-text select-none">PORTOFOLIO</h1>

          {/* Interactive Physics ID Card */}
          <IDCard />

          {/* Wireframe Globe Decorative Icon */}
          <div className="absolute left-4 bottom-12 hidden md:flex items-center space-x-1 opacity-20 dark:opacity-40 text-4xl">
            <i className="fas fa-globe"></i>
            <i className="fas fa-network-wired"></i>
          </div>
        </div>

        {/* BOTTOM ROW: Split Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end w-full pt-6 border-t border-gray-500 border-opacity-10">
          {/* Left Corner: Auth Statement & CTA */}
          <div className="space-y-4 max-w-md">
            <p className="text-xs md:text-sm leading-relaxed opacity-70">
              {t('hero_description')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={handleContactClick}
                className="cta-primary py-2 px-5 text-xs rounded-lg cursor-pointer"
              >
                {t('hero_contact')}
              </a>
              <button
                onClick={handleDownloadResume}
                className="cta-ghost py-2 px-4 text-xs rounded-lg"
              >
                <i className="fas fa-download mr-1"></i> {language === 'id' ? 'Unduh CV' : 'Resume'}
              </button>
            </div>
          </div>

          {/* Right Corner: Name and Professional Branding */}
          <div className="text-left md:text-right space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Naufal Fadhlurrohman
            </h2>
            <p className="gradient-text font-bold text-sm md:text-base tracking-wide uppercase">
              Fullstack Developer / API Engineer / .NET Specialist
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
