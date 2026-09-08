'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // States untuk Formulir Kontak
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mengirim pesan.');
      }

      setSuccess(
        language === 'id'
          ? 'Pesan Anda berhasil dikirim! Terima kasih.'
          : 'Your message has been transmitted successfully! Thank you.'
      );
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Gagal mengirim pesan. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ======================== OPENAI EDITORIAL CONTACT SECTION ======================== */}
      <section id="contact" className="py-24 relative overflow-hidden bg-[#080809] border-t border-white/[0.06]">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          
          {/* SECTION HEADER (OpenAI Editorial Style) */}
          <div className="space-y-3 mb-14 text-center flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                06 // INQUIRIES & DISCOVERY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              {language === 'id' ? 'Mari Terhubung & Berkolaborasi' : 'Initiate Communication'}
            </h2>
            <p className="max-w-md mx-auto text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans">
              {language === 'id' 
                ? 'Kirimkan pesan langsung untuk kolaborasi rekayasa perangkat lunak, konsultasi sistem, atau tawaran karier.' 
                : 'Send an encrypted direct dispatch for enterprise software consulting, architectural inquiries, or career engagements.'}
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-8 fade-in visible">

            {/* FORMULIR KONTAK INTERAKTIF */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
              <div>
                <label htmlFor="form-name" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
                </label>
                <input
                  id="form-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'id' ? 'cth. John Doe' : 'e.g. John Doe'}
                  required
                  className="w-full bg-[#080809] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-mono placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label htmlFor="form-email" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  {language === 'id' ? 'Alamat Email' : 'Email Address'}
                </label>
                <input
                  id="form-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'id' ? 'nama@domain.com' : 'name@company.com'}
                  required
                  className="w-full bg-[#080809] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-mono placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label htmlFor="form-message" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  {language === 'id' ? 'Pesan / Catatan Rekayasa' : 'Message Payload'}
                </label>
                <textarea
                  id="form-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'id' ? 'Tuliskan kebutuhan atau pesan Anda di sini...' : 'Detail your project goals or inquiry here...'}
                  rows={4}
                  required
                  className="w-full bg-[#080809] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all resize-none font-mono placeholder:text-neutral-600"
                />
              </div>

              {/* Status Pesan */}
              {success && (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono">
                  <i className="fas fa-check-circle mr-2"></i> {success}
                </div>
              )}

              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono">
                  <i className="fas fa-times-circle mr-2"></i> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black font-semibold rounded-full text-xs sm:text-sm tracking-wide transition-all hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner animate-spin"></i>
                    {language === 'id' ? 'Mengirim...' : 'Transmitting...'}
                  </span>
                ) : (
                  <span>{language === 'id' ? 'Kirim Pesan →' : 'Transmit Message →'}</span>
                )}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-neutral-500 text-[11px] font-mono uppercase tracking-widest">
                DIRECT NETWORK CHANNELS
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Clean Horizontal Social Cards Bar */}
            <div className="flex items-center justify-center gap-3 text-lg">
              <a
                href="https://www.linkedin.com/in/naufal-fadhlurrohman21/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a
                href="https://github.com/naufalfadh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
                title="GitHub"
              >
                <i className="fab fa-github text-sm"></i>
              </a>
              <a
                href="https://wa.me/6282121686379/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp text-sm"></i>
              </a>
              <a
                href="mailto:fadlurahman03@gmail.com"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
                title="Email"
              >
                <i className="fas fa-envelope text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/[0.06] bg-[#080809]">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <p>
            {t('footer_copyright')} • ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="uppercase tracking-widest text-neutral-400">STATUS: PRODUCTION ACTIVE</span>
          </div>
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
