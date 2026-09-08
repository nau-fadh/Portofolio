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
          <span className="bento-tag block text-text font-bold">{tag}</span>
          <span className="text-xs opacity-50 uppercase tracking-wider font-bold text-gray-400">
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
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-500 border-opacity-10 pb-8">
          <div className="fade-in visible">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text">
              TECHNICAL <span className="gradient-text">ABILITIES</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed opacity-70 fade-in visible text-gray-400">
            {t('skills_description')}
          </p>
        </div>

        <div className="skills-bento">

          {/* 1. Client Side */}
          <BentoCard
            icon="fas fa-laptop-code"
            tag="Client Side"
            subTag="Frontend Development"
            className="bento-lg"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-react mr-1.5"></i> React</span>
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-table mr-1.5"></i> Kendo UI</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fab fa-js-square mr-1.5"></i> Next.js</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fab fa-html5 mr-1.5"></i> HTML/CSS</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fab fa-js mr-1.5"></i> JavaScript</span>
            <span className="bpill" style={{ '--d': '0.25s' } as React.CSSProperties}><i className="fas fa-layer-group mr-1.5"></i> DevExpress</span>
            <span className="bpill" style={{ '--d': '0.3s' } as React.CSSProperties}><i className="fas fa-wind mr-1.5"></i> Tailwind CSS</span>
          </BentoCard>

          {/* 2. Server Side */}
          <BentoCard
            icon="fas fa-cubes"
            tag="Server Side"
            subTag="Backend Architecture"
            className="bento-lg"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-microsoft mr-1.5"></i> ASP.NET Core</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fab fa-node-js mr-1.5"></i> Node.js</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fas fa-leaf mr-1.5"></i> Spring Boot</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fab fa-laravel mr-1.5"></i> Laravel</span>
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-fire mr-1.5"></i> CodeIgniter</span>
            <span className="bpill" style={{ '--d': '0.25s' } as React.CSSProperties}><i className="fas fa-shield-alt mr-1.5"></i> RESTful API</span>
          </BentoCard>

          {/* 3. Data Storage */}
          <BentoCard
            icon="fas fa-database"
            tag="Data Storage"
            subTag="Databases"
            className="bento-md"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-server mr-1.5"></i> SSMS</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fas fa-database mr-1.5"></i> PostgreSQL</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fas fa-database mr-1.5"></i> MySQL</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fas fa-hdd mr-1.5"></i> Oracle</span>
          </BentoCard>

          {/* 4. Languages */}
          <BentoCard
            icon="fas fa-terminal"
            tag={t('skills_programming')}
            subTag="Syntax"
            className="bento-md"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fas fa-hashtag mr-1.5"></i> C#</span>
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
            subTag="Environment & Workflow"
            className="bento-lg md:col-span-6 lg:col-span-6 w-full"
          >
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-docker mr-1.5"></i> Docker</span>
            <span className="bpill" style={{ '--d': '0.1s' } as React.CSSProperties}><i className="fab fa-git-alt mr-1.5"></i> Git & GitHub</span>
            <span className="bpill" style={{ '--d': '0.05s' } as React.CSSProperties}><i className="fab fa-microsoft mr-1.5"></i> Azure DevOps</span>
            <span className="bpill" style={{ '--d': '0.15s' } as React.CSSProperties}><i className="fab fa-figma mr-1.5"></i> Figma</span>
            <span className="bpill" style={{ '--d': '0.2s' } as React.CSSProperties}><i className="fas fa-network-wired mr-1.5"></i> RFID System Integration</span>
            <span className="bpill" style={{ '--d': '0.25s' } as React.CSSProperties}><i className="fas fa-project-diagram mr-1.5"></i> UML & Database Design</span>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default Skills;
