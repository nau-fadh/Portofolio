'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Experience: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'work' | 'edu'>('work');

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#080809]/80 border-t border-white/[0.06]">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* HEADER SECTION (OpenAI Editorial Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                03 // CHRONOLOGY & ROLES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              {language === 'id' ? 'Riwayat Karier & Rekayasa' : 'Professional Journey & Roles'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans">
            {t('exp_section_description')}
          </p>
        </div>

        {/* TAB TOGGLE NAVIGATION (OpenAI Pill Switcher) */}
        <div className="flex justify-center mb-16 fade-in visible w-full px-4">
          <div className="tab-toggle-group p-1.5 bg-white/[0.03] rounded-full border border-white/10 backdrop-blur-md flex w-full max-w-sm sm:max-w-md">
            <button
              onClick={() => setActiveTab('work')}
              className={`flex-1 justify-center cursor-pointer transition-all duration-300 px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 ${
                activeTab === 'work' 
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              aria-label="View Work Experience"
            >
              <i className="fas fa-briefcase text-[10px]"></i>
              <span>{t('tab_work')}</span>
            </button>
            <button
              onClick={() => setActiveTab('edu')}
              className={`flex-1 justify-center cursor-pointer transition-all duration-300 px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 ${
                activeTab === 'edu' 
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              aria-label="View Education and Organizations"
            >
              <i className="fas fa-graduation-cap text-[10px]"></i>
              <span>{t('tab_edu')}</span>
            </button>
          </div>
        </div>

        {/* WORK EXPERIENCE PANEL */}
        {activeTab === 'work' && (
          <div id="panel-work" className="tab-panel max-w-4xl mx-auto">
            <div className="relative pl-6 md:pl-8 timeline border-l border-white/10">

              {/* Experience New: Software Consultant */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Software Consultant & Architecture
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        .NET Developer
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('expNew_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs text-cyan-400"></i> {t('expNew_company')} <span className="text-xs text-neutral-500 font-normal">| {t('expNew_type')}</span>
                  </h4>
                  <ul className="space-y-2.5 text-neutral-400 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('expNew_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('expNew_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('expNew_task3')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('expNew_task4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 0: PT GS Battery (Contract) */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Enterprise App Support & Dev
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        Application Development Support
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('exp0_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs text-cyan-400"></i> PT GS Battery Indonesia <span className="text-xs text-neutral-500 font-normal">| Contract Based</span>
                  </h4>
                  <ul className="space-y-2.5 text-neutral-400 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp0_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp0_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp0_task3')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp0_task4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 1: PT GS Battery (Internship) */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Fullstack Migration Specialist
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        .NET Developer
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('exp1_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs text-cyan-400"></i> PT GS Battery Indonesia <span className="text-xs text-neutral-500 font-normal">| Fullstack Internship</span>
                  </h4>
                  <ul className="space-y-2.5 text-neutral-400 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp1_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp1_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp1_task3')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp1_task4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 2: AHM */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Legacy Migration & Quality Monitoring
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        {t('exp2_title')}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('exp2_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs text-cyan-400"></i> Astra Honda Motor <span className="text-xs text-neutral-500 font-normal">| Project Based</span>
                  </h4>
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-4 font-sans">
                    {t('exp2_role')}
                  </p>
                  <ul className="space-y-2.5 text-neutral-400 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp2_task1')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 3: Telkom Akses */}
              <div className="relative fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Infrastructure & Network Mapping
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        {t('exp3_title')}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('exp3_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs text-cyan-400"></i> PT Telkom Akses Indonesia <span className="text-xs text-neutral-500 font-normal">| Infrastructure Division</span>
                  </h4>
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-4 font-sans">
                    {t('exp3_role')}
                  </p>
                  <ul className="space-y-2.5 text-neutral-400 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp3_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp3_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('exp3_task3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* EDUCATION & ORGANIZATIONS PANEL */}
        {activeTab === 'edu' && (
          <div id="panel-edu" className="tab-panel max-w-4xl mx-auto">
            <div className="relative pl-6 md:pl-8 timeline border-l border-white/10">

              {/* Education 1 */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Higher Academic Foundation
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        {t('edu1_title')}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('edu1_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-2 flex items-center gap-2">
                    <i className="fas fa-university text-xs text-cyan-400"></i> Astratech – Bekasi, West Java
                  </h4>
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-5 font-sans">
                    {t('edu1_desc')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                    <span className="proj-pill font-mono text-[10px] bg-white/[0.03] border border-white/10 text-neutral-300"><i className="fas fa-certificate text-cyan-400"></i> {t('edu1_cert1')}</span>
                    <span className="proj-pill font-mono text-[10px] bg-white/[0.03] border border-white/10 text-neutral-300"><i className="fas fa-certificate text-cyan-400"></i> {t('edu1_cert2')}</span>
                    <span className="proj-pill font-mono text-[10px] bg-white/[0.03] border border-white/10 text-neutral-300"><i className="fas fa-certificate text-cyan-400"></i> {t('edu1_cert3')}</span>
                  </div>
                </div>
              </div>

              {/* Org 1 */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Institutional Media & Press
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        {t('org1_title')}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('org1_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-4 flex items-center gap-2">
                    <i className="fas fa-users text-xs text-cyan-400"></i> {t('org1_role')}
                  </h4>
                  <ul className="space-y-2.5 text-neutral-400 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('org1_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('org1_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('org1_task3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Org 2 */}
              <div className="relative fade-in visible">
                <div className="timeline-item bg-cyan-400 shadow-[0_0_10px_rgba(76,201,240,0.8)] border-2 border-black"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 inline-block mb-1">
                        Community & Socio-Cultural Initiative
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-text tracking-tight">
                        {t('org2_title')}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-widest bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 h-max w-max">
                      {t('org2_period')}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 mb-4 flex items-center gap-2">
                    <i className="fas fa-users text-xs text-cyan-400"></i> {t('org2_role')}
                  </h4>
                  <ul className="space-y-2.5 text-neutral-400 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('org2_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('org2_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">→</span>
                      <span>{t('org2_task3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;
