'use client';

import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BentoCardProps {
  className?: string;
  icon: string;
  tag: string;
  subTag: string;
  children: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({ className = '', icon, tag, subTag, children }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-card spotlight-card pills-visible ${className}`}
    >
      <div className="bento-icon-row">
        <div className="bento-icon">
          <i className={icon}></i>
        </div>
        <div>
          <span className="bento-tag block text-text font-bold tracking-tight text-sm md:text-base">{tag}</span>
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-60 text-neutral-400">
            {subTag}
          </span>
        </div>
      </div>
      <div className="bento-pills">{children}</div>
      <div ref={glowRef} className="bento-glow"></div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#080809]/40 border-t border-white/[0.06]">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* SECTION HEADER (OpenAI Editorial Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                01 // ARCHITECTURE & CORE STACK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              {language === 'id' ? 'Sistem Teknis & Keahlian' : 'Technical Systems & Abilities'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans">
            {t('skills_description')}
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="skills-bento">

          {/* 1. Client Side */}
          <BentoCard
            icon="fas fa-laptop-code"
            tag="Client Side Systems"
            subTag="Frontend Architecture"
            className="bento-lg"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-react mr-1.5"></i> React</span>
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-table mr-1.5"></i> Kendo UI</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fab fa-js-square mr-1.5"></i> Next.js</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fab fa-html5 mr-1.5"></i> HTML5/CSS3</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fab fa-js mr-1.5"></i> TypeScript/JS</span>
            <span className="bpill" style={{ '--d': '0.25s' } as React.CSSProperties}><i className="fas fa-layer-group mr-1.5"></i> DevExpress</span>
            <span className="bpill" style={{ '--d': '0.3s' } as React.CSSProperties}><i className="fas fa-wind mr-1.5"></i> Tailwind CSS</span>
          </BentoCard>

          {/* 2. Server Side */}
          <BentoCard
            icon="fas fa-cubes"
            tag="Server Side Core"
            subTag="Backend & Distributed APIs"
            className="bento-lg"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-microsoft mr-1.5"></i> ASP.NET Core 8/9</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fab fa-node-js mr-1.5"></i> Node.js Runtime</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fas fa-leaf mr-1.5"></i> Spring Boot</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fab fa-laravel mr-1.5"></i> Laravel Framework</span>
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-fire mr-1.5"></i> CodeIgniter</span>
            <span className="bpill" style={{ '--d': '0.25s' } as React.CSSProperties}><i className="fas fa-shield-alt mr-1.5"></i> RESTful & gRPC APIs</span>
          </BentoCard>

          {/* 3. Data Storage */}
          <BentoCard
            icon="fas fa-database"
            tag="Data Persistence"
            subTag="Relational & In-Memory"
            className="bento-md"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-server mr-1.5"></i> SSMS SQL Server</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fas fa-database mr-1.5"></i> PostgreSQL</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fas fa-database mr-1.5"></i> MySQL Database</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fas fa-bolt mr-1.5"></i> Upstash Redis</span>
          </BentoCard>

          {/* 4. Languages */}
          <BentoCard
            icon="fas fa-terminal"
            tag={t('skills_programming')}
            subTag="Syntaxes & Runtimes"
            className="bento-md"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-hashtag mr-1.5"></i> C# (.NET)</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fab fa-java mr-1.5"></i> Java</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fab fa-php mr-1.5"></i> PHP</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fab fa-python mr-1.5"></i> Python</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fab fa-js mr-1.5"></i> JavaScript</span>
            <span className="bpill" style={{ '--d': '0.25s' } as React.CSSProperties}><i className="fas fa-code mr-1.5"></i> VB.NET</span>
          </BentoCard>

          {/* 5. DevOps & Tools */}
          <BentoCard
            icon="fas fa-tools"
            tag={t('skills_others')}
            subTag="Environment & Toolchains"
            className="bento-lg md:col-span-6 lg:col-span-6 w-full"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-docker mr-1.5"></i> Docker Containers</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fab fa-git-alt mr-1.5"></i> Git & GitHub Enterprise</span>
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-microsoft mr-1.5"></i> Azure DevOps CI/CD</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fab fa-figma mr-1.5"></i> UI/UX Prototyping</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fas fa-network-wired mr-1.5"></i> RFID IoT Telemetry</span>
            <span className="bpill" style={{ '--d': '0.25s' } as React.CSSProperties}><i className="fas fa-project-diagram mr-1.5"></i> UML & Schema Modeling</span>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default Skills;
