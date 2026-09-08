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
          : 'Your message has been sent successfully! Thank you.'
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
      {/* ======================== COMPACT CONTACT SECTION ======================== */}
      <section id="contact" className="py-20 relative overflow-hidden bg-gray-950 border-t border-white border-opacity-5">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-xl mx-auto space-y-8 fade-in visible">
            <div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                {t('contact_title_main')}
              </h3>
              <p className="text-gray-400 text-xs mt-2">
                {language === 'id' 
                  ? 'Kirimkan pesan langsung ke kotak masuk saya atau hubungi lewat media sosial.' 
                  : 'Send a direct message to my inbox or reach out via social media.'}
              </p>
            </div>

            {/* FORMULIR KONTAK INTERAKTIF */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left bg-[#16213e]/30 p-6 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
              <div>
                <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
                </label>
                <input
                  id="form-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'id' ? 'Masukkan nama Anda' : 'Enter your name'}
                  required
                  className="w-full bg-[#0d1117] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:bg-[#0d1117]/80 transition-all font-mono"
                />
              </div>

              <div>
                <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  {language === 'id' ? 'Alamat Email' : 'Email Address'}
                </label>
                <input
                  id="form-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                  required
                  className="w-full bg-[#0d1117] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:bg-[#0d1117]/80 transition-all font-mono"
                />
              </div>

              <div>
                <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  {language === 'id' ? 'Pesan Anda' : 'Your Message'}
                </label>
                <textarea
                  id="form-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'id' ? 'Tulis pesan Anda di sini...' : 'Write your message here...'}
                  rows={4}
                  required
                  className="w-full bg-[#0d1117] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:bg-[#0d1117]/80 transition-all resize-none font-mono"
                />
              </div>

              {/* Status Pesan */}
              {success && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono">
                  <i className="fas fa-check-circle mr-2"></i> {success}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono">
                  <i className="fas fa-times-circle mr-2"></i> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-gray-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner animate-spin"></i>
                    {language === 'id' ? 'Mengirim...' : 'Sending...'}
                  </span>
                ) : (
                  <span>{language === 'id' ? 'Kirim Pesan' : 'Send Message'}</span>
                )}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-gray-600 text-xs font-mono">OR REACH OUT VIA</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            {/* Clean Horizontal Social Cards Bar */}
            <div className="flex items-center justify-center gap-4 text-xl">
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
