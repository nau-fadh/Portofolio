'use client';

import React, { useEffect, useRef, useState } from 'react';

const TextReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const words = ["ENTERPRISE.", "SYSTEMS.", "ARCHITECTURES.", "ROBUST APIS.", "SCALABILITY."];

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const scrollPercent = (scrollTop - containerTop) / (containerHeight - windowHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollPercent));
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalWords = words.length;
  const activeIndex = Math.floor(progress * totalWords);

  return (
    <section ref={containerRef} className="scroll-reveal-container bg-[#080809] border-t border-white/[0.06]">
      <div className="scroll-reveal-sticky">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 h-full max-w-7xl">
          
          {/* Left Side: Static Editorial Tag */}
          <div className="w-full md:w-1/2 text-center md:text-right space-y-1">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
              CORE PHILOSOPHY //
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-600 to-neutral-800 tracking-tight select-none uppercase font-sans">
              I ENGINEER
            </h2>
          </div>

          {/* Right Side: Animated Dynamic Text Stack */}
          <div className="w-full md:w-1/2 text-center md:text-left relative h-20 md:h-32 flex items-center justify-center md:justify-start overflow-hidden">
            <div className="reveal-text-stack w-full">
              {words.map((word, index) => {
                let statusClass = 'word-upcoming';
                if (index === activeIndex && progress > 0 && progress < 1) {
                  statusClass = 'word-active';
                } else if (index < activeIndex) {
                  statusClass = 'word-exit';
                }

                const isGradient = index === 4;

                return (
                  <span
                    key={index}
                    className={`reveal-word font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight block uppercase font-sans ${
                      isGradient 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' 
                        : 'text-white'
                    } ${statusClass}`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TextReveal;
