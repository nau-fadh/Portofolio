'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ======================== COMPACT CONTACT SECTION ======================== */}
      <section id="contact" className="py-12 relative overflow-hidden bg-gray-950 border-t border-white border-opacity-5">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-xl mx-auto space-y-4 fade-in visible">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                {t('contact_title_main')}
              </h3>
            </div>

            {/* Clean Horizontal Social Cards Bar */}
            <div className="flex items-center justify-center gap-4 pt-2 text-xl">
              <a
                href="https://www.linkedin.com/in/naufal-fadhlurrohman21/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#16213e] border border-white border-opacity-5 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:scale-110 transition-all shadow-md cursor-pointer"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/naufalfadh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#16213e] border border-white border-opacity-5 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 hover:scale-110 transition-all shadow-md cursor-pointer"
                title="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://wa.me/6282121686379/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#16213e] border border-white border-opacity-5 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:scale-110 transition-all shadow-md cursor-pointer"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="mailto:fadlurahman03@gmail.com"
                className="w-11 h-11 rounded-xl bg-[#16213e] border border-white border-opacity-5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:scale-110 transition-all shadow-md cursor-pointer"
                title="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white border-opacity-5 bg-[#1a1a2e]">
        <div className="w-full px-4 md:px-6 text-left">
          <p className="text-xs text-gray-500 font-mono">
            {t('footer_copyright')} All Rights Reserved.
          </p>
        </div>

        {/* Back to Top Button */}
        <button
          id="back-to-top"
          onClick={scrollToTop}
          className={`${showBackToTop ? 'visible opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'pointer-events-none opacity-0 translate-y-4 scale-75'}`}
          title="Back to Top"
          aria-label="Back to Top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </footer>
    </>
  );
};

export default Contact;
