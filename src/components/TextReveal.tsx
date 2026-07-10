'use client';

import React, { useEffect, useRef, useState } from 'react';

const TextReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const words = ["SOLUTIONS.", "ENTERPRISE.", "INNOVATION.", "SYSTEM.", "SCALABILITY."];

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
    // Run once initially
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalWords = words.length;
  // Map progress (0 to 1) to active word index
  const activeIndex = Math.floor(progress * totalWords);

  return (
    <section ref={containerRef} className="scroll-reveal-container">
      <div className="scroll-reveal-sticky shadow-inner">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 h-full">
          
          {/* Left Side: Static Bold Text */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <h2 className="text-6xl md:text-8xl font-black text-gray-700 dark:text-gray-500 tracking-tighter select-none uppercase">
              I CODE
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

                // Custom styling based on index (primary color vs secondary vs gradient)
                const isGradient = index === 4;
                const isPrimary = index === 0 || index === 2;

                return (
                  <span
                    key={index}
                    className={`reveal-word font-black text-5xl md:text-7xl tracking-tight block uppercase ${
                      isGradient ? 'gradient-text' : ''
                    } ${statusClass}`}
                    style={
                      !isGradient
                        ? { color: isPrimary ? 'var(--primary)' : 'var(--secondary)' }
                        : undefined
                    }
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
