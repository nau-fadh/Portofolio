'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-3.1-flash-lite');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Inisialisasi pesan sambutan sesuai bahasa aktif
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content:
          language === 'id'
            ? 'Halo! Saya asisten AI Naufal Fadhlurrohman. Ada yang bisa saya bantu seputar pengalaman kerja, proyek, keahlian, atau kontak Naufal?'
            : "Hello! I am Naufal Fadhlurrohman's AI Assistant. How can I help you with Naufal's work experience, projects, skills, or contact info?",
      },
    ]);
  }, [language]);

  // Scroll otomatis ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || loading) return;

    // Tambah pesan user ke chat
    const updatedMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages, model: selectedModel }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal terhubung dengan AI.');
      }

      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: data.reply || 'Maaf, saya tidak dapat memahami pesan tersebut.' },
      ]);
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content:
            language === 'id'
              ? 'Maaf, terjadi masalah koneksi dengan server AI saya. Silakan coba lagi.'
              : 'Sorry, I encountered a connection issue with my AI server. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. FLOATING CHAT BUBBLE BUTTON (Terletak di Pojok Kiri Bawah, Selaras dengan Back to Top) */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-[6rem] left-[2rem] w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white flex items-center justify-center cursor-pointer shadow-lg hover:shadow-cyan-500/20 hover:scale-110 active:scale-95 transition-all duration-300 z-[999] border border-white border-opacity-10`}
        title="AI Assistant"
        aria-label="Toggle AI Assistant Chat"
      >
        {isOpen ? (
          <i className="fas fa-times text-base animate-pulse"></i>
        ) : (
          <div className="relative">
            <i className="fas fa-robot text-base"></i>
            {/* Status dot indicator */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border border-[#16213e] rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* 2. CHAT WINDOW CARD */}
      <div
        className={`fixed left-[2rem] bottom-[10rem] w-[320px] sm:w-[360px] h-[450px] bg-[#0d1117]/95 border border-white border-opacity-10 rounded-2xl flex flex-col shadow-2xl backdrop-blur-md transition-all duration-300 z-[999] overflow-hidden origin-bottom-left ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }`}
      >
        {/* Header Widget */}
        <div className="p-4 bg-[#16213e]/80 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-gray-950 font-black">
              <i className="fas fa-robot text-xs text-white"></i>
            </div>
            <div className="text-left font-mono">
              <h4 className="text-xs font-bold text-white tracking-wide uppercase">Naufal AI Assistant</h4>
              <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> ONLINE
              </span>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer text-sm p-1"
            aria-label="Close Chat"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Model Selector Sub-Header Bar */}
        <div className="px-4 py-2 bg-[#090d13] border-b border-white/5 flex items-center justify-between font-mono text-[9px] text-gray-400">
          <span className="font-bold tracking-wider uppercase">{language === 'id' ? 'PILIH MODEL:' : 'SELECT MODEL:'}</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={loading}
            className="bg-[#0d1117] text-gray-300 border border-white/10 rounded-md px-2 py-0.5 text-[9px] focus:outline-none focus:border-cyan-400 font-mono cursor-pointer disabled:opacity-50"
          >
            <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite</option>
            <option value="gpt-4o-mini">GPT-4o Mini (OpenAI)</option>
            <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Anthropic)</option>
            <option value="claude-3-haiku">Claude 3 Haiku (Anthropic)</option>
          </select>
        </div>

        {/* Message List Panel */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-thin">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col text-left max-w-[85%] ${
                msg.role === 'user' ? 'self-end' : 'self-start'
              }`}
            >
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-sans ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/30 text-white rounded-tr-none border border-cyan-500/20'
                    : 'bg-[#16213e]/70 text-gray-200 rounded-tl-none border border-white/5'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* AI Typing Loader */}
          {loading && (
            <div className="self-start max-w-[85%] flex items-center space-x-1.5 bg-[#16213e]/70 px-3.5 py-3 rounded-2xl rounded-tl-none border border-white/5 text-[9px] text-gray-400 font-mono">
              <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Footer */}
        <form onSubmit={handleSend} className="p-3 bg-[#16213e]/30 border-t border-white/5 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              language === 'id'
                ? 'Tanyakan tentang Naufal...'
                : 'Ask about Naufal...'
            }
            required
            disabled={loading}
            className="flex-1 bg-[#0d1117] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/50 disabled:opacity-50 font-sans"
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 flex items-center justify-center cursor-pointer transition-all disabled:opacity-40"
            aria-label="Send Message"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
